// Master data — Japanese. Same field names as base.en.js, all values in Japanese.
// Use this when an application's config.js has lang: "ja".
//
// Note: this is a straightforward translation for demonstration. Japanese
// job-application documents (履歴書/職務経歴書) follow their own strong
// conventions that go beyond translation — have a native speaker review
// this before using it for a real application.

const BASE_DATA = {
  personal: {
    name: "ジェーン・ドウ",
    title: "ソフトウェアエンジニア",
    email: "jane.doe@example.com",
    phone: "+1 555 123 4567",
    location: "ベルリン、ドイツ",
    photo: null,
    birthDate: "1994-05-12",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/janedoe" },
      { label: "GitHub", url: "https://github.com/janedoe" },
      { label: "Portfolio", url: "https://janedoe.dev" }
    ]
  },

  summary:
    "信頼性の高いスケーラブルなサービスの構築を専門とするバックエンドエンジニア。実務経験6年。設計からオンコール対応まで、システムを一貫して担当することを得意とする。",

  experience: [
    {
      id: "exp-acme",
      role: "シニアバックエンドエンジニア",
      company: "Acme Systems",
      location: "ベルリン、ドイツ",
      start: "2022-03",
      end: "現在",
      bullets: [
        "決済サービスを再設計し、p99レイテンシを40%削減、オンコール対応件数を半減。",
        "コアサービスをモノリスから独立してデプロイ可能なサービスへ移行。",
        "ジュニアエンジニア2名を指導、いずれも1年以内に昇進。"
      ],
      tags: ["backend", "leadership", "payments"]
    },
    {
      id: "exp-globex",
      role: "ソフトウェアエンジニア",
      company: "Globex Corp",
      location: "リモート",
      start: "2019-06",
      end: "2022-02",
      bullets: [
        "50名以上のエンジニアが利用する社内ツールを構築・保守。",
        "自動テストを導入し、テストカバレッジを30%から85%に向上。"
      ],
      tags: ["backend", "tooling"]
    }
  ],

  education: [
    {
      id: "edu-tu",
      degree: "コンピューターサイエンス修士",
      institution: "ベルリン工科大学",
      location: "ベルリン、ドイツ",
      start: "2017",
      end: "2019",
      details: ""
    },
    {
      id: "edu-bsc",
      degree: "コンピューターサイエンス学士",
      institution: "ハンブルク大学",
      location: "ハンブルク、ドイツ",
      start: "2014",
      end: "2017",
      details: ""
    }
  ],

  skills: [
    { category: "プログラミング言語", items: ["Python", "TypeScript", "Go"] },
    { category: "インフラ", items: ["AWS", "Docker", "Kubernetes", "Terraform"] },
    { category: "その他", items: ["PostgreSQL", "Kafka", "CI/CD"] }
  ],

  projects: [
    {
      id: "proj-oss",
      name: "queuely",
      description: "Node.js向けの軽量オープンソースジョブキュー。GitHubスター約800。",
      url: "https://github.com/janedoe/queuely",
      tags: ["backend", "oss"]
    }
  ],

  languages: [
    { name: "英語", level: "ネイティブレベル" },
    { name: "ドイツ語", level: "ビジネスレベル" }
  ],

  certifications: [
    {
      id: "cert-aws",
      name: "AWS認定ソリューションアーキテクト – アソシエイト",
      issuer: "Amazon Web Services",
      date: "2023"
    }
  ],

  mobility: [
    { id: "license", text: "普通自動車第一種運転免許 保有" },
    { id: "car", text: "自家用車 保有" }
  ]
};
