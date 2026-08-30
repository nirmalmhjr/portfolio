import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { Cta } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { featuredProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const latestPosts = getAllPosts()
    .filter((p) => !p.frontmatter.draft)
    .slice(0, 4);

  return (
    <Container as="main">
      <Hero />

      <Reveal className="py-10">
        <SectionHeading
          title="Featured projects"
          link={{ href: "/projects", label: "View all" }}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Reveal>

      <Reveal className="py-10">
        <SectionHeading
          title="Latest posts"
          link={{ href: "/blog", label: "View all" }}
        />
        {latestPosts.length > 0 ? (
          <div className="flex flex-col">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">No posts yet — check back soon.</p>
        )}
      </Reveal>

      <Reveal className="py-10">
        <Cta />
      </Reveal>
    </Container>
  );
}
