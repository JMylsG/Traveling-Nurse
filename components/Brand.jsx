import Link from "next/link";

// Drew's TNG mark: two open arcs with gaps at 12 and 6 o'clock.
// Dark-surface coloring (white + teal) per his navy icon variant;
// the navy+teal transparent variant is for light surfaces (favicon uses the navy tile).
export function BrandMark() {
  return (
    <svg className="mark" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M37 14.3 A 38 38 0 0 0 37 85.7" fill="none" stroke="#EFF3F4" strokeWidth="12" strokeLinecap="round" />
      <path d="M63 14.3 A 38 38 0 0 1 63 85.7" fill="none" stroke="#65BFBE" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

export default function Brand({ link = true }) {
  const inner = (
    <>
      <BrandMark />
      <div className="wm">THE TRAVEL NURSE <small>GUIDE</small></div>
    </>
  );
  if (!link) return <div className="brand">{inner}</div>;
  return <Link className="brand" href="/">{inner}</Link>;
}
