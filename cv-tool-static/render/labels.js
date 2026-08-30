// UI text (section headings, buttons, date formatting words) for each
// supported language. Content itself lives in data/base.<lang>.js — this
// file only covers the surrounding chrome that isn't part of your data.
//
// To add a language: add a key here (e.g. "fr"), add a matching
// data/base.fr.js, then set lang: "fr" in an application's config.js.

const LABELS = {
  en: {
    lang: "en",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    languages: "Languages",
    certifications: "Certifications",
    present: "Present",
    re: "Re:",
    print: "Print / Save as PDF",
    cvNoun: "CV",
    letterNoun: "Cover Letter",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  de: {
    lang: "de",
    experience: "Berufserfahrung",
    education: "Ausbildung",
    skills: "Kenntnisse",
    projects: "Projekte",
    languages: "Sprachen",
    certifications: "Zertifizierungen",
    present: "Heute",
    re: "Betreff:",
    print: "Drucken / Als PDF speichern",
    cvNoun: "Lebenslauf",
    letterNoun: "Anschreiben",
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  },
  ja: {
    lang: "ja",
    experience: "職歴",
    education: "学歴",
    skills: "スキル",
    projects: "プロジェクト",
    languages: "言語",
    certifications: "資格",
    present: "現在",
    re: "件名:",
    print: "印刷 / PDFとして保存",
    cvNoun: "履歴書",
    letterNoun: "送付状",
    months: [] // Japanese dates are formatted directly as "YYYY年M月" — see formatDate() in render.js
  }
};
