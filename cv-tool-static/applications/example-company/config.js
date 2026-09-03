// Config for this application. Edit and save, then just refresh the
// cv.html / letter.html tab in your browser — no build step.

const APP_CONFIG = {
  lang: "en", // "en", "de", or "ja" — picks data/base.<lang>.js and translates section headings/dates

  design: "classic", // "classic" (single column) or "sidebar" (two-column, colored sidebar) — you can also switch live with the toolbar buttons

  company: "Example Company",
  position: "Senior Backend Engineer",
  date: "2026-08-30",

  summary: null, // string to override data/base.<lang>.js's summary, or null to use it as-is

  photo: false, // show the photo? (only if data/base.<lang>.js has personal.photo set)

  sections: {
    experience: "all", // "all", or e.g. ["exp-acme"] to include only specific ids in that order
    education: "all",
    skills: "all",
    projects: "all", // e.g. [] to omit the Projects section entirely
    languages: "all",
    certifications: "all",
    mobility: "all" // driving license, car, etc. — "all", an array of ids, or [] to omit
  }
};
