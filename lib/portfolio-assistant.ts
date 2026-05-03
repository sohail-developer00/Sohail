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
  basicWebsite: "₹2,000 - ₹3,000",
  businessWebsite: "₹3,000 - ₹4,000",
  mobileApp: "₹7,000 - ₹8,000",
  aiAutomation: "₹10,000 - ₹12,000",
};

const pricingNumbers = {
  basicWebsite: { min: 2000, max: 3000 },
  businessWebsite: { min: 3000, max: 4000 },
  mobileApp: { min: 7000, max: 8000 },
  aiAutomation: { min: 10000, max: 12000 },
};

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
  ]);
}

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function buildPricingReply(query: string) {
  const normalized = normalise(query);
  const mentionsWebsite = containsAny(normalized, [
    "website",
    "site",
    "landing page",
    "business website",
    "web app",
  ]);
  const mentionsApp = containsAny(normalized, ["app", "mobile app", "application"]);
  const mentionsAi = containsAny(normalized, ["ai", "automation", "chatbot"]);

  if (mentionsWebsite && mentionsApp) {
    const min = pricingNumbers.basicWebsite.min + pricingNumbers.mobileApp.min;
    const max = pricingNumbers.businessWebsite.max + pricingNumbers.mobileApp.max;

    return {
      message: `For 1 website and 1 app together, a practical rough range would usually be around ${formatInr(min)} - ${formatInr(max)} depending on features, design quality, and timeline. If you want, Sohail can discuss the final scope, bundled pricing, or any discount on WhatsApp.`,
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

    return {
      message: `For a website plus AI automation, a rough combined range would usually be around ${formatInr(min)} - ${formatInr(max)} depending on the workflow and features needed. For exact scope or discount discussion, it’s best to connect with Sohail on WhatsApp.`,
      suggestions: [
        "I need a website with chatbot",
        "I need AI automation too",
        "Can we discuss exact scope on WhatsApp?",
      ],
    };
  }

  if (mentionsApp) {
    return {
      message: `For one mobile app, the usual range is around ${pricing.mobileApp}. Final pricing depends on screens, backend/API work, and app features. For exact scope or discount discussion, it’s best to connect with Sohail on WhatsApp.`,
      suggestions: [
        "I need a basic MVP app",
        "I need app design too",
        "Can we discuss app scope on WhatsApp?",
      ],
    };
  }

  if (mentionsAi) {
    return {
      message: `For AI automation or a custom AI feature, the usual range is around ${pricing.aiAutomation}. Final pricing depends on workflow complexity, integrations, and UI scope. For exact scope or discount discussion, it’s best to connect with Sohail on WhatsApp.`,
      suggestions: [
        "I need AI automation",
        "I need an AI chatbot",
        "Can we discuss AI scope on WhatsApp?",
      ],
    };
  }

  if (mentionsWebsite) {
    return {
      message: `A basic website usually starts around ${pricing.basicWebsite}. A more polished business website typically falls in the ${pricing.businessWebsite} range. For exact scope or discount discussion, it’s best to connect with Sohail on WhatsApp.`,
      suggestions: [
        "I need a basic website",
        "I need a business website",
        "Can we discuss scope on WhatsApp?",
      ],
    };
  }

  return {
    message: `Website projects usually start around ${pricing.basicWebsite}, business websites around ${pricing.businessWebsite}, mobile apps around ${pricing.mobileApp}, and AI automation around ${pricing.aiAutomation}. If you want, Sohail can discuss the exact scope and best package on WhatsApp.`,
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

  if (isPricingIntent(query)) {
    return [
      "Do you need a basic website or a business website?",
      "Do you already have design/content ready?",
      "Would you like to discuss discount or scope on WhatsApp?",
    ];
  }

  if (normalized.includes("hire") || normalized.includes("project")) {
    return [
      "What kind of project are you planning?",
      "Do you already have a design or need help with that too?",
      "What timeline are you working with?",
    ];
  }

  if (normalized.includes("tech") || normalized.includes("stack")) {
    return [
      "Do you want frontend, backend, mobile, or AI stack details?",
      "Would you like examples of projects built with these technologies?",
      "Are you choosing a stack for a new product or improving an existing one?",
    ];
  }

  if (normalized.includes("project") || normalized.includes("work")) {
    return [
      "Would you like a web, app, or AI project example?",
      "Do you want to see the business problem and outcome for a project?",
      "Are you looking for something similar to build?",
    ];
  }

  return [
    "What kind of project are you planning?",
    "Would you like to explore services, projects, or tech stack first?",
    "Do you already have a goal, budget, or timeline in mind?",
  ];
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

Conversion behavior:
- Ask smart follow-up questions when needed.
- Recommend the most relevant solution based on the visitor's goal.
- Focus on business outcomes like speed, performance, UX, conversions, clarity, scalability, and delivery efficiency.
- For simple pricing questions, answer briefly and directly using the available pricing ranges. Do not give long explanations unless the user asks for more detail.
- Encourage hiring gently, never push aggressively.
- When the user shows serious intent around pricing, hiring, scope, or timeline, say you would love to help and ask for project details.
- Then, only when appropriate, ask if they would like to share their name and email so the developer can reach out.

Trust and boundaries:
- Never invent fake experience or fake project outcomes beyond the provided portfolio context.
- If something is not available in the context, say: "I don’t have that detail, but I can connect you directly with the developer."
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
- What’s your timeline?

Always stay grounded in the provided portfolio context.`;
}
