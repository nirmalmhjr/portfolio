import { AvailableBadge } from "@/components/shared/AvailableBadge";
import { Container, PageHeader } from "@/components/shared/Container";
import { ROUTES } from "@/configs/routes";
import { SITE_CONFIG } from "@/configs/site";
import { ContactCard } from "@/features/contact/components/ContactCard";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  description: `Get in touch with ${SITE_CONFIG.name}, a frontend developer in ${SITE_CONFIG.location}.`,
  path: ROUTES.contact,
  title: "Contact",
});

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        description="I'm open to full-time and contract frontend roles, remote or in Kathmandu. Email is the fastest way to reach me."
        eyebrow="Contact"
        title="Let's talk."
        watermark="Hello"
      >
        <AvailableBadge className="mt-8" />
      </PageHeader>
      <Container className="pb-24">
        <ContactCard title="Send me an email." />
      </Container>
    </main>
  );
}
