"use client";

import { useEffect, useRef } from "react";

const VIDEO = "/media/hero/hero.mp4";
const POSTER = "/media/hero/hero.jpg";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const tryPlay = () => { v.muted = true; v.play().catch(() => {}); };
    tryPlay();
    v.load();
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("pause", tryPlay);
    const onVis = () => document.visibilityState === "visible" && tryPlay();
    document.addEventListener("visibilitychange", onVis);
    const onInteract = () => tryPlay();
    window.addEventListener("scroll", onInteract, { passive: true, once: true });
    window.addEventListener("pointerdown", onInteract, { passive: true, once: true });
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("pause", tryPlay);
    };
  }, []);

  return (
    <section id="index" className="relative min-h-[100svh] w-full overflow-hidden tone-coal">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 h-[100svh] pt-20 md:pt-24 pb-10 pl-5 pr-5 md:pl-10 md:pr-[12vw]">
        {/* LEFT — text */}
        <div className="relative z-20 flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center">
            <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-60 mb-5">
              01 / Portfolio — MMXXVI
            </div>
            <h1 className="display italic text-[18vw] md:text-[10vw] leading-[0.84] tracking-[-0.035em]">
              Alexandru
              <br />
              Chițea<span className="text-[var(--accent)]">.</span>
            </h1>
          </div>

        </div>

        {/* RIGHT — video, auto-width, full frame visible */}
        <div className="relative z-10 shrink-0 flex items-center">
          <video
            ref={videoRef}
            src={VIDEO}
            poster={POSTER}
            muted
            loop
            autoPlay
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            // @ts-expect-error webkit attr
            webkit-playsinline="true"
            preload="auto"
            className="block h-[60svh] md:h-[88svh] w-auto max-w-full object-contain bg-black pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
