import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

type PreviewPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }
  return (
    <main className="site-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="section-eyebrow">{project.category} Preview</span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
                {project.fullDescription}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Link href="/" className="button-secondary">
                Back to Portfolio
              </Link>
              {project.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button-primary"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className="button-primary">
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-white/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div id="case-study" className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-medium text-white">Full Case Study</h2>
              <div className="mt-4 space-y-4">
                {project.caseStudy.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-8 text-white/68">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-medium text-white">Tech Stack</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {project.stack.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-cyan-200">Concept year: {project.year}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {project.screenshots.map((shot) => (
              <div
                key={shot.title}
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5"
              >
                <div className="relative mx-auto aspect-[9/16] max-w-[19rem] bg-[#08111f]">
                  <Image
                    src={shot.image}
                    alt={shot.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 19rem"
                    className="object-contain p-3"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">Screenshot</p>
                  <p className="mt-2 text-base text-white/78">{shot.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
