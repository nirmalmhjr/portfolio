import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/shared/Container";
import { ROUTES } from "@/configs/routes";
import { USES } from "@/features/uses/constants/uses";

export const metadata: Metadata = {
  alternates: { canonical: ROUTES.uses },
  description: "The tools, apps and setup I use to build for the web.",
  title: "Uses",
};

export default function UsesPage() {
  // Hidden until features/uses/constants/uses.json has content.
  if (USES.length === 0) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        description="The editor, tools and hardware I build with every day."
        eyebrow="Uses"
        title="What I use"
        watermark="Setup"
      />
      <Container className="grid gap-4 pb-24 md:grid-cols-2">
        {USES.map((group) => (
          <section className="card p-6" key={group.title}>
            <h2 className="font-medium font-mono text-faint text-xs uppercase tracking-[0.08em]">
              {group.title}
            </h2>
            <ul className="mt-3">
              {group.items.map((item) => (
                <li
                  className="border-line border-t py-3 first:border-t-0"
                  key={item.name}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.note ? (
                    <span className="block text-[15px] text-muted">
                      {item.note}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </main>
  );
}
