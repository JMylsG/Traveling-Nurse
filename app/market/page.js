import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Market · The Travel Nurse Guide",
  description:
    "The pay explorer is paused while we bring in a cleaner, specialty-level data source worth trusting.",
  robots: { index: false, follow: false },
};

// The market page is paused until a better, specialty-level rate source lands.
// The BLS/GSA client still lives in ./market-client for when it comes back.
export default function Market() {
  return (
    <>
      <header className="page-head ph-market">
        <Nav active="market" />
        <div className="container">
          <span className="eyebrow-s">Market data</span>
          <h1 style={{ maxWidth: "18ch" }}>Rebuilding this with a <span className="hl">better data source</span>.</h1>
          <p className="sub" style={{ maxWidth: "56ch" }}>
            The pay explorer is paused while we bring in cleaner, specialty-level numbers worth trusting.
            In the meantime, the pay guide breaks down how to read any offer, part by part.
          </p>
          <div className="hero-actions" style={{ marginTop: 10 }}>
            <Link className="btn-teal" href="/guides#pay">Read the pay guide <span className="arr">→</span></Link>
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
}
