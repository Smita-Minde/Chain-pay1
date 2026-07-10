import { Code2, Zap, TrendingDown } from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Developer-First Architecture",
    desc: "Powerful APIs, SDKs for major platforms, and real-time support. Clean docs and a sandbox environment make development, testing, and deployment faster than ever.",
  },
  {
    icon: Zap,
    title: "Effortless & Fast Integration",
    desc: "Integrate ChainPay into your website, app, or POS in just a few steps. Plug-and-play tools get you live with crypto payments in minutes.",
  },
  {
    icon: TrendingDown,
    title: "Transparent & Secure Payment Control",
    desc: "Enjoy industry leading transparent pricing with no hidden subscriptions or platform costs while keeping complete ownership and control of your funds through a secure non-custodial payment infrastructure.",
  },
];

export function WhyChainPay() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl mt-10 md:mt-20">
          Why ChainPay is the Ultimate{" "}
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Crypto Payment Solution
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Discover why businesses across the globe choose ChainPay for effortless, secure, and lightning-fast crypto payments.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <div
            key={i.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-primary-foreground shadow-md">
                <i.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
