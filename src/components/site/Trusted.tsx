import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, ShieldCheck } from "lucide-react";

type School = {
  code: string;
  name: string;
  meta: string;
  tier: "Primary" | "Secondary" | "Preparatory" | "TVET" | "Private" | "Bureau";
  region: string;
  // map position in viewBox 0-100
  x: number;
  y: number;
};

const schools: School[] = [
  { code: "BS", name: "Bole Secondary School",      meta: "Addis Ababa",   tier: "Secondary",   region: "Addis Ababa", x: 52, y: 56 },
  { code: "UA", name: "Unity Academy",              meta: "Adama",         tier: "Private",     region: "Oromia",      x: 60, y: 60 },
  { code: "OE", name: "Oromia Education Bureau",    meta: "Regional Bureau", tier: "Bureau",    region: "Oromia",      x: 48, y: 64 },
  { code: "HM", name: "Hawassa Model School",       meta: "Hawassa",       tier: "Secondary",   region: "SNNPR",       x: 48, y: 78 },
  { code: "MT", name: "Mekelle TVET College",       meta: "Tigray",        tier: "TVET",        region: "Tigray",      x: 56, y: 22 },
  { code: "SM", name: "St. Mary's International",   meta: "Addis Ababa",   tier: "Private",     region: "Addis Ababa", x: 50, y: 54 },
  { code: "BD", name: "Bahir Dar Cluster",          meta: "Amhara",        tier: "Bureau",      region: "Amhara",      x: 44, y: 34 },
  { code: "DD", name: "Dire Dawa Administration",   meta: "City admin",    tier: "Bureau",      region: "Dire Dawa",   x: 70, y: 38 },
  { code: "AS", name: "Adama Science Prep",         meta: "Adama",         tier: "Preparatory", region: "Oromia",      x: 58, y: 58 },
  { code: "GP", name: "Gondar Primary School",      meta: "Amhara",        tier: "Primary",     region: "Amhara",      x: 46, y: 24 },
  { code: "JU", name: "Jimma University High",      meta: "Jimma",         tier: "Secondary",   region: "Oromia",      x: 32, y: 66 },
  { code: "SE", name: "SNNPR Education Bureau",     meta: "Regional",      tier: "Bureau",      region: "SNNPR",       x: 40, y: 80 },
  { code: "HA", name: "Harar Academy",              meta: "Harar",         tier: "Private",     region: "Harari",      x: 74, y: 50 },
  { code: "WS", name: "Wolaita Sodo School",        meta: "Wolaita",       tier: "Secondary",   region: "SNNPR",       x: 42, y: 76 },
  { code: "NC", name: "Nazareth College",           meta: "Adama",         tier: "Preparatory", region: "Oromia",      x: 56, y: 60 },
  { code: "TR", name: "Tigray Regional Cluster",    meta: "Tigray",        tier: "Bureau",      region: "Tigray",      x: 52, y: 18 },
  { code: "DB", name: "Debre Birhan Primary",       meta: "Amhara",        tier: "Primary",     region: "Amhara",      x: 56, y: 38 },
  { code: "AM", name: "Arba Minch Model",           meta: "Arba Minch",    tier: "Secondary",   region: "SNNPR",       x: 38, y: 84 },
];

const tiers = ["Every tier", "Primary", "Secondary", "Preparatory", "TVET", "Private", "Bureau"] as const;

