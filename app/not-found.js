import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const Arr = () => <span className="arr">→</span>;

export default function NotFound() {
  return (
    <>
      <header className="page-head ph-faq" style={{ minHeight: "78vh", display: "flex", flexDirection: "column", paddingBottom: 0 }}>
        <Nav />
        <div className="container" style={{ margin: "auto 0", paddingBottom: 96 }}>
          <span className="eyebrow-s">404</span>
          <h1 style={{ maxWidth: "22ch" }}>This page took a contract <span className="hl">somewhere else</span>.</h1>
          <p className="sub">
            The link is broken or the page moved on. Everything worth reading is still one click away.
          </p>
          <div className="hero-actions" style={{ marginTop: 30 }}>
            <Link className="btn-hero primary" href="/">Back to the start <Arr /></Link>
            <Link className="btn-hero ghost" href="/guides">Read the guides <Arr /></Link>
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
}
