import { projects } from "@/lib/projects";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type AssistantSourceCard = {
  title: string;
  category: string;
  summary: string;
  stack: string[];
};

export type AssistantResponseMeta = {
  sources: AssistantSourceCard[];
  suggestions: string[];
};

export type DeterministicAssistantReply = {
  message: string;
  suggestions: string[];
};

type ResponseLanguage = "english" | "hinglish" | "hindi";

export const assistantQuickReplies = [
  "What services do you offer?",
  "Show your best projects",
  "Tech stack?",
  "How can I hire you?",
];

const developerProfile = {
  name: "Sohail Ansari",
  title: "Delhi's 17-Year-Old AI-Native Developer",
  tagline:
    "Building websites and apps 3x faster and 50% cheaper for Indian small businesses using AI.",
  location: "Delhi, India",
  positioning:
    "Self-taught, AI-native, business-focused freelance developer helping startups and small businesses ship faster with modern UI, app development, and practical AI features.",
};

const services = [
  {
    name: "Web Development",
    businessValue:
      "Premium business websites, landing pages, and conversion-focused web apps designed to build trust and generate leads.",
  },
  {
    name: "UI/UX Design",
    businessValue:
      "Clean, modern interfaces that improve clarity, user engagement, and perceived quality of the brand.",
  },
  {
    name: "Performance Optimization",
    businessValue:
      "Faster-loading experiences that improve retention, usability, and conversion potential.",
  },
  {
    name: "Full-Stack Solutions",
    businessValue:
      "Frontend, backend, APIs, and product flows planned together so the project stays scalable and practical.",
  },
  {
    name: "App Development",
    businessValue:
      "Cross-platform mobile apps using Flutter for startups and local businesses that need polished MVPs.",
  },
  {
    name: "AI Integration",
    businessValue:
      "Lead capture, support automation, and smart workflows that reduce manual work and improve response speed.",
  },
];

const skillGroups = {
  frontend: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Responsive UI",
    "Landing Pages",
    "Performance Optimisation",
  ],
  mobile: [
    "Flutter",
    "Dart",
    "Cross-platform Apps",
    "Firebase-ready Architecture",
    "App UI Systems",
    "Play Store-ready Builds",
  ],
  backend: [
    "Python",
    "Flask",
    "Node.js",
    "REST APIs",
    "Authentication Flows",
    "Database Integration",
    "Form Handling",
    "Third-party Integrations",
  ],
  ai: [
    "OpenAI",
    "Cursor AI",
    "GitHub Copilot",
    "Replit",
    "Prompt Workflows",
    "AI Prototyping",
    "Content Automation",
    "AI Chat Integrations",
  ],
  design: [
    "Figma",
    "UI/UX Design",
    "Glassmorphism",
    "Brand Messaging",
    "SEO Basics",
    "Vercel Deployment",
    "Git & GitHub",
    "Client Communication",
  ],
};

const contactDetails = {
  whatsapp: "+91 7292055850",
  email: "sohail1278ansari@gmail.com",
};

const pricing = {
  basicWebsite: "Rs 2,000 - 3,000",
  businessWebsite: "Rs 3,000 - 4,000",
  mobileApp: "Rs 7,000 - 8,000",
  aiAutomation: "Rs 10,000 - 12,000",
};

const pricingNumbers = {
  basicWebsite: { min: 2000, max: 3000 },
  businessWebsite: { min: 3000, max: 4000 },
  mobileApp: { min: 7000, max: 8000 },
  aiAutomation: { min: 10000, max: 12000 },
};

const hinglishTerms = [
  "hai",
  "haan",
  "nahi",
  "nahin",
  "bhai",
  "mujhe",
  "mujhko",
  "mera",
  "meri",
  "mere",
  "kitna",
  "kitne",
  "lagega",
  "banana",
  "banwana",
  "banwani",
  "jaisa",
  "kaisa",
  "karna",
  "karwana",
  "chahiye",
  "chahiye?",
  "kar sakte",
  "karoge",
  "paisa",
  "kharcha",
  "batao",
  "samjha",
];

function normalise(text: string) {
  return text.toLowerCase().trim();
}

