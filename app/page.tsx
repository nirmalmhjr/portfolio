import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";
import { featuredProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { experience } from "@/lib/resume";

export default function HomePage() {
  const latestPosts = getAllPosts()
    .filter((p) => !p.frontmatter.draft)
    .slice(0, 3);

  return (
    <Container as="main">
      <Hero />

      <Marquee />

      <section className="py-20 sm:py-28">
        <SectionHeading
          index="01"
          title="Selected Work"
          link={{ href: "/projects", label: "All projects" }}
        />
        <div>
          {featuredProjects.map((project, i) => (
            <Reveal key={project.title}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <SectionHeading index="02" title="Experience" />
        <div>
          {experience.map((job) => (
            <Reveal key={`${job.company}-${job.start}`}>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-border py-8 sm:grid-cols-[10rem_1fr] sm:gap-x-8 sm:py-10">
                <span className="label pt-1">
                  {job.start} — {job.end}
                </span>
                <div>
                  <h3 className="display text-[clamp(1.5rem,3vw,2.25rem)]">
                    {job.role}
                  </h3>
                  <p className="text-muted mt-1 font-mono text-xs uppercase tracking-wider">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-muted mt-4 max-w-xl text-sm leading-relaxed">
                    {job.summary}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            href="/about"
            className="text-muted group mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition-colors hover:text-foreground"
          >
            Full background
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      <section className="py-20 sm:py-28">
        <SectionHeading
          index="03"
          title="Writing"
          link={{ href: "/blog", label: "All posts" }}
        />
        {latestPosts.length > 0 ? (
          <div className="border-t border-border">
            {latestPosts.map((post) => (
              <Reveal key={post.slug}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">No posts yet — check back soon.</p>
        )}
      </section>
    </Container>
  );
}
