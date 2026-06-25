import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import globeImg from "@/assets/icon-globe.png";

const tiers = [
  { label: "The Classroom", scale: "30", desc: "30 learners, one teacher, real-time presence." },
  { label: "The School", scale: "1,200", desc: "A hundred classrooms, one living building." },
  { label: "The District", scale: "120", desc: "Schools coordinated, a city in concert." },
  { label: "Ethiopia", scale: "12", desc: "Regional administrations, one record." },
  { label: "The World", scale: "∞", desc: "Built to carry whole education systems." },
];

export function Scale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 20]);

  return (
    <section id="scale" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <div className="text-xs font-mono text-accent tracking-widest mb-3">05 — AT SCALE</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            From one classroom<br />to a nation.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-pretty">
            One school is a network. A thousand schools, coordinated, is infrastructure.
            eSchool Link is engineered to carry the weight of an entire education system.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-3">
            {tiers.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 hover:border-accent hover:shadow-card transition-all"
              >
                <div className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</div>
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent w-24">
                  {t.scale}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{t.label}</div>
                  <div className="text-sm text-muted-foreground">{t.desc}</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          <motion.div style={{ y, rotate }} className="relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-orange-300/30 blur-3xl rounded-full" />
            <img src={globeImg} alt="Global network" width={1024} height={1024} loading="lazy"
              className="relative w-full max-w-md mx-auto animate-float-slow" />
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "12", l: "Regional & city administrations" },
            { n: "35K+", l: "Schools across the country" },
            { n: "27M", l: "Learners in the system" },
            { n: "650K+", l: "Educators at the frontline" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6"
            >
              <div className="text-4xl font-bold tracking-tight">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
