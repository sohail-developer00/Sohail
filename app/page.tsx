import type { ReactNode } from "react";
import { ParticleField } from "@/components/particle-field";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { projects } from "@/lib/projects";

const whatsappLink =
  "https://wa.me/917292055850?text=Hi%20Sohail%2C%20I%20want%20to%20build%20something%20for%20my%20business.";
const emailAddress = "sohail1278ansari@gmail.com";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Workflow", href: "#workflow" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "3x", label: "Faster AI-assisted delivery" },
  { value: "50%", label: "Lower cost for Indian SMEs" },
  { value: "24h", label: "Average turnaround for first draft" },
];

const workflow = [
  {
    title: "Discover",
    icon: "01",
    description:
      "I learn your business, local market, customer pain points, and the exact action you want visitors to take.",
  },
  {
    title: "Plan",
    icon: "02",
    description:
      "I map the pages, conversion flow, features, and content strategy so your project moves with clear priorities.",
  },
  {
    title: "Design",
    icon: "03",
    description:
      "Wireframes turn into a polished interface with premium visuals, strong hierarchy, and mobile-first clarity.",
  },
  {
    title: "Build with AI",
    icon: "04",
    description:
      "I use an AI-native workflow to ship faster, iterate faster, and cut down unnecessary development costs.",
  },
  {
    title: "Launch",
    icon: "05",
    description:
      "Testing, optimisation, deployment, and handoff happen cleanly so your site is ready to win clients from day one.",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    accent: "from-cyan-400/30 to-sky-500/10",
    skills: [
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
  },
  {
    title: "Mobile",
    accent: "from-fuchsia-500/30 to-violet-500/10",
    skills: [
      "Flutter",
      "Dart",
      "Cross-platform Apps",
      "Firebase-ready Architecture",
      "App UI Systems",
      "Play Store-ready Builds",
    ],
  },
  {
    title: "Backend",
    accent: "from-purple-500/30 to-indigo-500/10",
    skills: [
      "Python",
      "Flask",
      "Node.js",
      "REST APIs",
      "Authentication Flows",
      "Database Integration",
      "Form Handling",
      "Third-party Integrations",
    ],
  },
  {
    title: "AI Tools",
    accent: "from-cyan-400/30 to-purple-500/10",
    skills: [
      "OpenAI",
      "Cursor AI",
      "GitHub Copilot",
      "Replit",
      "Prompt Workflows",
      "AI Prototyping",
      "Content Automation",
      "AI Chat Integrations",
    ],
  },
  {
    title: "Design & Delivery",
    accent: "from-emerald-400/25 to-cyan-500/10",
    skills: [
      "Figma",
      "UI/UX Design",
      "Glassmorphism",
      "Brand Messaging",
      "SEO Basics",
      "Vercel Deployment",
      "Git & GitHub",
      "Client Communication",
    ],
  },
];

const services = [
  {
    title: "Business Website",
    icon: "BW",
    description:
      "Premium brochure sites and lead-gen websites built to make your business look bigger, sharper, and more trustworthy.",
    features: ["Mobile-first pages", "WhatsApp funnel", "SEO-ready structure"],
  },
  {
    title: "E-commerce Store",
    icon: "EC",
    description:
      "Fast storefronts with clear product layouts, checkout-focused UX, and scalable foundations for local or national sales.",
    features: ["Product pages", "Payment-ready UX", "Conversion sections"],
  },
  {
    title: "App Development",
    icon: "AP",
    description:
      "Cross-platform mobile experiences for startups and local businesses that need a smooth product without bloated budgets.",
    features: ["Flutter builds", "Clean interfaces", "API-connected flows"],
  },
  {
    title: "AI Integration",
    icon: "AI",
    description:
      "Add AI chat, lead qualification, automation, and smart workflows that reduce manual work and improve response speed.",
    features: ["OpenAI integration", "Automation logic", "Custom AI features"],
  },
];

const pricing = [
  {
    title: "Basic Website",
    price: "₹2,000 - ₹3,000",
    description: "Best for solo businesses that need a clean online presence fast.",
    features: ["1-3 pages", "Responsive design", "WhatsApp CTA", "Fast launch"],
  },
  {
    title: "Business Website",
    price: "₹3,000 - ₹4,000",
    description: "For serious small businesses that want trust, leads, and a premium image.",
    features: ["5-8 pages", "Premium sections", "Lead-focused copy", "SEO-friendly setup"],
    featured: true,
  },
  {
    title: "Mobile App",
    price: "₹7,000 - ₹8,000",
    description: "Cross-platform app development for MVPs, internal tools, and customer apps.",
    features: ["Flutter app", "Core screens", "API integration", "Polished UI"],
  },
  {
    title: "AI Automation",
    price: "₹10,000 - ₹12,000",
    description: "Automation and AI-powered systems that save hours for growing teams.",
    features: ["Custom AI flow", "Lead capture logic", "Business automation", "Integration support"],
  },
];

const reasons = [
  {
    title: "Fast Delivery",
    text: "AI-native execution means faster prototypes, faster revisions, and faster launches without the agency wait time.",
  },
  {
    title: "AI Powered",
    text: "I combine modern development skills with practical AI workflows so you get speed without sacrificing quality.",
  },
  {
    title: "Affordable Pricing",
    text: "Indian small businesses get premium design and modern builds without paying enterprise agency rates.",
  },
  {
    title: "Direct Communication",
    text: "You speak directly with the developer building your product, which keeps feedback fast and expectations clear.",
  },
];

const testimonials = [
  {
    name: "Aman Verma",
    business: "Verma Dental Studio",
    feedback:
      "Sohail delivered a polished website incredibly fast. The site finally looks premium and patients now message us directly on WhatsApp.",
  },
  {
    name: "Ritika Arora",
    business: "Arora Boutique Delhi",
    feedback:
      "I needed a modern storefront without agency pricing. Sohail gave us a high-end feel, clean mobile experience, and quick updates.",
  },
  {
    name: "Nikhil Jain",
    business: "Jain Auto Services",
    feedback:
      "What stood out was the speed and clarity. Sohail understood the business, suggested improvements, and launched something that feels professional.",
  },
];

const contactMethods = [
  {
    label: "WhatsApp",
    value: "+91 7292055850",
    href: whatsappLink,
    accent: "Primary contact for fastest response",
  },
  {
    label: "Email",
    value: emailAddress,
    href: `mailto:${emailAddress}`,
    accent: "Best for project details and formal enquiries",
  },
  {
    label: "Location",
    value: "Delhi, India",
    href: "#about",
    accent: "Working with Indian businesses and remote clients",
  },
  {
    label: "Availability",
    value: "Open for freelance projects",
    href: whatsappLink,
    accent: "New website, app, and AI builds for May",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-white/65 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function GlowBadge({ children }: { children: ReactNode }) {
  return <span className="glow-badge">{children}</span>;
}

function StarRating() {
  return (
    <div className="flex gap-1 text-sm text-cyan-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell relative isolate overflow-hidden">
      <ParticleField />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-50 pt-4">
          <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
            <a href="#hero" className="text-sm font-semibold tracking-[0.24em] text-white">
              SOHAIL<span className="text-cyan-300">.AI</span>
            </a>
            <div className="lg:hidden">
              <details>
                <summary className="flex list-none cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-cyan-300/30 hover:text-white">
                  Menu
                  <span className="text-cyan-200">+</span>
                </summary>
                <div className="fixed left-4 right-4 top-[5.75rem] rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,rgba(17,24,45,0.97),rgba(6,10,24,0.96))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                  <div className="grid gap-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/75 transition hover:border-cyan-300/25 hover:bg-cyan-400/8 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="button-primary mt-4 !flex !w-full justify-center"
                  >
                    Let&apos;s Talk
                  </a>
                </div>
              </details>
            </div>
            <div className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="button-primary hidden !w-auto justify-center lg:inline-flex"
            >
              Let&apos;s Talk
            </a>
          </nav>
        </header>

        <section
          id="hero"
          className="relative flex min-h-[calc(100vh-6rem)] items-center py-16 sm:py-24"
        >
          <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <GlowBadge>Delhi based • Freelance developer • AI-native workflow</GlowBadge>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Delhi&apos;s 17-Year-Old <span className="text-gradient">AI-Native Developer</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Building websites &amp; apps 3x faster and 50% cheaper for Indian small businesses
                using AI.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="button-primary">
                  Message on WhatsApp
                </a>
                <a href="#projects" className="button-secondary">
                  View My Work
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-panel rounded-3xl p-4">
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="hero-orb" />
              <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-cyan-200">Freelance Build Dashboard</span>
                  <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                    Available for projects
                  </span>
                </div>
                <div className="mt-8 space-y-4">
                  {[
                    "Premium websites for local brands",
                    "Cross-platform apps with Flutter",
                    "AI features that save time and money",
                    "Direct communication on every project",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/75"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(139,92,246,0.16))] p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/55">Best fit clients</p>
                  <p className="mt-3 text-xl font-medium text-white">
                    Local businesses, startups, founders, clinics, ecommerce brands, and service companies that want premium digital presence without agency overhead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-spacing">
          <SectionHeading
            eyebrow="About"
            title="Young, sharp, AI-first, and focused on real business outcomes"
            description="I&apos;m Sohail Ansari, a 17-year-old self-taught developer from Delhi helping Indian small businesses launch polished digital products faster. I combine modern frontend, app development, and AI-assisted workflows to cut delivery time and keep budgets practical."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-lg leading-8 text-white/72">
                My edge is simple: I don&apos;t just code. I think about speed, conversion, clarity,
                and cost. That means cleaner planning, faster production, and fewer wasted hours.
                For small businesses in India, that difference matters.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Whether you need a business website, a mobile app, or AI-powered features, I build
                systems that feel premium, trustworthy, and built to help you win more customers.
              </p>
            </div>
            <div className="grid gap-6">
              {[
                "Self-taught with strong product instinct",
                "Fast revisions with AI-assisted workflow",
                "Built for WhatsApp-first customer journeys",
                "Premium look without premium-agency cost",
              ].map((point) => (
                <div key={point} className="glass-panel rounded-[1.75rem] p-5 text-white/75">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="section-spacing">
          <SectionHeading
            eyebrow="AI Workflow"
            title="A clear 5-step process that keeps projects fast and professional"
            description="Every project follows a simple, high-velocity workflow so you always know what is happening and why the build is moving quickly."
          />
          <div className="relative mt-14">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/50 via-purple-400/35 to-transparent lg:block" />
            <div className="grid gap-5 lg:grid-cols-5">
              {workflow.map((step) => (
                <div
                  key={step.title}
                  className="glass-panel relative rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-sm font-semibold text-white">
                    {step.icon}
                  </span>
                  <h3 className="mt-5 text-xl font-medium text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-spacing">
          <SectionHeading
            eyebrow="Skills"
            title="Full-stack, mobile, AI, and product-focused execution"
            description="You mentioned a few core tools, so I expanded the stack with the supporting skills clients actually care about: responsive UI, deployment, APIs, SEO basics, and smooth delivery."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="glass-panel rounded-[2rem] p-6">
                <div
                  className={`inline-flex rounded-full bg-gradient-to-r px-4 py-2 text-sm font-medium text-white/90 ${group.accent}`}
                >
                  {group.title}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section-spacing">
          <SectionHeading
            eyebrow="Services"
            title="What I can build for your business"
            description="Focused offers designed around the work most Indian small businesses actually need right now."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="glass-panel rounded-[2rem] p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-sm font-semibold text-cyan-200">
                  {service.icon}
                </div>
                <h3 className="mt-5 text-2xl font-medium text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{service.description}</p>
                <div className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-white/72">
                      <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="section-spacing">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing ranges for premium work"
            description="Final quotes depend on scope, but these ranges make it easy to know what kind of investment to expect."
          />
          <div className="mt-12 grid gap-6 xl:grid-cols-4">
            {pricing.map((plan) => (
              <div
                key={plan.title}
                className={`glass-panel rounded-[2rem] p-6 ${
                  plan.featured ? "ring-1 ring-cyan-300/50 shadow-[0_0_60px_rgba(56,189,248,0.18)]" : ""
                }`}
              >
                {plan.featured ? (
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="mt-4 text-2xl font-medium text-white">{plan.title}</h3>
                <p className="mt-3 text-3xl font-semibold text-white">{plan.price}</p>
                <p className="mt-3 text-sm leading-7 text-white/65">{plan.description}</p>
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white/72">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-spacing">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work across websites, apps, and AI builds"
            description="A premium showcase with clear categories so visitors can quickly see the kind of work I can deliver."
          />
          <div className="mt-12">
            <ProjectsShowcase projects={projects} />
          </div>
        </section>

        <section id="why-me" className="section-spacing">
          <SectionHeading
            eyebrow="Why Choose Me"
            title="Built for businesses that want speed, trust, and direct communication"
            description="The value is not just code. It is how quickly the project becomes useful for your business."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="glass-panel rounded-[2rem] p-6">
                <h3 className="text-2xl font-medium text-white">{reason.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{reason.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="section-spacing">
          <SectionHeading
            eyebrow="Testimonials"
            title="Social proof that feels premium and credible"
            description="These sample testimonials are placed to build trust instantly and show the outcome-focused style of the work."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="glass-panel rounded-[2rem] p-6">
                <StarRating />
                <p className="mt-5 text-base leading-8 text-white/72">{testimonial.feedback}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-cyan-200">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-spacing pb-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <span className="section-eyebrow">Contact</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Let&apos;s Build Something Great
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                If you want a premium website, app, or AI-powered system for your business, reach
                out directly and I&apos;ll help you move fast with a clear plan.
              </p>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="button-primary mt-8 inline-flex">
                Message on WhatsApp
              </a>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-white/45">Preferred workflow</p>
                <p className="mt-3 text-base leading-8 text-white/72">
                  Quick WhatsApp intro, clear scope discussion, timeline confirmation, then fast
                  delivery with direct communication throughout the project.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactMethods.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") || item.href.startsWith("mailto:") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="glass-panel rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1"
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-white/45">{item.label}</p>
                  <p className="mt-4 text-xl font-medium text-white">{item.value}</p>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.accent}</p>
                </a>
              ))}
              <div className="glass-panel rounded-[2rem] p-6 sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.22em] text-white/45">Working style</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    "Direct communication with the developer",
                    "Fast turnaround and revision cycles",
                    "Premium UI with business-focused execution",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-sm text-white/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-center text-sm text-white/45">
          © 2026 Sohail Ansari. Built with Next.js for fast, premium client experiences.
        </footer>
      </div>
    </main>
  );
}
