// Shared rendering logic for both cv.html and letter.html.
// Runs entirely in the browser — reads the global BASE_DATA (from
// data/base.<lang>.js), LABELS (from render/labels.js), and APP_CONFIG /
// LETTER_TEXT (from an application's config.js / letter.js), and writes
// the final markup into #app.

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "2022-03" -> "Mar 2022" (en), "Mär 2022" (de), "2022年3月" (ja).
// Anything not in YYYY-MM form ("Present", "Heute", "2019", ...) passes through unchanged.
function formatDate(value, labels) {
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const year = match[1];
  const monthIndex = parseInt(match[2], 10) - 1;
  if (labels.lang === "ja") {
    return `${year}年${monthIndex + 1}月`;
  }
  const months = labels.months || [];
  return `${months[monthIndex] || match[2]} ${year}`;
}

function dateRange(entry, labels) {
  const start = formatDate(entry.start, labels);
  const end = formatDate(entry.end, labels) || labels.present;
  return start ? `${start} — ${end}` : end;
}

// Selects entries from `list` based on a selector value:
//   "all"            -> everything, original order
//   ["id1", "id2"]   -> only those, in the given order
//   [] / null/false  -> nothing (section will be omitted)
function selectEntries(list, selector, keyField = "id") {
  if (!list || list.length === 0) return [];
  if (selector === "all") return list;
  if (Array.isArray(selector)) {
    return selector.map((key) => list.find((item) => item[keyField] === key)).filter(Boolean);
  }
  return [];
}

function getLabels() {
  const lang = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.lang) || "en";
  return LABELS[lang] || LABELS.en;
}

function renderContactLine(personal) {
  const parts = [];
  if (personal.email) parts.push(`<a href="mailto:${escapeHtml(personal.email)}">${escapeHtml(personal.email)}</a>`);
  if (personal.phone) parts.push(escapeHtml(personal.phone));
  if (personal.location) parts.push(escapeHtml(personal.location));
  (personal.links || []).forEach((link) => {
    parts.push(`<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`);
  });
  return parts.join("<br>");
}

