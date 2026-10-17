import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { SpotlightTracker } from "@/components/spotlight-tracker";
import { ThemeProvider } from "@/components/theme-provider";
import { getNav } from "@/lib/nav";
import { education, experience } from "@/lib/resume";
import { absoluteUrl, siteConfig, socialLinks } from "@/lib/site.config";

const sans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});

const serif = Instrument_Serif({
  display: "swap",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

const defaultTitle = `${siteConfig.name} | ${siteConfig.title} in Kathmandu, Nepal`;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { title: `${siteConfig.name} | Blog`, url: "/rss.xml" },
      ],
    },
  },
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: siteConfig.name,
        height: 630,
        url: siteConfig.ogImage,
        width: 1200,
      },
    ],
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: defaultTitle,
    type: "website",
    url: siteConfig.url,
  },
  robots: {
    follow: true,
    googleBot: { follow: true, index: true, "max-image-preview": "large" },
    index: true,
  },
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    title: defaultTitle,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#f6f5f3", media: "(prefers-color-scheme: light)" },
    { color: "#08090a", media: "(prefers-color-scheme: dark)" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NP",
    addressLocality: "Kathmandu",
  },
  alumniOf: education.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.place,
  })),
  description: siteConfig.description,
  email: `mailto:${siteConfig.author.email}`,
  image: absoluteUrl("/me.jpg"),
  jobTitle: siteConfig.title,
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Frontend development",
  ],
  name: siteConfig.author.name,
  sameAs: [socialLinks.github, socialLinks.linkedin].filter(Boolean),
  url: siteConfig.url,
  worksFor: { "@type": "Organization", name: experience[0]?.company },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  /** app/@modal: the résumé dialog when /resume is opened from the site. */
  modal: React.ReactNode;
}) {
  return (
    <html
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="font-sans text-base leading-relaxed antialiased">
        <ThemeProvider>
          <JsonLd data={personJsonLd} />
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-canvas"
            href="#content"
          >
            Skip to content
          </a>
          <div aria-hidden className="noise" />
          <SpotlightTracker />
          <Header items={getNav()} />
          <div className="flex min-h-dvh flex-col" id="content">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
