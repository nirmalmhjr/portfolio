import { Download, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/button";
import { CopyButton } from "@/components/copy-button";
import { siteConfig, socialLinks } from "@/lib/site.config";

function ContactRow({
  label,
  value,
  href,
  action,
}: {
  label: string;
  value: ReactNode;
  href?: string;
  action?: ReactNode;
}) {
  const body = (
    <span className="min-w-0">
      <span className="block font-medium font-mono text-[11px] text-faint uppercase leading-none tracking-[0.08em]">
        {label}
      </span>
      <span className="mt-1.5 block select-all break-words font-mono text-[15px] leading-tight">
        {value}
      </span>
    </span>
  );

  const className =
    "flex items-center justify-between gap-3 rounded-[14px] border border-line-strong bg-canvas/55 px-4 py-3.5";

  if (href) {
    return (
      <a
        className={`${className} hover:bg-raised`}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {body}
        {action}
      </a>
    );
  }
  return (
    <div className={className}>
      {body}
      {action}
    </div>
  );
}

const highlight = "Let's talk";
// Lets a very narrow card break the address after the "@" (<wbr> isn't copied).
const [emailUser, emailDomain] = siteConfig.author.email.split("@");

export function ContactCard({
  title = "Hiring a frontend developer? Let's talk.",
}: {
  title?: string;
}) {
  return (
    <div className="relative isolate grid grid-cols-[minmax(0,1fr)] items-end gap-10 overflow-hidden rounded-[28px] border border-line bg-surface p-6 shadow-[var(--card-shadow)] sm:p-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:p-16">
      <div
        aria-hidden
        className="absolute -right-[140px] -bottom-[170px] -z-10 h-[340px] w-[560px] rounded-full bg-gradient-to-br from-a1 to-a2 opacity-[calc(var(--glow)*0.75)] blur-[90px]"
      />
      <div>
        <p className="eyebrow">Contact</p>
        <h2 className="mt-3.5 max-w-[14ch] font-bold text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.04em]">
          {title.includes(highlight) ? (
            <>
              {title.slice(0, title.indexOf(highlight))}
              <em className="pr-[0.05em] font-semibold font-serif text-gradient tracking-[0.04em]">
                {highlight}
              </em>
              {title.slice(title.indexOf(highlight) + highlight.length)}
            </>
          ) : (
            title
          )}
        </h2>
        <p className="mt-3.5 max-w-[48ch] text-[17px] text-muted">
          Send me a short note about the role and I&apos;ll get back to you. My
          résumé is one click away.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className={buttonClass("primary")} href={socialLinks.hireEmail}>
            <Mail aria-hidden />
            Email me
          </a>
          <a
            className={buttonClass("ghost")}
            download={siteConfig.resumeFileName}
            href={siteConfig.resumeUrl}
          >
            <Download aria-hidden />
            Download résumé
          </a>
        </div>
      </div>

      {/* A size container, so the copy button can drop its label when narrow. */}
      <div className="grid gap-2.5 [container-type:inline-size]">
        <ContactRow
          action={<CopyButton value={siteConfig.author.email} />}
          label="Email"
          value={
            <>
              {emailUser}@<wbr />
              {emailDomain}
            </>
          }
        />
        <ContactRow
          href={socialLinks.github}
          label="GitHub"
          value={`github.com/${siteConfig.author.github}`}
        />
        {socialLinks.linkedin ? (
          <ContactRow
            href={socialLinks.linkedin}
            label="LinkedIn"
            value={`linkedin.com/in/${siteConfig.author.linkedin}`}
          />
        ) : null}
        <ContactRow label="Looking for" value={siteConfig.lookingFor} />
        <ContactRow
          label="Location"
          value={`${siteConfig.location} (${siteConfig.timezone})`}
        />
      </div>
    </div>
  );
}
