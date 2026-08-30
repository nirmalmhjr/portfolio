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
        eyebrow="Contact"
        title="Get in touch"
        description="The fastest way to reach me is email — I read everything and reply to most things within a couple of days. Tell me a bit about what you're working on."
      />

      <div className="mb-8">
        <AvailableBadge />
      </div>

      <ContactLinks />
    </Container>
  );
}
