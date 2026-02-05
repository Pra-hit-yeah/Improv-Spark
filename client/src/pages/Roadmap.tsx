import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, Layers, Rocket, Zap, FlaskConical, Globe } from "lucide-react";
import { PMPage } from "@/components/layout/PMPage";
import { ScreenshotGallery } from "@/components/ui/screenshot-gallery";
import { ShareButton } from "@/components/ui/share-button";

// Helper to render confidence level badges
function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  if (level === "high") {
    return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 shadow-none font-semibold">High Confidence</Badge>;
  }
  if (level === "medium") {
    return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 shadow-none font-semibold">Experimental</Badge>;
  }
  return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100 shadow-none font-semibold">Exploratory</Badge>;
}

// Data structure for the roadmap table
const roadmapData = [
  {
    phase: "NOW (2-4 weeks)",
    description: "Focus on habit formation & core loop",
    tone: "border-l-4 border-l-green-500",
    icon: <Rocket className="w-5 h-5 text-green-600" />,
    items: [
      {
        theme: "Core Practice Loop",
        why: "Users are dropping off because drills feel too generic or anxiety-inducing.",
        bets: ["Refine difficulty progression", "Clarify 'what this trains' copy", "Improve session UX"],
        success: "Users complete 5+ sessions/week",
        confidence: "high",
      },
      {
        theme: "Skill Progression",
        why: "Users need to feel they are 'leveling up' to stay motivated.",
        bets: ["XP balancing", "Streak freeze mechanics", "Level graduation ceremony"],
        success: "D7 Retention > 20%",
        confidence: "high",
      },
    ],
  },
  {
    phase: "NEXT (1-2 months)",
    description: "AI-assisted value & personalization",
    tone: "border-l-4 border-l-amber-500",
    icon: <FlaskConical className="w-5 h-5 text-amber-600" />,
    items: [
      {
        theme: "AI Content Gen",
        why: "Static prompts get stale. Can GenAI create infinite, high-quality variety?",
        bets: ["LLM-generated exercises", "Context-aware prompt injection"],
        success: "Does variety increase D30?",
        confidence: "medium",
      },
      {
        theme: "Personalization",
        why: "Generic advice doesn't stick. Users want feedback specific to their voice.",
        bets: ["Lightweight AI feedback prototypes", "Goal-based drill recommendations"],
        success: "Do users replay sessions for better scores?",
        confidence: "medium",
      },
    ],
  },
  {
    phase: "LATER (3+ months)",
    description: "Scale & social leverage",
    tone: "border-l-4 border-l-blue-500",
    icon: <Globe className="w-5 h-5 text-blue-600" />,
    items: [
      {
        theme: "Social Practice",
        why: "Spontaneity is social. Peer pressure is the ultimate forcing function.",
        bets: ["Multiplayer duels", "Community practice rooms", "Async challenges"],
        success: "Exploratory: Viral K-factor lift?",
        confidence: "low",
      },
      {
        theme: "Platform Expansion",
        why: "Practice happens in dead time (commute, walking).",
        bets: ["Mobile PWA", "Voice-only mode", "Offline support"],
        success: "Exploratory: Accessibility lift?",
        confidence: "low",
      },
    ],
  },
] as const;

export default function RoadmapPage() {
  return (
    <PMPage
      eyebrow="Roadmap"
      title="Hypothesis-driven roadmap"
      subtitle="A strategic view of themes, bets, and success criteria. Optimized for learning velocity, not just delivery."
    >
      {/* Top Actions */}
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
        <ShareButton 
            title="Quick-Wit Roadmap" 
            text="Check out the product roadmap for Quick-Wit!" 
            size="lg"
            className="rounded-full"
        />
      </div>

      <div className="space-y-12">
        
        {/* Preface Card */}
        <Card className="bg-muted/30 border-none shadow-sm">
          <CardContent className="pt-6 pb-6 flex gap-4 items-start">
            <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-sm text-foreground">How to read this roadmap</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is a living document focused on <strong>validating assumptions</strong>. Items in "Now" are committed bets. Items in "Next" and "Later" are hypotheses that we will de-risk through prototyping before building fully.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Table */}
        <div className="space-y-8">
          {roadmapData.map((phase, idx) => (
            <div key={phase.phase} className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                {phase.icon}
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">{phase.phase}</h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{phase.description}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {phase.items.map((item, i) => (
                  <Card key={i} className={`shadow-sm overflow-hidden ${phase.tone} border-l-4 border-y border-r border-border`}>
                    <div className="grid md:grid-cols-[1.5fr_2fr_1.5fr_1fr] divide-y md:divide-y-0 md:divide-x divide-border/60">
                      
                      {/* Theme & Why */}
                      <div className="p-5 space-y-3">
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Theme</p>
                          <p className="font-bold text-foreground text-lg">{item.theme}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Hypothesis / Problem</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.why}
                          </p>
                        </div>
                      </div>

                      {/* Key Bets */}
                      <div className="p-5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Bets</p>
                        <ul className="list-disc pl-4 space-y-1.5">
                          {item.bets.map((bet, b) => (
                            <li key={b} className="text-sm text-foreground/90 leading-snug">{bet}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Success Criteria */}
                      <div className="p-5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Success Criteria</p>
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-foreground">{item.success}</p>
                        </div>
                      </div>

                      {/* Confidence */}
                      <div className="p-5 flex flex-col justify-center items-start gap-2 bg-muted/5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider md:hidden">Confidence</p>
                        <ConfidenceBadge level={item.confidence as any} />
                      </div>

                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Gallery - Removed as requested */}
      </div>
    </PMPage>
  );
}
