import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  IdCard,
  Fingerprint,
  CalendarRange,
  GraduationCap,
  Users,
  Wallet,
  Bus,
  Network,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

type Capability = {
  n: string;
  title: string;
  caption: string;
  Icon: React.ComponentType<{ className?: string }>;
  signal: { label: string; value: string; tone: "blue" | "orange" | "success" };
  events: { time: string; text: string; kind?: "in" | "out" | "alert" }[];
  meta: string;
};

const items: Capability[] = [
  {
    n: "01",
    title: "Student Records",
    caption: "Admission → Alumni",
    Icon: IdCard,
    signal: { label: "active learners", value: "12,481", tone: "blue" },
    events: [
      { time: "09:02", text: "Hana M. promoted to Grade 9-B", kind: "in" },
      { time: "08:54", text: "New admission · Bethel Academy", kind: "in" },
      { time: "08:41", text: "Transfer cleared · Yared → Unity", kind: "out" },
    ],
    meta: "ID · history · documents · guardians",
  },
  {
    n: "02",
    title: "Attendance & Presence",
    caption: "Gate → Register",
    Icon: Fingerprint,
    signal: { label: "checked-in today", value: "94.6%", tone: "success" },
    events: [
      { time: "07:58", text: "Gate-A pulse · 312 scans / 5 min", kind: "in" },
      { time: "08:03", text: "Late arrival flagged · 9-C", kind: "alert" },
      { time: "08:10", text: "Period 1 register auto-sealed", kind: "in" },
    ],
    meta: "biometric · QR · period-by-period",
  },
  {
    n: "03",
    title: "Calendar & Timetable",
    caption: "The academic year",
    Icon: CalendarRange,
    signal: { label: "live timetables", value: "184", tone: "blue" },
    events: [
      { time: "now", text: "Period 2 · Physics · Lab-2", kind: "in" },
      { time: "+45m", text: "Staff briefing · Room 104", kind: "in" },
      { time: "Fri", text: "Term assessments open", kind: "in" },
    ],
    meta: "rotations · holidays · exam windows",
  },
  {
    n: "04",
    title: "Assessment & Reports",
    caption: "Marks → Meaning",
    Icon: GraduationCap,
    signal: { label: "reports generated", value: "8,902", tone: "orange" },
    events: [
      { time: "09:14", text: "Mid-term marks synced · 9-A", kind: "in" },
      { time: "09:11", text: "Parent report dispatched · 7-B", kind: "out" },
      { time: "08:50", text: "Rubric updated · English Lit.", kind: "in" },
    ],
    meta: "rubrics · transcripts · analytics",
  },
  {
    n: "05",
    title: "Staff & HR Lifecycle",
    caption: "Recruit → Retire",
    Icon: Users,
    signal: { label: "on payroll", value: "1,206", tone: "blue" },
    events: [
      { time: "08:00", text: "Clock-in · 218 staff present", kind: "in" },
      { time: "yest.", text: "Leave approved · S. Tadesse", kind: "out" },
      { time: "Mon", text: "2 contracts up for renewal", kind: "alert" },
    ],
    meta: "contracts · leave · appraisals",
  },
  {
    n: "06",
    title: "Finance & Fees",
    caption: "Every birr in place",
    Icon: Wallet,
    signal: { label: "collected · term", value: "ETB 42.1M", tone: "success" },
    events: [
      { time: "09:18", text: "Fee receipt #20418 · 6,500 ETB", kind: "in" },
      { time: "09:12", text: "Supplier paid · Awash Books", kind: "out" },
      { time: "09:01", text: "3 invoices overdue · flagged", kind: "alert" },
    ],
    meta: "fees · payroll · ledger · audit",
  },
  {
    n: "07",
    title: "Transport & Safety",
    caption: "Every route, watched",
    Icon: Bus,
    signal: { label: "buses live", value: "12 / 12", tone: "orange" },
    events: [
      { time: "now", text: "Bus 04 · stop 3 of 4 · 38 aboard", kind: "in" },
      { time: "07:42", text: "Bus 09 · slight delay · 6 min", kind: "alert" },
      { time: "07:30", text: "All driver checks ✓", kind: "in" },
    ],
    meta: "GPS · boarding proof · SOS",
  },
  {
    n: "08",
    title: "Oversight across Branches",
    caption: "Branch → Network",
    Icon: Network,
    signal: { label: "campuses synced", value: "47", tone: "blue" },
    events: [
      { time: "09:20", text: "Bahir Dar campus · ledger sealed", kind: "in" },
      { time: "09:05", text: "Region report compiled · Oromia", kind: "out" },
      { time: "08:33", text: "Network sync · 99.97% uptime", kind: "in" },
    ],
    meta: "consolidation · benchmarks · policy",
  },
];

const toneClasses: Record<string, string> = {
  blue: "text-blue-600",
  orange: "text-orange-500",
  success: "text-success",
};

