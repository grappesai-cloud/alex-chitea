"use client";

import { useEffect, useRef } from "react";

const CLIPS = [
  "/media/reel/clip01.mp4",
  "/media/reel/clip02.mp4",
  "/media/reel/clip03.mp4",
  "/media/reel/clip04.mp4",
  "/media/reel/clip05.mp4",
  "/media/reel/clip06.mp4",
];
const POSTERS = CLIPS.map((c) => c.replace(".mp4", ".jpg"));

export default function Reel() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.35 }
    );
    refs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section id="reel" className="tone-wine px-5 md:px-10 py-24 md:py-32 rule-top scroll-mt-16">
      <div className="flex items-end justify-between mb-10 md:mb-16 reveal">
        <div>
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-70 mb-4">
            05 / Motion
          </div>
          <h2 className="display italic text-[16vw] md:text-[7.5vw] leading-[0.86] tracking-[-0.04em]">
            In <span className="not-italic text-[var(--accent)]">motion</span>.
          </h2>
        </div>
        <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-50 hidden md:block text-right">
          muted · autoplay in view<br />{CLIPS.length} clips
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {CLIPS.map((src, i) => (
          <figure key={src} className="relative reveal">
            <div className="relative w-full aspect-[9/16] bg-black overflow-hidden">
              <video
                ref={(el) => {
                  refs.current[i] = el;
                }}
                src={src}
                poster={POSTERS[i]}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-contain bg-black"
              />
              <div className="absolute top-3 left-3 mono text-[14px] uppercase tracking-[0.3em] text-white/85">
                <span className="text-[var(--accent)]">M/</span>{String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
