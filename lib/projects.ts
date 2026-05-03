export type ProjectCategory = "Web" | "App" | "AI";

export type ProjectScreenshot = {
  title: string;
  image: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  description: string;
  fullDescription: string;
  caseStudy: string[];
  challenge: string;
  solution: string;
  outcome: string[];
  deliverables: string[];
  timeline: string;
  role: string;
  stack: string[];
  category: ProjectCategory;
  image: string;
  screenshots: ProjectScreenshot[];
  links: ProjectLink[];
  year: string;
};

export const projects: Project[] = [
  {
    slug: "Ai Chatbot for personal portfolio",
    title: "My Personal Portfolio AI Chatbot",
    client: "Personal Project",
    tagline: "An AI chatbot integrated into my portfolio to provide interactive project insights and personalized user engagement.",
    description:
      "A custom AI chatbot built into my personal portfolio website to offer visitors an interactive way to explore my projects, skills, and experience through natural language conversation.",
    fullDescription:
      "This AI chatbot was designed to enhance user engagement on my portfolio by allowing visitors to ask questions about my projects, experience, and skills in a conversational manner. The chatbot uses natural language processing to understand user queries and provide relevant information, making the portfolio more interactive and personalized. It serves as a virtual assistant that can guide users through my work, answer specific questions about project details, and even provide insights into my design and development process.",
    caseStudy: [
      "The main goal of this project was to create a more engaging and personalized experience for visitors to my portfolio. Instead of relying solely on static content, I wanted to leverage AI to make the interaction more dynamic and user-friendly. The chatbot was designed to understand a wide range of queries, from general questions about my background to specific inquiries about individual projects.",
      "The chatbot was integrated seamlessly into the portfolio, providing a natural way for users to interact with the content. It was trained on a comprehensive dataset of my projects, skills, and experience to ensure accurate and helpful responses.",
      "The result is a unique portfolio experience that not only showcases my work but also allows visitors to engage with it in a more meaningful way. The chatbot has received positive feedback for its ability to provide detailed information and enhance the overall user experience on the site.",
    ],
    challenge:
      "Many portfolios are static and do not offer an engaging way for visitors to explore the content or ask questions about the projects and experience.",
    solution:
      "I developed a custom AI chatbot that uses natural language processing to understand user queries and provide relevant information about my projects, skills, and experience in an interactive way.",
    outcome: [
      "Increased user engagement through interactive conversation",
      "Personalized user experience with AI-driven insights",
      "Enhanced portfolio presentation with dynamic content delivery",
    ],
    deliverables: [
      "Custom AI chatbot integrated into the portfolio",
      "Comprehensive training dataset based on my projects and experience",
      "Natural language processing capabilities for understanding user queries",
      "Seamless integration with the portfolio design and user interface",
    ],
    timeline: "1 day",
    role: "AI Development, Frontend Integration, UX Design",
    stack: ["OpenAI", "Next.js", "React", "Natural Language Processing"],
    category: "AI",
    image: "/projects/thumb.png",
    screenshots: [
      { title: "Homepage Hero", image: "/projects/sc1.jpg" },
      { title: "Conversion Layout", image: "/projects/sc2.jpg" },
      { title: "Services Showcase", image: "/projects/sc3.jpg" },
      { title: "Mobile-Focused Sections", image: "/projects/sc4.jpg" },
    ],
    links: [
      { label: "Open Live Website", href: "https://sohailai.vercel.app/", external: true },
    ],
    year: "2026",
  },
  {
    slug: "bazaarkart",
    title: "BazaarKart",
    client: "D2C Commerce Concept",
    tagline: "A premium ecommerce storefront concept for modern Indian brands.",
    description:
      "A bold ecommerce storefront concept built to help local Indian brands present products with a premium edge.",
    fullDescription:
      "BazaarKart is an ecommerce concept focused on helping growing Indian brands look more polished online. The experience is built around premium product storytelling, better catalogue structure, stronger visual trust, and a smoother browsing path that keeps the interface clean while still feeling high-energy and conversion focused.",
    caseStudy: [
      "The core idea behind BazaarKart was to move away from the common low-trust ecommerce feeling that many small and mid-size brands struggle with. A lot of stores lose sales not because the products are weak, but because the presentation feels generic, crowded, or inconsistent. This concept was built to solve that exact problem.",
      "I designed the storefront with a stronger premium rhythm. The page uses more intentional product spacing, clearer category hierarchy, and higher-contrast content blocks so users can understand the store quickly. The visual approach supports both impulse purchases and more considered browsing, which is important for lifestyle and D2C brands.",
      "The final structure supports growth as well. Instead of designing only for one hero banner and a few products, the system is flexible enough to expand into offers, collections, featured categories, testimonials, and conversion-focused calls to action. That makes the concept feel like a serious business asset rather than just a pretty landing page.",
    ],
    challenge:
      "Many local brands sell good products but lose trust online because their storefront feels generic or cluttered, especially on mobile.",
    solution:
      "I created a sleek storefront concept with stronger hierarchy, editorial-style sections, cleaner product blocks, and a more premium user journey that supports conversions.",
    outcome: [
      "More premium visual identity for product browsing",
      "Cleaner layout for better product discovery",
      "High-end ecommerce presentation without unnecessary complexity",
    ],
    deliverables: [
      "Storefront UI concept",
      "Product showcase sections",
      "Visual merchandising layout",
      "Mobile ecommerce optimisation",
    ],
    timeline: "8 days",
    role: "Product UI, Frontend Design, UX Direction",
    stack: ["React", "TypeScript", "UI Design", "Payments UX"],
    category: "Web",
    image: "/projects/bazaarkart.svg",
    screenshots: [
      { title: "Storefront Overview", image: "/projects/bazaarkart.svg" },
      { title: "Product Experience", image: "/projects/details/web-detail.svg" },
      { title: "Collection Display", image: "/projects/details/web-detail-2.svg" },
      { title: "Checkout Focus Blocks", image: "/projects/details/web-detail-3.svg" },
    ],
    links: [
      { label: "Open Live Website", href: "https://www.google.com/search?q=bazaarkart+store", external: true },
    ],
    year: "2026",
  },
  {
    slug: "delhifix-app",
    title: "DelhiFix App",
    client: "Home Service Startup Concept",
    tagline: "A cross-platform service booking app designed for speed and trust.",
    description:
      "A service-booking mobile app idea for repair businesses with streamlined onboarding and clear service flows.",
    fullDescription:
      "DelhiFix is a mobile app concept for service and repair businesses that want a modern booking experience. The product is shaped around fast task completion, clean onboarding, trust-building service presentation, and a simple mobile journey that takes users from problem selection to booking confirmation without friction.",
    caseStudy: [
      "This app was designed for a very practical user flow: someone has a problem, needs help quickly, and does not want to struggle through a confusing interface. That shaped every screen. The service categories are kept clean, the navigation feels direct, and the booking path avoids unnecessary noise so the product feels useful immediately.",
      "For service-based businesses, the biggest trust issue is whether the platform feels dependable. I approached the UI with that in mind. Instead of adding decorative clutter, the interface focuses on clarity, progress, service information, and clear action states. The result is a concept that feels modern but still grounded in real customer behavior.",
      "The app direction is also strong from an MVP perspective. It can expand into provider tracking, service history, offers, wallet flows, and support without needing a redesign from scratch. That makes it a practical cross-platform concept for businesses that want to launch fast and iterate later.",
    ],
    challenge:
      "Local repair and home service brands often depend on chaotic manual booking systems that feel slow and unprofessional to customers.",
    solution:
      "I designed a smooth Flutter-ready app experience with clear service discovery, booking flow, and mobile-first interaction patterns that feel modern and reliable.",
    outcome: [
      "Clearer service booking flow on mobile",
      "Professional app experience for local service businesses",
      "Cross-platform build direction ready for MVP development",
    ],
    deliverables: [
      "App screen system",
      "Booking flow UI",
      "Mobile navigation structure",
      "Flutter-ready design direction",
    ],
    timeline: "10 days",
    role: "App UI, Product Flow, Flutter Planning",
    stack: ["Flutter", "Dart", "Mobile UI", "API Ready"],
    category: "App",
    image: "/projects/delhifix.svg",
    screenshots: [
      { title: "App Overview", image: "/projects/delhifix.svg" },
      { title: "Mobile UI Flow", image: "/projects/details/app-detail.svg" },
      { title: "Booking Journey", image: "/projects/details/app-detail-2.svg" },
      { title: "Service Detail Screens", image: "/projects/details/app-detail-3.svg" },
    ],
    links: [
      {
        label: "Open App Link",
        href: "https://play.google.com/store/apps/details?id=com.urbanclap.urbanclap",
        external: true,
      },
    ],
    year: "2026",
  },
  {
    slug: "leadpilot-ai",
    title: "LeadPilot AI",
    client: "Lead Automation Concept",
    tagline: "An AI-assisted lead capture system built for faster qualification.",
    description:
      "An AI-assisted lead capture experience that qualifies visitors and routes them into a WhatsApp-first sales flow.",
    fullDescription:
      "LeadPilot AI is an AI-native lead capture concept created for businesses that want to respond faster and qualify users automatically before manual sales follow-up. The experience combines conversational UX, prompt-led qualification, clean business logic, and a streamlined handoff into the final conversion flow.",
    caseStudy: [
      "The central problem this project solves is response delay. Many businesses lose warm leads because every enquiry depends on manual back-and-forth. LeadPilot AI was designed to reduce that delay by structuring the first interaction in a way that feels smart, clear, and genuinely useful rather than robotic or gimmicky.",
      "The interface focuses on trust and flow. Users should feel guided, not interrogated. That is why the system uses concise steps, helpful UI context, and controlled branching so the experience stays understandable. The aim is to collect meaningful lead data while keeping the interface smooth and conversion-friendly.",
      "This concept is especially valuable for small teams because it creates leverage. Instead of manually repeating the same qualification questions, the business gets a cleaner lead summary, faster routing, and a more professional experience for the user. It turns AI from a buzzword into a practical frontend business feature.",
    ],
    challenge:
      "Businesses lose leads when every enquiry needs manual sorting, delayed replies, or too many repetitive back-and-forth questions.",
    solution:
      "I designed an AI flow that guides users through quick qualification, captures intent, and hands the lead into a business-friendly sales or WhatsApp workflow.",
    outcome: [
      "Faster lead qualification with less manual effort",
      "Stronger WhatsApp conversion path",
      "Clear AI-assisted experience with practical business value",
    ],
    deliverables: [
      "AI conversation flow",
      "Lead capture UX",
      "Prompt architecture direction",
      "Automation-ready frontend screens",
    ],
    timeline: "1 week",
    role: "AI Product Design, Frontend Build, Prompt Workflow",
    stack: ["OpenAI", "Next.js", "Prompt Design", "Automation"],
    category: "AI",
    image: "/projects/leadpilot-ai.svg",
    screenshots: [
      { title: "AI Dashboard", image: "/projects/leadpilot-ai.svg" },
      { title: "Workflow Visual", image: "/projects/details/ai-detail.svg" },
      { title: "Lead Qualification Flow", image: "/projects/details/ai-detail-2.svg" },
      { title: "Response Logic Screens", image: "/projects/details/ai-detail-3.svg" },
    ],
    links: [
      { label: "Open Live Demo", href: "https://www.google.com/search?q=ai+lead+generation+demo", external: true },
    ],
    year: "2026",
  },
  {
    slug: "nexafit-dashboard",
    title: "NexaFit Dashboard",
    client: "Fitness Membership Platform",
    tagline: "A premium dashboard experience for members, plans, and engagement.",
    description:
      "A sleek member portal UI for a fitness business with subscriptions, class information, and community features.",
    fullDescription:
      "NexaFit Dashboard is a member-facing concept for a fitness business that needs a more premium digital layer around memberships, class access, and engagement. The interface was designed to feel athletic, polished, and highly readable so it supports routine use without becoming visually tiring.",
    caseStudy: [
      "The intention behind NexaFit Dashboard was to create a member area that feels like part of a premium fitness brand rather than a generic admin panel. That means stronger visual energy, clearer navigation, and more deliberate information grouping so people can quickly find plans, sessions, and account details.",
      "Fitness products often pack too much into one screen. Here, the structure was kept disciplined. Each block has a clear purpose, spacing is more controlled, and key actions are easier to spot. This helps the dashboard feel more motivating and easier to use, especially on tablets and smaller laptop screens.",
      "The concept is also scalable. It can easily support community modules, progress tracking, nutrition content, trainer interactions, or upsell offers later. So even though the current UI looks clean and focused, it was designed with future product growth in mind.",
    ],
    challenge:
      "Fitness brands need digital products that feel motivating and clear, but many dashboards become cluttered and hard to navigate on smaller screens.",
    solution:
      "I created a cleaner dashboard system with focused content blocks, simple navigation, and a more polished layout for subscriptions, classes, and member actions.",
    outcome: [
      "Sharper dashboard experience for members",
      "Cleaner content hierarchy for subscriptions and classes",
      "More premium visual system for a fitness brand",
    ],
    deliverables: [
      "Dashboard concept UI",
      "Membership section design",
      "Responsive account layout",
      "Design system styling",
    ],
    timeline: "6 days",
    role: "Dashboard UX, Frontend UI, Visual Direction",
    stack: ["Next.js", "Dashboard UI", "Design Systems", "Responsive"],
    category: "Web",
    image: "/projects/nexafit.svg",
    screenshots: [
      { title: "Dashboard Home", image: "/projects/nexafit.svg" },
      { title: "Member Interface", image: "/projects/details/web-detail.svg" },
      { title: "Subscription Panels", image: "/projects/details/web-detail-2.svg" },
      { title: "Fitness Content Blocks", image: "/projects/details/web-detail-3.svg" },
    ],
    links: [
      { label: "Open Live Website", href: "https://www.google.com/search?q=fitness+dashboard+website", external: true },
    ],
    year: "2025",
  },
  {
    slug: "stocksense-mobile",
    title: "StockSense Mobile",
    client: "Retail Inventory App Concept",
    tagline: "A simple inventory companion app for busy small business owners.",
    description:
      "An inventory companion app for small retailers who need stock visibility and simple daily management on the go.",
    fullDescription:
      "StockSense Mobile is a mobile-first inventory concept for retailers who want visibility into stock movement without using complicated desktop-heavy tools. The design focuses on clarity, fast access, inventory awareness, and practical day-to-day usability for people who are busy running a real business.",
    caseStudy: [
      "The product was designed around the reality of small retailers: they do not want a heavy enterprise dashboard on mobile, they want quick visibility and simple actions. That shaped the concept toward strong hierarchy, fast tap targets, and less visual noise so the app feels genuinely usable during a busy day.",
      "Instead of overwhelming the user with too much operational data, the interface highlights the information that matters first: what is in stock, what needs attention, and what should be updated next. This makes the product feel faster and more confident, especially for business owners who are not highly technical.",
      "From a build perspective, the concept is useful because it can start small and still feel complete. It works as an MVP for mobile inventory tracking, but it also has room to grow into supplier records, reorder flows, analytics, and barcode-based operations later.",
    ],
    challenge:
      "Retail owners often need quick stock checks and simple updates from their phone, but many systems are too bulky or hard to use during daily operations.",
    solution:
      "I designed a compact app experience with strong visual hierarchy, easy inventory actions, and a clean flow that works for practical day-to-day store use.",
    outcome: [
      "Simpler inventory access from mobile",
      "Cleaner UI for daily stock management",
      "MVP-ready app direction for local retail use cases",
    ],
    deliverables: [
      "Mobile inventory dashboard",
      "Stock tracking screens",
      "Retail action flow design",
      "Flutter-ready app concept",
    ],
    timeline: "9 days",
    role: "Mobile Product UI, App Planning, UX Simplification",
    stack: ["Flutter", "Dart", "Inventory Flow", "Mobile UX"],
    category: "App",
    image: "/projects/stocksense.svg",
    screenshots: [
      { title: "Inventory Overview", image: "/projects/stocksense.svg" },
      { title: "Retail App Flow", image: "/projects/details/app-detail.svg" },
      { title: "Stock Update Screens", image: "/projects/details/app-detail-2.svg" },
      { title: "Retail Summary Views", image: "/projects/details/app-detail-3.svg" },
    ],
    links: [
      {
        label: "Open App Link",
        href: "https://play.google.com/store/apps/details?id=com.shopify.arrive",
        external: true,
      },
    ],
    year: "2025",
  },
  {
    slug: "replymate-automation",
    title: "ReplyMate Automation",
    client: "Support Automation Concept",
    tagline: "An AI support workflow built to reduce repetitive response work.",
    description:
      "An AI support workflow that drafts responses, organises queries, and helps small teams reply faster with less effort.",
    fullDescription:
      "ReplyMate Automation is an AI-powered support concept for small businesses that want to speed up replies without sounding robotic. It is built around better response drafting, cleaner support organisation, reduced repetitive work, and a more professional handling flow for growing teams.",
    caseStudy: [
      "This concept was created for the common support bottleneck where small teams have too many incoming messages and not enough time to respond well. The UI needed to feel operational and useful, but also simple enough that teams could adopt it quickly without complex onboarding.",
      "The interface focuses on practical leverage. AI is used to support the team, not replace judgment. That means suggestions, sorting, and structure are designed to make human review faster. It keeps the workflow grounded in how real support teams work instead of turning it into a confusing experimental tool.",
      "As a product direction, ReplyMate can expand into templates, auto-tagging, escalations, analytics, and channel integration. Even in its current concept form, it already communicates a strong value proposition: respond faster, stay organised, and reduce repetitive support workload.",
    ],
    challenge:
      "Small teams often struggle with delayed replies because every message has to be manually reviewed, written, and sorted.",
    solution:
      "I designed an interface and automation concept that helps teams draft faster, keep context organised, and use AI where it actually saves time.",
    outcome: [
      "Faster support handling for smaller teams",
      "Better organised response workflow",
      "AI integration positioned around real operational value",
    ],
    deliverables: [
      "Automation workflow concept",
      "Support UI states",
      "AI-assisted response design",
      "Backend-ready flow planning",
    ],
    timeline: "1 week",
    role: "Automation UX, Frontend Concept, AI Flow Design",
    stack: ["Python", "Flask", "OpenAI", "Support Automation"],
    category: "AI",
    image: "/projects/replymate.svg",
    screenshots: [
      { title: "Support Workflow", image: "/projects/replymate.svg" },
      { title: "AI Response System", image: "/projects/details/ai-detail.svg" },
      { title: "Ticket Automation", image: "/projects/details/ai-detail-2.svg" },
      { title: "Support Insights", image: "/projects/details/ai-detail-3.svg" },
    ],
    links: [
      { label: "Open Live Demo", href: "https://www.google.com/search?q=ai+support+automation+demo", external: true },
    ],
    year: "2025",
  },
  {
    slug: "craftline-studio",
    title: "Craftline Studio",
    client: "Creative Services Brand",
    tagline: "An editorial-style portfolio site with stronger storytelling and polish.",
    description:
      "A creative services website concept with an editorial look, smooth storytelling, and premium section transitions.",
    fullDescription:
      "Craftline Studio is a creative portfolio concept made for brands that want a stronger visual identity online. The site leans into editorial rhythm, stronger section pacing, premium atmosphere, and a more expressive visual tone that helps the brand feel distinct instead of template-driven.",
    caseStudy: [
      "Craftline Studio was designed to solve a branding problem rather than only a layout problem. Many creative businesses already have good work, but their digital presentation does not match the quality of that work. This concept focuses on making the online experience feel more curated, intentional, and memorable.",
      "The site structure uses a storytelling rhythm where the visitor is led through identity, selected work, offer positioning, and proof in a more cinematic sequence. The aim is to create emotional weight without sacrificing clarity, so the portfolio feels premium but still easy to understand.",
      "From a frontend perspective, it also demonstrates how a more expressive website can stay fast and modern. The sections are bold, but the system remains responsive, structured, and scalable. That balance is what makes the experience feel professional rather than experimental.",
    ],
    challenge:
      "Creative businesses often need to feel distinct and premium online, but many templates make them look generic or repetitive.",
    solution:
      "I designed a more expressive visual system with refined spacing, stronger storytelling blocks, and premium transitions that help the brand feel intentional and modern.",
    outcome: [
      "More distinctive brand presentation",
      "Editorial-style layout with stronger visual rhythm",
      "Premium storytelling structure for creative services",
    ],
    deliverables: [
      "Creative portfolio UI",
      "Editorial landing sections",
      "Responsive storytelling layout",
      "Brand-forward visual system",
    ],
    timeline: "6 days",
    role: "Creative Direction, UI Design, Frontend Experience",
    stack: ["Next.js", "Figma", "Branding", "Performance"],
    category: "Web",
    image: "/projects/craftline.svg",
    screenshots: [
      { title: "Landing Experience", image: "/projects/craftline.svg" },
      { title: "Editorial Sections", image: "/projects/details/web-detail.svg" },
      { title: "Storytelling Layout", image: "/projects/details/web-detail-2.svg" },
      { title: "Brand Presentation", image: "/projects/details/web-detail-3.svg" },
    ],
    links: [
      { label: "Open Live Website", href: "https://www.google.com/search?q=creative+studio+portfolio+website", external: true },
    ],
    year: "2025",
  },
];
