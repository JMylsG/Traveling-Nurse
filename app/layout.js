import "./globals.css";
import ProgressBar from "@/components/ProgressBar";
import Feedback from "@/components/Feedback";
import MobileNav from "@/components/MobileNav";

export const metadata = {
  metadataBase: new URL("https://traveling-nurse.jmguanso1.workers.dev"),
  title: "The Travel Nurse Guide",
  description:
    "Straight answers on pay, contracts, taxes, and housing, plus vetted resources from people who've actually done it.",
  openGraph: {
    title: "The Travel Nurse Guide",
    description:
      "Straight answers on pay, contracts, taxes, and housing, plus vetted resources from people who've actually done it.",
    siteName: "The Travel Nurse Guide",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Preview lives on workers.dev until Drew's real domain is attached.
  // Remove this at launch so search engines can index the site.
  robots: { index: false, follow: false },
};

const SITE_URL = "https://traveling-nurse.jmguanso1.workers.dev";

// Organization + WebSite structured data (JSON-LD) so search engines understand
// the brand, its founder, and its social profiles. Update SITE_URL at launch.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "The Travel Nurse Guide",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      description:
        "Honest, vetted information and community for travel nurses. Built by a working RN since 2018.",
      foundingDate: "2018",
      founder: { "@type": "Person", name: "Drew Jones", jobTitle: "RN" },
      sameAs: [
        "https://www.facebook.com/share/g/1BcxDjK3Q8/",
        "https://www.linkedin.com/in/drew-jones-rn/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "The Travel Nurse Guide",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ProgressBar />
        {children}
        <Feedback />
        <MobileNav />
      </body>
    </html>
  );
}
