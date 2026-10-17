import path from "node:path";
import {
  Document,
  Font,
  Link,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { pdfContacts, type ResumeRow, resumeDoc } from "@/lib/resume-document";
import { siteConfig } from "@/lib/site.config";

/**
 * The downloadable résumé, drawn from the same model as the /resume page.
 * Sizes are in points and mirror the page's print styles (1px = 0.75pt).
 */

const fontDir = path.join(process.cwd(), "assets/fonts");

Font.register({
  family: "Geist",
  fonts: [
    { fontWeight: 400, src: path.join(fontDir, "Geist-Regular.ttf") },
    { fontWeight: 500, src: path.join(fontDir, "Geist-Medium.ttf") },
    { fontWeight: 600, src: path.join(fontDir, "Geist-SemiBold.ttf") },
    { fontWeight: 700, src: path.join(fontDir, "Geist-Bold.ttf") },
  ],
});
// Wrap whole words only; hyphens mid-word look sloppy on a résumé.
Font.registerHyphenationCallback((word) => [word]);

const color = {
  /** Amber accent, kept in sync with the /resume page. */
  accent: "#b45309",
  accentSoft: "#f1dfca",
  body: "#2b2d33",
  divider: "#c4c8d0",
  ink: "#111216",
  linkLine: "#e9bf94",
  marker: "#d97706",
  muted: "#5b606b",
};

const s = StyleSheet.create({
  bullet: { flexDirection: "row" },
  bulletMark: { color: color.marker, paddingLeft: 3, width: 12 },
  bullets: { marginTop: 3 },
  bulletText: { flex: 1 },
  contact: { color: color.muted, textDecoration: "none" },
  // 7.5pt so email, phone, site, LinkedIn and GitHub fit on one line.
  contacts: {
    alignItems: "center",
    color: color.muted,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 7.5,
    marginTop: 3,
  },
  divider: {
    backgroundColor: color.divider,
    height: 7.5,
    marginHorizontal: 4.5,
    width: 0.75,
  },
  header: {
    borderBottomColor: color.accent,
    borderBottomWidth: 1.5,
    paddingBottom: 6,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 3,
    marginTop: 9,
  },
  headingRule: {
    backgroundColor: color.accentSoft,
    flex: 1,
    height: 0.75,
    marginLeft: 9,
  },
  headingText: {
    color: color.accent,
    fontSize: 8.25,
    fontWeight: 700,
    letterSpacing: 1.15,
    textTransform: "uppercase",
  },
  job: { marginBottom: 6 },
  link: {
    color: color.muted,
    textDecoration: "underline",
    textDecorationColor: color.linkLine,
  },
  medium: { color: color.ink, fontWeight: 500 },
  muted: { color: color.muted, fontWeight: 400 },
  name: {
    color: color.ink,
    fontSize: 19.5,
    fontWeight: 700,
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  page: {
    backgroundColor: "#ffffff",
    color: color.body,
    fontFamily: "Geist",
    fontSize: 9,
    lineHeight: 1.4,
    paddingHorizontal: 36.85, // 13mm
    paddingVertical: 25.5, // 9mm
  },
  project: { marginBottom: 1.5 },
  row: { flexDirection: "row", marginBottom: 1.5 },
  rowLabel: { color: color.ink, fontWeight: 600, marginRight: 9, width: 84 },
  rowValue: { flex: 1 },
  sites: { color: color.muted, marginTop: 3, paddingLeft: 12 },
  spread: { flexDirection: "row", justifyContent: "space-between" },
  strong: { color: color.ink, fontWeight: 600 },
  summary: { marginTop: 6 },
  title: {
    color: color.ink,
    fontSize: 11.25,
    fontWeight: 600,
    marginTop: 6,
  },
});

function Heading({ children }: { children: ReactNode }) {
  return (
    <View style={s.heading} wrap={false}>
      <Text style={s.headingText}>{children}</Text>
      <View style={s.headingRule} />
    </View>
  );
}

function Rows({ rows }: { rows: ResumeRow[] }) {
  return rows.map((row) => (
    <View key={row.label} style={s.row} wrap={false}>
      <Text style={s.rowLabel}>{row.label}</Text>
      <Text style={s.rowValue}>{row.value}</Text>
    </View>
  ));
}

function ResumePdf() {
  const doc = resumeDoc;

  return (
    <Document
      author={doc.name}
      creator={siteConfig.url}
      keywords={siteConfig.keywords.join(", ")}
      language="en"
      producer={siteConfig.url}
      subject={`${doc.title} résumé`}
      title={`${doc.name} – Résumé`}
    >
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{doc.name}</Text>
          <Text style={s.title}>
            {doc.title}
            <Text style={s.muted}> · {doc.tagline}</Text>
          </Text>
          <View style={s.contacts}>
            {pdfContacts.map((c, i) => (
              <View
                key={c.href}
                style={{ alignItems: "center", flexDirection: "row" }}
              >
                {i > 0 ? <View style={s.divider} /> : null}
                <Link src={c.href} style={s.contact}>
                  {c.label}
                </Link>
              </View>
            ))}
          </View>
        </View>

        <Text style={s.summary}>{doc.summary}</Text>

        <Heading>Skills</Heading>
        <Rows rows={doc.skills} />

        <Heading>Experience</Heading>
        {doc.jobs.map((job) => (
          <View key={job.key} style={s.job} wrap={false}>
            <View style={s.spread}>
              <Text style={s.strong}>
                {job.role}
                <Text style={s.muted}> · </Text>
                {job.company}
              </Text>
              <Text style={s.muted}>{job.dates}</Text>
            </View>
            <View style={s.bullets}>
              {job.highlights.map((point) => (
                <View key={point} style={s.bullet}>
                  <Text style={s.bulletMark}>•</Text>
                  <Text style={s.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
            {job.sites.length > 0 ? (
              <Text style={s.sites}>
                <Text style={s.medium}>
                  {job.sites.length > 1 ? "Sites" : "Site"}:
                </Text>{" "}
                {job.sites.map((site, i) => (
                  <Text key={site.href}>
                    {i > 0 ? " · " : ""}
                    <Link src={site.href} style={s.link}>
                      {site.label}
                    </Link>
                    {site.note ? ` (${site.note})` : ""}
                  </Text>
                ))}
              </Text>
            ) : null}
          </View>
        ))}
        <Text wrap={false}>
          <Text style={s.strong}>{doc.beforeTech.label}</Text>{" "}
          {doc.beforeTech.value}
        </Text>

        <Heading>Personal projects</Heading>
        {doc.projects.map((project) => (
          <View key={project.key} style={s.project} wrap={false}>
            <View style={s.spread}>
              <Text>
                <Text style={s.strong}>{project.title}</Text>
                <Text style={s.muted}> · {project.tech}</Text>
              </Text>
              {project.link ? (
                <Link src={project.link.href} style={s.link}>
                  {project.link.label}
                </Link>
              ) : null}
            </View>
            <Text>{project.description}</Text>
          </View>
        ))}

        <Heading>Education & training</Heading>
        <Rows rows={doc.education} />
      </Page>
    </Document>
  );
}

export function renderResumePdf(): Promise<Buffer> {
  return renderToBuffer(<ResumePdf />);
}
