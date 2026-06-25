import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { label: "The Index", href: "#index" },
  { label: "The Ecosystem", href: "#ecosystem" },
  { label: "At Scale", href: "#scale" },
  { label: "Trusted", href: "#trusted" },
  { label: "Questions", href: "#questions" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-300 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-card" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
              <div className="h-3 w-3 rounded-sm bg-accent" />
              <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
            </div>
            <span className="font-bold tracking-tight text-foreground">
              eSchool<span className="text-primary">Link</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 py-2">
              Sign in
            </button>
            <a
              href="#invite"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background text-sm font-medium px-4 py-2 hover:bg-primary transition-colors"
            >
              Request access
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-3 animate-fade-in">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground py-1"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#invite"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground text-background text-sm font-medium px-4 py-2 text-center"
            >
              Request access
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
