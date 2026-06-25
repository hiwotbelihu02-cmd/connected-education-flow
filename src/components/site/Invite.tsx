import { ArrowRight } from "lucide-react";

export function Invite() {
  return (
    <section id="invite" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-orange-50 dark:from-blue-900/20 dark:via-background dark:to-orange-900/20" />
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="text-xs font-mono text-accent tracking-widest mb-3">08 — THE INVITATION</div>
        <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-3xl">
          Link your institution.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-pretty">
          Bring your school onto one intelligent system, and see the whole picture — for the first time.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl"
        >
          <input
            type="text"
            placeholder="Enter your school's name"
            className="flex-1 rounded-full border border-border bg-card px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-4 text-sm font-semibold shadow-glow hover:shadow-glow-accent transition-all"
          >
            Request access
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-16">
          <div className="text-sm font-medium text-muted-foreground mb-6">
            From hello to live, in three steps
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["01", "A short conversation", "Tell us about your school: size, structure, what hurts today."],
              ["02", "We map your flows", "Your timetables, fees, records and routes, modelled in eSchool Link."],
              ["03", "Your network goes live", "Staff onboarded, parents connected — one intelligent system."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-2xl border border-border bg-card p-6 hover:border-accent transition-colors">
                <div className="text-xs font-mono text-accent">{n}</div>
                <div className="mt-3 font-semibold">{t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-xs text-muted-foreground">
            No rip-and-replace · we migrate from your paper and spreadsheets.
          </div>
        </div>
      </div>
    </section>
  );
}
