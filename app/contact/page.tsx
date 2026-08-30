import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { ContactLinks } from "@/components/contact-links";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container as="main" className="py-12">
      <PageHeader
        title="Contact"
        description="The fastest way to reach me is email. I read everything and reply to most things within a couple of days."
      />

      <ContactLinks />

      <p className="text-muted mt-8 text-sm">
        Prefer to copy it?{" "}
        <span className="font-mono text-[hsl(var(--foreground))]">
          {siteConfig.author.email}
        </span>
      </p>
    </Container>
  );
}
