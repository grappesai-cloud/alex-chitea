export default function PullQuote() {
  return (
    <section className="tone-bone px-5 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-2 mono text-[14px] uppercase tracking-[0.3em] opacity-60">
          Foreword
        </div>
        <blockquote className="col-span-12 md:col-span-8 display italic text-[9vw] md:text-[5vw] leading-[1.02] tracking-[-0.025em] reveal">
          <span className="text-[var(--accent)]">&ldquo;</span>
          Posture is a language. Chițea speaks three dialects without raising
          his voice. The hush of editorial, the clarity of commercial, the{" "}
          <span className="italic-serif">pulse</span> of a runway.
          <span className="text-[var(--accent)]">&rdquo;</span>
        </blockquote>
        <div className="col-span-12 md:col-span-2 mono text-[14px] uppercase tracking-[0.3em] opacity-60 md:text-right">
          No. 03
        </div>
      </div>
    </section>
  );
}
