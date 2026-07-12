"use client";
import { useEffect } from "react";

// Shared page effects: scroll reveals, cursor spotlight on cards, magnetic CTAs.
// Arrow nudge is handled in markup via <span className="arr">→</span>.
export default function Fx({ spots = "", magnets = "" }) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const bound = [];
    if (spots) {
      document.querySelectorAll(spots).forEach((c) => {
        c.classList.add("spot");
        const h = (e) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--mx", e.clientX - r.left + "px");
          c.style.setProperty("--my", e.clientY - r.top + "px");
        };
        c.addEventListener("mousemove", h);
        bound.push([c, "mousemove", h]);
      });
    }
    if (magnets) {
      document.querySelectorAll(magnets).forEach((el) => {
        const mm = (e) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 6}px,${((e.clientY - r.top) / r.height - 0.5) * 6}px)`;
        };
        const ml = () => { el.style.transform = ""; };
        el.addEventListener("mousemove", mm);
        el.addEventListener("mouseleave", ml);
        bound.push([el, "mousemove", mm], [el, "mouseleave", ml]);
      });
    }
    return () => {
      io.disconnect();
      bound.forEach(([el, t, h]) => el.removeEventListener(t, h));
    };
  }, [spots, magnets]);
  return null;
}
