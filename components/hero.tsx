import Image from "next/image";
import { Code, Download, Github, Linkedin, Mail } from "lucide-react";
import { AvailableBadge } from "@/components/available-badge";
import { buttonClass, iconButtonClass } from "@/components/button";
import { Container } from "@/components/container";
import { GlowBackdrop } from "@/components/glow-backdrop";
import { KathmanduClock } from "@/components/kathmandu-clock";
import { facts } from "@/lib/resume";
import { siteConfig, socialLinks } from "@/lib/site.config";
import { cn } from "@/lib/utils";
import portrait from "@/public/me.jpg";

const floatChip =
  "absolute flex items-center gap-2.5 whitespace-nowrap rounded-[14px] border border-line-strong bg-surface/90 px-3.5 py-2.5 text-[13px] text-muted shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-[116px] sm:pt-[140px]">
      <GlowBackdrop />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div>
            <AvailableBadge className="rise" />
            <p className="rise mt-6 font-mono text-[15px] text-muted [animation-delay:60ms]">
              Hi, I&apos;m
            </p>
            <h1 className="rise text-name mt-3 text-[clamp(3rem,8vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.05em] [animation-delay:60ms]">
              {siteConfig.name}
            </h1>
            <p className="rise mt-[18px] text-[clamp(1.25rem,2.6vw,1.6rem)] font-medium leading-snug tracking-[-0.02em] [animation-delay:120ms]">
              Frontend Developer building with{" "}
              <span className="text-gradient font-semibold">Next.js</span> &amp;{" "}
              <span className="text-gradient font-semibold">TypeScript</span>
            </p>
            <p className="rise mt-4 font-mono text-[13px] leading-[1.8] text-faint [animation-delay:120ms]">
              <b className="font-medium text-muted">
                {siteConfig.experienceYears} years experience
              </b>{" "}
              · Next.js · TypeScript · React · Tailwind CSS
            </p>
            <p className="rise mt-5 max-w-[54ch] text-[17px] leading-[1.7] text-muted [animation-delay:180ms]">
              I build and ship production websites, landing pages and CMS
              dashboards for real clients. Before code, I spent{" "}
              <strong className="font-medium text-fg">
                eight years in finance and pharma sales
              </strong>
              , so I&apos;m at home with clients, deadlines and the business
              side of a product.
            </p>
            <p className="rise mt-4 text-[15px] text-muted [animation-delay:180ms]">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink">
                Looking for
              </span>{" "}
              <span className="text-fg">{siteConfig.lookingFor}</span>
            </p>

            <div className="rise mt-[30px] flex flex-wrap items-center gap-3 [animation-delay:240ms]">
              <a
                href={socialLinks.hireEmail}
                className={buttonClass("primary")}
              >
                <Mail aria-hidden />
                Email me
              </a>
              <a
                href={siteConfig.resumeUrl}
                download={siteConfig.resumeFileName}
                className={buttonClass("ghost")}
              >
                <Download aria-hidden />
                Download résumé
              </a>
              <div className="flex gap-1.5">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className={iconButtonClass}
                >
                  <Github aria-hidden />
                </a>
                {socialLinks.linkedin ? (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className={iconButtonClass}
                  >
                    <Linkedin aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rise relative ml-5 w-full max-w-[260px] [animation-delay:180ms] sm:ml-6 sm:max-w-[340px] lg:ml-0 lg:max-w-[380px] lg:justify-self-end">
            <div
              aria-hidden
              className="absolute inset-[8%_-6%_-6%_8%] -z-10 rounded-[32px] bg-gradient-to-br from-a1 to-a2 opacity-[calc(var(--glow)*1.1)] blur-[40px]"
            />
            <div className="rounded-[28px] bg-[linear-gradient(145deg,rgb(var(--a1)/0.6),var(--line)_40%,rgb(var(--a2)/0.6))] p-1.5">
              <Image
                src={portrait}
                alt={`Portrait of ${siteConfig.name}`}
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 260px"
                className="aspect-[1/1.08] w-full rounded-[22px] object-cover object-[50%_18%]"
              />
            </div>
            <div
              className={cn(
                floatChip,
                "-left-5 bottom-5 animate-bob sm:-left-[34px] sm:bottom-[34px]"
              )}
            >
              <span
                aria-hidden
                className="grid h-8 w-8 flex-none place-items-center rounded-[10px] bg-gradient-to-br from-a1 to-a2 text-[#0b0b0f] [&_svg]:h-4 [&_svg]:w-4"
              >
                <Code />
              </span>
              <span>
                <b className="block text-sm font-semibold text-fg">
                  Next.js + TypeScript
                </b>
                Current stack
              </span>
            </div>
            <div
              className={cn(
                floatChip,
                "-right-3 top-4 animate-bob [animation-delay:-3s] sm:-right-[18px] sm:top-[26px]"
              )}
            >
              <span>
                <b className="block font-mono text-sm font-semibold text-fg">
                  <KathmanduClock />
                </b>
                Kathmandu (UTC+5:45)
              </span>
            </div>
          </div>
        </div>

        <dl className="rise mt-16 grid grid-cols-2 border-t border-line [animation-delay:300ms] lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={cn(
                "grid content-start gap-1 py-5 pr-5",
                i % 2 === 1 && "border-l border-line pl-5",
                i >= 2 && "border-t border-line lg:border-t-0",
                i === 2 && "lg:border-l lg:pl-5"
              )}
            >
              <dt className="order-2 text-[13px] text-muted">{fact.label}</dt>
              <dd className="order-1 text-[clamp(1.4rem,3vw,1.9rem)] font-semibold tabular-nums leading-[1.1] tracking-[-0.03em]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
