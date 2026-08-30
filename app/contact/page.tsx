import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { ContactLinks } from "@/components/contact-links";
import { AvailableBadge } from "@/components/available-badge";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container as="main">
      <PageHeader
        label="(Contact)"
        title="Let's Talk"
        description="The fastest way to reach me is email — I read everything and reply to most things within a couple of days. Tell me a bit about what you're working on."
      />

      <div className="mt-12 flex flex-col gap-12">
        <AvailableBadge />
        <ContactLinks />
        <p className="text-muted font-mono text-xs uppercase tracking-wider">
          Or copy —{" "}
          <span className="select-all text-foreground">
            {siteConfig.author.email}
          </span>
        </p>
      </div>
    </Container>
  );
}
