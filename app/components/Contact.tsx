import { PROFILE } from "../data/profile";

export default function Contact() {
  return (
    <section id="contact" className="relative tone-coal px-5 md:px-10 pt-24 md:pt-32 pb-12 overflow-hidden scroll-mt-16">
      <h3 className="display italic text-[22vw] md:text-[11vw] leading-[0.85] tracking-[-0.035em] reveal">
        Let&rsquo;s talk<span className="text-[var(--accent)]">.</span>
      </h3>
      <div className="italic-serif italic text-xl md:text-2xl opacity-70 mt-3 reveal max-w-[40ch]">
        Bookings, castings, direct.
      </div>

      <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6 reveal">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-50 mb-4 flex items-center gap-3">
            <span className="rule-accent" /> Bookings — direct
          </div>
          <a
            href={`https://ig.me/m/${PROFILE.instagram}`}
            data-hot
            target="_blank"
            rel="noreferrer"
            className="block display italic text-4xl md:text-5xl mb-2 hover:text-[var(--accent)] transition"
          >
            @{PROFILE.instagram}
          </a>
          <a
            href={`https://ig.me/m/${PROFILE.instagram}`}
            data-hot
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mono text-[14px] uppercase tracking-[0.28em] opacity-80 hover:text-[var(--accent)] transition"
          >
            <span className="italic-serif italic normal-case tracking-normal text-base">DM on Instagram</span>
            <span>↗</span>
          </a>
        </div>

        <div className="col-span-12 md:col-span-6 reveal">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-50 mb-4 flex items-center gap-3">
            <span className="rule-accent" /> Elsewhere
          </div>
          <div className="space-y-1">
            {[
              { label: "Instagram", value: `@${PROFILE.instagram}`, href: PROFILE.instagramUrl, ext: true },
              { label: "TikTok", value: `@${PROFILE.tiktok}`, href: PROFILE.tiktokUrl, ext: true },
              { label: "Comp card", value: "PDF ↓", href: "/api/compcard", ext: false },
            ].map((r) => (
              <a
                key={r.label}
                href={r.href}
                data-hot
                target={r.ext ? "_blank" : undefined}
                rel={r.ext ? "noreferrer" : undefined}
                className="flex items-baseline justify-between rule-btm py-4 hover:text-[var(--accent)] transition group"
              >
                <span className="display italic text-3xl md:text-4xl">{r.label}</span>
                <span className="mono text-[14px] uppercase tracking-[0.28em] opacity-60 group-hover:opacity-100">
                  {r.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-24 md:mt-32 overflow-hidden rule-top pt-10">
        <div className="display italic text-[22vw] md:text-[14vw] leading-[0.85] tracking-[-0.035em] opacity-95">
          A. Chițea<span className="text-[var(--accent)]">.</span>
        </div>
      </div>

      <div className="mt-16 md:mt-24 rule-top pt-6 flex flex-wrap items-center justify-between gap-3 mono text-[14px] uppercase tracking-[0.3em] opacity-60">
        <div>© MMXXVI — Alexandru Chițea · All rights reserved</div>
        <div>Portfolio — A Single Issue</div>
      </div>
    </section>
  );
}
