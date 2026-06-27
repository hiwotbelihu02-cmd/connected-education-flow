import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
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
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.02]"
            >
              Every school is a{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  living network.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 8C60 3 150 3 298 8"
                    stroke="url(#grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" x2="300">
                      <stop stopColor="#e5813e" />
                      <stop offset="1" stopColor="#3387d7" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
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
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:shadow-glow-accent transition-all"
              >
                Contact sales
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#index"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
              >
                See the system
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-2 text-xs text-muted-foreground"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              9.0°N · 38.7°E — Addis Ababa, Ethiopia
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-gradient-to-br from-blue-200/40 to-orange-200/40 blur-3xl rounded-full" />
              <img
                src={heroImg}
                alt="eSchool Link network visualization"
                width={1024}
                height={1024}
                className="relative w-full h-auto animate-float-slow drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-8 -left-4 glass rounded-xl px-3 py-2 text-xs shadow-card hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="font-medium">1,247 students · live</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 -right-2 glass rounded-xl px-3 py-2 text-xs shadow-card hidden sm:block"
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Boarding proof
              </div>
              <div className="font-semibold text-success">✓ Bus 04 · 38 aboard</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
