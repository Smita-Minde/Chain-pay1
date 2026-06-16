import Link from "next/link";
import { Code2, Webhook, Beaker, Library } from "lucide-react";

const features = [
  { to: "/products", icon: Code2, title: "RESTful APIs", accent: "from-blue-500 to-indigo-500", desc: "Easy to integrate and well documented" },
  { to: "/products", icon: Webhook, title: "Webhooks", accent: "from-violet-500 to-fuchsia-500", desc: "Real-time event notifications" },
  { to: "/developers", icon: Beaker, title: "Sandbox", accent: "from-sky-500 to-cyan-400", desc: "Test your integration safely" },
  { to: "/developers", icon: Library, title: "SDKs & Libraries", accent: "from-blue-500 to-indigo-500", desc: "Multiple languages supported" },
] as const;

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={f.title} className="group relative">
            {/* Glow halo */}
            <div
              className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${f.accent} opacity-30 blur-lg transition duration-500 group-hover:opacity-80 animate-tilt`}
            />
            <div
              className="relative flex h-full flex-col rounded-3xl border border-border/60 bg-card/90 p-6 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 shadow-sm"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <f.icon className="absolute right-6 top-6 h-10 w-10 text-primary/15" />

              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Link
                    key={idx}
                    href={f.to}
                    className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  />
                ))}
              </div>

              <p className="relative mt-5 flex-1 text-[15px] leading-relaxed text-foreground/80">
                “{f.desc}”
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${f.accent} opacity-60 blur-md`}
                  />
                  <div
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${f.accent} text-sm font-bold text-white shadow-lg`}
                  >
                    <f.icon className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.to}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
