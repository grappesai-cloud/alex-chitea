import { PROFILE } from "../data/profile";

const TAGS = ["look", "editorial", "campaign", "lookbook", "resort", "press", "runway", "content"];

export default function Clients() {
  return (
    <section id="clients" className="tone-bone px-5 md:px-10 py-24 md:py-32 rule-top rule-btm scroll-mt-16">
      <div className="flex items-end justify-between mb-12 reveal">
        <div>
          <h2 className="display italic text-[16vw] md:text-[7.5vw] leading-[0.86] tracking-[-0.04em]">
            The <span className="not-italic text-[var(--accent)]">collab.</span>
          </h2>
        </div>
        <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-50 hidden md:block text-right">
          selected · not chronological
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-8 gap-y-2 mb-24 reveal">
        {PROFILE.clients.map((c, i) => (
          <div
            key={c}
            className="col-span-12 md:col-span-6 flex items-baseline justify-between rule-btm py-4 group"
          >
            <div className="flex items-baseline gap-4">
              <span className="mono text-[14px] uppercase tracking-[0.28em] opacity-50 tabular w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display italic text-3xl md:text-5xl tracking-tight group-hover:text-[var(--accent)] transition">
                {c}
              </span>
            </div>
            <div className="italic-serif italic text-sm md:text-base opacity-60">
              {TAGS[i % TAGS.length]}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-12 gap-6 reveal">
        <div className="col-span-12 md:col-span-6">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-60 mb-4">
            Disciplines
          </div>
          <div className="flex flex-wrap gap-2">
            {PROFILE.skills.map((s) => (
              <span
                key={s}
                className="mono text-[14px] uppercase tracking-[0.22em] border hairline px-3 py-1.5"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-60 mb-4">
            Languages
          </div>
          <div className="flex flex-wrap gap-2">
            {PROFILE.languages.map((l) => (
              <span
                key={l}
                className="mono text-[14px] uppercase tracking-[0.22em] border hairline px-3 py-1.5"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