export function Trusted() {
  const [filter, setFilter] = useState<(typeof tiers)[number]>("Every tier");
  const [active, setActive] = useState<string>("BS");

  const visible = schools.filter((s) => filter === "Every tier" || s.tier === filter);
  const activeSchool = schools.find((s) => s.code === active)!;

  return (
    <section id="trusted" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-background" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-xs font-mono text-accent tracking-widest mb-3">06 — TRUSTED</div>
        <div className="flex items-end justify-between gap-8 flex-wrap mb-10">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance max-w-3xl">
            From a single campus to a{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">national bureau.</span>
          </h2>
          <p className="text-muted-foreground max-w-md text-pretty">
            The same authoritative record — whether it serves one school in Hawassa or a region of them across Amhara.
          </p>
        </div>

        {/* stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            ["6",  "Education tiers"],
            ["11", "Regional states"],
            ["8",  "Connected capabilities"],
            ["1",  "Continuous record"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-card/70 backdrop-blur p-5">
              <div className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">{n}</div>
              <div className="text-xs text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                filter === t
                  ? "bg-foreground text-background border-foreground shadow-card"
                  : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT — interactive map */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[5/4] rounded-3xl border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-card">
              {/* grid bg */}
              <div className="absolute inset-0 grid-bg opacity-40" />

              {/* topographic Ethiopia silhouette */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#3387d7" stopOpacity="0.10" />
                    <stop offset="1" stopColor="#e5813e" stopOpacity="0.10" />
                  </linearGradient>
                  <radialGradient id="pinGlow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#e5813e" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#e5813e" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* abstract Ethiopia-ish polygon */}
                <path
                  d="M30,28 L42,18 L58,16 L70,22 L78,32 L82,46 L78,60 L72,72 L62,84 L48,90 L36,86 L28,76 L22,62 L20,46 L24,36 Z"
                  fill="url(#land)"
                  stroke="#0c539d" strokeOpacity="0.25" strokeWidth="0.3"
                  strokeDasharray="0.8 0.8"
                />
                {/* region dividers */}
                <path d="M30,28 L78,32 M22,62 L78,60 M48,16 L48,90 M70,22 L62,84" stroke="#0c539d" strokeOpacity="0.10" strokeWidth="0.2" />

                {/* connection lines from each visible school to active */}
                {visible.map((s) => (
                  <line key={`l-${s.code}`}
                    x1={activeSchool.x} y1={activeSchool.y}
                    x2={s.x} y2={s.y}
                    stroke="#3387d7"
                    strokeOpacity={s.code === activeSchool.code ? 0 : 0.15}
                    strokeWidth="0.15" />
                ))}

                {/* glow under active */}
                <circle cx={activeSchool.x} cy={activeSchool.y} r="6" fill="url(#pinGlow)" />
              </svg>

              {/* school pins */}
              {visible.map((s) => {
                const isActive = s.code === active;
                return (
                  <motion.button
                    key={s.code}
                    layout
                    onMouseEnter={() => setActive(s.code)}
                    onClick={() => setActive(s.code)}
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    whileHover={{ scale: 1.15, zIndex: 20 }}
                  >
                    {isActive && (
                      <span className="absolute -inset-3 rounded-full bg-accent/30 animate-pulse-ring" />
                    )}
                    <div className={`relative h-9 w-9 rounded-xl grid place-items-center text-[10px] font-bold border transition-all ${
                      isActive
                        ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow scale-110"
                        : "bg-card text-foreground border-border group-hover:border-accent shadow-card"
                    }`}>
                      {s.code}
                      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rotate-45 ${
                        isActive ? "bg-primary" : "bg-card border-r border-b border-border"
                      }`} />
                    </div>
                  </motion.button>
                );
              })}

              {/* legend chip */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] text-muted-foreground glass px-3 py-1.5 rounded-full">
                <MapPin className="h-3 w-3 text-accent" />
                Ethiopia · 12 regional administrations
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] text-success glass px-3 py-1.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                {visible.length} schools live
              </div>
            </div>
          </div>

          {/* RIGHT — active school detail + cohort list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <motion.div
              key={activeSchool.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-card relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-blue-300/30 to-orange-300/30 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-glow">
                    {activeSchool.code}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                      {activeSchool.tier} · {activeSchool.region}
                    </div>
                    <div className="text-lg font-bold tracking-tight">{activeSchool.name}</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[
                    ["1,247", "learners"],
                    ["84",    "educators"],
                    ["98%",   "sync"],
                  ].map(([n, l]) => (
                    <div key={l} className="rounded-xl bg-muted/60 py-3">
                      <div className="text-base font-bold">{n}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-success">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Federated · authoritative record shared with regional bureau
                </div>
              </div>
            </motion.div>

            {/* cohort scroll list */}
            <div className="rounded-3xl border border-border bg-card/70 backdrop-blur p-2 max-h-[280px] overflow-y-auto">
              <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground font-mono flex items-center justify-between">
                <span>Cohort {filter === "Every tier" ? "· all tiers" : `· ${filter}`}</span>
                <span>{visible.length}</span>
              </div>
              <div className="divide-y divide-border">
                {visible.map((s) => (
                  <button
                    key={s.code}
                    onMouseEnter={() => setActive(s.code)}
                    onClick={() => setActive(s.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      active === s.code ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-lg grid place-items-center text-[10px] font-bold shrink-0 ${
                      active === s.code
                        ? "bg-gradient-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}>
                      {s.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate">{s.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{s.tier} · {s.region}</div>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto text-pretty">
          First cohorts onboarding by region — the same authoritative record,
          whether it serves one school or a thousand.
        </p>
      </div>
    </section>
  );
}