export function IndexSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (hovered !== null) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 3600);
    return () => clearInterval(id);
  }, [hovered]);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1400);
    return () => clearInterval(id);
  }, []);

  const current = items[hovered ?? active];

  return (
    <section id="index" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-gradient-to-br from-blue-200/40 to-orange-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-accent tracking-[0.3em] mb-3">
              02 — THE INDEX
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-[1.05]">
              Everything an institution does,{" "}
              <span className="relative">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  in one continuous record.
                </span>
              </span>
            </h2>
            <p className="mt-5 text-muted-foreground text-pretty max-w-xl">
              Eight surfaces. One spine. Every event a school produces — a
              scan, a mark, a payment, a route — lands on the same timeline,
              already addressed to the people who need it.
            </p>
          </div>

          <div className="flex items-center gap-3 glass rounded-full px-4 py-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="font-medium">live spine</span>
            <span className="text-muted-foreground">· streaming</span>
            <span className="font-mono text-muted-foreground">{String(pulse % 60).padStart(2, "0")}s</span>
          </div>
        </div>

        {/* the spine */}
        <div className="relative grid lg:grid-cols-12 gap-8">
          {/* left rail — capability spine */}
          <div className="lg:col-span-7 relative">
            {/* vertical spine */}
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-border" />
            <motion.div
              style={{ scaleY: lineProgress, transformOrigin: "top" }}
              className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-orange-400 to-blue-600"
            />

            <ul className="space-y-3">
              {items.map((it, i) => {
                const isActive = (hovered ?? active) === i;
                return (
                  <li
                    key={it.n}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(i)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: i * 0.04 }}
                      className={`group relative flex items-center gap-5 rounded-2xl pl-2 pr-4 py-3 cursor-pointer transition-all ${
                        isActive
                          ? "bg-card shadow-card border border-border"
                          : "border border-transparent hover:bg-card/60"
                      }`}
                    >
                      {/* node on spine */}
                      <div className="relative z-10 shrink-0">
                        <motion.div
                          animate={
                            isActive
                              ? { scale: [1, 1.15, 1], boxShadow: "var(--shadow-glow)" }
                              : { scale: 1 }
                          }
                          transition={{ duration: 1.4, repeat: isActive ? Infinity : 0 }}
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                            isActive
                              ? "bg-gradient-primary text-primary-foreground border-transparent"
                              : "bg-card text-foreground border-border"
                          }`}
                        >
                          <it.Icon className="h-6 w-6" />
                        </motion.div>
                        {isActive && (
                          <motion.span
                            layoutId="active-ring"
                            className="absolute -inset-1 rounded-2xl border-2 border-accent/60"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-muted-foreground tracking-widest">
                            {it.n}
                          </span>
                          <div className="h-px flex-1 bg-border/70" />
                          <span className={`text-xs font-medium ${toneClasses[it.signal.tone]}`}>
                            {it.signal.value}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:inline">
                            {it.signal.label}
                          </span>
                        </div>
                        <div className="mt-1 flex items-baseline gap-3">
                          <span className="text-lg font-semibold tracking-tight">
                            {it.title}
                          </span>
                          <span className="text-sm text-muted-foreground">{it.caption}</span>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={`h-4 w-4 shrink-0 transition-all ${
                          isActive
                            ? "text-accent translate-x-0.5 -translate-y-0.5"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* right — live console */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-border bg-card shadow-glow overflow-hidden"
            >
              {/* console header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
                  <span className="ml-3 text-xs font-mono text-muted-foreground">
                    spine://{current.title.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-accent" />
                  live
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.n}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground tracking-widest">
                        CAPABILITY {current.n}
                      </div>
                      <div className="mt-1 text-2xl font-semibold tracking-tight">
                        {current.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{current.caption}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${toneClasses[current.signal.tone]}`}>
                        {current.signal.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {current.signal.label}
                      </div>
                    </div>
                  </div>

                  {/* signal sparkline */}
                  <div className="mt-5 relative h-16 rounded-xl bg-muted/40 border border-border overflow-hidden">
                    <svg viewBox="0 0 300 64" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`spark-${current.n}`} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#3387d7" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#3387d7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        key={current.n + "-area"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        d={generateSpark(current.n)}
                        fill="none"
                        stroke="#3387d7"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path d={generateSparkArea(current.n)} fill={`url(#spark-${current.n})`} />
                    </svg>
                    <div className="absolute inset-0 grid grid-cols-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="border-r border-border/40 last:border-0" />
                      ))}
                    </div>
                  </div>

                  {/* event stream */}
                  <div className="mt-5 space-y-2">
                    {current.events.map((e, i) => (
                      <motion.div
                        key={current.n + e.time + i}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="flex items-center gap-3 text-sm rounded-lg px-3 py-2 bg-muted/40"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            e.kind === "alert"
                              ? "bg-warning"
                              : e.kind === "out"
                                ? "bg-accent"
                                : "bg-success"
                          }`}
                        />
                        <span className="font-mono text-[11px] text-muted-foreground w-12 shrink-0">
                          {e.time}
                        </span>
                        <span className="text-foreground/90 truncate">{e.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{current.meta}</span>
                    <span className="text-[11px] font-mono text-accent">↳ routed to 4 roles</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground px-2">
              <span>hover the spine to inspect</span>
              <span className="font-mono">
                {(hovered ?? active) + 1} / {items.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function generateSpark(seed: string): string {
  const s = seed.charCodeAt(0) + seed.charCodeAt(1);
  const pts: string[] = [];
  for (let i = 0; i <= 12; i++) {
    const x = (i / 12) * 300;
    const y = 32 + Math.sin(i * 0.7 + s) * 14 + Math.cos(i * 1.3 + s) * 6;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
function generateSparkArea(seed: string): string {
  return generateSpark(seed) + " L300,64 L0,64 Z";
}
