import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  GraduationCap, Users, BookOpen, Building2,
  Wallet, Landmark, Bus, Heart, ArrowRight,
} from "lucide-react";

type Role = {
  key: string;
  label: string;
  icon: typeof Users;
  count: string;
  tone: "blue" | "orange";
};

const roles: Role[] = [
  { key: "students",   label: "Students",         icon: GraduationCap, count: "1,247", tone: "blue" },
  { key: "teachers",   label: "Teachers",         icon: Users,         count: "84",    tone: "orange" },
  { key: "leaders",    label: "Academic Leaders", icon: BookOpen,      count: "12",    tone: "blue" },
  { key: "admins",     label: "Administrators",   icon: Building2,     count: "9",     tone: "orange" },
  { key: "finance",    label: "Finance",          icon: Wallet,        count: "4",     tone: "blue" },
  { key: "government", label: "Government",       icon: Landmark,      count: "2",     tone: "orange" },
  { key: "transport",  label: "Transport",        icon: Bus,           count: "12",    tone: "blue" },
  { key: "parents",    label: "Parents",          icon: Heart,         count: "2,103", tone: "orange" },
];

// Sample exchanges between roles
const flows: Record<string, { to: string; carries: string }[]> = {
  students:   [{ to: "teachers", carries: "Attendance · Submissions" }, { to: "parents", carries: "Reports · Updates" }, { to: "transport", carries: "Boarding proof" }],
  teachers:   [{ to: "students", carries: "Marks · Feedback" }, { to: "leaders", carries: "Lesson plans" }, { to: "parents", carries: "Behavior notes" }],
  leaders:    [{ to: "teachers", carries: "Timetable · Standards" }, { to: "admins", carries: "Academic calendar" }, { to: "government", carries: "Curriculum reports" }],
  admins:     [{ to: "leaders", carries: "Staffing · HR" }, { to: "finance", carries: "Budgets" }, { to: "government", carries: "Compliance" }],
  finance:    [{ to: "parents", carries: "Fees · Receipts" }, { to: "admins", carries: "Payroll" }, { to: "government", carries: "Audit trail" }],
  government: [{ to: "leaders", carries: "Policy · Standards" }, { to: "admins", carries: "Inspections" }, { to: "finance", carries: "Subsidies" }],
  transport:  [{ to: "students", carries: "Routes · Pickup" }, { to: "parents", carries: "Live location" }, { to: "admins", carries: "Fleet status" }],
  parents:    [{ to: "students", carries: "Permissions · Pickup" }, { to: "teachers", carries: "Messages" }, { to: "finance", carries: "Payments" }],
};

const POS: Record<string, { x: number; y: number }> = {
  students:   { x: 50, y:  8 },
  teachers:   { x: 86, y: 22 },
  leaders:    { x: 96, y: 56 },
  admins:     { x: 80, y: 86 },
  finance:    { x: 50, y: 96 },
  government: { x: 20, y: 86 },
  transport:  { x:  4, y: 56 },
  parents:    { x: 14, y: 22 },
};

