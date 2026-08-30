// Your master data. Edit this file directly — every job, degree, skill,
// project, language, and certification you have, each tagged with an "id"
// so application configs can reference them.
//
// This loads as a plain <script> tag (not a JSON fetch), which is why it's
// a .js file: browsers block fetch()/JSON loading of local files without a
// server, but a <script src="..."> tag works fine straight off disk.

const BASE_DATA = {
  personal: {
    name: "Jane Doe",
    title: "Software Engineer",
    email: "jane.doe@example.com",
    phone: "+1 555 123 4567",
    location: "Berlin, Germany",
    photo: null,
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/janedoe" },
      { label: "GitHub", url: "https://github.com/janedoe" },
      { label: "Portfolio", url: "https://janedoe.dev" }
    ]
  },

  summary:
    "Backend-focused software engineer with 6 years of experience building reliable, scalable services. Comfortable owning systems end to end, from design through on-call.",

  experience: [
    {
      id: "exp-acme",
      role: "Senior Backend Engineer",
      company: "Acme Systems",
      location: "Berlin, Germany",
      start: "2022-03",
      end: "Present",
      bullets: [
        "Redesigned the payments service, cutting p99 latency by 40% and reducing on-call incidents by half.",
        "Led migration of core services from a monolith to independently deployable services.",
        "Mentored two junior engineers, both promoted within a year."
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
        "Built and maintained internal tooling used by 50+ engineers.",
        "Introduced automated testing practices, raising coverage from 30% to 85%."
      ],
      tags: ["backend", "tooling"]
    }
  ],

  education: [
    {
      id: "edu-tu",
      degree: "M.Sc. Computer Science",
      institution: "Technical University of Berlin",
      location: "Berlin, Germany",
      start: "2017",
      end: "2019",
      details: ""
    },
    {
      id: "edu-bsc",
      degree: "B.Sc. Computer Science",
      institution: "University of Hamburg",
      location: "Hamburg, Germany",
      start: "2014",
      end: "2017",
      details: ""
    }
  ],

  skills: [
    { category: "Languages", items: ["Python", "TypeScript", "Go"] },
    { category: "Infrastructure", items: ["AWS", "Docker", "Kubernetes", "Terraform"] },
    { category: "Other", items: ["PostgreSQL", "Kafka", "CI/CD"] }
  ],

  projects: [
    {
      id: "proj-oss",
      name: "queuely",
      description: "Open-source lightweight job queue for Node.js, ~800 GitHub stars.",
      url: "https://github.com/janedoe/queuely",
      tags: ["backend", "oss"]
    }
  ],

  languages: [
    { name: "English", level: "Fluent" },
    { name: "German", level: "Professional working proficiency" }
  ],

  certifications: [
    {
      id: "cert-aws",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023"
    }
  ]
};
