import Link from "next/link";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { featuredProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const latestPosts = getAllPosts()
    .filter((p) => !p.frontmatter.draft)
    .slice(0, 3);

  return (
    <Container as="main">
      <Hero />

      <section className="py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Featured projects
          </h2>
          <Link href="/projects" className="text-muted text-sm hover:underline">
            All projects →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Latest writing
          </h2>
          <Link href="/blog" className="text-muted text-sm hover:underline">
            All posts →
          </Link>
        </div>
        <div className="mt-6">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-muted text-sm">
              No posts yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </Container>
  );
}
