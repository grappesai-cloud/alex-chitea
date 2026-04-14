const LINKS = [
  { label: "Index", href: "#index" },
  { label: "Work", href: "#work" },
  { label: "Numbers", href: "#measurements" },
  { label: "Motion", href: "#reel" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
      <div className="grid grid-cols-12 items-center gap-4 px-5 md:px-10 h-[56px] mono text-[14px] md:text-[14px] uppercase tracking-[0.22em]">
        <a href="#index" className="col-span-6 md:col-span-3 flex items-center gap-2">
          <span className="display italic text-[18px] leading-none not-italic md:italic">
            AC<span className="text-[var(--accent)]">.</span>
          </span>
          <span className="opacity-60 hidden md:inline">Alexandru Chițea — Portfolio</span>
        </a>
        <nav className="hidden md:flex col-span-6 justify-center gap-7">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--accent)] transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="col-span-6 md:col-span-3 text-right opacity-70">
          Portfolio — MMXXVI
        </div>
      </div>
    </header>
  );
}
