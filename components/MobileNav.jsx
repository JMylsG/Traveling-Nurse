"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mobile-only bottom nav (hidden >900px, where the top nav links exist).
const ITEMS = [
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
    href: "/resources", label: "Resources", match: (p) => p.startsWith("/resources"),
    d: <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    href: "/community/social-community", label: "Community", match: (p) => p.startsWith("/community"),
    d: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.5" /><path d="M15.5 14a5 5 0 0 1 5 5" /></>,
  },
];

export default function MobileNav() {
  const path = usePathname();
  return (
    <nav className="mbar" aria-label="Primary">
      {ITEMS.map((it) => (
        <Link key={it.label} href={it.href} className={it.match(path) ? "on" : undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{it.d}</svg>
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
