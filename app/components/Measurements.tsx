import { PROFILE } from "../data/profile";

export default function Measurements() {
  return (
    <section id="measurements" className="relative tone-coal px-5 md:px-10 py-24 md:py-32 scroll-mt-16">
      <div className="grid grid-cols-12 gap-6 items-end">
        <h3 className="col-span-12 md:col-span-8 display italic text-[18vw] md:text-[7.5vw] leading-[0.86] tracking-[-0.04em] reveal">
          The <span className="not-italic text-[var(--accent)]">numbers</span>.
        </h3>
        <div className="col-span-12 md:col-span-4 md:pb-4 reveal">
          <p className="italic-serif italic text-lg md:text-xl opacity-80 max-w-[32ch]">
            Polaroids, digitals &amp; live measure on request.
          </p>
        </div>

        <dl className="col-span-12 mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 md:gap-x-12 rule-top reveal">
          {PROFILE.stats.map((s, i) => (
            <div
              key={s.key}
              className="grid grid-cols-12 gap-3 items-baseline py-3 md:py-4 border-b border-white/10"
            >
              <dt className="col-span-1 mono text-[14px] uppercase tracking-[0.28em] opacity-50 tabular">
                {String(i + 1).padStart(2, "0")}
              </dt>
              <dt className="col-span-4 italic-serif italic text-lg md:text-xl">
                {s.key}
              </dt>
              <dd className="col-span-5 display italic text-2xl md:text-3xl tracking-tight">
                {s.value}
              </dd>
              <dd className="col-span-2 mono text-[14px] uppercase tracking-[0.24em] opacity-55 text-right">
                {s.imperial}
              </dd>
            </div>
          ))}
        </dl>

        <div className="col-span-12 mt-10 flex flex-wrap items-center justify-between gap-6 reveal">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-70 max-w-[56ch]">
            Eyes · Brown &nbsp;/&nbsp; Hair · Brown &nbsp;/&nbsp; Skin · Fair
          </div>
          <a
            href="/api/compcard"
            data-hot
            className="group inline-flex items-center gap-4 mono text-[14px] uppercase tracking-[0.28em] border border-white/40 px-6 py-3.5 hover:bg-[var(--accent)] hover:border-[var(--accent)] transition"
          >
            <span className="italic-serif italic normal-case text-lg tracking-normal">Download</span>
            <span>comp card · PDF</span>
            <span className="transition group-hover:translate-x-1">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