function renderExperience(list, labels) {
  if (list.length === 0) return "";
  const items = list
    .map(
      (e) => `
    <div class="entry">
      <div class="entry-head">
        <div class="title">${escapeHtml(e.role)} <span class="at">— ${escapeHtml(e.company)}</span></div>
        <div class="dates">${escapeHtml(dateRange(e, labels))}</div>
      </div>
      ${e.location ? `<div class="location">${escapeHtml(e.location)}</div>` : ""}
      ${e.bullets && e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>` : ""}
    </div>`
    )
    .join("");
  return `
  <section class="block">
    <div class="section-label">${escapeHtml(labels.experience)}</div>
    ${items}
  </section>`;
}

function renderEducation(list, labels) {
  if (list.length === 0) return "";
  const items = list
    .map(
      (e) => `
    <div class="entry">
      <div class="entry-head">
        <div class="title">${escapeHtml(e.degree)} <span class="at">— ${escapeHtml(e.institution)}</span></div>
        <div class="dates">${escapeHtml(e.start)} — ${escapeHtml(e.end)}</div>
      </div>
      ${e.location ? `<div class="location">${escapeHtml(e.location)}</div>` : ""}
      ${e.details ? `<div class="details">${escapeHtml(e.details)}</div>` : ""}
    </div>`
    )
    .join("");
  return `
  <section class="block">
    <div class="section-label">${escapeHtml(labels.education)}</div>
    ${items}
  </section>`;
}

function renderSkills(list, labels) {
  if (list.length === 0) return "";
  const items = list
    .map(
      (s) => `
    <div class="category">
      <div class="cat-name">${escapeHtml(s.category)}</div>
      <div class="cat-items">${s.items.map(escapeHtml).join(", ")}</div>
    </div>`
    )
    .join("");
  return `
  <section class="block compact">
    <div class="section-label">${escapeHtml(labels.skills)}</div>
    <div class="skills-grid">${items}</div>
  </section>`;
}

function renderProjects(list, labels) {
  if (list.length === 0) return "";
  const items = list
    .map(
      (p) => `
    <div class="entry">
      <div class="entry-head">
        <div class="title">${escapeHtml(p.name)}</div>
        ${p.url ? `<a class="proj-link" href="${escapeHtml(p.url)}">${escapeHtml(p.url.replace(/^https?:\/\//, ""))}</a>` : ""}
      </div>
      ${p.description ? `<div class="details">${escapeHtml(p.description)}</div>` : ""}
    </div>`
    )
    .join("");
  return `
  <section class="block projects">
    <div class="section-label">${escapeHtml(labels.projects)}</div>
    ${items}
  </section>`;
}

function renderLanguages(list, labels) {
  if (list.length === 0) return "";
  const items = list
    .map((l) => `<span>${escapeHtml(l.name)} <span class="lang-level">(${escapeHtml(l.level)})</span></span>`)
    .join("");
  return `
  <section class="block compact">
    <div class="section-label">${escapeHtml(labels.languages)}</div>
    <div class="languages-row">${items}</div>
  </section>`;
}

function renderCertifications(list, labels) {
  if (list.length === 0) return "";
  const items = list
    .map(
      (c) =>
        `<span>${escapeHtml(c.name)} <span class="cert-meta">— ${escapeHtml(c.issuer)}, ${escapeHtml(c.date)}</span></span>`
    )
    .join("");
  return `
  <section class="block compact">
    <div class="section-label">${escapeHtml(labels.certifications)}</div>
    <div class="certifications-row">${items}</div>
  </section>`;
}

// Called once BASE_DATA, LABELS, and APP_CONFIG are all loaded.
function renderCV() {
  const labels = getLabels();
  const sections = APP_CONFIG.sections || {};
  const experience = selectEntries(BASE_DATA.experience, sections.experience ?? "all");
  const education = selectEntries(BASE_DATA.education, sections.education ?? "all");
  const skills = selectEntries(BASE_DATA.skills, sections.skills ?? "all", "category");
  const projects = selectEntries(BASE_DATA.projects, sections.projects ?? "all");
  const languages = selectEntries(BASE_DATA.languages, sections.languages ?? "all", "name");
  const certifications = selectEntries(BASE_DATA.certifications, sections.certifications ?? "all");

  const summary = APP_CONFIG.summary || BASE_DATA.summary || "";
  const showPhoto = Boolean(APP_CONFIG.photo) && Boolean(BASE_DATA.personal.photo);
  const personal = BASE_DATA.personal;

  document.documentElement.lang = labels.lang;
  document.title = `${personal.name} — ${labels.cvNoun}`;
  const printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.textContent = labels.print;

  document.getElementById("app").innerHTML = `
  <header class="cv-header">
    ${showPhoto ? `<div class="photo"><img src="${escapeHtml(personal.photo)}" alt=""></div>` : ""}
    <div class="identity">
      <h1>${escapeHtml(personal.name)}</h1>
      <p class="role">${escapeHtml(personal.title)}</p>
    </div>
    <div class="contact">${renderContactLine(personal)}</div>
  </header>

  ${summary ? `<p class="summary">${escapeHtml(summary)}</p>` : ""}

  ${renderExperience(experience, labels)}
  ${renderEducation(education, labels)}
  ${renderSkills(skills, labels)}
  ${renderProjects(projects, labels)}
  ${renderLanguages(languages, labels)}
  ${renderCertifications(certifications, labels)}
  `;
}

// Called once BASE_DATA, LABELS, APP_CONFIG, and LETTER_TEXT are all loaded.
function renderLetter() {
  const labels = getLabels();
  const personal = BASE_DATA.personal;

  document.documentElement.lang = labels.lang;
  document.title = `${personal.name} — ${labels.letterNoun}`;
  const printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.textContent = labels.print;

  const paragraphs = LETTER_TEXT.trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const letterBodyHtml = paragraphs.map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`).join("\n");

  document.getElementById("app").innerHTML = `
  <header class="letter-header">
    <div class="identity">
      <h1>${escapeHtml(personal.name)}</h1>
      <p class="role">${escapeHtml(personal.title)}</p>
    </div>
    <div class="contact">${renderContactLine(personal)}</div>
  </header>

  <div class="letter-meta">
    <div class="recipient">${escapeHtml(APP_CONFIG.company)}${
    APP_CONFIG.position ? `<br>${escapeHtml(labels.re)} ${escapeHtml(APP_CONFIG.position)}` : ""
  }</div>
    <div class="date">${escapeHtml(APP_CONFIG.date || "")}</div>
  </div>

  <div class="letter-body">
    ${letterBodyHtml}
  </div>
  `;
}
