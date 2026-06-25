export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
                <div className="h-3 w-3 rounded-sm bg-accent" />
              </div>
              <span className="font-bold">eSchool<span className="text-primary">Link</span></span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              The operating system for education, connecting every layer of an institution into one intelligent ecosystem.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">Addis Ababa, Ethiopia</div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Platform</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#index" className="hover:text-foreground">The Index</a></li>
              <li><a href="#ecosystem" className="hover:text-foreground">The Ecosystem</a></li>
              <li><a href="#scale" className="hover:text-foreground">At Scale</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#trusted" className="hover:text-foreground">Trusted by</a></li>
              <li><a href="#questions" className="hover:text-foreground">Questions</a></li>
              <li><a href="#invite" className="hover:text-foreground">Request access</a></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Connect</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hello@qelemmeda.com" className="hover:text-foreground">hello@qelemmeda.com</a></li>
              <li><a href="https://qelemmeda.com" className="hover:text-foreground">qelemmeda.com</a></li>
              <li className="text-xs pt-2">A product of QMT, Qelem Meda Technologies</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4 text-xs text-muted-foreground">
          <div>© 2026 Qelem Meda Technologies. All rights reserved.</div>
          <div>Crafted in Addis Ababa</div>
          <a href="#top" className="hover:text-foreground">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
