import { motion } from "motion/react";
import { ArrowRight, MapPin, Play, Layers, Radio, Users, Bus, Wallet } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pt-28 pb-24 lg:pt-36 lg:pb-32">
      {/* Dotted background */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(var(--primary) 0.7px, transparent 0.7px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy column */}
          <div className="lg:col-span-6 relative z-30">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              The operating system for education
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-[-0.03em] text-balance leading-[1.02] text-primary"
            >
              Every school
              <br />
              is a{" "}
              <span className="relative inline-block">
                <span className="text-accent italic font-serif" style={{ fontFamily: '"Instrument Serif", "Times New Roman", serif' }}>
                  living
                </span>
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 10"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                >
                  <motion.path
                    d="M2 6 Q60 1 198 6"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                </motion.svg>
              </span>
              <br />
              network.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty"
            >
              eSchool Link weaves every student, teacher, parent and office into
              one intelligent system — from a single classroom to a nation's
              education.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#invite"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold shadow-glow hover:shadow-glow-accent transition-all"
              >
                Contact sales
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#index"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-accent text-accent" />
                See the system
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-4 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                9.0°N · 38.7°E — Addis Ababa
              </div>
              <span className="h-3 w-px bg-border" />
              <div className="font-mono">v2.4 · uptime 99.98%</div>
            </motion.div>
          </div>

          {/* Network mesh column */}
          <div className="lg:col-span-6 relative h-[520px] lg:h-[600px]">
            <NetworkMesh />
          </div>
        </div>
      </div>
    </section>
  );
}

function NetworkMesh() {
  // Nodes positioned in percentage of container
  const nodes = [
    { id: "core", x: 50, y: 50, label: "OS Core", kind: "core" },
    { id: "a", x: 18, y: 22, icon: Users, label: "1,247 students", sub: "live · synced", color: "blue" },
    { id: "b", x: 82, y: 18, icon: Bus, label: "Bus 04", sub: "✓ 38 aboard", color: "orange" },
    { id: "c", x: 12, y: 72, icon: Radio, label: "Grade Sync", sub: "Active node", color: "success" },
    { id: "d", x: 84, y: 78, icon: Wallet, label: "Finance", sub: "12 reconciled", color: "blue" },
    { id: "e", x: 50, y: 8, icon: Layers, label: "Parent Portal", sub: "324 online", color: "orange", small: true },
  ] as const;

  return (
    <div className="relative w-full h-full">
      {/* Halo */}
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_75%)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-gradient-to-br from-blue-200/60 to-orange-200/50 blur-3xl" />
      </div>

      {/* SVG connection layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-blue" x1="0" x2="1">
            <stop offset="0" stopColor="#3387d7" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#3387d7" stopOpacity="0.6" />
            <stop offset="1" stopColor="#3387d7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="line-orange" x1="0" x2="1">
            <stop offset="0" stopColor="#e5813e" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#e5813e" stopOpacity="0.7" />
            <stop offset="1" stopColor="#e5813e" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="core-glow">
            <stop offset="0" stopColor="#0c539d" stopOpacity="0.35" />
            <stop offset="1" stopColor="#0c539d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit rings */}
        <circle cx="50" cy="50" r="22" fill="none" stroke="var(--border)" strokeWidth="0.15" strokeDasharray="0.6 0.8" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="var(--border)" strokeWidth="0.15" strokeDasharray="0.6 0.8" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" strokeWidth="0.15" strokeDasharray="0.6 0.8" />
        <circle cx="50" cy="50" r="18" fill="url(#core-glow)" />

        {nodes
          .filter((n) => n.id !== "core")
          .map((n, i) => (
            <g key={n.id}>
              <line
                x1="50"
                y1="50"
                x2={n.x}
                y2={n.y}
                stroke={i % 2 === 0 ? "url(#line-blue)" : "url(#line-orange)"}
                strokeWidth="0.25"
                strokeDasharray="0.8 0.6"
              />
              {/* Animated packet */}
              <motion.circle
                r="0.5"
                fill={i % 2 === 0 ? "#3387d7" : "#e5813e"}
                initial={{ cx: 50, cy: 50, opacity: 0 }}
                animate={{ cx: n.x, cy: n.y, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            </g>
          ))}
      </svg>

      {/* Core node */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="relative">
          <span className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl animate-pulse-ring" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center ring-8 ring-blue-50">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.18em] text-primary/70">
            eSchool · core
          </div>
        </div>
      </motion.div>

      {/* Node cards */}
      {nodes
        .filter((n) => n.id !== "core")
        .map((n, i) => (
          <NodeCard key={n.id} {...n} index={i} />
        ))}
    </div>
  );
}

type NodeCardProps = {
  x: number;
  y: number;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  sub?: string;
  color: "blue" | "orange" | "success";
  small?: boolean;
  index: number;
};

function NodeCard({ x, y, icon: Icon, label, sub, color, small, index }: NodeCardProps) {
  const rotations = [-4, 3, -2, 4, -3, 2];
  const rot = rotations[index % rotations.length];
  const accent =
    color === "orange"
      ? "text-accent bg-orange-50 border-orange-100"
      : color === "success"
      ? "text-success bg-emerald-50 border-emerald-100"
      : "text-primary bg-blue-50 border-blue-100";

  const dotBg = color === "orange" ? "bg-accent" : color === "success" ? "bg-success" : "bg-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
      className="absolute z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rot}deg)`,
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        className={`glass rounded-xl border shadow-card backdrop-blur-md ${
          small ? "px-2.5 py-1.5" : "px-3 py-2.5"
        } bg-card/90`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`flex items-center justify-center rounded-md border ${accent} ${small ? "w-6 h-6" : "w-8 h-8"}`}>
            {Icon ? <Icon className={small ? "h-3 w-3" : "h-4 w-4"} /> : <span className={`h-1.5 w-1.5 rounded-full ${dotBg}`} />}
          </div>
          <div className="leading-tight">
            <div className={`font-semibold ${small ? "text-[10px]" : "text-xs"} text-foreground`}>{label}</div>
            {sub && (
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className={`h-1 w-1 rounded-full ${dotBg}`} />
                {sub}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