export function Ecosystem() {
  const [active, setActive] = useState<string>("students");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setActive((cur) => {
        const i = roles.findIndex((r) => r.key === cur);
        return roles[(i + 1) % roles.length].key;
      });
    }, 2800);
    return () => clearInterval(id);
  }, [auto]);

  const activeRole = roles.find((r) => r.key === active)!;
  const activeFlows = flows[active] ?? [];
  const connectedKeys = new Set(activeFlows.map((f) => f.to));
  const center = { x: 50, y: 50 };
  const fromPos = POS[active];

  return (
    <section id="ecosystem" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ambient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-300/20 to-orange-300/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <div className="text-xs font-mono text-accent tracking-widest mb-3">03 — THE ECOSYSTEM</div>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
            Eight roles.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              One nervous system.
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-pretty">
            A school is a constant exchange between the people who run it.
            Trace any role to see exactly what eSchool Link carries between them.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT — interactive node graph */}
          <div
            className="lg:col-span-8 relative"
            onMouseEnter={() => setAuto(false)}
            onMouseLeave={() => setAuto(true)}
          >
            <div className="relative aspect-square max-w-2xl mx-auto">
              {/* concentric depth rings */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="ring-grad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#3387d7" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#3387d7" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="edge" x1="0" x2="1">
                    <stop offset="0" stopColor="#0c539d" stopOpacity="0.15" />
                    <stop offset="1" stopColor="#e5813e" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="edge-active" x1="0" x2="1">
                    <stop offset="0" stopColor="#e5813e" />
                    <stop offset="1" stopColor="#3387d7" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.8" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* depth rings */}
                {[44, 36, 28, 18].map((r, i) => (
                  <circle key={r} cx="50" cy="50" r={r}
                    fill="none" stroke="url(#ring-grad)"
                    strokeWidth={i === 0 ? 0.4 : 0.2}
                    strokeDasharray={i % 2 ? "0.6 1" : "none"} />
                ))}

                {/* idle spokes */}
                {roles.map((r) => {
                  const p = POS[r.key];
                  return (
                    <line key={`spoke-${r.key}`}
                      x1={center.x} y1={center.y} x2={p.x} y2={p.y}
                      stroke="url(#edge)" strokeWidth="0.25" />
                  );
                })}

                {/* active connections with animated dashes */}
                <AnimatePresence>
                  {activeFlows.map((f, i) => {
                    const to = POS[f.to];
                    return (
                      <motion.line
                        key={`${active}-${f.to}`}
                        x1={fromPos.x} y1={fromPos.y} x2={to.x} y2={to.y}
                        stroke="url(#edge-active)" strokeWidth="0.5"
                        strokeDasharray="1 1.4" strokeLinecap="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                      />
                    );
                  })}
                </AnimatePresence>

                {/* traveling packet on each active edge */}
                {activeFlows.map((f, i) => {
                  const to = POS[f.to];
                  return (
                    <motion.circle
                      key={`packet-${active}-${f.to}`}
                      r="0.9" fill="#e5813e" filter="url(#glow)"
                      initial={{ cx: fromPos.x, cy: fromPos.y, opacity: 0 }}
                      animate={{
                        cx: [fromPos.x, to.x],
                        cy: [fromPos.y, to.y],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.6,
                        delay: i * 0.25,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </svg>

              {/* center core */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="relative h-24 w-24 rounded-3xl bg-gradient-primary grid place-items-center shadow-glow">
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30" />
                  <div className="absolute -inset-3 rounded-[2rem] border border-primary/30 animate-pulse-ring" />
                  <div className="text-center text-primary-foreground">
                    <div className="text-[9px] uppercase tracking-widest opacity-80">core</div>
                    <div className="text-sm font-bold leading-tight">eSchool<br/>Link</div>
                  </div>
                </div>
              </motion.div>

              {/* role nodes */}
              {roles.map((r) => {
                const p = POS[r.key];
                const isActive = r.key === active;
                const isConnected = connectedKeys.has(r.key);
                const Icon = r.icon;
                return (
                  <motion.button
                    key={r.key}
                    onMouseEnter={() => { setAuto(false); setActive(r.key); }}
                    onClick={() => setActive(r.key)}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                    whileHover={{ scale: 1.06 }}
                  >
                    <div className={`relative rounded-2xl transition-all duration-500 ${
                      isActive
                        ? "shadow-glow-accent scale-110"
                        : isConnected
                        ? "shadow-card"
                        : "opacity-70"
                    }`}>
                      {/* outer halo */}
                      {isActive && (
                        <span className="absolute -inset-2 rounded-2xl bg-accent/20 blur-md" />
                      )}
                      <div className={`relative flex items-center gap-2 rounded-2xl px-3 py-2 border backdrop-blur-md ${
                        isActive
                          ? "bg-gradient-primary text-primary-foreground border-transparent"
                          : "bg-card/90 border-border hover:border-accent"
                      }`}>
                        <div className={`h-7 w-7 rounded-lg grid place-items-center shrink-0 ${
                          isActive
                            ? "bg-white/20"
                            : r.tone === "blue"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] font-semibold leading-tight whitespace-nowrap">{r.label}</div>
                          <div className={`text-[9px] font-mono leading-tight ${isActive ? "opacity-80" : "text-muted-foreground"}`}>
                            {r.count}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — flow inspector */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-border bg-card/70 backdrop-blur-md p-6 shadow-card sticky top-28">
              <div className="flex items-center justify-between mb-5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  Live trace
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-success">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  streaming
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow">
                      <activeRole.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">As a</div>
                      <div className="text-xl font-bold tracking-tight">{activeRole.label}</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {activeFlows.map((f, i) => {
                      const target = roles.find((r) => r.key === f.to)!;
                      const TIcon = target.icon;
                      return (
                        <motion.div
                          key={f.to}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-3 rounded-xl bg-muted/60 px-3 py-2.5 group hover:bg-muted transition"
                        >
                          <div className="text-[10px] font-mono text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</div>
                          <ArrowRight className="h-3 w-3 text-accent shrink-0" />
                          <div className="h-7 w-7 rounded-lg bg-card grid place-items-center shrink-0">
                            <TIcon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold truncate">{target.label}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{f.carries}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span>18 live relationships</span>
                <span className="font-mono text-foreground">{auto ? "auto" : "manual"}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-16 max-w-2xl mx-auto text-pretty">
          <span className="text-foreground font-medium">Every one of these signals</span>, today,
          still lives in paper, in WhatsApp, or in someone's memory.
        </p>
      </div>
    </section>
  );
}
