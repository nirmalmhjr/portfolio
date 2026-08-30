import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { featuredProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { bio } from "@/lib/resume";

export default function HomePage() {
  const latestPosts = getAllPosts()
    .filter((p) => !p.frontmatter.draft)
    .slice(0, 3);

  return (
    <Container as="main">
      <Hero />

      <Marquee />

      <section className="py-20">
        <SectionHeading
          index="01"
          title="Selected work"
          link={{ href: "/projects", label: "All projects" }}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      <section className="py-20">
        <SectionHeading
          index="02"
          title="Writing"
          link={{ href: "/blog", label: "All posts" }}
        />
        {latestPosts.length > 0 ? (
          <div className="border-t border-border/70">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">No posts yet — check back soon.</p>
        )}
      </section>

      <section className="py-20">
        <SectionHeading index="03" title="About" />
        <div className="grid gap-8 sm:grid-cols-[1fr_1.4fr]">
          <p className="text-balance font-display text-2xl leading-snug">
            {bio[0]}
          </p>
          <div className="text-muted space-y-4 text-[15px] leading-7">
            {bio.slice(1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-foreground"
            >
              Read the full story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
