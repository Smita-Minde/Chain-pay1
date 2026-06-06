import Link from "next/link";
import { Code2, Webhook, Beaker, Library } from "lucide-react";

const features = [
  { to: "/products", icon: Code2, title: "RESTful APIs", desc: "Easy to integrate and well documented" },
  { to: "/products", icon: Webhook, title: "Webhooks", desc: "Real-time event notifications" },
  { to: "/developers", icon: Beaker, title: "Sandbox", desc: "Test your integration safely" },
  { to: "/developers", icon: Library, title: "SDKs & Libraries", desc: "Multiple languages supported" },
] as const;

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Link key={f.title}
            href={f.to}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
