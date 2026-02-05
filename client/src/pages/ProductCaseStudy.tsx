import { PMPage } from "@/components/layout/PMPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import {
  ArrowRight,
  Target,
  Users,
  Zap,
  Timer,
  GitBranch,
  Layers,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  Compass,
  LayoutTemplate,
  BrainCircuit,
  CalendarDays,
  BookOpen,
  ChevronDown
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

function HowToRead() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border border-indigo-100 bg-indigo-50/50 rounded-lg overflow-hidden transition-all duration-200"
      data-testid="collapsible-how-to-read"
    >
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-indigo-900 hover:bg-indigo-50 transition-colors">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>How to read this case study</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-indigo-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 animate-in slide-in-from-top-2">
        <div className="space-y-3 pt-1">
          <p className="text-sm text-indigo-900/80 leading-relaxed">
            This portfolio is structured as a set of linked artifacts. Each page stands alone, but together they tell the full product story.
          </p>
          <ul className="space-y-2 text-sm text-indigo-900/70">
            <li className="flex gap-2 items-start">
              <span className="font-bold text-indigo-700 text-xs mt-0.5 uppercase tracking-wide min-w-[80px]">Start Here</span>
              <span>Read the <strong>Product Brief</strong> (below) for the problem framing and solution overview.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="font-bold text-indigo-700 text-xs mt-0.5 uppercase tracking-wide min-w-[80px]">Context</span>
              <span>Check <Link href="/research" className="underline hover:text-indigo-900">Research</Link> for user insights and <Link href="/market" className="underline hover:text-indigo-900">Market</Link> for the competitive landscape.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="font-bold text-indigo-700 text-xs mt-0.5 uppercase tracking-wide min-w-[80px]">Decisions</span>
              <span>See the <Link href="/prd" className="underline hover:text-indigo-900">PRD</Link> for specs and the <Link href="/experiments" className="underline hover:text-indigo-900">Experiments Log</Link> for validation data.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="font-bold text-indigo-700 text-xs mt-0.5 uppercase tracking-wide min-w-[80px]">Strategy</span>
              <span>Review the <Link href="/roadmap" className="underline hover:text-indigo-900">Roadmap</Link> for future bets and <Link href="/gtm" className="underline hover:text-indigo-900">GTM</Link> for launch plans.</span>
            </li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}


function MetaRow({
  label,
  value,
  testId,
}: {
  label: string;
  value: React.ReactNode;
  testId: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4" data-testid={testId}>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" data-testid={`${testId}-label`}>
        {label}
      </p>
      <div className="text-sm text-foreground leading-relaxed text-right" data-testid={`${testId}-value`}>
        {value}
      </div>
    </div>
  );
}

