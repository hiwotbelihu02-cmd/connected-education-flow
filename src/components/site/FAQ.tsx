import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  { q: "How quickly can a school go live?", a: "Most schools are running within a few weeks: a short scoping call, we model your structure, then staff onboard and parents connect. It's an onboarding, not a multi-year IT project." },
  { q: "Do we have to give up our paper records?", a: "No. We migrate your paper and spreadsheet records into the system. Paper remains, but it stops being the source of truth." },
  { q: "What if our internet is slow or unreliable?", a: "eSchool Link works offline-first on the school's local network and syncs when bandwidth allows. Nothing breaks when the link drops." },
  { q: "Is it available in Amharic?", a: "Yes. The interface, reports and parent communications are available in Amharic, English, and major regional languages." },
  { q: "How is our data kept safe?", a: "Encrypted at rest and in transit, role-based access, audit trails on every change, and hosted on infrastructure compliant with national data residency rules." },
  { q: "Can a regional bureau oversee many schools at once?", a: "Yes. eSchool Link federates by school and rolls up by district, region, and bureau — with the same authoritative record at every tier." },
  { q: "What does it cost?", a: "Pricing scales with the size and tier of your institution. Public schools receive subsidized terms; a bureau-wide deployment is a single contract. Talk to us." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="questions" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-xs font-mono text-accent tracking-widest mb-3">07 — QUESTIONS</div>
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Questions,<br />answered.
          </h2>
          <a href="#invite" className="text-sm font-medium text-primary hover:text-accent transition-colors inline-flex items-center gap-1">
            Ask the QMT team →
          </a>
        </div>

        <div className="space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">{f.q}</span>
                  <Plus className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-45 text-accent" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-0 text-muted-foreground text-pretty">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
