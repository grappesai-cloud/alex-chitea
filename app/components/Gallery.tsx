"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY, Shot } from "../data/gallery";

const PATTERN = [
  [12],
  [6, 6],
  [4, 8],
  [8, 4],
  [6, 6],
  [12],
  [5, 7],
  [4, 4, 4],
  [7, 5],
  [6, 6],
  [3, 6, 3],
  [12],
  [8, 4],
  [6, 6],
  [4, 8],
];

type Row = { items: Shot[]; spans: number[] };

function buildRows(shots: Shot[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  let p = 0;
  while (i < shots.length) {
    const spans = PATTERN[p % PATTERN.length];
    const items = shots.slice(i, i + spans.length);
    rows.push({ items, spans: spans.slice(0, items.length) });
    i += spans.length;
    p++;
  }
  return rows;
}

export default function Gallery() {
  const rows = useMemo(() => buildRows(GALLERY), []);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="px-3 md:px-6 py-16 md:py-24">
      <div className="space-y-3 md:space-y-5">
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-12 gap-3 md:gap-5">
            {row.items.map((shot, ii) => {
              const span = row.spans[ii];
              const idx = rows
                .slice(0, ri)
                .reduce((n, r) => n + r.items.length, 0) + ii;
              const ratio = shot.w / shot.h;
              return (
                <button
                  key={shot.src}
                  onClick={() => setActive(idx)}
                  className="gallery-cell col-span-12 group relative block w-full overflow-hidden bg-black/5"
                  style={{
                    aspectRatio: `${shot.w} / ${shot.h}`,
                    ["--span" as string]: span,
                  } as React.CSSProperties}
                >
                  <Image
                    src={shot.src}
                    alt={`Alexandru Chițea — frame ${idx + 1}`}
                    fill
                    sizes={`(max-width: 768px) 100vw, ${(span / 12) * 100}vw`}
                    quality={65}
                    loading="lazy"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.6,.1,1)] group-hover:scale-[1.025]"
                  />
                  <div className="absolute left-3 bottom-3 mono text-[14px] uppercase tracking-[0.2em] text-white mix-blend-difference opacity-0 group-hover:opacity-100 transition">
                    {String(idx + 1).padStart(3, "0")} · {ratio >= 1 ? "LS" : "PT"}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 mono text-[14px] uppercase tracking-[0.2em] text-white"
            onClick={() => setActive(null)}
          >
            Close ✕
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 mono text-[14px] uppercase tracking-[0.2em] text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a === null ? a : (a - 1 + GALLERY.length) % GALLERY.length));
            }}
          >
            ← Prev
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 mono text-[14px] uppercase tracking-[0.2em] text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a === null ? a : (a + 1) % GALLERY.length));
            }}
          >
            Next →
          </button>
          <div className="relative w-full max-w-[92vw] h-[85vh]">
            <Image
              src={GALLERY[active].src}
              alt={`frame ${active + 1}`}
              fill
              sizes="92vw"
              quality={80}
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-6 mono text-[14px] uppercase tracking-[0.2em] text-white/70">
            {String(active + 1).padStart(3, "0")} / {String(GALLERY.length).padStart(3, "0")}
          </div>
        </div>
      )}
    </section>
  );
}
