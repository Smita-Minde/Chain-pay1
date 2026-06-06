const stats = [
  { value: "$200M+", label: "Processed by January 2024" },
  { value: "3K+", label: "Processed by January 2024" },
  { value: "70+", label: "Merchants Globally" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="grid gap-4 rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 p-8 shadow-lg shadow-primary/10 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center justify-center gap-4 text-foreground">
            <div className="text-4xl font-bold md:text-5xl">{s.value}</div>
            <div className="max-w-[8rem] text-sm leading-snug text-foreground/90">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
