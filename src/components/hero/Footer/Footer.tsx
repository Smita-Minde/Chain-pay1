"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, Mail, ArrowRight, ShieldCheck, Globe2, Zap } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
// import logoAsset from "@/Public/chainpay-logo.png.asset.json";


const columns = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/industries", label: "Industries" },
      { to: "/cryptocurrencies", label: "Cryptocurrencies" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { to: "/integration-docs", label: "Integration Docs" },
      { to: "/api-reference", label: "API Reference" },
      { to: "/developers", label: "Developer Hub" },
      { to: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Products",
    links: [
      { to: "/products", label: "Payment Gateway" },
      { to: "/solutions", label: "Solutions" },
      { to: "/products", label: "Merchant Tools" },
      { to: "/products", label: "Sandbox" },
    ],
  },
] as const;

const trustBadges = [
  { icon: ShieldCheck, label: "SOC2 Ready" },
  { icon: Globe2, label: "150+ Countries" },
  { icon: Zap, label: "<3s Settlement" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-gradient-to-b from-background via-accent/20 to-background">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-blob" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl animate-blob [animation-delay:-8s]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Newsletter banner */}
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-fuchsia-500/10 to-cyan-400/10 p-8 md:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                <Mail className="h-3 w-3" /> Stay in the loop
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                Get crypto payment insights, weekly.
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Product updates, integration tips, and market trends — no spam, ever.
              </p>
            </div>
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-full border border-border/60 bg-background/80 px-5 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary"
              />
              <Button className="rounded-full bg-primary px-5 shadow-lg shadow-primary/30 hover:bg-primary/90">
                Subscribe <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 opacity-60 blur-md" />
                {/* <img src={logoAsset.url} alt="ChainPay logo" className="relative h-11 w-11 rounded-lg bg-background p-1 ring-1 ring-border/60" /> */}
              </div>
              <div className="leading-tight">
                <div className="text-2xl font-extrabold">
                  <span className="bg-gradient-to-r from-foreground via-primary to-fuchsia-500 bg-clip-text text-transparent">Chain</span>
                  <span className="text-primary">Pay</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Fast, Secure, And Borderless
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The crypto payment gateway built for modern businesses. Accept Bitcoin, Ethereum, USDT and 50+ assets — settle to your wallet or bank in seconds.
            </p>

            

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  <b.icon className="h-3.5 w-3.5 text-primary" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">{col.title}</h4>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.to}
                      className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                    >
                      <span className="h-px w-0 bg-primary transition-all group-hover:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © ChainPay {new Date().getFullYear()}. All Rights reserved. Built for the future of payments.
          </p>
          <div className="flex items-center gap-2">
            {[
              { Icon: Twitter, label: "Twitter" },
              { Icon: Github, label: "GitHub" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Send, label: "Telegram" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
