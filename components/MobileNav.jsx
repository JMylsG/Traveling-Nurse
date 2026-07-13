"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mobile-only bottom tab bar (hidden >900px) with a "More" slide-up sheet,
// social-app style: no hamburger anywhere.
const TABS = [
  {
    href: "/", label: "Home", match: (p) => p === "/",
    d: <><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /></>,
  },
  {
    href: "/guides", label: "Guides", match: (p) => p.startsWith("/guides"),
    d: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></>,
  },
  {
    href: "/market", label: "Market", match: (p) => p.startsWith("/market"),
    d: <><path d="M4 19h16" /><path d="M7 16v-5" /><path d="M12 16V8" /><path d="M17 16v-8" /></>,
  },
  {
    href: "/community/social-community", label: "Community", match: (p) => p.startsWith("/community"),
    d: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.5" /><path d="M15.5 14a5 5 0 0 1 5 5" /></>,
  },
];

const MORE = [
  {
    href: "/resources", label: "Resources", sub: "The vetted short list",
    d: <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    href: "/community/faq", label: "FAQ", sub: "Community and partner questions",
    d: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.8.3-.9 1-.9 1.7" /><path d="M12 16.5v.01" /></>,
  },
  {
    href: "/partners", label: "Partner with us", sub: "For brands and sponsors",
    d: <><path d="M4 8h16v11H4z" /><path d="M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" /><path d="M4 13h16" /></>,
  },
  {
    href: "/#getguide", label: "Get the free guide", sub: "Pay, contracts, taxes, housing",
    d: <><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></>,
  },
];

export default function MobileNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // close the sheet on navigation and on Escape
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const moreActive = open || path.startsWith("/resources") || path.startsWith("/partners");

  return (
    <>
      {open && (
        <>
          <div className="msheet-backdrop" onClick={() => setOpen(false)} />
          <div className="msheet" role="dialog" aria-label="More pages">
            {MORE.map((it) => (
              <Link key={it.label} href={it.href} onClick={() => setOpen(false)}>
                <span className="mic"><svg viewBox="0 0 24 24" aria-hidden="true">{it.d}</svg></span>
                <span><b>{it.label}</b><small>{it.sub}</small></span>
              </Link>
            ))}
          </div>
        </>
      )}
      <nav className="mbar" aria-label="Primary">
        {TABS.map((it) => (
          <Link key={it.label} href={it.href} className={!open && it.match(path) ? "on" : undefined}>
            <svg viewBox="0 0 24 24" aria-hidden="true">{it.d}</svg>
            {it.label}
          </Link>
        ))}
        <button type="button" className={`mmore${moreActive ? " on" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></svg>
          More
        </button>
      </nav>
    </>
  );
}
