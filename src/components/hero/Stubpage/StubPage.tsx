import Link from "next/link";
import { InteractiveBackground } from "@/components/hero/InteractiveBackground/InteractiveBackground";
import { Button } from "@/components/ui/button";

export function StubPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveBackground />
      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          {title}
        </div>
        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{description}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
