import { Paintbrush, ShieldCheck, Zap, Database, Check } from "lucide-react";

const features = [
  {
    title: "Advanced Payment Experiences",
    heading: "Advanced Payment Experiences Built Around Your Brand",
    desc: "Create seamless checkout experiences that reflect your brand identity and maintain customer trust throughout the payment journey.",
    icon: Paintbrush,
    accent: "from-blue-500 to-indigo-500",
    bullets: [
      "Add logos, colors, and brand messaging.",
      "Enable white-label payment experiences.",
      "Maintain a consistent customer experience.",
      "Customize hosted checkout interfaces."
    ]
  },
  {
    title: "Smart Re-Confirmation",
    heading: "Smart Re-Confirmation for Reliable Transactions",
    desc: "Every payment undergoes additional verification before completion to ensure accuracy and eliminate operational risks.",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-teal-500",
    bullets: [
      "Transaction hash verification.",
      "Amount validation.",
      "Partial payment detection.",
      "Double-spend protection."
    ]
  },
  {
    title: "Real-Time Payment Intelligence",
    heading: "Instant Payment Updates Through APIs & Webhooks",
    desc: "Receive immediate notifications when payments are detected, confirmed, or completed.",
    icon: Zap,
    accent: "from-violet-500 to-fuchsia-500",
    bullets: [
      "Webhook support.",
      "Real-time status updates.",
      "Subscription payment compatibility.",
      "Flexible backend integrations."
    ]
  },
  {
    title: "Custom Metadata",
    heading: "Attach Custom Data to Every Transaction",
    desc: "Connect blockchain payments directly to your internal systems using business-specific metadata.",
    icon: Database,
    accent: "from-sky-500 to-cyan-400",
    bullets: [
      "Order tracking.",
      "Customer references.",
      "Business reconciliation.",
      "Advanced reporting and analytics."
    ]
  }
] as const;

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={f.title} className="group relative h-full">
            {/* Glow halo */}
            <div
              className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${f.accent} opacity-30 blur-lg transition duration-500 group-hover:opacity-80 animate-tilt`}
            />
            <div
              className="relative flex h-full flex-col rounded-3xl border border-slate-200/60 bg-white/95 p-5 md:p-6 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 shadow-sm"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Icon Container */}
              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.accent} opacity-20 blur-md`}
                />
                <div
                  className={`relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${f.accent} text-white shadow-md`}
                >
                  <f.icon className="h-5.5 w-5.5" />
                </div>
              </div>

              {/* Title Badge / Category */}
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                {f.title}
              </span>

              {/* Main Heading */}
              <h3 className="text-base font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {f.heading}
              </h3>

              {/* Description */}
              <p className="text-[13px] leading-relaxed text-slate-500 mb-4 flex-1">
                {f.desc}
              </p>

              {/* Bullet Features */}
              <ul className="space-y-2 border-t border-slate-100 pt-4 mt-auto">
                {f.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-xs font-bold text-slate-600 leading-tight">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2 h-2" strokeWidth={3.5} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
