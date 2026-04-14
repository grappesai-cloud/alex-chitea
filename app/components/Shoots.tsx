"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SHOOTS, Shoot } from "../data/shoots";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

function ShootRow({
  shoot, i, onOpen, hovered, setHovered,
}: {
  shoot: Shoot; i: number; onOpen: () => void; hovered: number | null; setHovered: (n: number | null) => void;
}) {
  const active = hovered === i;
  const dim = hovered !== null && hovered !== i;

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
      data-hot
      className={`relative w-full text-left rule-btm py-7 md:py-9 transition-opacity duration-500 ${
        dim ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
        <div className="col-span-2 md:col-span-1 mono text-[14px] uppercase tracking-[0.28em] tabular opacity-85">
          {String(i + 1).padStart(2, "0")}
        </div>
        <div className="col-span-6 md:col-span-9">
          <h3 className={`display italic text-[9vw] md:text-[5.5vw] leading-[0.92] tracking-[-0.03em] transition-colors duration-300 ${
            active ? "text-[var(--accent)]" : ""
          }`}>
            {shoot.title}
            <span className="text-[var(--accent)]">.</span>
          </h3>
        </div>
        {/* mobile thumbnail — right of row */}
        <div className="col-span-4 md:hidden relative bg-black/30" style={{ aspectRatio: `${shoot.cover.w} / ${shoot.cover.h}` }}>
          <Image
            src={shoot.cover.src}
            alt=""
            fill
            sizes="33vw"
            className="object-cover"
          />
        </div>
        <div className="hidden md:flex col-span-2 items-center justify-end gap-3 mono text-[14px] uppercase tracking-[0.28em]">
          <span className={`italic-serif italic normal-case tracking-normal text-base ${active ? "text-[var(--accent)]" : "opacity-95"}`}>open</span>
          <span className={`transition-transform duration-300 ${active ? "translate-x-1 text-[var(--accent)]" : "opacity-95"}`}>→</span>
        </div>
      </div>
    </button>
  );
}

function HoverPreview({ shoot, visible }: { shoot: Shoot | null; visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-[95] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{ opacity: visible && shoot ? 1 : 0 }}
    >
      {shoot && (
        <div
          className="shadow-[0_20px_60px_rgba(0,0,0,0.55)] bg-black"
          style={{ width: "clamp(200px, 22vw, 320px)", aspectRatio: `${shoot.cover.w} / ${shoot.cover.h}` }}
        >
          <div className="relative w-full h-full">
            <Image
              src={shoot.cover.src}
              alt=""
              fill
              sizes="22vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ShootModal({
  shoot, index, onClose, onPrev, onNext,
}: {
  shoot: Shoot; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  const roman = ROMAN[index] ?? "";
  const dark = shoot.tone === "dark";
  const palette = dark ? "bg-[#0a0a0a] text-[var(--bg)]" : "bg-[var(--paper)] text-[var(--ink)]";
  const rule = dark ? "border-white/12" : "border-black/15";

  return (
    <div data-lenis-prevent className={`fixed inset-0 z-[100] ${palette} overflow-y-auto overscroll-contain`}>
      <div className={`sticky top-0 z-10 ${dark ? "bg-black/85" : "bg-[var(--paper)]/90"} backdrop-blur border-b ${rule}`}>
        <div className="flex items-center justify-end px-5 md:px-10 h-[56px] mono text-[14px] uppercase tracking-[0.3em] gap-5">
          <button data-hot onClick={onPrev} className="hover:text-[var(--accent)] transition">← prev</button>
          <button data-hot onClick={onNext} className="hover:text-[var(--accent)] transition">next →</button>
          <button data-hot onClick={onClose} className="hover:text-[var(--accent)] transition">Close ✕</button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pt-14 md:pt-20 pb-8 md:pb-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-7">
            <h2 className="display italic text-[14vw] md:text-[8vw] leading-[0.92] tracking-[-0.035em]">
              {shoot.title}<span className="text-[var(--accent)]">.</span>
            </h2>
            <div className="italic-serif italic text-2xl md:text-3xl opacity-80 mt-3">
              {shoot.subtitle}
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:pb-3">
            <p className="italic-serif italic text-lg md:text-xl leading-[1.55] opacity-90 max-w-[42ch]">
              {shoot.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 items-start">
          {shoot.frames.map((f, i) => {
            const landscape = f.w > f.h;
            return (
              <figure
                key={f.src}
                className={landscape ? "col-span-2" : "col-span-1"}
              >
                <Image
                  src={f.src}
                  alt={`${shoot.title} — ${i + 1}`}
                  width={f.w}
                  height={f.h}
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="block w-full h-auto"
                />
              </figure>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default function Shoots() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = openIdx !== null ? SHOOTS[openIdx] : null;

  return (
    <section id="work" className="relative tone-olive px-5 md:px-10 py-24 md:py-32 rule-top scroll-mt-16">
      <div className="flex items-end justify-between mb-12 reveal">
        <div>
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-70 mb-4">
            03 / Shoots
          </div>
          <h2 className="display italic text-[18vw] md:text-[11vw] leading-[0.84] tracking-[-0.035em]">
            Nine <span className="not-italic text-[var(--accent)]">chapters</span>
          </h2>
        </div>
      </div>

      <div>
        {SHOOTS.map((s, i) => (
          <ShootRow
            key={s.id}
            shoot={s}
            i={i}
            hovered={hovered}
            setHovered={setHovered}
            onOpen={() => setOpenIdx(i)}
          />
        ))}
      </div>

      <HoverPreview
        shoot={hovered !== null ? SHOOTS[hovered] : null}
        visible={hovered !== null}
      />

      {active && openIdx !== null && (
        <ShootModal
          shoot={active}
          index={openIdx}
          onClose={() => setOpenIdx(null)}
          onPrev={() => setOpenIdx((i) => (i === null ? i : (i - 1 + SHOOTS.length) % SHOOTS.length))}
          onNext={() => setOpenIdx((i) => (i === null ? i : (i + 1) % SHOOTS.length))}
        />
      )}
    </section>
  );
}
