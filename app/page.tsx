import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
          description="A few client projects from my jobs. Each card says exactly which part I built."
          eyebrow="Projects"
          title="Work I've built"
          watermark="Work"
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
          description="Each point is backed by real work on this page."
          eyebrow="What I bring"
          title="Why teams hire me"
          watermark="Strengths"
        />
        <StrengthsGrid />
      </Section>

      <Section id="experience">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          watermark="Experience"
        />
        <ExperienceTimeline items={experience} />
      </Section>

      <Section id="about">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="About me"
              title={
                <>
                  From ledgers to{" "}
                  <em className="pr-[0.05em] font-normal font-serif text-gradient tracking-[-0.01em]">
                    layouts
                  </em>
                  .
                </>
              }
              watermark="About"
            />
            <div className="mt-6 grid max-w-[58ch] gap-4 text-[17px] text-muted leading-[1.75]">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <BeyondCode />
            <Link
              className="mt-7 inline-flex items-center gap-1.5 text-ink text-sm hover:underline hover:underline-offset-[3px]"
              href="/about"
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
          description="Highlighted tools are what I use every day. Vue and Nuxt are from earlier roles."
          eyebrow="Technical skills"
          title="What I work with"
          watermark="Stack"
        />
        <SkillsGrid />
      </Section>

      {testimonials.length > 0 ? (
        <Section id="testimonials">
          <SectionHeading
            eyebrow="Testimonials"
            title="What people say"
            watermark="Kind words"
          />
          <TestimonialsGrid />
        </Section>
      ) : null}

      {latestPosts.length > 0 ? (
        <Section id="blog">
          <SectionHeading
            description="What I learn while building, written down so it sticks."
            eyebrow="Blog"
            link={{ href: "/blog", label: "Read all articles" }}
            title="Latest articles"
            watermark="Writing"
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
