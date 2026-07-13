import "./globals.css";
import ProgressBar from "@/components/ProgressBar";
import Feedback from "@/components/Feedback";
import MobileNav from "@/components/MobileNav";

export const metadata = {
  title: "The Travel Nurse Guide",
  description:
    "Straight answers on pay, contracts, taxes, and housing, plus vetted resources from people who've actually done it.",
  // Preview lives on workers.dev until Drew's real domain is attached.
  // Remove this at launch so search engines can index the site.
  robots: { index: false, follow: false },
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
        <ProgressBar />
        {children}
        <Feedback />
        <MobileNav />
      </body>
    </html>
  );
}
