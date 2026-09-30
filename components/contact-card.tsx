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
      <span className="block font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-faint">
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
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:bg-raised`}
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
        className="absolute -bottom-[170px] -right-[140px] -z-10 h-[340px] w-[560px] rounded-full bg-gradient-to-br from-a1 to-a2 opacity-[calc(var(--glow)*0.75)] blur-[90px]"
      />
      <div>
        <p className="eyebrow">Contact</p>
        <h2 className="mt-3.5 max-w-[14ch] text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em]">
          {title.includes(highlight) ? (
            <>
              {title.slice(0, title.indexOf(highlight))}
              <em className="text-gradient pr-[0.05em] font-serif font-semibold tracking-[0.04em]">
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
          <a href={socialLinks.hireEmail} className={buttonClass("primary")}>
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
        </div>
      </div>

      {/* A size container, so the copy button can drop its label when narrow. */}
      <div className="grid gap-2.5 [container-type:inline-size]">
        <ContactRow
          label="Email"
          value={
            <>
              {emailUser}@<wbr />
              {emailDomain}
            </>
          }
          action={<CopyButton value={siteConfig.author.email} />}
        />
        <ContactRow
          label="GitHub"
          value={`github.com/${siteConfig.author.github}`}
          href={socialLinks.github}
        />
        {socialLinks.linkedin ? (
          <ContactRow
            label="LinkedIn"
            value={`linkedin.com/in/${siteConfig.author.linkedin}`}
            href={socialLinks.linkedin}
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
