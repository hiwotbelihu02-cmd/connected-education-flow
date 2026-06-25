const schools = [
  ["BS", "Bole Secondary School", "Secondary · Addis Ababa"],
  ["UA", "Unity Academy", "Private K–12 · Adama"],
  ["OE", "Oromia Education Bureau", "Regional Bureau"],
  ["HM", "Hawassa Model School", "Secondary · Hawassa"],
  ["MT", "Mekelle TVET College", "TVET · Tigray"],
  ["SM", "St. Mary's International", "Private · Addis Ababa"],
  ["BD", "Bahir Dar Cluster", "School cluster · Amhara"],
  ["DD", "Dire Dawa Administration", "City administration"],
  ["AS", "Adama Science Prep", "Preparatory · Adama"],
  ["GP", "Gondar Primary School", "Primary · Amhara"],
  ["JU", "Jimma University High", "Secondary · Jimma"],
  ["SE", "SNNPR Education Bureau", "Regional Bureau"],
  ["HA", "Harar Academy", "Private · Harar"],
  ["WS", "Wolaita Sodo School", "Secondary · Wolaita"],
  ["NC", "Nazareth College", "Preparatory · Adama"],
  ["TR", "Tigray Regional Cluster", "School cluster · Tigray"],
];

const tags = ["Every tier", "Primary", "Secondary", "Preparatory", "TVET", "Private", "Regional Bureau"];

export function Trusted() {
  const row1 = [...schools, ...schools];
  return (
    <section id="trusted" className="relative py-24 lg:py-32 bg-muted/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className="text-xs font-mono text-accent tracking-widest mb-3">06 — TRUSTED</div>
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-2xl">
            From a single campus to a national bureau.
          </h2>
          <p className="text-muted-foreground max-w-md text-pretty">
            Built to carry every tier of education — the same authoritative record whether it serves one school or a region of them.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          {[
            ["6", "Education tiers"],
            ["11", "Regional states"],
            ["8", "Connected capabilities"],
            ["1", "Continuous record"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl border border-border bg-card p-4">
              <div className="text-2xl font-bold">{n}</div>
              <div className="text-xs text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={t}
              className={`text-xs px-3 py-1.5 rounded-full border ${
                i === 0
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-foreground transition-colors cursor-default"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/40 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/40 to-transparent z-10" />
        <div className="flex gap-4 animate-marquee w-max">
          {row1.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 min-w-[280px]"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center text-xs font-bold">
                {s[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{s[1]}</div>
                <div className="text-xs text-muted-foreground">{s[2]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-10 px-4">
        First cohorts onboarding by region — the same authoritative record, whether it serves one school or a thousand.
      </p>
    </section>
  );
}
