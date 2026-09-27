import type { Metadata } from "next";
import { AvailableBadge } from "@/components/available-badge";
import { ContactCard } from "@/components/contact-card";
import { Container, PageHeader } from "@/components/container";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}, a frontend developer in ${siteConfig.location}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        watermark="Hello"
        title="Let's talk."
        description="I'm open to full-time and contract frontend roles, remote or in Kathmandu. Email is the fastest way to reach me."
      >
        <AvailableBadge className="mt-8" />
      </PageHeader>
      <Container className="pb-24">
        <ContactCard title="Send me an email." />
      </Container>
    </main>
  );
}
