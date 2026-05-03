"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/projects";

const filters: Array<"All" | ProjectCategory> = ["All", "Web", "App", "AI"];

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`filter-chip ${activeFilter === filter ? "filter-chip-active" : ""}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setSelectedProject(project)}
            className="glass-panel group overflow-hidden rounded-[2rem] text-left transition duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[#08111f]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
                  {project.category}
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                  {project.year}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#02040d] to-transparent p-4">
                <span className="text-xs uppercase tracking-[0.22em] text-cyan-200/90">
                  Click to view details
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-medium text-white">{project.title}</h3>
              <p className="mt-2 text-sm text-cyan-200">{project.client}</p>
              <p className="mt-3 text-sm leading-7 text-white/66">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedProject ? (
        <div
          className="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelectedProject(null)}
        >
          <div className="project-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="section-eyebrow">{selectedProject.category} Project</span>
                <h3
                  id="project-modal-title"
                  className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cyan-200/90">
                  {selectedProject.client}
                </p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
                  {selectedProject.fullDescription}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
                className="project-close-button"
              >
                ×
              </button>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-white/10">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 65vw"
                    className="object-cover"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedProject.screenshots.map((shot) => (
                    <div
                      key={shot.title}
                      className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/4"
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
                      <div className="px-4 py-3 text-sm text-white/72">{shot.title}</div>
                    </div>
                  ))}
                </div>

                <div className="project-detail-card">
                  <h4 className="project-detail-title">Full Project Description</h4>
                  <div className="mt-4 space-y-4">
                    {selectedProject.caseStudy.map((paragraph) => (
                      <p key={paragraph} className="project-detail-copy mt-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="project-detail-card">
                    <h4 className="project-detail-title">Challenge</h4>
                    <p className="project-detail-copy">{selectedProject.challenge}</p>
                  </div>
                  <div className="project-detail-card">
                    <h4 className="project-detail-title">Solution</h4>
                    <p className="project-detail-copy">{selectedProject.solution}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="project-detail-card">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/45">Project Summary</p>
                  <p className="mt-3 text-lg font-medium text-white">{selectedProject.tagline}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">Timeline</p>
                      <p className="mt-2 text-white">{selectedProject.timeline}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">Role</p>
                      <p className="mt-2 text-white">{selectedProject.role}</p>
                    </div>
                  </div>
                </div>

                <div className="project-detail-card">
                  <h4 className="project-detail-title">Tech Stack</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.stack.map((item) => (
                      <span key={item} className="skill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-detail-card">
                  <h4 className="project-detail-title">Deliverables</h4>
                  <div className="mt-4 space-y-3">
                    {selectedProject.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/75">
                        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-detail-card">
                  <h4 className="project-detail-title">Project Outcome</h4>
                  <div className="mt-4 space-y-3">
                    {selectedProject.outcome.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white/72">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-detail-card">
                  <h4 className="project-detail-title">Project Links</h4>
                  <div className="mt-4 flex flex-col gap-3">
                    {selectedProject.links.map((link) =>
                      link.external ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="button-primary justify-center"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link key={link.label} href={link.href} className="button-secondary justify-center">
                          {link.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
