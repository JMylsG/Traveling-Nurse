import Link from "next/link";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer id="site-footer">
      <div className="container">
        <div className="fgrid">
          <div className="fabout">
            <Brand />
            <p>Honest answers and vetted resources for travel nurses. Built by one of us.</p>
          </div>
          <div className="fcol">
            <span className="ft">Explore</span>
            <Link href="/guides">Guides</Link>
            <Link href="/market">Market</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/community/social-community">Community</Link>
            <Link href="/community/faq">FAQ</Link>
          </div>
          <div className="fcol">
            <span className="ft">Partners</span>
            <Link href="/partners">Partner with us</Link>
            <Link href="/partners#contact">Contact</Link>
            <div className="socials">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="fnote">
          <span>© 2026 The Travel Nurse Guide · Guide Media LLC</span>
          <span>Prototype · placeholder copy</span>
        </div>
      </div>
    </footer>
  );
}
