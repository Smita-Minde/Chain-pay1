import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophia Müller",
    role: "Web3 Developer, Germany",
    initials: "SM",
    accent: "from-blue-500 to-indigo-500",
    quote:
      "Their developer support is outstanding. Quick responses and great documentation helped us build our payment system smoothly. The merchant dashboard is a game-changer.",
  },
  {
    name: "Daniel Carter",
    role: "Founder, E-commerce, USA",
    initials: "DC",
    accent: "from-violet-500 to-fuchsia-500",
    quote:
      "ChainPay made accepting crypto effortless. Integration took less than an afternoon and the fees are unbeatable. Our checkout conversion improved overnight.",
  },
  {
    name: "Aisha Khan",
    role: "CTO, FinTech, UAE",
    initials: "AK",
    accent: "from-sky-500 to-cyan-400",
    quote:
      "Reliable webhooks, clean APIs, and a sandbox that actually works. ChainPay is the crypto gateway we wish we had years ago.",
  },
];

const marqueeLogos = [
  "STRIPE-X",
  "NOVA PAY",
  "BLOCKLINE",
  "ORBIT FI",
  "MERIDIAN",
  "VAULTLY",
  "ZENPAY",
  "PRISMA",
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-gradient-to-b from-background via-accent/20 to-background">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl animate-blob [animation-delay:-12s]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Trusted Worldwide
          </div>
          <h2 className="mt-5 bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] bg-clip-text text-4xl font-bold tracking-tight text-transparent animate-gradient md:text-5xl">
            Loved by Global Partners
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hear directly from teams who trust ChainPay to transform their crypto payments.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.name} className="group relative">
              {/* Glow halo */}
              <div
                className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${t.accent} opacity-30 blur-lg transition duration-500 group-hover:opacity-80 animate-tilt`}
              />
              <div
                className="relative flex h-full flex-col rounded-3xl border border-border/60 bg-card/90 p-7 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />

                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110"
                      style={{ transitionDelay: `${idx * 40}ms` }}
                    />
                  ))}
                </div>

                <p className="relative mt-5 flex-1 text-[15px] leading-relaxed text-foreground/80">
                  “{t.quote}”
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${t.accent} opacity-60 blur-md`}
                    />
                    <div
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.accent} text-sm font-bold text-white shadow-lg`}
                    >
                      {t.initials}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee partner strip */}
        <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max gap-12 animate-marquee">
            {[...marqueeLogos, ...marqueeLogos].map((logo, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-lg font-bold tracking-[0.25em] text-muted-foreground/50 transition-colors hover:text-primary"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
