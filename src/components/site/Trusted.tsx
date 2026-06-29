import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { MapPin, ShieldCheck } from "lucide-react";
import {
  ethRegions,
  ethPoints,
  ETH_VBW,
  ETH_VBH,
} from "@/data/ethiopiaMap";

type RegionId =
  | "ETAA"
  | "ETAF"
  | "ETAM"
  | "ETBE"
  | "ETDD"
  | "ETGA"
  | "ETHA"
  | "ETOR"
  | "ETSN"
  | "ETSO"
  | "ETTI";

type School = {
  code: string;
  name: string;
  meta: string;
  tier: "Primary" | "Secondary" | "Preparatory" | "TVET" | "Private" | "Bureau";
  region: string;
  regionId: RegionId;
};

const schools: School[] = [
  { code: "BS", name: "Bole Secondary School",      meta: "Addis Ababa",     tier: "Secondary",   region: "Addis Ababa", regionId: "ETAA" },
  { code: "SM", name: "St. Mary's International",   meta: "Addis Ababa",     tier: "Private",     region: "Addis Ababa", regionId: "ETAA" },
  { code: "UA", name: "Unity Academy",              meta: "Adama",           tier: "Private",     region: "Oromia",      regionId: "ETOR" },
  { code: "OE", name: "Oromia Education Bureau",    meta: "Regional Bureau", tier: "Bureau",      region: "Oromia",      regionId: "ETOR" },
  { code: "AS", name: "Adama Science Prep",         meta: "Adama",           tier: "Preparatory", region: "Oromia",      regionId: "ETOR" },
  { code: "JU", name: "Jimma University High",      meta: "Jimma",           tier: "Secondary",   region: "Oromia",      regionId: "ETOR" },
  { code: "NC", name: "Nazareth College",           meta: "Adama",           tier: "Preparatory", region: "Oromia",      regionId: "ETOR" },
  { code: "HM", name: "Hawassa Model School",       meta: "Hawassa",         tier: "Secondary",   region: "SNNPR",       regionId: "ETSN" },
  { code: "SE", name: "SNNPR Education Bureau",     meta: "Regional",        tier: "Bureau",      region: "SNNPR",       regionId: "ETSN" },
  { code: "WS", name: "Wolaita Sodo School",        meta: "Wolaita",         tier: "Secondary",   region: "SNNPR",       regionId: "ETSN" },
  { code: "AM", name: "Arba Minch Model",           meta: "Arba Minch",      tier: "Secondary",   region: "SNNPR",       regionId: "ETSN" },
  { code: "MT", name: "Mekelle TVET College",       meta: "Tigray",          tier: "TVET",        region: "Tigray",      regionId: "ETTI" },
  { code: "TR", name: "Tigray Regional Cluster",    meta: "Tigray",          tier: "Bureau",      region: "Tigray",      regionId: "ETTI" },
  { code: "BD", name: "Bahir Dar Cluster",          meta: "Amhara",          tier: "Bureau",      region: "Amhara",      regionId: "ETAM" },
  { code: "GP", name: "Gondar Primary School",      meta: "Amhara",          tier: "Primary",     region: "Amhara",      regionId: "ETAM" },
  { code: "DB", name: "Debre Birhan Primary",       meta: "Amhara",          tier: "Primary",     region: "Amhara",      regionId: "ETAM" },
  { code: "DD", name: "Dire Dawa Administration",   meta: "City admin",      tier: "Bureau",      region: "Dire Dawa",   regionId: "ETDD" },
  { code: "HA", name: "Harar Academy",              meta: "Harar",           tier: "Private",     region: "Harari",      regionId: "ETHA" },
];

const tiers = ["Every tier", "Primary", "Secondary", "Preparatory", "TVET", "Private", "Bureau"] as const;

// scatter offsets so multiple pins in one region don't collide
function offsetFor(i: number, total: number): { dx: number; dy: number } {
  if (total <= 1) return { dx: 0, dy: 0 };
  const r = 22; // viewBox units
  const a = (i / total) * Math.PI * 2;
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r };
}

type Positioned = School & { x: number; y: number };

function positionSchools(list: School[]): Positioned[] {
  const byRegion = new Map<string, School[]>();
  list.forEach((s) => {
    const arr = byRegion.get(s.regionId) ?? [];
    arr.push(s);
    byRegion.set(s.regionId, arr);
  });
  const out: Positioned[] = [];
  byRegion.forEach((arr, rid) => {
    const center = ethPoints.find((p) => p.id === rid);
    if (!center) return;
    arr.forEach((s, i) => {
      const { dx, dy } = offsetFor(i, arr.length);
      out.push({ ...s, x: center.x + dx, y: center.y + dy });
    });
  });
  return out;
}

