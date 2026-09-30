import path from "node:path";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { resumeDoc, type ResumeRow } from "@/lib/resume-document";
import { siteConfig } from "@/lib/site.config";

/**
 * The downloadable résumé, drawn from the same model as the /resume page.
 * Sizes are in points and mirror the page's print styles (1px = 0.75pt).
 */

const fontDir = path.join(process.cwd(), "assets/fonts");

Font.register({
  family: "Geist",
  fonts: [
    { src: path.join(fontDir, "Geist-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontDir, "Geist-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontDir, "Geist-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontDir, "Geist-Bold.ttf"), fontWeight: 700 },
  ],
});
// Wrap whole words only; hyphens mid-word look sloppy on a résumé.
Font.registerHyphenationCallback((word) => [word]);

const color = {
  ink: "#111216",
  body: "#2b2d33",
  muted: "#5b606b",
  divider: "#c4c8d0",
  /** Amber accent, kept in sync with the /resume page. */
  accent: "#b45309",
  accentSoft: "#f1dfca",
  marker: "#d97706",
  linkLine: "#e9bf94",
};

const s = StyleSheet.create({
  page: {
    paddingVertical: 25.5, // 9mm
    paddingHorizontal: 36.85, // 13mm
    fontFamily: "Geist",
    fontSize: 9,
    lineHeight: 1.4,
    color: color.body,
    backgroundColor: "#ffffff",
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: color.accent,
    paddingBottom: 6,
  },
  name: {
    fontSize: 19.5,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: -0.5,
    color: color.ink,
  },
  title: {
    marginTop: 6,
    fontSize: 11.25,
    fontWeight: 600,
    color: color.ink,
  },
  contacts: {
    marginTop: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    color: color.muted,
  },
  contact: { color: color.muted, textDecoration: "none" },
  divider: {
    width: 0.75,
    height: 9,
    marginHorizontal: 7.5,
    backgroundColor: color.divider,
  },
  summary: { marginTop: 6 },
  heading: {
    marginTop: 9,
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontSize: 8.25,
    fontWeight: 700,
    letterSpacing: 1.15,
    textTransform: "uppercase",
    color: color.accent,
  },
  headingRule: {
    flex: 1,
    height: 0.75,
    marginLeft: 9,
    backgroundColor: color.accentSoft,
  },
  row: { flexDirection: "row", marginBottom: 1.5 },
  rowLabel: { width: 84, marginRight: 9, fontWeight: 600, color: color.ink },
  rowValue: { flex: 1 },
  job: { marginBottom: 6 },
  spread: { flexDirection: "row", justifyContent: "space-between" },
  strong: { fontWeight: 600, color: color.ink },
  medium: { fontWeight: 500, color: color.ink },
  muted: { fontWeight: 400, color: color.muted },
  bullets: { marginTop: 3 },
  bullet: { flexDirection: "row" },
  bulletMark: { width: 12, paddingLeft: 3, color: color.marker },
  bulletText: { flex: 1 },
  sites: { marginTop: 3, paddingLeft: 12, color: color.muted },
  link: {
    color: color.muted,
    textDecoration: "underline",
    textDecorationColor: color.linkLine,
  },
  project: { marginBottom: 1.5 },
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
      title={`${doc.name} – Résumé`}
      author={doc.name}
      subject={`${doc.title} résumé`}
      keywords={siteConfig.keywords.join(", ")}
      creator={siteConfig.url}
      producer={siteConfig.url}
      language="en"
    >
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{doc.name}</Text>
          <Text style={s.title}>
            {doc.title}
            <Text style={s.muted}> · {doc.tagline}</Text>
          </Text>
          <View style={s.contacts}>
            {doc.contacts.map((c, i) => (
              <View
                key={c.href}
                style={{ flexDirection: "row", alignItems: "center" }}
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
