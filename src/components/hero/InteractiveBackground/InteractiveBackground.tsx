const floatingCoins = [
  { sym: "₿", color: "from-orange-400 to-orange-600", className: "left-[5%] top-[10%]", delay: "0s" },
  { sym: "Ξ", color: "from-indigo-400 to-indigo-600", className: "right-[7%] top-[8%]", delay: "-2s" },
  { sym: "₮", color: "from-emerald-400 to-emerald-600", className: "left-[10%] top-[42%]", delay: "-4s" },
  { sym: "◎", color: "from-purple-400 to-fuchsia-600", className: "right-[9%] top-[38%]", delay: "-1s" },
  { sym: "B", color: "from-yellow-400 to-yellow-600", className: "left-[46%] top-[6%]", delay: "-3s" },
  { sym: "Ł", color: "from-sky-400 to-sky-600", className: "left-[3%] top-[70%]", delay: "-5s" },
  { sym: "T", color: "from-rose-500 to-rose-700", className: "right-[5%] top-[68%]", delay: "-2.5s" },
  { sym: "A", color: "from-red-400 to-red-600", className: "left-[55%] top-[78%]", delay: "-1.5s" },
  { sym: "P", color: "from-violet-500 to-purple-700", className: "left-[22%] top-[88%]", delay: "-3.5s" },
  { sym: "₳", color: "from-blue-500 to-cyan-600", className: "right-[28%] top-[92%]", delay: "-4.5s" },
  { sym: "Ð", color: "from-amber-400 to-yellow-500", className: "right-[40%] top-[22%]", delay: "-0.8s" },
  { sym: "S", color: "from-slate-600 to-slate-800", className: "left-[35%] top-[52%]", delay: "-5.5s" },
];

export function InteractiveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.55 0.22 264 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.55 0.22 264 / 0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Blobs */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-accent/60 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-blob [animation-delay:-12s]" />

      {/* Floating crypto coin badges (visual cue: this is a crypto site) */}
      {/* {floatingCoins.map((c, i) => (
        <div
          key={i}
          className={`absolute hidden md:flex bottom-[-10px] h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${c.color} text-lg font-bold text-white shadow-xl ring-4 ring-white/30 animate-float ${c.className}`}
          style={{ animationDelay: c.delay, opacity: 0.85 }}
        >
          {c.sym}
        </div>
      ))} */}

      {/* Floating shapes */}
      <div className="absolute right-10 top-[28rem] h-10 w-10 rotate-12 rounded-md bg-primary/40 shadow-lg animate-float" />
      <div className="absolute left-10 top-[36rem] h-6 w-6 rounded-full bg-primary/50 animate-float [animation-delay:-3s]" />
      <div className="absolute right-1/4 top-96 h-8 w-8 rotate-45 border-2 border-primary/40 animate-float [animation-delay:-1.5s]" />
    </div>
  );
}