export function Trusted() {
  const [filter, setFilter] = useState<(typeof tiers)[number]>("Every tier");
  const [active, setActive] = useState<string>("BS");

  const visible = useMemo(
    () => positionSchools(schools.filter((s) => filter === "Every tier" || s.tier === filter)),
    [filter]
  );
  const activeSchool =
    visible.find((s) => s.code === active) ??
    positionSchools(schools).find((s) => s.code === active)!;

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
          {/* LEFT — Ethiopian map */}
          <div className="lg:col-span-7 relative">
            <div
              className="relative rounded-3xl border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-card"
              style={{ aspectRatio: `${ETH_VBW} / ${ETH_VBH}` }}
            >
              <div className="absolute inset-0 grid-bg opacity-40" />

              <svg
                viewBox={`0 0 ${ETH_VBW} ${ETH_VBH}`}
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="ethLand" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#3387d7" stopOpacity="0.12" />
                    <stop offset="1" stopColor="#e5813e" stopOpacity="0.10" />
                  </linearGradient>
                  <linearGradient id="ethActiveLand" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#3387d7" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#e5813e" stopOpacity="0.30" />
                  </linearGradient>
                  <radialGradient id="ethPinGlow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#e5813e" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#e5813e" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* regions */}
                <g>
                  {ethRegions.map((r) => {
                    const isActive = r.id === activeSchool.regionId;
                    return (
                      <path
                        key={r.id}
                        d={r.d}
                        fill={isActive ? "url(#ethActiveLand)" : "url(#ethLand)"}
                        stroke="#0c539d"
                        strokeOpacity={isActive ? 0.55 : 0.28}
                        strokeWidth={isActive ? 1.2 : 0.7}
                        strokeLinejoin="round"
                      />
                    );
                  })}
                </g>

                {/* connection lines from each visible pin to the active one */}
                <g>
                  {visible.map((s) =>
                    s.code === activeSchool.code ? null : (
                      <line
                        key={`l-${s.code}`}
                        x1={activeSchool.x}
                        y1={activeSchool.y}
                        x2={s.x}
                        y2={s.y}
                        stroke="#3387d7"
                        strokeOpacity="0.22"
                        strokeWidth="0.9"
                        strokeDasharray="3 3"
                      />
                    )
                  )}
                </g>

                {/* glow under active */}
                <circle
                  cx={activeSchool.x}
                  cy={activeSchool.y}
                  r="48"
                  fill="url(#ethPinGlow)"
                />
              </svg>

              {/* school pins (HTML over SVG for hover/buttons) */}
              {visible.map((s) => {
                const isActive = s.code === active;
                return (
                  <motion.button
                    key={s.code}
                    layout
                    onMouseEnter={() => setActive(s.code)}
                    onClick={() => setActive(s.code)}
                    style={{
                      left: `${(s.x / ETH_VBW) * 100}%`,
                      top: `${(s.y / ETH_VBH) * 100}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    whileHover={{ scale: 1.15, zIndex: 20 }}
                  >
                    {isActive && (
                      <span className="absolute -inset-3 rounded-full bg-accent/30 animate-pulse-ring" />
                    )}
                    <div
                      className={`relative h-8 w-8 rounded-xl grid place-items-center text-[10px] font-bold border transition-all ${
                        isActive
                          ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow scale-110"
                          : "bg-card text-foreground border-border group-hover:border-accent shadow-card"
                      }`}
                    >
                      {s.code}
                      <div
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rotate-45 ${
                          isActive ? "bg-primary" : "bg-card border-r border-b border-border"
                        }`}
                      />
                    </div>
                  </motion.button>
                );
              })}

              {/* region labels (subtle) */}
              <svg
                viewBox={`0 0 ${ETH_VBW} ${ETH_VBH}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
              >
                {ethPoints
                  .filter((p) => p.major)
                  .map((p) => (
                    <text
                      key={p.id}
                      x={p.x}
                      y={p.y - 28}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      style={{ fontSize: 12, letterSpacing: 1.2, opacity: 0.55 }}
                    >
                      {p.name.toUpperCase()}
                    </text>
                  ))}
              </svg>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] text-muted-foreground glass px-3 py-1.5 rounded-full">
                <MapPin className="h-3 w-3 text-accent" />
                Ethiopia · 11 regional administrations
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
