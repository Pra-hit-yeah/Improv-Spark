import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

import { PMPage } from "@/components/layout/PMPage";
import { ScreenshotGallery } from "@/components/ui/screenshot-gallery";

export default function RoadmapPage() {
  return (
    <PMPage
      eyebrow="Roadmap"
      title="Roadmap"
      subtitle="Now, next, and later. A calm, recruiter-ready view of what's planned."
    >
      <div className="not-prose flex flex-col sm:flex-row gap-3" data-testid="roadmap-hero-ctas">
        <Link href="/app">
          <Button className="rounded-full" size="lg" data-testid="button-roadmap-try-app">
            Back to app
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
        <Link href="/product">
          <Button className="rounded-full" variant="outline" size="lg" data-testid="button-roadmap-product">
            Product case study
          </Button>
        </Link>
      </div>

      <div className="not-prose">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${col.tone}`}>
                {col.title}
              </div>
              {col.items.map((item) => (
                <Card key={item.title} className="shadow-none border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">{item.desc}</CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>

        {/* Feature Gallery */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Recent Feature Ships</h3>
          <ScreenshotGallery 
            images={[]} 
            testId="gallery-roadmap"
          />
        </div>
      </div>
    </PMPage>
  );
}
