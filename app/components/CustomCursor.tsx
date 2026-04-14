"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (dot.current) {
        dot.current.style.left = `${tx}px`;
        dot.current.style.top = `${ty}px`;
      }
      const el = e.target as HTMLElement;
      const hot = el.closest("a, button, [data-hot]");
      const txt = !hot && el.closest("p, h1, h2, h3, h4, [data-text]");
      if (ring.current) {
        ring.current.classList.toggle("hot", !!hot);
        ring.current.classList.toggle("text", !!txt);
      }
    };
    const raf = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring.current) {
        ring.current.style.left = `${rx}px`;
        ring.current.style.top = `${ry}px`;
      }
      id = requestAnimationFrame(raf);
    };
    let id = requestAnimationFrame(raf);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