function keywordScore(haystack: string, query: string) {
  const normalizedHaystack = normalise(haystack);
  const terms = normalise(query).split(/\s+/).filter(Boolean);

  return terms.reduce((score, term) => {
    return normalizedHaystack.includes(term) ? score + 1 : score;
  }, 0);
}

function containsAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function detectResponseLanguage(query: string): ResponseLanguage {
  const normalized = normalise(query);

  if (/[\u0900-\u097F]/.test(query)) {
    return "hindi";
  }

  if (containsAny(normalized, hinglishTerms)) {
    return "hinglish";
  }

  return "english";
}

export function isProjectIntent(query: string) {
  const normalized = normalise(query);

  return containsAny(normalized, [
    "project",
    "projects",
    "portfolio",
    "case study",
    "case studies",
    "show work",
    "show your work",
    "example",
    "examples",
    "work you did",
    "best projects",
  ]);
}

export function isPricingIntent(query: string) {
  const normalized = normalise(query);

  return containsAny(normalized, [
    "price",
    "pricing",
    "cost",
    "budget",
    "quote",
    "charges",
    "how much",
    "paisa",
    "paise",
    "kharcha",
    "kitna",
    "kitne",
    "lagega",
    "banwane ka",
    "banwana",
    "banwani",
  ]);
}

function formatInr(value: number) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

function localizeSuggestions(
  language: ResponseLanguage,
  english: string[],
  hinglish: string[],
  hindi: string[],
) {
  if (language === "hindi") {
    return hindi;
  }

  if (language === "hinglish") {
    return hinglish;
  }

  return english;
}

