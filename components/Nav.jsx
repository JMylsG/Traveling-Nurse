import Link from "next/link";
import Brand from "./Brand";

export default function Nav({ active = "", cta, ctaOnMobile = true }) {
  const { href = "/partners", label = "Partner with us", filled = false } = cta || {};
  const links = [
    { label: "Guides", href: "/guides" },
    { label: "Market", href: "/market" },
    { label: "Resources", href: "/resources" },
  ];
  return (
    <nav>
      <Brand link={active !== "home"} />
      <div className="nav-links">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className={active === l.label.toLowerCase() ? "active" : undefined}>
            {l.label}
          </Link>
        ))}
        <div className="nav-drop">
          <button type="button" className={active === "community" ? "active" : undefined}>Community</button>
          <div className="menu">
            <div className="menu-card">
              <Link href="/community/social-community">Social Community</Link>
              <Link href="/community/faq">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
      <Link className={`nav-cta${filled ? " filled" : ""}${ctaOnMobile ? "" : " m-hide"}`} href={href}>{label}</Link>
    </nav>
  );
}
