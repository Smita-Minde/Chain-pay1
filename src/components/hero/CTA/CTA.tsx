import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

export function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="group relative">
        {/* Animated outer glow */}
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-[length:200%_auto] opacity-70 blur-2xl animate-gradient" />

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-10 shadow-2xl shadow-primary/30 md:p-16">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          {/* Shimmer sweep */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 4s linear infinite",
            }}
          />

          {/* Floating orbs */}
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl animate-blob [animation-delay:-8s]" />

          {/* Floating coin/badge chips */}
          <div className="pointer-events-none absolute left-[8%] top-[18%] hidden md:block">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md animate-float">
              <Zap className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="pointer-events-none absolute right-[10%] top-[22%] hidden md:block">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md animate-float [animation-delay:-2s]">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-[18%] left-[14%] hidden md:block">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md animate-float [animation-delay:-4s]">
              <Globe className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Pulse rings */}
          <div className="pointer-events-none absolute right-[18%] bottom-[14%] hidden md:block">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-pulse-ring" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
            </span>
          </div>

          {/* Content */}
          <div className="relative text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              Ready in Minutes
            </div>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Get Started with ChainPay Today —{" "}
              <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                Simple, Secure, and Swift
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/90">
              Join hundreds of businesses already accepting crypto payments effortlessly.
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-white/75">
              Set up your ChainPay gateway in minutes and start transforming your payment experience immediately.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="group/btn gap-2 rounded-full px-7 shadow-xl transition-transform hover:scale-105"
              >
                Start Transacting Today
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-white/10 px-7 text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                Talk to Sales
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/70">
              <span>No setup fees</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Cancel anytime</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
