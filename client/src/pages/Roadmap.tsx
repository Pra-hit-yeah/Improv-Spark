import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const columns = [
  {
    title: "Now building",
    tone: "bg-green-50 border-green-200 text-green-800",
    items: [
      { title: "AI feedback", desc: "Instant, actionable coaching on clarity and pacing." },
      { title: "Personalized practice plans", desc: "Weekly routines aligned to your goal and schedule." },
      { title: "Analytics", desc: "Better measurement for activation and retention." },
    ],
  },
  {
    title: "Next",
    tone: "bg-amber-50 border-amber-200 text-amber-800",
    items: [
      { title: "Community rooms", desc: "Live practice sessions with light structure and prompts." },
      { title: "Track recommendations", desc: "Smarter content ordering based on performance." },
      { title: "PWA", desc: "Fast, offline-friendly mobile experience." },
    ],
  },
  {
    title: "Later",
    tone: "bg-blue-50 border-blue-200 text-blue-800",
    items: [
      { title: "Duels", desc: "Friendly challenges to increase motivation." },
      { title: "Team plans", desc: "Shared progress for cohorts and companies." },
      { title: "Creator tracks", desc: "Expert-built drills for specific scenarios." },
    ],
  },
] as const;

export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-12 border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">Public roadmap</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">Roadmap</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl">A transparent view of what we are building and exploring next.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/app">
              <Button className="rounded-full" size="lg" data-testid="button-roadmap-try-app">
                Try the app
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/product">
              <Button className="rounded-full" variant="outline" size="lg" data-testid="button-roadmap-product">
                Product case study
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.title} className="space-y-4">
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${col.tone}`}>{col.title}</div>
                {col.items.map((item) => (
                  <Card key={item.title} className="shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground leading-relaxed">{item.desc}</CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-heading font-bold">Want to feel the product?</h2>
            <p className="text-muted-foreground/60 mt-2">Try a daily drill and see how the timers change your focus.</p>
          </div>
          <Link href="/app">
            <Button className="rounded-full" size="lg" data-testid="button-roadmap-footer-cta">Launch Quick-Wit</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
