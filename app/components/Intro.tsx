import { PROFILE } from "../data/profile";

export default function Intro() {
  return (
    <section id="about" className="relative tone-olive px-5 md:px-10 py-20 md:py-28 scroll-mt-16">
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="col-span-12 md:col-span-6 reveal">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-60 mb-4 flex items-center gap-3">
            <span className="rule-accent" /> Editor&rsquo;s note
          </div>
          <h2 className="display italic text-[12vw] md:text-[5.5vw] leading-[0.96] tracking-[-0.03em]">
            A face<br />
            that <span className="text-[var(--accent)] not-italic">moves</span><br />
            between codes.
          </h2>
        </div>

        <div className="col-span-12 md:col-span-6 md:pt-4 space-y-7 reveal">
          <p className="text-[21px] leading-[1.6] opacity-90 max-w-[52ch]">
            Dancer by training, reader of rooms. A face that answers to a dozen briefs at once. This volume collects the work in nine chapters, arranged not chronologically but tonally.
          </p>
          <p className="text-[21px] leading-[1.6] opacity-80 max-w-[52ch]">
            Studio tungsten against cold morning daylight, bare cotton against tailored wool, stillness against motion. Tap any chapter to open the full sequence, uncropped, in native composition.
          </p>
        </div>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-12 gap-6 rule-top pt-6 reveal">
        <div className="col-span-6 md:col-span-4">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-60 mb-2">Based in</div>
          <div className="italic-serif italic text-xl md:text-2xl">
            {PROFILE.city}, Romania
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-60 mb-2">Languages</div>
          <div className="italic-serif italic text-xl md:text-2xl">
            {PROFILE.languages.join(" · ")}
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="mono text-[14px] uppercase tracking-[0.3em] opacity-60 mb-2">Agency</div>
          <div className="italic-serif italic text-xl md:text-2xl">
            {PROFILE.agency}
          </div>
        </div>
      </div>
    </section>
  );
}
