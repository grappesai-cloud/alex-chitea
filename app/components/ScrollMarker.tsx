"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS: { id: string; label: string; num: string }[] = [
  { id: "index", label: "Index", num: "I" },
  { id: "about", label: "Statement", num: "II" },
  { id: "work", label: "Chapters", num: "III" },
  { id: "measurements", label: "Numbers", num: "IV" },
  { id: "reel", label: "Motion", num: "V" },
  { id: "clients", label: "Collaborations", num: "VI" },
  { id: "contact", label: "Contact", num: "VII" },
];

export default function ScrollMarker() {
  const [active, setActive] = useState(SECTIONS[0]);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (bar.current) bar.current.style.setProperty("--p", String(p));

      let current = SECTIONS[0];
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) current = s;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={bar} className="scroll-progress" />
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40 mono text-[14px] md:text-[14px] uppercase tracking-[0.3em] opacity-70 pointer-events-none mix-blend-difference text-white">
        <span className="text-[var(--accent)]">{active.num}</span> / {active.label}
      </div>
    </>
  );
}
