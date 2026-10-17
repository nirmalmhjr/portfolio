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
import { SITE_CONFIG } from "@/configs/site";
import type { ResumeRow } from "@/features/resume/types/resume.types";
import {
  PDF_CONTACTS,
  RESUME_DOC,
} from "@/features/resume/utils/resume-document";

/**
 * The downloadable résumé, drawn from the same model as the /resume page.
 * Sizes are in points and mirror the page's print styles (1px = 0.75pt).
 */

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

Font.register({
  family: "Geist",
  fonts: [
    { fontWeight: 400, src: path.join(FONT_DIR, "Geist-Regular.ttf") },
    { fontWeight: 500, src: path.join(FONT_DIR, "Geist-Medium.ttf") },
    { fontWeight: 600, src: path.join(FONT_DIR, "Geist-SemiBold.ttf") },
    { fontWeight: 700, src: path.join(FONT_DIR, "Geist-Bold.ttf") },
  ],
});
// Wrap whole words only; hyphens mid-word look sloppy on a résumé.
Font.registerHyphenationCallback((word) => [word]);

const COLOR = {
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

const STYLES = StyleSheet.create({
  bullet: { flexDirection: "row" },
  bulletMark: { color: COLOR.marker, paddingLeft: 3, width: 12 },
  bullets: { marginTop: 3 },
  bulletText: { flex: 1 },
  contact: { color: COLOR.muted, textDecoration: "none" },
  // 7.5pt so email, phone, site, LinkedIn and GitHub fit on one line.
  contacts: {
    alignItems: "center",
    color: COLOR.muted,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 7.5,
    marginTop: 3,
  },
  divider: {
    backgroundColor: COLOR.divider,
    height: 7.5,
    marginHorizontal: 4.5,
    width: 0.75,
  },
  header: {
    borderBottomColor: COLOR.accent,
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
    backgroundColor: COLOR.accentSoft,
    flex: 1,
    height: 0.75,
    marginLeft: 9,
  },
  headingText: {
    color: COLOR.accent,
    fontSize: 8.25,
    fontWeight: 700,
    letterSpacing: 1.15,
    textTransform: "uppercase",
  },
  job: { marginBottom: 6 },
  link: {
    color: COLOR.muted,
    textDecoration: "underline",
    textDecorationColor: COLOR.linkLine,
  },
  medium: { color: COLOR.ink, fontWeight: 500 },
  muted: { color: COLOR.muted, fontWeight: 400 },
  name: {
    color: COLOR.ink,
    fontSize: 19.5,
    fontWeight: 700,
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  page: {
    backgroundColor: "#ffffff",
    color: COLOR.body,
    fontFamily: "Geist",
    fontSize: 9,
    lineHeight: 1.4,
    paddingHorizontal: 36.85, // 13mm
    paddingVertical: 25.5, // 9mm
  },
  project: { marginBottom: 1.5 },
  row: { flexDirection: "row", marginBottom: 1.5 },
  rowLabel: { color: COLOR.ink, fontWeight: 600, marginRight: 9, width: 84 },
  rowValue: { flex: 1 },
  sites: { color: COLOR.muted, marginTop: 3, paddingLeft: 12 },
  spread: { flexDirection: "row", justifyContent: "space-between" },
  strong: { color: COLOR.ink, fontWeight: 600 },
  summary: { marginTop: 6 },
  title: {
    color: COLOR.ink,
    fontSize: 11.25,
    fontWeight: 600,
    marginTop: 6,
  },
});

interface HeadingProps {
  readonly children: ReactNode;
}

function Heading({ children }: HeadingProps) {
  return (
    <View style={STYLES.heading} wrap={false}>
      <Text style={STYLES.headingText}>{children}</Text>
      <View style={STYLES.headingRule} />
    </View>
  );
}

interface RowsProps {
  readonly rows: ResumeRow[];
}

function Rows({ rows }: RowsProps) {
  return rows.map((row) => (
    <View key={row.label} style={STYLES.row} wrap={false}>
      <Text style={STYLES.rowLabel}>{row.label}</Text>
      <Text style={STYLES.rowValue}>{row.value}</Text>
    </View>
  ));
}

function ResumePdf() {
  const doc = RESUME_DOC;

  return (
    <Document
      author={doc.name}
      creator={SITE_CONFIG.url}
      keywords={SITE_CONFIG.keywords.join(", ")}
      language="en"
      producer={SITE_CONFIG.url}
      subject={`${doc.title} résumé`}
      title={`${doc.name} – Résumé`}
    >
      <Page size="A4" style={STYLES.page}>
        <View style={STYLES.header}>
          <Text style={STYLES.name}>{doc.name}</Text>
          <Text style={STYLES.title}>
            {doc.title}
            <Text style={STYLES.muted}> · {doc.tagline}</Text>
          </Text>
          <View style={STYLES.contacts}>
            {PDF_CONTACTS.map((c, i) => (
              <View
                key={c.href}
                style={{ alignItems: "center", flexDirection: "row" }}
              >
                {i > 0 ? <View style={STYLES.divider} /> : null}
                <Link src={c.href} style={STYLES.contact}>
                  {c.label}
                </Link>
              </View>
            ))}
          </View>
        </View>

        <Text style={STYLES.summary}>{doc.summary}</Text>

        <Heading>Skills</Heading>
        <Rows rows={doc.skills} />

        <Heading>Experience</Heading>
        {doc.jobs.map((job) => (
          <View key={job.key} style={STYLES.job} wrap={false}>
            <View style={STYLES.spread}>
              <Text style={STYLES.strong}>
                {job.role}
                <Text style={STYLES.muted}> · </Text>
                {job.company}
              </Text>
              <Text style={STYLES.muted}>{job.dates}</Text>
            </View>
            <View style={STYLES.bullets}>
              {job.highlights.map((point) => (
                <View key={point} style={STYLES.bullet}>
                  <Text style={STYLES.bulletMark}>•</Text>
                  <Text style={STYLES.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
            {job.sites.length > 0 ? (
              <Text style={STYLES.sites}>
                <Text style={STYLES.medium}>
                  {job.sites.length > 1 ? "Sites" : "Site"}:
                </Text>{" "}
                {job.sites.map((site, i) => (
                  <Text key={site.href}>
                    {i > 0 ? " · " : ""}
                    <Link src={site.href} style={STYLES.link}>
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
          <Text style={STYLES.strong}>{doc.beforeTech.label}</Text>{" "}
          {doc.beforeTech.value}
        </Text>

        <Heading>Personal projects</Heading>
        {doc.projects.map((project) => (
          <View key={project.key} style={STYLES.project} wrap={false}>
            <View style={STYLES.spread}>
              <Text>
                <Text style={STYLES.strong}>{project.title}</Text>
                <Text style={STYLES.muted}> · {project.tech}</Text>
              </Text>
              {project.link ? (
                <Link src={project.link.href} style={STYLES.link}>
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
