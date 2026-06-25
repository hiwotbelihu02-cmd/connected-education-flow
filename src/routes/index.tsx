import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { IndexSection } from "@/components/site/IndexSection";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Scale } from "@/components/site/Scale";
import { Trusted } from "@/components/site/Trusted";
import { FAQ } from "@/components/site/FAQ";
import { Invite } from "@/components/site/Invite";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eSchool Link — The operating system for education" },
      { name: "description", content: "Every school is a living network. eSchool Link weaves every student, teacher, parent and office into one intelligent system." },
      { property: "og:title", content: "eSchool Link — The operating system for education" },
      { property: "og:description", content: "From a single classroom to a nation's education — one intelligent system." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <IndexSection />
        <Ecosystem />
        <Scale />
        <Trusted />
        <FAQ />
        <Invite />
      </main>
      <SiteFooter />
    </div>
  );
}
