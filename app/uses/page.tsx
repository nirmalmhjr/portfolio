import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/container";
import { uses } from "@/lib/uses";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, apps and setup I use to build for the web.",
  alternates: { canonical: "/uses" },
};

export default function UsesPage() {
  // Hidden until lib/uses.ts has content.
  if (uses.length === 0) notFound();

  return (
    <main>
      <PageHeader
        eyebrow="Uses"
        watermark="Setup"
        title="What I use"
        description="The editor, tools and hardware I build with every day."
      />
      <Container className="grid gap-4 pb-24 md:grid-cols-2">
        {uses.map((group) => (
          <section key={group.title} className="card p-6">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-faint">
              {group.title}
            </h2>
            <ul className="mt-3">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="border-t border-line py-3 first:border-t-0"
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
