import { motion } from "motion/react";
import idImg from "@/assets/icon-id.png";
import calImg from "@/assets/icon-calendar.png";
import busImg from "@/assets/icon-bus.png";
import finImg from "@/assets/icon-finance.png";
import { ArrowUpRight } from "lucide-react";

const items = [
  { n: "01", title: "Student Records", caption: "Admission → Alumni", img: idImg, tone: "blue" },
  { n: "02", title: "Attendance & Presence", caption: "Gate → Register", img: idImg, tone: "orange" },
  { n: "03", title: "Calendar & Timetable", caption: "The academic year", img: calImg, tone: "blue" },
  { n: "04", title: "Assessment & Reports", caption: "Marks → Meaning", img: calImg, tone: "orange" },
  { n: "05", title: "Staff & HR Lifecycle", caption: "Recruit → Retire", img: idImg, tone: "blue" },
  { n: "06", title: "Finance & Fees", caption: "Every birr in place", img: finImg, tone: "orange" },
  { n: "07", title: "Transport & Safety", caption: "Every route, watched", img: busImg, tone: "blue", featured: true },
  { n: "08", title: "Oversight across Branches", caption: "Branch → Network", img: finImg, tone: "orange" },
];

export function IndexSection() {
  return (
    <section id="index" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-8 mb-12">
          <div>
            <div className="text-xs font-mono text-accent tracking-widest mb-3">02 — THE INDEX</div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-2xl">
              Everything an institution does, in one continuous record.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground glass rounded-full px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            live preview · 07
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.a
              key={it.n}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-glow transition-all duration-500 ${
                it.featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-700 from-blue-400 to-orange-400" />
              {it.featured && (
                <div className="absolute right-4 top-4 opacity-90 pointer-events-none">
                  <img src={it.img} alt="" width={140} height={140} loading="lazy" className="w-32 h-32 animate-float" />
                </div>
              )}
              <div className="text-xs font-mono text-muted-foreground">{it.n}</div>
              <div className="mt-12 flex items-end justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold tracking-tight">{it.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{it.caption}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:rotate-45 transition-all" />
              </div>
              {it.featured && (
                <div className="mt-6 flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-success/10 text-success px-2.5 py-1 font-medium">on time</span>
                  <span className="text-muted-foreground">3 of 4 stops · 38 aboard</span>
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
