import { PROFILE } from "../data/profile";

export default function SartorialMarquee() {
  return (
    <section aria-label="Sartorial vocabulary" className="tone-bone py-2 overflow-hidden rule-top rule-btm">
      <div className="marquee-track-slow flex whitespace-nowrap gap-14 display italic text-5xl md:text-7xl tracking-[-0.02em]">
        {[...PROFILE.codes, ...PROFILE.codes, ...PROFILE.codes].map((c, i) => (
          <span key={i} className="flex items-center gap-14">
            {c}
            <span className="text-[var(--accent)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
