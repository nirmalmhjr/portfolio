import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { HOME_SECTION_IDS, ROUTES } from "@/configs/routes";
import { PostCard } from "@/features/blog/components/PostCard";
import { getPublishedPosts } from "@/features/blog/utils/posts";
import { ContactCard } from "@/features/contact/components/ContactCard";
import { BeforeCode } from "@/features/profile/components/BeforeCode";
import { ExperienceTimeline } from "@/features/profile/components/ExperienceTimeline";
import { Hero } from "@/features/profile/components/Hero";
import {
  BeyondCode,
  SkillsGrid,
  StrengthsGrid,
  TestimonialsGrid,
} from "@/features/profile/components/ProfileSections";
import { EXPERIENCE, STORY } from "@/features/profile/constants/profile";
import { TESTIMONIALS } from "@/features/profile/constants/testimonials";
import {
  AllProjectsCta,
  WorkGrid,
} from "@/features/projects/components/ProjectShowcase";
import {
  HOME_WORK_PROJECTS,
  MORE_PROJECTS,
} from "@/features/projects/constants/projects";

/** How many recent posts the homepage shows. */
const LATEST_POSTS_COUNT = 3;

export default function HomePage() {
  const latestPosts = getPublishedPosts().slice(0, LATEST_POSTS_COUNT);

  return (
    <main>
      <Hero />

      <Section id={HOME_SECTION_IDS.projects}>
        <SectionHeading
          description="A few client projects from my jobs. Each card says exactly which part I built."
          eyebrow="Projects"
          title="Work I've built"
          watermark="Work"
        />
        <WorkGrid projects={HOME_WORK_PROJECTS}>
          <AllProjectsCta
            count={MORE_PROJECTS.count}
            previews={MORE_PROJECTS.previews}
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

      <Section id={HOME_SECTION_IDS.experience}>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          watermark="Experience"
        />
        <ExperienceTimeline items={EXPERIENCE} />
      </Section>

      <Section id={HOME_SECTION_IDS.about}>
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
              {STORY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <BeyondCode />
            <Link
              className="mt-7 inline-flex items-center gap-1.5 text-ink text-sm hover:underline hover:underline-offset-[3px]"
              href={ROUTES.about}
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

      <Section id={HOME_SECTION_IDS.skills}>
        <SectionHeading
          description="Highlighted tools are what I use every day. Vue and Nuxt are from earlier roles."
          eyebrow="Technical skills"
          title="What I work with"
          watermark="Stack"
        />
        <SkillsGrid />
      </Section>

      {TESTIMONIALS.length > 0 ? (
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
            link={{ href: ROUTES.blog, label: "Read all articles" }}
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
