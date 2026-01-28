import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { ArrowRight, FileText, Layers, Target, AlertTriangle, CheckCircle2, GitBranch } from "lucide-react";

function SectionHeading({
  kicker,
  title,
  desc,
  icon,
}: {
  kicker: string;
  title: string;
  desc?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary border border-primary/15">
          {icon}
        </span>
        <p className="text-xs font-bold uppercase tracking-widest text-primary" data-testid={`text-prd-kicker-${kicker.toLowerCase().replaceAll(" ", "-")}`}> {kicker}</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight" data-testid={`text-prd-title-${title.toLowerCase().replaceAll(" ", "-")}`}>{title}</h2>
      {desc ? <p className="text-sm md:text-base text-muted-foreground leading-relaxed" data-testid={`text-prd-desc-${title.toLowerCase().replaceAll(" ", "-")}`}>{desc}</p> : null}
    </div>
  );
}

function FlowNode({
  title,
  subtitle,
  tone,
  testId,
}: {
  title: string;
  subtitle?: string;
  tone?: "default" | "primary" | "success" | "muted";
  testId: string;
}) {
  const toneClass =
    tone === "primary"
      ? "border-primary/25 bg-primary/5"
      : tone === "success"
        ? "border-green-200 bg-green-50"
        : tone === "muted"
          ? "border-border/60 bg-muted/20"
          : "border-border bg-background";

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${toneClass}`}
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold leading-tight" data-testid={`${testId}-title`}>{title}</p>
          {subtitle ? (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed" data-testid={`${testId}-subtitle`}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ArrowDown({ testId }: { testId: string }) {
  return (
    <div className="flex items-center justify-center" data-testid={testId}>
      <div className="h-8 w-px bg-border" />
      <div className="w-2 h-2 rotate-45 border-r border-b border-border -mt-1" />
    </div>
  );
}

function ArrowRightInline({ testId }: { testId: string }) {
  return (
    <div className="flex items-center justify-center" data-testid={testId}>
      <div className="h-px w-6 bg-border" />
      <div className="w-2 h-2 rotate-45 border-r border-b border-border" />
    </div>
  );
}

function ResponsiveFlowDiagram() {
  return (
    <Card className="border-border/60 shadow-sm" data-testid="card-prd-flow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">User flow diagram</CardTitle>
        <p className="text-sm text-muted-foreground">
          Difficulty selection and drill experience, from dashboard to completion.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mobile (vertical) */}
        <div className="md:hidden space-y-3" data-testid="flow-mobile">
          <FlowNode title="Dashboard" subtitle="Primary CTA to start today\'s session" tone="primary" testId="node-dashboard" />
          <ArrowDown testId="arrow-dashboard-start" />
          <FlowNode title="Start Session" subtitle="User initiates a new session" testId="node-start-session" />
          <ArrowDown testId="arrow-start-difficulty" />
          <FlowNode title="Difficulty selection" subtitle="Beginner, Intermediate, Advanced" tone="primary" testId="node-difficulty" />
          <ArrowDown testId="arrow-difficulty-drills" />
          <FlowNode title="Drill experience" subtitle="Timed prompts with optional notes" testId="node-drills" />
          <div className="grid grid-cols-1 gap-3 pt-2">
            <FlowNode title="Beginner" subtitle="Word association. New word every 5 seconds" tone="muted" testId="node-beginner" />
            <FlowNode title="Intermediate" subtitle="Two words. 30 seconds to pitch" tone="muted" testId="node-intermediate" />
            <FlowNode title="Advanced" subtitle="Five words. 45 seconds to tell a story" tone="muted" testId="node-advanced" />
          </div>
          <ArrowDown testId="arrow-drills-completion" />
          <FlowNode title="Completion" subtitle="Session complete screen" tone="success" testId="node-completion" />
          <ArrowDown testId="arrow-completion-xp" />
          <FlowNode title="XP and streak update" subtitle="XP awarded by difficulty. Streak incremented" tone="success" testId="node-xp-streak" />
          <ArrowDown testId="arrow-xp-dashboard" />
          <FlowNode title="Back to dashboard" subtitle="Next best action presented" testId="node-back-dashboard" />
        </div>

        {/* Desktop (flowchart) */}
        <div className="hidden md:block" data-testid="flow-desktop">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
            <FlowNode title="Dashboard" subtitle="Primary CTA to start today\'s session" tone="primary" testId="node-desk-dashboard" />
            <ArrowRightInline testId="arrow-desk-1" />
            <FlowNode title="Start Session" subtitle="User initiates a new session" testId="node-desk-start" />
            <ArrowRightInline testId="arrow-desk-2" />
            <FlowNode title="Difficulty selection" subtitle="Beginner, Intermediate, Advanced" tone="primary" testId="node-desk-difficulty" />
          </div>

          <div className="flex items-center justify-center py-6" data-testid="arrow-desk-down-1">
            <div className="h-10 w-px bg-border" />
            <div className="w-2 h-2 rotate-45 border-r border-b border-border -mt-1" />
          </div>

          <div className="grid grid-cols-3 gap-4" data-testid="desk-branch">
            <FlowNode title="Beginner" subtitle="Word association. New word every 5 seconds" tone="muted" testId="node-desk-beginner" />
            <FlowNode title="Intermediate" subtitle="Two words. 30 seconds to pitch" tone="muted" testId="node-desk-intermediate" />
            <FlowNode title="Advanced" subtitle="Five words. 45 seconds to tell a story" tone="muted" testId="node-desk-advanced" />
          </div>

          <div className="flex items-center justify-center py-6" data-testid="arrow-desk-down-2">
            <div className="h-10 w-px bg-border" />
            <div className="w-2 h-2 rotate-45 border-r border-b border-border -mt-1" />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
            <FlowNode title="Completion" subtitle="Session complete screen" tone="success" testId="node-desk-completion" />
            <ArrowRightInline testId="arrow-desk-3" />
            <FlowNode title="XP and streak update" subtitle="XP by difficulty. Streak incremented" tone="success" testId="node-desk-xp" />
            <ArrowRightInline testId="arrow-desk-4" />
            <FlowNode title="Back to dashboard" subtitle="Next best action presented" testId="node-desk-back" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-4" data-testid="callout-prd-events">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Instrumentation</p>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Events logged: difficulty_selected, session_started, session_completed, streak_incremented.
            This PRD assumes persistent storage when available, with graceful local fallback.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PRDHub() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-20 pb-14 border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/15">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">PRD hub</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight" data-testid="text-prd-h1">Product Requirements</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl" data-testid="text-prd-subhead">
            Recruiter-ready documentation for core product features. This page includes the full PRD for Difficulty Levels.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/app">
              <Button size="lg" className="rounded-full" data-testid="button-prd-try-app">
                Try live app
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              data-testid="button-prd-scroll"
              onClick={() => document.getElementById("prd-content")?.scrollIntoView({ behavior: "smooth" })}
            >
              View PRD
            </Button>
          </div>
        </div>
      </section>

      <section id="prd-content" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-14">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="outline" className="bg-background border-border text-muted-foreground" data-testid="badge-prd-feature">
                Feature PRD
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mt-3" data-testid="text-prd-feature-title">
                Difficulty levels
              </h2>
              <p className="text-muted-foreground mt-3 leading-relaxed" data-testid="text-prd-feature-desc">
                Let users choose a level that matches their comfort and ambition, then deliver a timed drill that builds spontaneous speaking skill through deliberate pressure.
              </p>
            </div>
            <Link href="/product">
              <Button asChild variant="outline" className="rounded-full hidden sm:inline-flex" data-testid="button-prd-back-product">
                <a>Back to product</a>
              </Button>
            </Link>
          </div>

          <ResponsiveFlowDiagram />

          <Separator />

          <section className="space-y-6" data-testid="section-problem">
            <SectionHeading
              kicker="Problem"
              title="Users need the right challenge"
              desc="Spontaneous speaking is intimidating. If drills feel too hard, users churn. If drills feel too easy, users do not feel progress. The product must offer a clear starting point with a path to grow." 
              icon={<Target className="w-4 h-4" />}
            />
            <Card className="border-border/60">
              <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
                Difficulty levels reduce anxiety by letting users opt into pressure. They also create a simple progression system that maps to real scenarios: quick associations, structured pitching, and storytelling under constraints.
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6" data-testid="section-goals">
            <SectionHeading
              kicker="Goals"
              title="Goals and non-goals"
              desc="Define what success looks like, and what we intentionally avoid for an MVP." 
              icon={<CheckCircle2 className="w-4 h-4" />}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Goals</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Make it obvious what each difficulty means before the session starts.</li>
                    <li>Deliver a consistent, timed drill experience per difficulty.</li>
                    <li>Reward users with XP and streak progression in a way that feels fair.</li>
                    <li>Reduce dropout by matching pressure to user readiness.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Non-goals</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Real-time speech scoring or AI feedback.</li>
                    <li>Community matchmaking or live rooms.</li>
                    <li>Personalized difficulty recommendation based on performance.</li>
                    <li>Complex leveling economy or skill trees.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6" data-testid="section-metrics">
            <SectionHeading
              kicker="Success"
              title="Success metrics"
              desc="Metrics that validate the difficulty system improves activation, retention, and perceived progress." 
              icon={<Layers className="w-4 h-4" />}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">North Star</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">Weekly completed sessions</p>
                  <p className="text-xs text-muted-foreground mt-1">Quality practice delivered</p>
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Activation</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">Onboarding + 1 completion</p>
                  <p className="text-xs text-muted-foreground mt-1">First success moment</p>
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Engagement</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">Completion rate by level</p>
                  <p className="text-xs text-muted-foreground mt-1">Friction and fit</p>
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Retention</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">D1 and D7</p>
                  <p className="text-xs text-muted-foreground mt-1">Habit formation</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6" data-testid="section-stories">
            <SectionHeading
              kicker="Stories"
              title="User stories"
              desc="Representative stories across new users, returning users, and advanced learners." 
              icon={<GitBranch className="w-4 h-4" />}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">New user</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  I want to choose a beginner drill so I can start without anxiety and still feel like I trained today.
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Returning user</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  I want a clear daily session CTA and fast entry into a timed drill so I can keep my habit.
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Ambitious learner</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  I want harder prompts and longer timers so I can practice storytelling under pressure.
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Time-constrained user</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  I want sessions to be predictable so I can finish during a short break.
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6" data-testid="section-edge">
            <SectionHeading
              kicker="Edge cases"
              title="Edge cases and failure modes"
              desc="Make the experience resilient and predictable even when users do unexpected things." 
              icon={<AlertTriangle className="w-4 h-4" />}
            />

            <Card className="border-border/60">
              <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
                <ul className="space-y-2 list-disc pl-5">
                  <li>User leaves mid-session and returns. The UI should not crash. The user can restart cleanly.</li>
                  <li>User ends session early. We log session_completed with a shorter duration and award XP only when completion screen is reached.</li>
                  <li>Timer hits zero while user is typing notes. Notes are optional and should not block completion.</li>
                  <li>User switches difficulty repeatedly. Only the started difficulty should count for session_started.</li>
                  <li>Offline usage. Event logging falls back to local storage and sync can be added later.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6" data-testid="section-ux">
            <SectionHeading
              kicker="UX"
              title="UX notes"
              desc="Design principles to make difficulty selection feel confident and premium." 
              icon={<Layers className="w-4 h-4" />}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Clarity over novelty</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Each difficulty card should explain what happens, how long it takes, and what the user is practicing.
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Fast entry</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  The number one job is to get users into the drill. Selection should be one tap, then start.
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Reward right away</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Completion should immediately show XP earned and streak impact. Users should feel progress in seconds.
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Predictable timing</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Timers should be visible and consistent. Users should know how long the drill will last.
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6" data-testid="section-tradeoffs">
            <SectionHeading
              kicker="Tradeoffs"
              title="Tradeoffs"
              desc="Intentional compromises made to ship a strong MVP." 
              icon={<GitBranch className="w-4 h-4" />}
            />

            <Card className="border-border/60">
              <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
                <ul className="space-y-2 list-disc pl-5">
                  <li>We prioritize a consistent timed experience over personalized coaching.</li>
                  <li>We keep the economy simple (XP by difficulty) to avoid confusion.</li>
                  <li>We accept imperfect measurement without full backend integration, but we log events for later analysis.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6" data-testid="section-open">
            <SectionHeading
              kicker="Open questions"
              title="Open questions"
              desc="Questions we would answer with user research and experiments." 
              icon={<Target className="w-4 h-4" />}
            />

            <Card className="border-border/60">
              <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
                <ul className="space-y-2 list-disc pl-5">
                  <li>Should we recommend a difficulty based on onboarding goal or recent completion rates?</li>
                  <li>What is the right XP spread so advanced feels rewarding but not mandatory?</li>
                  <li>Does adding a short warm-up before intermediate and advanced increase completion rates?</li>
                  <li>Should users be able to retry a drill immediately without losing streak credit?</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="pt-6" data-testid="section-prd-footer-cta">
            <Card className="border-primary/15 bg-primary/5">
              <CardContent className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Next step</p>
                  <p className="text-xl font-heading font-bold mt-2">Try the difficulty flow live</p>
                  <p className="text-sm text-muted-foreground mt-2">Start a session and experience the timers and completion loop.</p>
                </div>
                <Link href="/app">
                  <Button size="lg" className="rounded-full" data-testid="button-prd-launch">
                    Launch app
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </section>
    </div>
  );
}