function Section({
  kicker,
  title,
  icon,
  children,
  testId,
}: {
  kicker: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <section className="space-y-4" data-testid={testId}>
      <div className="not-prose flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            data-testid={`${testId}-kicker`}
          >
            {kicker}
          </p>
          <h2 className="pm-h2 mt-2" data-testid={`${testId}-title`}>
            {title}
          </h2>
        </div>
        <div
          className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center rounded-xl border border-border bg-background"
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

import { ScreenshotGallery } from "@/components/ui/screenshot-gallery";

function BulletCard({
  title,
  items,
  testId,
}: {
  title: string;
  items: React.ReactNode[];
  testId: string;
}) {
  return (
    <Card className="shadow-none border-border/60" data-testid={testId}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base" data-testid={`${testId}-title`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground leading-relaxed" data-testid={`${testId}-content`}>
        <ul className="list-disc pl-5 space-y-2">
          {items.map((it, idx) => (
            <li key={idx} data-testid={`${testId}-item-${idx}`}>
              {it}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function ProductCaseStudy() {
  return (
    <PMPage
      eyebrow="Simple product brief"
      title="Quick-Wit: Daily training for spontaneous verbal fluency"
      subtitle="Founder-led product brief defining the problem, vision, and V1 scope."
    >
      <div className="not-prose flex flex-col sm:flex-row gap-3" data-testid="product-hero-ctas">
        <Link href="/app" asChild>
          <Button asChild className="rounded-full" data-testid="button-product-try-app">
            <a data-testid="link-product-try-app">
              Try live app
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </Link>
        <Button
          variant="outline"
          className="rounded-full"
          data-testid="button-product-scroll-background"
          onClick={() => document.getElementById("background")?.scrollIntoView({ behavior: "smooth" })}
        >
          Read the brief
        </Button>
      </div>

      <div className="not-prose my-8">
        <HowToRead />
      </div>

      <div className="space-y-14" data-testid="product-body">
        {/* Meta / Status */}
        <section className="space-y-5" data-testid="section-product-meta">
          <Card className="shadow-none border-border/60" data-testid="card-product-meta">
            <CardContent className="pt-6" data-testid="card-product-meta-content">
              <div className="grid gap-5" data-testid="grid-product-meta">
                <MetaRow
                  label="Role"
                  value="Founder / PM / Engineer"
                  testId="meta-product-role"
                />
                <MetaRow
                  label="Stage"
                  value="Live Prototype (V1)"
                  testId="meta-product-stage"
                />
                <MetaRow
                  label="Core Insight"
                  value="Pressure is the skill gap, not just knowledge."
                  testId="meta-product-insight"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 1. Background */}
        <Section
          kicker="Why now"
          title="Background"
          icon={<Compass className="w-5 h-5 text-muted-foreground" />}
          testId="section-background"
        >
           <div id="background" className="space-y-4 scroll-mt-24">
            <p data-testid="text-background-1">
              I built this because I personally struggled with spontaneous speaking for years. I knew the content, but in high-stakes moments—interviews, dates, executive Q&A—my brain would freeze.
            </p>
            <p data-testid="text-background-2">
              <strong>Why now?</strong> Three convergent trends make this timely:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground" data-testid="list-background-trends">
              <li><strong>Remote work</strong> has reduced low-stakes "watercooler" practice, making every Zoom call feel like a performance.</li>
              <li><strong>Daily training norms</strong> (Duolingo, Wordle) have normalized short, gamified cognitive habits.</li>
              <li><strong>GenAI</strong> (LLMs) enables infinite, dynamic prompt generation without human curation cost, allowing endless unique practice scenarios.</li>
            </ul>
           </div>
        </Section>

        <Separator />

        {/* 2. Problem Statements */}
        <Section
          kicker="Problem"
          title="The core tension"
          icon={<Target className="w-5 h-5 text-muted-foreground" />}
          testId="section-problem"
        >
          <div className="grid gap-6 md:grid-cols-2" data-testid="grid-problems">
            <Card className="shadow-none border-border/60" data-testid="card-problem-talent">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Spontaneity is treated as talent</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Most people believe you are either born "quick-witted" or not. There is no clear "gym" for verbal agility, only expensive improv classes that feel socially risky.
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-problem-freeze">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">The "Freeze" moment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Users report having the knowledge but losing access to it under pressure. The problem isn't intelligence; it's retrieval latency and anxiety blocking working memory.
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        {/* 3. Goals & Non-Goals */}
        <Section
          kicker="Direction"
          title="Goals and non-goals"
          icon={<CheckCircle2 className="w-5 h-5 text-muted-foreground" />}
          testId="section-goals"
        >
          <div className="grid gap-6 md:grid-cols-2" data-testid="grid-goals-nongoals">
            <BulletCard
              title="Goals (Success)"
              testId="card-goals"
              items={[
                <>Improve spontaneous verbal fluency through repetition.</>,
                <>Increase real-world confidence in social/professional settings.</>,
                <>Help users feel charismatic and present (identity shift).</>,
                <>Leverage GenAI to ensure prompts never feel stale.</>,
              ]}
            />
            <BulletCard
              title="Non-goals (Out of Scope)"
              testId="card-nongoals"
              items={[
                <>Not an improv-actor app (no "scenes" or acting).</>,
                <>Not a library of scripts or "what to say" memorization.</>,
                <>Not theory-heavy instruction (practice over lectures).</>,
                <><strong>No AI judging (yet):</strong> V1 focuses on completion, not critique.</>,
              ]}
            />
          </div>
        </Section>

        <Separator />

        {/* 4. Hypothesis */}
        <Section
          kicker="Hypothesis"
          title="Theory of change"
          icon={<Lightbulb className="w-5 h-5 text-muted-foreground" />}
          testId="section-hypothesis"
        >
          <Card className="shadow-none border-border/60" data-testid="card-hypothesis">
             <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed space-y-3">
              <p data-testid="text-hypothesis">
                I believe that <strong className="text-foreground">daily, low-stakes timed practice</strong> (2–5 mins) will desensitize users to the feeling of pressure.
              </p>
              <p data-testid="text-hypothesis-outcome">
                By repeatedly entering a "speak now" state without consequence, users will lower their inhibition threshold, leading to measurably faster articulation and higher confidence in real-world conversations within 3 weeks.
              </p>
            </CardContent>
          </Card>
        </Section>

        <Separator />

         {/* 5. Vision Narrative */}
         <Section
          kicker="Vision"
          title="Longitudinal identity shift"
          icon={<GitBranch className="w-5 h-5 text-muted-foreground" />}
          testId="section-vision"
        >
          <p data-testid="text-vision-1">
            This isn't just about speaking faster; it's about shifting self-perception from "I'm awkward/quiet" to "I can handle whatever comes up."
          </p>
          <p data-testid="text-vision-2">
            The long-term vision is a <strong className="text-foreground">pocket coach for social courage</strong>.
            While V1 is a solo drill, V2+ uses AI not just to generate prompts, but to provide personalized coaching on tone, brevity, and wit—eventually acting as a sparring partner for specific scenarios (salary negotiation, first dates, conflict).
          </p>
        </Section>

        <Separator />

        {/* 6. Scoping */}
        <Section
          kicker="Scope"
          title="Rough scoping & timeline"
          icon={<CalendarDays className="w-5 h-5 text-muted-foreground" />}
          testId="section-scope"
        >
          <div className="grid gap-6 md:grid-cols-2" data-testid="grid-scope">
            <BulletCard
              title="Focused Prototype (V1)"
              testId="card-scope-v1"
              items={[
                <>Daily timed drills (3 difficulty levels).</>,
                <>GenAI-powered prompt generation (infinite variety).</>,
                <>Streak & XP system (retention loop).</>,
                <>Basic "Done" tracking (no quality scoring).</>,
              ]}
            />
            <BulletCard
              title="Future (V2+)"
              testId="card-scope-v2"
              items={[
                <><strong>AI Coach:</strong> Qualitative feedback on recordings.</>,
                <><strong>Multiplayer:</strong> Live duel / "pass the mic" modes.</>,
                <><strong>Scenario Mode:</strong> Roleplay specific high-stakes talks.</>,
              ]}
            />
          </div>
        </Section>

        <Separator />

        {/* 7. Tradeoffs */}
        <Section
          kicker="Decisions"
          title="Key tradeoffs & decisions"
          icon={<AlertTriangle className="w-5 h-5 text-muted-foreground" />}
          testId="section-tradeoffs"
        >
          <div className="grid gap-6 md:grid-cols-3" data-testid="grid-tradeoffs">
            <Card className="shadow-none border-border/60" data-testid="card-tradeoff-habit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Daily habit {">"} Long sessions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Decision:</strong> Cap sessions at 5 mins.
                <br/>
                <strong className="text-foreground">Why:</strong> Better to train 2 mins/day for 30 days than 60 mins once. Consistency rewires the brain.
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-tradeoff-practice">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Practice {">"} Instruction</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Decision:</strong> No theory lessons in V1.
                <br/>
                <strong className="text-foreground">Why:</strong> Users know <em>how</em> to speak; they need reps. Content consumption is procrastination.
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-tradeoff-audio">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Audio {">"} Text</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Decision:</strong> No typing, only speaking.
                <br/>
                <strong className="text-foreground">Why:</strong> Typing allows editing. Speaking requires commitment. We train the verbal muscle.
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        {/* 8. Mockups */}
        <Section
          kicker="Concept"
          title="Conceptual models & mockups"
          icon={<LayoutTemplate className="w-5 h-5 text-muted-foreground" />}
          testId="section-mockups"
        >
          <Card className="shadow-none border-border/60 bg-muted/20" data-testid="card-diagram">
             <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                   <BrainCircuit className="w-4 h-4" />
                   Core Loop Diagram
                </CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                   <div className="flex-1 p-4 border border-border bg-background rounded-lg text-center">
                      <p className="font-bold text-foreground">Trigger</p>
                      <p className="text-xs mt-1">Daily notification or "warm up" need</p>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />
                   <div className="flex-1 p-4 border border-border bg-background rounded-lg text-center">
                      <p className="font-bold text-foreground">Action (Drill)</p>
                      <p className="text-xs mt-1">GenAI Prompt + Timer + Voice Output</p>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />
                   <div className="flex-1 p-4 border border-border bg-background rounded-lg text-center">
                      <p className="font-bold text-foreground">Reward</p>
                      <p className="text-xs mt-1">Streak Safe + "I did it" feeling</p>
                   </div>
                </div>
             </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 pt-4" data-testid="grid-ui-refs">
            <div className="md:col-span-2">
               <ScreenshotGallery 
                 images={[]} 
                 testId="gallery-product-mockups"
               />
            </div>
          </div>
        </Section>

        {/* Footer CTA */}
        <section className="not-prose pt-4" data-testid="section-product-footer">
          <Card className="shadow-none border-border/60" data-testid="card-product-footer">
            <CardContent className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" data-testid="text-product-footer-kicker">
                  Next step
                </p>
                <p className="text-sm text-muted-foreground mt-2" data-testid="text-product-footer-desc">
                  Review the PRD for the "Difficulty Levels" feature spec.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/prd" asChild>
                  <Button variant="outline" className="rounded-full" data-testid="button-product-footer-prd">
                    <a data-testid="link-product-footer-prd">View PRD</a>
                  </Button>
                </Link>
                <Link href="/app" asChild>
                  <Button asChild className="rounded-full" data-testid="button-product-footer-launch">
                    <a data-testid="link-product-footer-launch">
                      Launch app
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </PMPage>
  );
}
