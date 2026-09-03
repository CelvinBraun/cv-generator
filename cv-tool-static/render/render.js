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

// Full date, for birth date: "1994-05-12" -> "12 May 1994" (en),
// "12. Mai 1994" (de), "1994年5月12日" (ja). Anything not in YYYY-MM-DD
// form passes through unchanged (so you can also just write a literal
// pre-formatted string directly in your data file if you prefer).
function formatFullDate(value, labels) {
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const year = match[1];
  const monthIndex = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);
  if (labels.lang === "ja") {
    return `${year}年${monthIndex + 1}月${day}日`;
  }
  const months = labels.months || [];
  const monthName = months[monthIndex] || match[2];
  if (labels.lang === "de") {
    return `${day}. ${monthName} ${year}`;
  }
  return `${day} ${monthName} ${year}`;
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

// Phone shows in the contact block whenever it's set in your data file —
// same rule in both designs. opts.showPhone is kept as an override hook
// in case you want to suppress it for a specific application later.
function renderContactLines(personal, labels, opts) {
  opts = opts || {};
  const showPhone = opts.showPhone !== false;
  const parts = [];
  if (personal.email) parts.push(`<a href="mailto:${escapeHtml(personal.email)}">${escapeHtml(personal.email)}</a>`);
  if (showPhone && personal.phone) parts.push(escapeHtml(personal.phone));
  if (personal.location) parts.push(escapeHtml(personal.location));
  if (personal.birthDate) {
    parts.push(`${escapeHtml(labels.birthDate)}: ${escapeHtml(formatFullDate(personal.birthDate, labels))}`);
  }
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
  <section class="block experience">
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
  <section class="block education">
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
  <section class="block compact skills">
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
  <section class="block compact languages">
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
  <section class="block compact certifications">
    <div class="section-label">${escapeHtml(labels.certifications)}</div>
    <div class="certifications-row">${items}</div>
  </section>`;
}

// Mobility: driving license, car availability, willingness to travel, etc.
// Each item is { id, text } — text is literal, written in your data file's
// language, same pattern as skills/bullets.
function renderMobility(list, labels) {
  if (!list || list.length === 0) return "";
  const items = list.map((m) => `<span>${escapeHtml(m.text)}</span>`).join("");
  return `
  <section class="block compact mobility">
    <div class="section-label">${escapeHtml(labels.mobility)}</div>
    <div class="mobility-row">${items}</div>
  </section>`;
}

// Gathers and filters all CV data once, shared by both design builders below.
function gatherCVData() {
  const labels = getLabels();
  const sections = APP_CONFIG.sections || {};
  return {
    labels: labels,
    personal: BASE_DATA.personal,
    summary: APP_CONFIG.summary || BASE_DATA.summary || "",
    showPhoto: Boolean(APP_CONFIG.photo) && Boolean(BASE_DATA.personal.photo),
    experience: selectEntries(BASE_DATA.experience, sections.experience ?? "all"),
    education: selectEntries(BASE_DATA.education, sections.education ?? "all"),
    skills: selectEntries(BASE_DATA.skills, sections.skills ?? "all", "category"),
    projects: selectEntries(BASE_DATA.projects, sections.projects ?? "all"),
    languages: selectEntries(BASE_DATA.languages, sections.languages ?? "all", "name"),
    certifications: selectEntries(BASE_DATA.certifications, sections.certifications ?? "all"),
    mobility: selectEntries(BASE_DATA.mobility, sections.mobility ?? "all")
  };
}

// Classic design: single column, everything in reading order.
function buildClassicHTML(d) {
  return `
  <header class="cv-header">
    ${d.showPhoto ? `<div class="photo"><img src="${escapeHtml(d.personal.photo)}" alt=""></div>` : ""}
    <div class="identity">
      <h1>${escapeHtml(d.personal.name)}</h1>
      <p class="role">${escapeHtml(d.personal.title)}</p>
    </div>
    <div class="contact">${renderContactLines(d.personal, d.labels, { showPhone: true })}</div>
  </header>

  ${d.summary ? `<p class="summary">${escapeHtml(d.summary)}</p>` : ""}

  ${renderExperience(d.experience, d.labels)}
  ${renderEducation(d.education, d.labels)}
  ${renderSkills(d.skills, d.labels)}
  ${renderProjects(d.projects, d.labels)}
  ${renderLanguages(d.languages, d.labels)}
  ${renderCertifications(d.certifications, d.labels)}
  ${renderMobility(d.mobility, d.labels)}
  `;
}

// Sidebar design: two columns — photo/contact/skills/languages/
// certifications/mobility in a colored left sidebar, summary/experience/
// education/projects in the main column. Phone is intentionally omitted
// here (kept in the classic design) to match a denser sidebar layout.
function buildSidebarHTML(d) {
  return `
  <div class="cv-two-col">
    <aside class="cv-sidebar">
      ${d.showPhoto ? `<div class="side-photo"><img src="${escapeHtml(d.personal.photo)}" alt=""></div>` : ""}
      <div class="side-identity">
        <h1>${escapeHtml(d.personal.name)}</h1>
        <p class="role">${escapeHtml(d.personal.title)}</p>
      </div>
      <div class="side-contact">${renderContactLines(d.personal, d.labels, { showPhone: true })}</div>
      ${renderSkills(d.skills, d.labels)}
      ${renderLanguages(d.languages, d.labels)}
      ${renderCertifications(d.certifications, d.labels)}
      ${renderMobility(d.mobility, d.labels)}
    </aside>
    <main class="cv-main">
      ${d.summary ? `<p class="summary">${escapeHtml(d.summary)}</p>` : ""}
      ${renderExperience(d.experience, d.labels)}
      ${renderEducation(d.education, d.labels)}
      ${renderProjects(d.projects, d.labels)}
    </main>
  </div>
  `;
}

// The sidebar's colored background needs to visually reach the bottom of
// every printed page it spans — but CSS alone can't know in advance how
// many pages that is (a "min-height: 100%" only works for exactly one
// page; a large fixed height would print extra blank pages for short
// CVs). So after rendering, measure the actual content height, work out
// how many A4 pages it spans, and set the sidebar's height to match
// exactly — no more, no less.
function adjustSidebarHeight() {
  const twoCol = document.querySelector(".cv-two-col");
  const sidebar = document.querySelector(".cv-sidebar");
  if (!twoCol || !sidebar) return;

  sidebar.style.minHeight = ""; // reset so measurement reflects natural content, not a stale prior value
  const pageHeightPx = (297 / 25.4) * 96; // A4 height at 96 CSS-px-per-inch reference
  const naturalHeight = twoCol.scrollHeight;
  const pages = Math.max(1, Math.ceil(naturalHeight / pageHeightPx));
  sidebar.style.minHeight = pages * pageHeightPx + "px";
}

// Current design, initialized from APP_CONFIG.design (defaults to "classic").
// switchDesign() changes this and re-renders — see the toolbar buttons in cv.html.
let CV_DESIGN = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.design) || "classic";

// Called once BASE_DATA, LABELS, and APP_CONFIG are all loaded, and again
// any time switchDesign() is called.
function renderCV() {
  const d = gatherCVData();

  document.documentElement.lang = d.labels.lang;
  document.title = `${d.personal.name} — ${d.labels.cvNoun}`;
  const printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.textContent = d.labels.print;

  const app = document.getElementById("app");
  app.classList.remove("design-classic", "design-sidebar");
  app.classList.add("design-" + CV_DESIGN);
  app.innerHTML = CV_DESIGN === "sidebar" ? buildSidebarHTML(d) : buildClassicHTML(d);

  if (CV_DESIGN === "sidebar") {
    adjustSidebarHeight();
  }
}

// Switches design and re-renders. Wired to the toolbar buttons in cv.html.
function switchDesign(name) {
  CV_DESIGN = name;
  renderCV();
}

window.addEventListener("beforeprint", function () {
  if (CV_DESIGN === "sidebar") adjustSidebarHeight();
});

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
    <div class="contact">${renderContactLines(personal, labels, { showPhone: true })}</div>
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