function buildPricingReply(query: string) {
  const normalized = normalise(query);
  const language = detectResponseLanguage(query);
  const mentionsWebsite = containsAny(normalized, [
    "website",
    "site",
    "landing page",
    "business website",
    "web app",
  ]);
  const mentionsApp = containsAny(normalized, ["app", "mobile app", "application"]);
  const mentionsAi = containsAny(normalized, ["ai", "automation", "chatbot"]);
  const mentionsComplexity = containsAny(normalized, [
    "mvp",
    "advanced",
    "custom",
    "complex",
    "feature",
    "features",
    "similar",
    "like",
    "jaisa",
    "pocketfm",
    "spotify",
    "netflix",
    "admin panel",
    "dashboard",
  ]);

  if (mentionsWebsite && mentionsApp) {
    const min = pricingNumbers.basicWebsite.min + pricingNumbers.mobileApp.min;
    const max = pricingNumbers.businessWebsite.max + pricingNumbers.mobileApp.max;

    if (language === "hinglish") {
      return {
        message: `1 website aur 1 app ke liye rough range around ${formatInr(min)} - ${formatInr(max)} rahegi. Exact bundled scope ya discount ke liye Sohail se directly WhatsApp par baat kar sakte ho.`,
        suggestions: localizeSuggestions(
          language,
          [],
          [
            "Mujhe basic website aur app chahiye",
            "Mujhe business website aur app chahiye",
            "WhatsApp par bundled pricing discuss karni hai",
          ],
          [],
        ),
      };
    }

    if (language === "hindi") {
      return {
        message: `1 वेबसाइट और 1 ऐप के लिए लगभग ${formatInr(min)} - ${formatInr(max)} तक का रेंज रह सकता है। सही bundled scope या discount के लिए Sohail से सीधे WhatsApp पर बात करना बेहतर रहेगा।`,
        suggestions: localizeSuggestions(
          language,
          [],
          [],
          [
            "मुझे basic website और app चाहिए",
            "मुझे business website और app चाहिए",
            "WhatsApp पर bundled pricing discuss करनी है",
          ],
        ),
      };
    }

    return {
      message: `For 1 website and 1 app together, a practical rough range would usually be around ${formatInr(min)} - ${formatInr(max)}. For exact bundled scope or any discount discussion, it is best to connect with Sohail on WhatsApp.`,
      suggestions: [
        "I need a basic website and app",
        "I need a business website and app",
        "Can we discuss bundled pricing on WhatsApp?",
      ],
    };
  }

  if (mentionsWebsite && mentionsAi) {
    const min = pricingNumbers.basicWebsite.min + pricingNumbers.aiAutomation.min;
    const max = pricingNumbers.businessWebsite.max + pricingNumbers.aiAutomation.max;

    if (language === "hinglish") {
      return {
        message: `Website plus AI automation ke liye rough range around ${formatInr(min)} - ${formatInr(max)} rahegi. Agar workflow zyada custom hai to exact scope WhatsApp par discuss karna better rahega.`,
        suggestions: localizeSuggestions(
          language,
          [],
          [
            "Mujhe website ke sath chatbot chahiye",
            "Mujhe AI automation bhi chahiye",
            "Exact scope WhatsApp par discuss karni hai",
          ],
          [],
        ),
      };
    }

    if (language === "hindi") {
      return {
        message: `Website plus AI automation के लिए लगभग ${formatInr(min)} - ${formatInr(max)} तक का रेंज रह सकता है। अगर workflow ज्यादा custom है तो exact scope WhatsApp पर discuss करना बेहतर रहेगा।`,
        suggestions: localizeSuggestions(
          language,
          [],
          [],
          [
            "मुझे website के साथ chatbot चाहिए",
            "मुझे AI automation भी चाहिए",
            "Exact scope WhatsApp पर discuss करनी है",
          ],
        ),
      };
    }

    return {
      message: `For a website plus AI automation, a rough combined range would usually be around ${formatInr(min)} - ${formatInr(max)}. If the workflow is more custom, it is best to discuss the exact scope directly with Sohail on WhatsApp.`,
      suggestions: [
        "I need a website with chatbot",
        "I need AI automation too",
        "Can we discuss exact scope on WhatsApp?",
      ],
    };
  }

  if (mentionsApp) {
    if (mentionsComplexity) {
      if (language === "hinglish") {
        return {
          message: `Aise app ke liye safe rough range around ${formatInr(pricingNumbers.mobileApp.min)} - ${formatInr(20000)} reh sakti hai, features, screens aur backend work par depend karega. Exact app scope ke liye Sohail se directly WhatsApp par baat kar sakte ho.`,
          suggestions: localizeSuggestions(
            language,
            [],
            [
              "Mujhe simple MVP app chahiye",
              "Mujhe backend wala app chahiye",
              "App scope WhatsApp par discuss karni hai",
            ],
            [],
          ),
        };
      }

      if (language === "hindi") {
        return {
          message: `ऐसे app के लिए safe rough range लगभग ${formatInr(pricingNumbers.mobileApp.min)} - ${formatInr(20000)} तक रह सकती है। यह features, screens और backend work पर depend करेगा। Exact app scope के लिए Sohail से सीधे WhatsApp पर बात कर सकते हैं।`,
          suggestions: localizeSuggestions(
            language,
            [],
            [],
            [
              "मुझे simple MVP app चाहिए",
              "मुझे backend वाला app चाहिए",
              "App scope WhatsApp पर discuss करनी है",
            ],
          ),
        };
      }

      return {
        message: `For an app like that, a safe rough range would usually be around ${formatInr(pricingNumbers.mobileApp.min)} - ${formatInr(20000)} depending on features, screens, and backend work. For the exact app scope, it is better to discuss directly with Sohail on WhatsApp.`,
        suggestions: [
          "I need a simple MVP app",
          "I need app with backend too",
          "Can we discuss app scope on WhatsApp?",
        ],
      };
    }

    if (language === "hinglish") {
      return {
        message: `1 mobile app ka usual range around ${pricing.mobileApp} rahega. Agar app me thode extra features honge to price thoda upar ja sakta hai, but exact scope ke liye Sohail se directly WhatsApp par baat karna best rahega.`,
        suggestions: localizeSuggestions(
          language,
          [],
          [
            "Mujhe basic MVP app chahiye",
            "Mujhe app design bhi chahiye",
            "App scope WhatsApp par discuss karni hai",
          ],
          [],
        ),
      };
    }

    if (language === "hindi") {
      return {
        message: `1 mobile app का usual range लगभग ${pricing.mobileApp} रहेगा। अगर app में थोड़े extra features होंगे तो price थोड़ा ऊपर जा सकता है, लेकिन exact scope के लिए Sohail से सीधे WhatsApp पर बात करना बेहतर रहेगा।`,
        suggestions: localizeSuggestions(
          language,
          [],
          [],
          [
            "मुझे basic MVP app चाहिए",
            "मुझे app design भी चाहिए",
            "App scope WhatsApp पर discuss करनी है",
          ],
        ),
      };
    }

    return {
      message: `For one mobile app, the usual range is around ${pricing.mobileApp}. If the app needs a few more features, the price can go a bit higher, but for exact scope it is best to discuss directly with Sohail on WhatsApp.`,
      suggestions: [
        "I need a basic MVP app",
        "I need app design too",
        "Can we discuss app scope on WhatsApp?",
      ],
    };
  }

  if (mentionsAi) {
    if (mentionsComplexity) {
      if (language === "hinglish") {
        return {
          message: `Custom AI feature ya automation setup ke liye practical range usually ${pricing.aiAutomation} ke around rahegi aur zyada detailed workflow ho to about ${formatInr(20000)} tak ja sakti hai. Exact scope ke liye Sohail se WhatsApp par direct baat karna better rahega.`,
          suggestions: localizeSuggestions(
            language,
            [],
            [
              "Mujhe AI chatbot chahiye",
              "Mujhe AI automation chahiye",
              "AI scope WhatsApp par discuss karni hai",
            ],
            [],
          ),
        };
      }

      if (language === "hindi") {
        return {
          message: `Custom AI feature या automation setup के लिए practical range usually ${pricing.aiAutomation} के around रहेगी और workflow ज्यादा detailed हो तो about ${formatInr(20000)} तक जा सकती है। Exact scope के लिए Sohail से WhatsApp पर direct बात करना बेहतर रहेगा।`,
          suggestions: localizeSuggestions(
            language,
            [],
            [],
            [
              "मुझे AI chatbot चाहिए",
              "मुझे AI automation चाहिए",
              "AI scope WhatsApp पर discuss करनी है",
            ],
          ),
        };
      }

      return {
        message: `For a custom AI feature or automation setup, a practical range would usually be around ${pricing.aiAutomation} and can go up to about ${formatInr(20000)} if the workflow is more detailed. If you are planning something specific, it is best to discuss the scope directly with Sohail on WhatsApp.`,
        suggestions: [
          "I need an AI chatbot",
          "I need AI automation",
          "Can we discuss AI scope on WhatsApp?",
        ],
      };
    }

    if (language === "hinglish") {
      return {
        message: `AI automation ya custom AI feature ka usual range around ${pricing.aiAutomation} rahega. Exact scope ya discount ke liye Sohail se WhatsApp par baat karna best rahega.`,
        suggestions: localizeSuggestions(
          language,
          [],
          [
            "Mujhe AI automation chahiye",
            "Mujhe AI chatbot chahiye",
            "AI scope WhatsApp par discuss karni hai",
          ],
          [],
        ),
      };
    }

    if (language === "hindi") {
      return {
        message: `AI automation या custom AI feature का usual range लगभग ${pricing.aiAutomation} रहेगा। Exact scope या discount के लिए Sohail से WhatsApp पर बात करना बेहतर रहेगा।`,
        suggestions: localizeSuggestions(
          language,
          [],
          [],
          [
            "मुझे AI automation चाहिए",
            "मुझे AI chatbot चाहिए",
            "AI scope WhatsApp पर discuss करनी है",
          ],
        ),
      };
    }

    return {
      message: `For AI automation or a custom AI feature, the usual range is around ${pricing.aiAutomation}. For exact scope or discount discussion, it is best to connect with Sohail on WhatsApp.`,
      suggestions: [
        "I need AI automation",
        "I need an AI chatbot",
        "Can we discuss AI scope on WhatsApp?",
      ],
    };
  }

  if (mentionsWebsite) {
    if (mentionsComplexity) {
      if (language === "hinglish") {
        return {
          message: `Custom website with extra features ke liye practical range usually ${pricing.basicWebsite} se ${formatInr(12000)} tak rahegi, pages, design aur functionality par depend karega. Exact pricing ke liye Sohail se directly WhatsApp par baat kar sakte ho.`,
          suggestions: localizeSuggestions(
            language,
            [],
            [
              "Mujhe basic website chahiye",
              "Mujhe business website chahiye",
              "Website scope WhatsApp par discuss karni hai",
            ],
            [],
          ),
        };
      }

      if (language === "hindi") {
        return {
          message: `Extra features वाली custom website के लिए practical range usually ${pricing.basicWebsite} से ${formatInr(12000)} तक रह सकती है। यह pages, design और functionality पर depend करेगा। Exact pricing के लिए Sohail से सीधे WhatsApp पर बात कर सकते हैं।`,
          suggestions: localizeSuggestions(
            language,
            [],
            [],
            [
              "मुझे basic website चाहिए",
              "मुझे business website चाहिए",
              "Website scope WhatsApp पर discuss करनी है",
            ],
          ),
        };
      }

      return {
        message: `For a custom website with extra features, a practical range would usually be around ${pricing.basicWebsite} to ${formatInr(12000)} depending on pages, design, and functionality. For exact pricing, it is best to discuss directly with Sohail on WhatsApp.`,
        suggestions: [
          "I need a basic website",
          "I need a business website",
          "Can we discuss website scope on WhatsApp?",
        ],
      };
    }

    if (language === "hinglish") {
      return {
        message: `Basic website usually ${pricing.basicWebsite} se start hoti hai. Thodi zyada polished business website ka range usually ${pricing.businessWebsite} rehta hai. Exact scope ya discount ke liye Sohail se WhatsApp par baat karna best rahega.`,
        suggestions: localizeSuggestions(
          language,
          [],
          [
            "Mujhe basic website chahiye",
            "Mujhe business website chahiye",
            "Scope WhatsApp par discuss karni hai",
          ],
          [],
        ),
      };
    }

    if (language === "hindi") {
      return {
        message: `Basic website usually ${pricing.basicWebsite} से start होती है। थोड़ी ज्यादा polished business website का range usually ${pricing.businessWebsite} रहता है। Exact scope या discount के लिए Sohail से WhatsApp पर बात करना बेहतर रहेगा।`,
        suggestions: localizeSuggestions(
          language,
          [],
          [],
          [
            "मुझे basic website चाहिए",
            "मुझे business website चाहिए",
            "Scope WhatsApp पर discuss करनी है",
          ],
        ),
      };
    }

    return {
      message: `A basic website usually starts around ${pricing.basicWebsite}. A more polished business website typically falls in the ${pricing.businessWebsite} range. For exact scope or discount discussion, it is best to connect with Sohail on WhatsApp.`,
      suggestions: [
        "I need a basic website",
        "I need a business website",
        "Can we discuss scope on WhatsApp?",
      ],
    };
  }

  if (language === "hinglish") {
    return {
      message: `Website projects usually ${pricing.basicWebsite} se start hote hain, business websites around ${pricing.businessWebsite}, mobile apps around ${pricing.mobileApp}, aur AI automation around ${pricing.aiAutomation}. Agar requirement zyada custom hai aur exact price clear nahi hai, to scope directly Sohail se WhatsApp par discuss karna best rahega.`,
      suggestions: localizeSuggestions(
        language,
        [],
        [
          "Mujhe website chahiye",
          "Mujhe app chahiye",
          "Mujhe website aur app dono chahiye",
        ],
        [],
      ),
    };
  }

  if (language === "hindi") {
    return {
      message: `Website projects usually ${pricing.basicWebsite} से start होते हैं, business websites around ${pricing.businessWebsite}, mobile apps around ${pricing.mobileApp}, और AI automation around ${pricing.aiAutomation}. अगर requirement ज्यादा custom है और exact price clear नहीं है, तो scope directly Sohail से WhatsApp पर discuss करना बेहतर रहेगा।`,
      suggestions: localizeSuggestions(
        language,
        [],
        [],
        [
          "मुझे website चाहिए",
          "मुझे app चाहिए",
          "मुझे website और app दोनों चाहिए",
        ],
      ),
    };
  }

  return {
    message: `Website projects usually start around ${pricing.basicWebsite}, business websites around ${pricing.businessWebsite}, mobile apps around ${pricing.mobileApp}, and AI automation around ${pricing.aiAutomation}. If the requirement is more custom and the exact price is not clear yet, it is best to discuss the scope directly with Sohail on WhatsApp.`,
    suggestions: [
      "I need a website",
      "I need an app",
      "I need a website and app",
    ],
  };
}

