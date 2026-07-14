import Link from "next/link";

export function BrandMark() {
  return (
    <svg className="mark" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 12 A 38 38 0 0 0 50 88" fill="none" stroke="#7DE9E8" strokeWidth="12" strokeLinecap="round" />
      <path d="M50 12 A 38 38 0 0 1 50 88" fill="none" stroke="#65BFBE" strokeWidth="12" strokeLinecap="round" />
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
