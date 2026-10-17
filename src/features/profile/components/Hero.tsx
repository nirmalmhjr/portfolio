import { Code, Download, Github, Linkedin, Mail } from "lucide-react";
import { AvailableBadge } from "@/components/shared/AvailableBadge";
import { Container } from "@/components/shared/Container";
import { buttonClass, ICON_BUTTON_CLASS } from "@/components/ui/button";
import { GlowBackdrop } from "@/components/ui/glow-backdrop";
import { ROUTES } from "@/configs/routes";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/configs/site";
import { KathmanduClock } from "@/features/profile/components/KathmanduClock";
import { ProfileCode } from "@/features/profile/components/ProfileCode";
import { FACTS } from "@/features/profile/constants/profile";
import { cn } from "@/lib/utils";

const FLOAT_CHIP_CLASS =
  "absolute flex items-center gap-2.5 whitespace-nowrap rounded-[14px] border border-line-strong bg-surface/90 px-3.5 py-2.5 text-[13px] text-muted shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[116px] pb-16 sm:pt-[140px]">
      <GlowBackdrop />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div>
            <AvailableBadge className="rise" />
            <p className="rise mt-6 font-mono text-[15px] text-muted [animation-delay:60ms]">
              Hi, I&apos;m
            </p>
            <h1 className="rise mt-3 font-bold text-[clamp(3rem,8vw,5.6rem)] text-name leading-[0.95] tracking-[-0.05em] [animation-delay:60ms]">
              {SITE_CONFIG.name}
            </h1>
            <p className="rise mt-[18px] font-medium text-[clamp(1.25rem,2.6vw,1.6rem)] leading-snug tracking-[-0.02em] [animation-delay:120ms]">
              Frontend Developer building with{" "}
              <span className="font-semibold text-gradient">Next.js</span> &amp;{" "}
              <span className="font-semibold text-gradient">TypeScript</span>
            </p>
            <p className="rise mt-4 font-mono text-[13px] text-faint leading-[1.8] [animation-delay:120ms]">
              <b className="font-medium text-muted">
                {SITE_CONFIG.experienceYears} years experience
              </b>{" "}
              · Next.js · TypeScript · React · Tailwind CSS
            </p>
            <p className="rise mt-5 max-w-[54ch] text-[17px] text-muted leading-[1.7] [animation-delay:180ms]">
              I build and ship production websites, landing pages and CMS
              dashboards for real clients. Before code, I spent{" "}
              <strong className="font-medium text-fg">
                eight years in finance and pharma sales
              </strong>
              , so I&apos;m at home with clients, deadlines and the business
              side of a product.
            </p>
            <p className="rise mt-4 text-[15px] text-muted [animation-delay:180ms]">
              <span className="font-mono text-ink text-xs uppercase tracking-[0.08em]">
                Looking for
              </span>{" "}
              <span className="text-fg">{SITE_CONFIG.lookingFor}</span>
            </p>

            <div className="rise mt-[30px] flex flex-wrap items-center gap-3 [animation-delay:240ms]">
              <a
                className={buttonClass("primary")}
                href={SOCIAL_LINKS.hireEmail}
              >
                <Mail aria-hidden />
                Email me
              </a>
              <a
                className={buttonClass("ghost")}
                download={SITE_CONFIG.resumeFileName}
                href={ROUTES.resumePdf}
              >
                <Download aria-hidden />
                Download résumé
              </a>
              <div className="flex gap-1.5">
                <a
                  aria-label="GitHub profile"
                  className={ICON_BUTTON_CLASS}
                  href={SOCIAL_LINKS.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github aria-hidden />
                </a>
                {SOCIAL_LINKS.linkedin ? (
                  <a
                    aria-label="LinkedIn profile"
                    className={ICON_BUTTON_CLASS}
                    href={SOCIAL_LINKS.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Linkedin aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rise relative w-full max-w-[340px] [animation-delay:180ms] sm:ml-6 sm:max-w-[380px] lg:ml-0 lg:justify-self-end">
            <div
              aria-hidden
              className="absolute inset-[8%_-6%_-6%_8%] -z-10 rounded-[32px] bg-gradient-to-br from-a1 to-a2 opacity-[calc(var(--glow)*1.1)] blur-[40px]"
            />
            <div className="rounded-[28px] bg-[linear-gradient(145deg,rgb(var(--a1)/0.6),var(--line)_40%,rgb(var(--a2)/0.6))] p-1.5">
              <ProfileCode />
            </div>
            <div
              className={cn(
                FLOAT_CHIP_CLASS,
                "-bottom-6 -left-2 animate-bob sm:-left-[34px]"
              )}
            >
              <span
                aria-hidden
                className="grid h-8 w-8 flex-none place-items-center rounded-[10px] bg-gradient-to-br from-a1 to-a2 text-[#0b0b0f] [&_svg]:h-4 [&_svg]:w-4"
              >
                <Code />
              </span>
              <span>
                <b className="block font-semibold text-fg text-sm">
                  Next.js + TypeScript
                </b>
                Current stack
              </span>
            </div>
            <div
              className={cn(
                FLOAT_CHIP_CLASS,
                "-top-5 -right-2 animate-bob [animation-delay:-5s] sm:-top-6 sm:-right-[18px]"
              )}
            >
              <span>
                <b className="block font-mono font-semibold text-fg text-sm">
                  <KathmanduClock />
                </b>
                Kathmandu ({SITE_CONFIG.timezone})
              </span>
            </div>
          </div>
        </div>

        <dl className="rise mt-16 grid grid-cols-2 border-line border-t [animation-delay:300ms] lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <div
              className={cn(
                "grid content-start gap-1 py-5 pr-5",
                i % 2 === 1 && "border-line border-l pl-5",
                i >= 2 && "border-line border-t lg:border-t-0",
                i === 2 && "lg:border-l lg:pl-5"
              )}
              key={fact.label}
            >
              <dt className="order-2 text-[13px] text-muted">{fact.label}</dt>
              <dd className="order-1 font-semibold text-[clamp(1.4rem,3vw,1.9rem)] tabular-nums leading-[1.1] tracking-[-0.03em]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
