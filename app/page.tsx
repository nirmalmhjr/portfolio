import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BeforeCode } from "@/components/before-code";
import { ContactCard } from "@/components/contact-card";
import { Section } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import {
  BeyondCode,
  SkillsGrid,
  StrengthsGrid,
  TestimonialsGrid,
} from "@/components/profile-sections";
import { AllProjectsCta, WorkGrid } from "@/components/project-showcase";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/posts";
import { homeWorkProjects, moreProjects } from "@/lib/projects";
import { experience, story } from "@/lib/resume";
import { testimonials } from "@/lib/testimonials";

export default function HomePage() {
  const latestPosts = getAllPosts()
    .filter((p) => !p.frontmatter.draft)
    .slice(0, 3);

  return (
    <main>
      <Hero />

      <Section id="projects">
        <SectionHeading
          watermark="Work"
          eyebrow="Projects"
          title="Work I've built"
          description="A few client projects from my jobs. Each card says exactly which part I built."
        />
        <WorkGrid projects={homeWorkProjects}>
          <AllProjectsCta
            count={moreProjects.count}
            previews={moreProjects.previews}
          />
        </WorkGrid>
      </Section>

      <Section id="strengths">
        <SectionHeading
          watermark="Strengths"
          eyebrow="What I bring"
          title="Why teams hire me"
          description="Each point is backed by real work on this page."
        />
        <StrengthsGrid />
      </Section>

      <Section id="experience">
        <SectionHeading
          watermark="Experience"
          eyebrow="Experience"
          title="Where I've worked"
        />
        <ExperienceTimeline items={experience} />
      </Section>

      <Section id="about">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              watermark="About"
              eyebrow="About me"
              title={
                <>
                  From ledgers to{" "}
                  <em className="text-gradient pr-[0.05em] font-serif font-normal tracking-[-0.01em]">
                    layouts
                  </em>
                  .
                </>
              }
            />
            <div className="mt-6 grid max-w-[58ch] gap-4 text-[17px] leading-[1.75] text-muted">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <BeyondCode />
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-1.5 text-sm text-ink hover:underline hover:underline-offset-[3px]"
            >
              More about me
              <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="lg:pt-2">
            <BeforeCode />
          </div>
        </div>
      </Section>

      <Section id="skills">
        <SectionHeading
          watermark="Stack"
          eyebrow="Technical skills"
          title="What I work with"
          description="Highlighted tools are what I use every day. Vue and Nuxt are from earlier roles."
        />
        <SkillsGrid />
      </Section>

      {testimonials.length > 0 ? (
        <Section id="testimonials">
          <SectionHeading
            watermark="Kind words"
            eyebrow="Testimonials"
            title="What people say"
          />
          <TestimonialsGrid />
        </Section>
      ) : null}

      {latestPosts.length > 0 ? (
        <Section id="blog">
          <SectionHeading
            watermark="Writing"
            eyebrow="Blog"
            title="Latest articles"
            description="What I learn while building, written down so it sticks."
            link={{ href: "/blog", label: "Read all articles" }}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="contact">
        <ContactCard />
      </Section>
    </main>
  );
}
