# CV Tool

A local, no-install CV and cover letter generator. Edit plain data files,
open an HTML file in your browser, print to PDF. No Node, no build step,
no server, nothing loaded from the internet.

## Background

I wanted to automate my CV creation and use a tool I could actually trust
and tweak myself, so I built this with Claude as a "quick" way to generate
CVs and cover letters — and as a bit of an experiment in how fast something
usable comes together with AI help.

**Status: work in progress.** It's functional and I use it for real
applications, but it's not a finished product — expect rough edges, and
expect it to keep changing as I need it to.

## Why local, no-install

- Everything runs by double-clicking an HTML file — no Terminal, no
  Homebrew, no Node, nothing to install or keep updated.
- No network calls, no CDNs, no analytics. All fonts are system fonts.
- Your data (name, work history, contact details) never leaves your disk.

## How it works

- `data/base.<lang>.js` — your master CV content, one file per language
  (`base.en.js`, `base.de.js`, `base.ja.js` included as examples/starters).
  Field *names* are English (`experience`, `bullets`, `role`, ...) in every
  file; the *values* are written in that file's language.
- `render/render.js` — turns data into the page you see. Also holds the
  design-switching logic (classic vs. sidebar). Shouldn't need touching.
- `render/labels.js` — translated section headings, print button text, and
  date formatting, per language.
- `render/loader.js` — loads the right `base.<lang>.js` at runtime based on
  an application's `config.js`, so the HTML files never need editing when
  you switch language.
- `styles/` — shared design tokens + print rules (`shared.css`), plus
  CV- and letter-specific styles, including the sidebar design.
- `applications/<name>/` — one folder per job application:
  - `config.js` — `lang` flag (`"en"` / `"de"` / `"ja"`), default `design`
    (`"classic"` / `"sidebar"`), which data entries to include, company/
    position/date, and whether to show a photo.
  - `letter.js` — the cover letter text for that application.
  - `cv.html` / `letter.html` — open these directly in your browser.
    Generic across languages/applications — you shouldn't need to edit
    them beyond the initial setup.

## Usage

1. Edit `data/base.<lang>.js` with your real info (experience, education,
   skills, projects, languages, certifications, mobility — each entry
   tagged with an `id`).
2. Duplicate an `applications/example-company*` folder, rename it for a
   real application, and edit its `config.js` (set `lang`, `design`,
   company, position, date, and which entries to include) and `letter.js`.
3. Double-click `cv.html` / `letter.html` to view. After any edit, just
   refresh the tab — nothing to rebuild.
4. On `cv.html`, use the **Classic design** / **Sidebar design** buttons to
   preview either layout live — no reload needed. Whichever one is showing
   when you print is what gets saved.
5. Click **Print / Save as PDF** and choose "Save as PDF" in the print
   dialog. This same dialog is also the most reliable way to check
   pagination before saving — it renders the real, final page breaks, so
   there's no need to guess on the scrolled screen view.

## Designs

- **Classic** — single column, everything in reading order. Header with
  photo/name/contact, then Summary, Experience, Education, Skills,
  Projects, Languages, Certifications, Mobility.
- **Sidebar** — two columns. A dark teal sidebar holds photo, name,
  contact, Skills, Languages, Certifications, and Mobility; the white main
  column holds Summary, Experience, Education, and Projects. Full-bleed
  background, tested across single- and multi-page PDFs.

Both designs read from the same data — nothing to duplicate. Switch live
with the toolbar buttons, or set a default per application with
`design: "classic"` / `"sidebar"` in `config.js`.

## `config.js` reference

```js
const APP_CONFIG = {
  lang: "en",                   // "en", "de", or "ja" — picks data/base.<lang>.js
  design: "classic",             // "classic" or "sidebar" — default on load; also switchable live in the browser
  company: "Acme Corp",
  position: "Senior Backend Engineer",
  date: "2026-08-30",
  summary: null,                 // string to override base.<lang>.js's summary, or null to use it as-is
  photo: false,                  // show the photo? (only if data/base.<lang>.js has personal.photo set)
  sections: {
    experience: "all",           // "all", or an array of ids to include in that order, e.g. ["exp-acme"]
    education: "all",
    skills: "all",
    projects: [],                  // empty array = section is omitted entirely
    languages: "all",
    certifications: "all",
    mobility: "all"
  }
};
```

Any section that resolves to an empty list (either `[]` or ids that don't
match) is left out of the rendered CV completely — no empty headings.

## Adding a photo

Two switches both need to be set, or it won't show:

1. In `data/base.<lang>.js`, set `personal.photo` to a path relative to
   `cv.html`, e.g. `"../../assets/photo.jpg"`.
2. In the application's `config.js`, set `photo: true`.

Photo tips: shoot it square (1:1), at least 500×500px (800×800px is
better), centered and reasonably tight-framed — it's cropped into a small
circle, so a plain background and tight framing read best at that size.

## Birth date and mobility

- `personal.birthDate` — set as `"YYYY-MM-DD"` (e.g. `"1994-05-12"`) for
  automatic per-language formatting ("12 May 1994" / "12. Mai 1994" /
  "1994年5月12日"), or write any literal string directly if you'd rather
  control the format yourself. Leave it unset to omit it entirely — useful
  if you want it on your German CV but not your English one.
- `mobility` — a top-level array alongside `experience`/`education`/etc.,
  for things like a driving license or car availability:
  ```js
  mobility: [
    { id: "license", text: "Driving license (Class B)" },
    { id: "car", text: "Own car available" }
  ]
  ```
  Each `text` is literal, written in that data file's language — same
  pattern as bullets and skills. Filter which ones show per application
  via `sections.mobility` in `config.js`, same as any other section.

Phone number always shows in both designs whenever `personal.phone` is set
in your data — no separate toggle.

## Adding a new language

1. Copy `data/base.en.js` to `data/base.<code>.js` (e.g. `base.fr.js`) and
   translate every value.
2. In `render/labels.js`, add a matching key for section headings, the
   print button text, and date formatting (see the `ja` entry for the
   non-Western date format pattern).
3. Set `lang: "<code>"` in an application's `config.js`.

## Print / pagination notes

- `.entry` blocks (individual jobs, degrees) and `.compact` sections
  (Skills, Languages, Certifications, Mobility) won't split mid-content
  across a page break — they jump to the next page as a whole unit if they
  don't fit.
- There's no way to force a specific manual page break right now. If
  content spills awkwardly across pages, the fix is trimming content
  (older/less relevant roles need fewer bullets) or tightening spacing in
  `styles/cv.css`, not a page-break flag. The sidebar design is naturally
  more compact than classic if you're right on the edge of a page.
- To check real pagination before saving: click Print, look at the
  preview, cancel if it needs work, edit, refresh, and check again. That
  preview is the actual page layout — trust it over anything on the
  scrolled screen view.

## Why `.js` files instead of `.json`

Browsers block loading local JSON files with `fetch()` for security reasons
unless you run a local server. Plain `<script src="...">` tags don't have
that restriction, so wrapping data as `const X = {...}` and loading it as a
script is what makes double-clicking the HTML file work with zero setup.
Functionally, treat `base.<lang>.js` and `config.js` like JSON — same
structure, just wrapped in a variable declaration.
