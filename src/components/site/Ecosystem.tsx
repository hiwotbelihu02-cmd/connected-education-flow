import { motion } from "motion/react";
import { useState } from "react";

const roles = [
  "Students", "Teachers", "Academic Leaders", "Administrators",
  "Finance", "Government", "Transport", "Parents",
];

export function Ecosystem() {
  const [active, setActive] = useState<number | null>(null);
  const cx = 50, cy = 50, r = 38;
  return (
    <section id="ecosystem" className="relative py-24 lg:py-32 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <div className="text-xs font-mono text-accent tracking-widest mb-3">03 — THE ECOSYSTEM</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Eight roles.<br />One nervous system.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-pretty">
            A school is a constant exchange between the people who run it. Trace any role to see what eSchool Link carries between them.
          </p>
        </div>

        <div className="relative mx-auto aspect-square max-w-2xl">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="link" x1="0" x2="1">
                <stop offset="0" stopColor="#3387d7" stopOpacity="0.4" />
                <stop offset="1" stopColor="#e5813e" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {roles.map((_, i) => {
              const a = (i / roles.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + r * Math.cos(a);
              const y = cy + r * Math.sin(a);
              return (
                <g key={i}>
                  <line x1={cx} y1={cy} x2={x} y2={y} stroke="url(#link)"
                    strokeWidth={active === i ? 0.6 : 0.25}
                    className="transition-all" />
                </g>
              );
            })}
            {active !== null && roles.map((_, j) => {
              if (j === active) return null;
              const a1 = (active / roles.length) * Math.PI * 2 - Math.PI / 2;
              const a2 = (j / roles.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <line key={j}
                  x1={cx + r * Math.cos(a1)} y1={cy + r * Math.sin(a1)}
                  x2={cx + r * Math.cos(a2)} y2={cy + r * Math.sin(a2)}
                  stroke="#e5813e" strokeWidth="0.3" strokeDasharray="0.6 0.6"
                  className="animate-pulse" />
              );
            })}
            <circle cx={cx} cy={cy} r="8" fill="url(#link)" opacity="0.15" />
            <circle cx={cx} cy={cy} r="5" fill="white" stroke="#0c539d" strokeWidth="0.3" />
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">core</div>
            <div className="font-bold text-primary text-sm">eSchool Link</div>
          </div>

          {roles.map((label, i) => {
            const a = (i / roles.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + 42 * Math.cos(a);
            const y = 50 + 42 * Math.sin(a);
            const isActive = active === i;
            return (
              <motion.button
                key={label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === i ? null : i)}
                style={{ left: `${x}%`, top: `${y}%` }}
                whileHover={{ scale: 1.08 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap transition-all shadow-card ${
                  isActive
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-card border border-border hover:border-accent"
                }`}
              >
                {label}
              </motion.button>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          <span className="text-foreground font-medium">18 live relationships.</span>{" "}
          Every one of them, today, still lives in paper or in someone's memory.
        </p>
      </div>
    </section>
  );
}
