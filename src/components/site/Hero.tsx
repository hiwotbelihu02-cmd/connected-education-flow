import heroScene from "@/assets/hero-network-scene.png.asset.json";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Play } from "lucide-react";

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

          {/* Hero scene image */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] lg:h-[560px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card"
            >
              <img
                src={heroScene.url}
                alt="eSchool Link connects classrooms, transport, finance, parents and administration into one living school network"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

