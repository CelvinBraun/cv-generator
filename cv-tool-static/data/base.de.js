// Master data — German. Same field names as base.en.js, all values in German.
// Use this when an application's config.js has lang: "de".

const BASE_DATA = {
  personal: {
    name: "Jane Doe",
    title: "Softwareentwicklerin",
    email: "jane.doe@example.com",
    phone: "+1 555 123 4567",
    location: "Berlin, Deutschland",
    photo: null,
    birthDate: "1994-05-12",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/janedoe" },
      { label: "GitHub", url: "https://github.com/janedoe" },
      { label: "Portfolio", url: "https://janedoe.dev" }
    ]
  },

  summary:
    "Backend-fokussierte Softwareentwicklerin mit 6 Jahren Erfahrung im Aufbau zuverlässiger, skalierbarer Systeme. Übernimmt gerne die volle Verantwortung für Systeme – von der Konzeption bis zum Bereitschaftsdienst.",

  experience: [
    {
      id: "exp-acme",
      role: "Senior Backend Engineer",
      company: "Acme Systems",
      location: "Berlin, Deutschland",
      start: "2022-03",
      end: "Heute",
      bullets: [
        "Zahlungsservice neu konzipiert: p99-Latenz um 40 % gesenkt, Bereitschaftseinsätze halbiert.",
        "Migration der Kernsysteme von einem Monolithen zu unabhängig deploybaren Services geleitet.",
        "Zwei Junior-Entwickler betreut, beide innerhalb eines Jahres befördert."
      ],
      tags: ["backend", "leadership", "payments"]
    },
    {
      id: "exp-globex",
      role: "Software Engineer",
      company: "Globex Corp",
      location: "Remote",
      start: "2019-06",
      end: "2022-02",
      bullets: [
        "Interne Tools entwickelt und gepflegt, genutzt von über 50 Entwicklern.",
        "Automatisierte Tests eingeführt, Testabdeckung von 30 % auf 85 % erhöht."
      ],
      tags: ["backend", "tooling"]
    }
  ],

  education: [
    {
      id: "edu-tu",
      degree: "M.Sc. Informatik",
      institution: "Technische Universität Berlin",
      location: "Berlin, Deutschland",
      start: "2017",
      end: "2019",
      details: ""
    },
    {
      id: "edu-bsc",
      degree: "B.Sc. Informatik",
      institution: "Universität Hamburg",
      location: "Hamburg, Deutschland",
      start: "2014",
      end: "2017",
      details: ""
    }
  ],

  skills: [
    { category: "Sprachen (Programmierung)", items: ["Python", "TypeScript", "Go"] },
    { category: "Infrastruktur", items: ["AWS", "Docker", "Kubernetes", "Terraform"] },
    { category: "Weitere", items: ["PostgreSQL", "Kafka", "CI/CD"] }
  ],

  projects: [
    {
      id: "proj-oss",
      name: "queuely",
      description: "Open-Source-Job-Queue für Node.js, ca. 800 GitHub-Sterne.",
      url: "https://github.com/janedoe/queuely",
      tags: ["backend", "oss"]
    }
  ],

  languages: [
    { name: "Englisch", level: "Verhandlungssicher" },
    { name: "Deutsch", level: "Fließend" }
  ],

  certifications: [
    {
      id: "cert-aws",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023"
    }
  ],

  mobility: [
    { id: "license", text: "Führerschein vorhanden (Klasse B)" },
    { id: "car", text: "PKW vorhanden" }
  ]
};
