import { Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BeforeCode } from "@/components/before-code";
import { buttonClass } from "@/components/button";
import { ContactCard } from "@/components/contact-card";
import { PageHeader, Section } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import {
  BeyondCode,
  EducationGrid,
  SkillsGrid,
} from "@/components/profile-sections";
import { SectionHeading } from "@/components/section-heading";
import { experience, story } from "@/lib/resume";
import { siteConfig } from "@/lib/site.config";
import portrait from "@/public/me.jpg";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  description:
    "Nirmal Maharjan is a frontend developer in Kathmandu who spent eight years in finance and pharma sales before switching to code in 2023.",
  title: "About",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        description={`I'm ${siteConfig.name}, a frontend developer in ${siteConfig.location}. I spent eight years in finance and pharma sales, then switched to code in 2023.`}
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
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className={buttonClass("primary")}
            download={siteConfig.resumeFileName}
            href={siteConfig.resumeUrl}
          >
            <Download aria-hidden />
            Download résumé
          </a>
          <Link className={buttonClass("ghost")} href="/contact">
            <Mail aria-hidden />
            Get in touch
          </Link>
        </div>
      </PageHeader>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="My story" title="How I got here" />
            <div className="mt-6 grid max-w-[60ch] gap-4 text-[17px] text-muted leading-[1.75]">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <BeyondCode />
          </div>
          <div className="relative mx-auto w-full max-w-[340px] lg:mt-10">
            <div
              aria-hidden
              className="absolute inset-[8%_-6%_-6%_8%] -z-10 rounded-[32px] bg-gradient-to-br from-a1 to-a2 opacity-[calc(var(--glow)*1.1)] blur-[40px]"
            />
            <div className="rounded-[28px] bg-[linear-gradient(145deg,rgb(var(--a1)/0.6),var(--line)_40%,rgb(var(--a2)/0.6))] p-1.5">
              <Image
                alt={`Portrait of ${siteConfig.name}`}
                className="aspect-[1/1.08] w-full rounded-[22px] object-cover object-[50%_18%]"
                placeholder="blur"
                sizes="340px"
                src={portrait}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          watermark="Experience"
        />
        <ExperienceTimeline items={experience} />
      </Section>

      <Section id="before-code">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeading
            description="Accounting taught me accuracy and deadlines. Sales taught me to listen to what people actually need. Both show up in how I build interfaces."
            eyebrow="Before code"
            title="Eight years on the business side"
          />
          <BeforeCode />
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

      <Section id="education">
        <SectionHeading
          eyebrow="Education & training"
          title="Business degree, self-taught code"
          watermark="Education"
        />
        <EducationGrid />
      </Section>

      <Section>
        <ContactCard />
      </Section>
    </main>
  );
}
