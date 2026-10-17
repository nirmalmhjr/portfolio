import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";
import portrait from "@/assets/images/me.jpg";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { JsonLd } from "@/components/shared/JsonLd";
import { SpotlightTracker } from "@/components/shared/SpotlightTracker";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ROUTES } from "@/configs/routes";
import { OG_IMAGE_SIZE, SITE_CONFIG, SOCIAL_LINKS } from "@/configs/site";
import { EDUCATION, EXPERIENCE } from "@/features/profile/constants/profile";
import { getNav } from "@/lib/nav";
import { absoluteUrl } from "@/lib/url";

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

const defaultTitle = `${SITE_CONFIG.name} | ${SITE_CONFIG.title} in Kathmandu, Nepal`;

export const metadata: Metadata = {
  alternates: {
    canonical: ROUTES.home,
    types: {
      "application/rss+xml": [
        { title: `${SITE_CONFIG.name} | Blog`, url: ROUTES.rss },
      ],
    },
  },
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author.name,
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    description: SITE_CONFIG.description,
    images: [
      {
        alt: SITE_CONFIG.name,
        ...OG_IMAGE_SIZE,
        url: ROUTES.ogImage,
      },
    ],
    locale: SITE_CONFIG.locale,
    siteName: SITE_CONFIG.name,
    title: defaultTitle,
    type: "website",
    url: SITE_CONFIG.url,
  },
  robots: {
    follow: true,
    googleBot: { follow: true, index: true, "max-image-preview": "large" },
    index: true,
  },
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  twitter: {
    card: "summary_large_image",
    description: SITE_CONFIG.description,
    images: [ROUTES.ogImage],
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
  alumniOf: EDUCATION.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.place,
  })),
  description: SITE_CONFIG.description,
  email: `mailto:${SITE_CONFIG.author.email}`,
  image: absoluteUrl(portrait.src),
  jobTitle: SITE_CONFIG.title,
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Frontend development",
  ],
  name: SITE_CONFIG.author.name,
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin].filter(Boolean),
  url: SITE_CONFIG.url,
  worksFor: { "@type": "Organization", name: EXPERIENCE[0]?.company },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
  /** app/@modal: the résumé dialog when /resume is opened from the site. */
  readonly modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
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