function getRelevantProjects(query: string) {
  return [...projects]
    .map((project) => ({
      project,
      score: keywordScore(
        [
          project.title,
          project.client,
          project.category,
          project.description,
          project.fullDescription,
          project.challenge,
          project.solution,
          project.stack.join(" "),
          project.outcome.join(" "),
        ].join(" "),
        query,
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0)
    .slice(0, 3)
    .map((item) => item.project);
}

function getRelevantServices(query: string) {
  return [...services]
    .map((service) => ({
      service,
      score: keywordScore(`${service.name} ${service.businessValue}`, query),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0)
    .slice(0, 3)
    .map((item) => item.service);
}

function formatRelevantProjects(query: string) {
  const matches = getRelevantProjects(query);

  if (matches.length === 0) {
    return "No highly relevant project match found from the portfolio data.";
  }

  return matches
    .map(
      (project) =>
        `- ${project.title} (${project.category})\n  Problem: ${project.challenge}\n  Solution: ${project.solution}\n  Outcome: ${project.outcome.join("; ")}\n  Stack: ${project.stack.join(", ")}`,
    )
    .join("\n");
}

function getSuggestionSet(query: string) {
  const normalized = normalise(query);
  const language = detectResponseLanguage(query);

  if (isPricingIntent(query)) {
    return localizeSuggestions(
      language,
      [
        "Do you need a basic website or a business website?",
        "Do you already have design/content ready?",
        "Would you like to discuss discount or scope on WhatsApp?",
      ],
      [
        "Basic website chahiye ya business website?",
        "Design/content ready hai ya usme bhi help chahiye?",
        "Discount ya scope WhatsApp par discuss karni hai?",
      ],
      [
        "Basic website चाहिए या business website?",
        "Design/content ready है या उसमें भी help चाहिए?",
        "Discount या scope WhatsApp पर discuss करनी है?",
      ],
    );
  }

  if (normalized.includes("hire") || normalized.includes("project")) {
    return localizeSuggestions(
      language,
      [
        "What kind of project are you planning?",
        "Do you already have a design or need help with that too?",
        "What timeline are you working with?",
      ],
      [
        "Aap kis type ka project plan kar rahe ho?",
        "Design ready hai ya usme bhi help chahiye?",
        "Timeline kya sochi hai?",
      ],
      [
        "आप किस type का project plan कर रहे हैं?",
        "Design ready है या उसमें भी help चाहिए?",
        "Timeline क्या सोची है?",
      ],
    );
  }

  if (normalized.includes("tech") || normalized.includes("stack")) {
    return localizeSuggestions(
      language,
      [
        "Do you want frontend, backend, mobile, or AI stack details?",
        "Would you like examples of projects built with these technologies?",
        "Are you choosing a stack for a new product or improving an existing one?",
      ],
      [
        "Frontend, backend, mobile ya AI stack details chahiye?",
        "In technologies se bane projects ke examples dekhne hain?",
        "Naya product bana rahe ho ya existing improve kar rahe ho?",
      ],
      [
        "Frontend, backend, mobile या AI stack details चाहिए?",
        "इन technologies से बने projects के examples देखने हैं?",
        "नया product बना रहे हैं या existing improve कर रहे हैं?",
      ],
    );
  }

  if (normalized.includes("project") || normalized.includes("work")) {
    return localizeSuggestions(
      language,
      [
        "Would you like a web, app, or AI project example?",
        "Do you want to see the business problem and outcome for a project?",
        "Are you looking for something similar to build?",
      ],
      [
        "Web, app ya AI project example dekhna hai?",
        "Project ka business problem aur outcome dekhna hai?",
        "Aap kuchh similar build karwana chahte ho?",
      ],
      [
        "Web, app या AI project example देखना है?",
        "Project का business problem और outcome देखना है?",
        "आप कुछ similar build करवाना चाहते हैं?",
      ],
    );
  }

  return localizeSuggestions(
    language,
    [
      "What kind of project are you planning?",
      "Would you like to explore services, projects, or tech stack first?",
      "Do you already have a goal, budget, or timeline in mind?",
    ],
    [
      "Aap kis type ka project plan kar rahe ho?",
      "Pehle services, projects ya tech stack dekhna chahoge?",
      "Goal, budget ya timeline kuchh mind me hai?",
    ],
    [
      "आप किस type का project plan कर रहे हैं?",
      "पहले services, projects या tech stack देखना चाहेंगे?",
      "Goal, budget या timeline कुछ mind में है?",
    ],
  );
}

export function getAssistantResponseMeta(userMessage: string): AssistantResponseMeta {
  const sources = isProjectIntent(userMessage)
    ? getRelevantProjects(userMessage).map((project) => ({
        title: project.title,
        category: project.category,
        summary: project.solution,
        stack: project.stack.slice(0, 4),
      }))
    : [];

  return {
    sources,
    suggestions: getSuggestionSet(userMessage),
  };
}

export function getDeterministicAssistantReply(
  userMessage: string,
): DeterministicAssistantReply | null {
  if (isPricingIntent(userMessage)) {
    return buildPricingReply(userMessage);
  }

  return null;
}

function formatRelevantServices(query: string) {
  const matches = getRelevantServices(query);

  if (matches.length === 0) {
    return services
      .slice(0, 4)
      .map((service) => `- ${service.name}: ${service.businessValue}`)
      .join("\n");
  }

  return matches
    .map((service) => `- ${service.name}: ${service.businessValue}`)
    .join("\n");
}

export function buildAssistantSystemPrompt(userMessage: string) {
  const language = detectResponseLanguage(userMessage);

  return `You are a professional AI assistant for ${developerProfile.name}, a freelance developer portfolio website.

Role:
- Act like a smart, business-oriented assistant.
- Help visitors understand services, skills, project fit, and next steps.
- Behave like a consultant, not just a chatbot.

Communication style:
- Clear, concise, confident, and friendly.
- Avoid long walls of text.
- Use short readable sections or bullets when useful.
- Explain technical things simply for non-technical users.
- Sound human and professional.
- Mirror the user's language style exactly as much as possible.
- If the user writes in English, reply in English.
- If the user writes in Hindi using English letters, reply in the same Hinglish or WhatsApp style using English letters only.
- If the user writes in Hindi script, reply in Hindi.
- Keep numbers in normal digits like 2000, 7000, 12000.

Current language mode for this reply: ${language}

Conversion behavior:
- Ask smart follow-up questions when needed.
- Recommend the most relevant solution based on the visitor's goal.
- Focus on business outcomes like speed, performance, UX, conversions, clarity, scalability, and delivery efficiency.
- For simple pricing questions, answer briefly and directly using the available pricing ranges. Do not give long explanations unless the user asks for more detail.
- Keep pricing conservative. Do not jump to large estimates. If the scope is unclear or custom, stay close to the listed pricing ranges and prefer asking to discuss exact scope directly instead of giving a high quote.
- Avoid quoting more than about Rs 20,000 for a single custom item unless the exact pricing context clearly requires that total.
- Encourage hiring gently, never push aggressively.
- When the user shows serious intent around pricing, hiring, scope, or timeline, say you would love to help and ask for project details.
- Then, only when appropriate, ask if they would like to share their name and email so the developer can reach out.

Trust and boundaries:
- Never invent fake experience or fake project outcomes beyond the provided portfolio context.
- If something is not available in the context, say: "I don't have that detail, but I can connect you directly with the developer."
- Do not pressure or manipulate.

Portfolio context:
Developer: ${developerProfile.title}
Tagline: ${developerProfile.tagline}
Location: ${developerProfile.location}
Positioning: ${developerProfile.positioning}

Services:
${services.map((service) => `- ${service.name}: ${service.businessValue}`).join("\n")}

Skills:
- Frontend: ${skillGroups.frontend.join(", ")}
- Mobile: ${skillGroups.mobile.join(", ")}
- Backend: ${skillGroups.backend.join(", ")}
- AI Tools: ${skillGroups.ai.join(", ")}
- Design & Delivery: ${skillGroups.design.join(", ")}

Relevant services for this conversation:
${formatRelevantServices(userMessage)}

Relevant projects for this conversation:
${formatRelevantProjects(userMessage)}

Contact:
- WhatsApp: ${contactDetails.whatsapp}
- Email: ${contactDetails.email}

Pricing ranges:
- Basic Website: ${pricing.basicWebsite}
- Business Website: ${pricing.businessWebsite}
- Mobile App: ${pricing.mobileApp}
- AI Automation: ${pricing.aiAutomation}

When relevant, ask consultative questions like:
- What kind of project are you planning?
- Do you already have a design or do you need help with that too?
- What's your timeline?

Always stay grounded in the provided portfolio context.`;
}
