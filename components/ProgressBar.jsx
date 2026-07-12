"use client";
import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const ref = useRef(null);
  useEffect(() => {
    const upd = () => {
      const m = document.documentElement.scrollHeight - innerHeight;
      if (ref.current) ref.current.style.transform = `scaleY(${m > 0 ? scrollY / m : 0})`;
    };
    addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd, { passive: true });
    upd();
    return () => {
      removeEventListener("scroll", upd);
      removeEventListener("resize", upd);
    };
  }, []);
  return <div className="progressbar" ref={ref} />;
}
