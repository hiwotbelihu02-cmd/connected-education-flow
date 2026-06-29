import { motion } from "motion/react";
import {
  Landmark, Building2, School, GraduationCap, Users, Heart,
} from "lucide-react";

type NodeDef = {
  id: string;
  label: string;
  sub?: string;
  icon: typeof School;
  x: number; // %
  y: number; // %
  tone: "primary" | "accent" | "neutral";
};

const NODES: NodeDef[] = [
  { id: "ministry", label: "Ministry of Education", sub: "Federal · Policy",   icon: Landmark,       x: 50, y: 6,  tone: "primary" },
  { id: "regionA",  label: "Addis Ababa Bureau",    sub: "Region · 412 schools", icon: Building2,    x: 18, y: 30, tone: "neutral" },
  { id: "regionB",  label: "Oromia Bureau",         sub: "Region · 1,208 schools", icon: Building2,  x: 82, y: 30, tone: "neutral" },
  { id: "schoolA",  label: "Unity Academy",         sub: "K-12 · 1,247 learners", icon: School,      x: 10, y: 60, tone: "primary" },
  { id: "schoolB",  label: "Hillside Secondary",    sub: "9-12 · 864 learners",   icon: School,      x: 50, y: 54, tone: "accent" },
  { id: "schoolC",  label: "Lighthouse TVET",       sub: "TVET · 512 learners",   icon: School,      x: 90, y: 60, tone: "primary" },
  { id: "teachers", label: "Teachers",              sub: "Marks · Attendance",    icon: Users,       x: 22, y: 90, tone: "neutral" },
  { id: "students", label: "Students",              sub: "Records · Submissions", icon: GraduationCap, x: 50, y: 96, tone: "primary" },
  { id: "parents",  label: "Parents",               sub: "Fees · Updates",        icon: Heart,       x: 78, y: 90, tone: "accent" },
];

const EDGES: [string, string][] = [
  ["ministry", "regionA"],
  ["ministry", "regionB"],
  ["regionA", "schoolA"],
  ["regionA", "schoolB"],
  ["regionB", "schoolB"],
  ["regionB", "schoolC"],
  ["schoolA", "teachers"],
  ["schoolB", "students"],
  ["schoolC", "parents"],
  ["schoolB", "teachers"],
  ["schoolB", "parents"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function HeroDiagram() {
  return (
    <div className="relative w-full h-full">
      {/* ambient grid */}
      <div
        className="absolute inset-0 rounded-3xl opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* ambient blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* SVG layer — edges + particles */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="edge-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.45" />
          </linearGradient>
          <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="particle-grad">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* static edges */}
        {EDGES.map(([from, to], i) => {
          const a = nodeById(from);
          const b = nodeById(to);
          return (
            <g key={`edge-${i}`}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="url(#edge-stroke)" strokeWidth="0.25"
                strokeLinecap="round"
              />
              <motion.line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="url(#edge-stroke)" strokeWidth="0.45"
                strokeLinecap="round" strokeDasharray="1.2 2.2"
                filter="url(#edge-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.9, 0.4] }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.18,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* traveling packets */}
        {EDGES.map(([from, to], i) => {
          const a = nodeById(from);
          const b = nodeById(to);
          return (
            <motion.circle
              key={`p-${i}`}
              r="0.9"
              fill="url(#particle-grad)"
              initial={{ cx: a.x, cy: a.y, opacity: 0 }}
              animate={{
                cx: [a.x, b.x],
                cy: [a.y, b.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.2,
                delay: 0.4 + i * 0.35,
                repeat: Infinity,
                repeatDelay: 2.2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Node cards layer */}
      {NODES.map((n, i) => (
        <NodeCard key={n.id} node={n} index={i} />
      ))}

      {/* corner status chip */}
      <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[10px] font-mono text-muted-foreground">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        live network · 11 nodes
      </div>
      <div className="absolute bottom-3 right-3 z-10 rounded-full glass px-2.5 py-1 text-[10px] font-mono text-muted-foreground">
        sync 99.98%
      </div>
    </div>
  );
}

function NodeCard({ node, index }: { node: NodeDef; index: number }) {
  const Icon = node.icon;
  const toneClasses =
    node.tone === "primary"
      ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
      : node.tone === "accent"
      ? "bg-card text-foreground border-accent/40 shadow-glow-accent"
      : "bg-card text-foreground border-border shadow-card";

  const iconWrap =
    node.tone === "primary"
      ? "bg-white/20 text-primary-foreground"
      : node.tone === "accent"
      ? "bg-orange-100 text-accent"
      : "bg-blue-50 text-primary";

  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -3, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: 0.1 + index * 0.07 },
        scale:   { duration: 0.5, delay: 0.1 + index * 0.07 },
        y: {
          duration: 5 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        },
      }}
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 backdrop-blur-md ${toneClasses}`}
      >
        <div className={`h-7 w-7 rounded-lg grid place-items-center shrink-0 ${iconWrap}`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="text-left pr-1">
          <div className="text-[11px] font-semibold leading-tight whitespace-nowrap">
            {node.label}
          </div>
          {node.sub && (
            <div className={`text-[9px] font-mono leading-tight whitespace-nowrap ${
              node.tone === "primary" ? "opacity-80" : "text-muted-foreground"
            }`}>
              {node.sub}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
