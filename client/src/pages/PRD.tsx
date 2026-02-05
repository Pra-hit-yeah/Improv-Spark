import { PMPage } from "@/components/layout/PMPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Compass,
  GitBranch,
  HelpCircle,
  LineChart,
  ListChecks,
  Shield,
  Target,
  Timer,
} from "lucide-react";

import { ScreenshotGallery } from "@/components/ui/screenshot-gallery";

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

function MetricRow({
  metric,
  baseline,
  target,
  method,
  testId,
}: {
  metric: string;
  baseline: string;
  target: string;
  method: string;
  testId: string;
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-2 sm:gap-4 py-3"
      data-testid={testId}
    >
      <div className="text-sm font-medium text-foreground" data-testid={`${testId}-metric`}>
        {metric}
      </div>
      <div className="text-sm text-muted-foreground" data-testid={`${testId}-baseline`}>
        <span className="sm:hidden text-xs uppercase tracking-widest">Baseline: </span>
        {baseline}
      </div>
      <div className="text-sm text-foreground" data-testid={`${testId}-target`}>
        <span className="sm:hidden text-xs uppercase tracking-widest">Target: </span>
        {target}
      </div>
      <div className="text-sm text-muted-foreground" data-testid={`${testId}-method`}>
        <span className="sm:hidden text-xs uppercase tracking-widest">How measured: </span>
        {method}
      </div>
    </div>
  );
}

export default function PRDHub() {
  return (
    <PMPage
      eyebrow="PRD"
      title="Structured difficulty levels for daily practice sessions"
      subtitle="Asana-style product spec for adding Beginner / Intermediate / Advanced as a first-class part of the daily drill flow."
    >
      <div className="not-prose flex flex-col sm:flex-row gap-3" data-testid="prd-top-actions">
        <Link href="/app" asChild>
          <Button asChild className="rounded-full" data-testid="button-prd-try-app">
            <a data-testid="link-prd-try-app">Open live app</a>
          </Button>
        </Link>
        <Link href="/product" className="inline-flex" data-testid="link-prd-back-product">
          Back to case study
        </Link>
      </div>

      <div className="space-y-14" data-testid="prd-body">
        <section className="space-y-5" data-testid="section-prd-brief">
          <div className="not-prose flex flex-col gap-3" data-testid="prd-brief-header">
            <div className="flex flex-wrap gap-2 items-center" data-testid="prd-brief-badges">
              <Badge variant="outline" className="border-border bg-background text-muted-foreground" data-testid="badge-prd-type">
                Feature spec
              </Badge>
              <Badge variant="outline" className="border-border bg-background text-muted-foreground" data-testid="badge-prd-status">
                V1
              </Badge>
            </div>
          </div>

          <Card className="shadow-none border-border/60" data-testid="card-prd-brief">
            <CardContent className="pt-6" data-testid="card-prd-brief-content">
              <div className="grid gap-5" data-testid="grid-prd-brief">
                <MetaRow
                  label="Owner"
                  value="Prahitya"
                  testId="meta-prd-owner"
                />
                <MetaRow
                  label="Target users"
                  value="Beginner / Intermediate / Advanced daily practice"
                  testId="meta-prd-users"
                />
                <MetaRow
                  label="Status"
                  value="Prototype"
                  testId="meta-prd-status"
                />
                <MetaRow
                  label="Last Updated"
                  value={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  testId="meta-prd-updated"
                />
                <MetaRow
                  label="Time estimate"
                  value="1–2 weeks (V1)"
                  testId="meta-prd-timeline"
                />
              </div>
            </CardContent>
          </Card>

          <Section
            kicker="Project brief"
            title="Background"
            icon={<ClipboardList className="w-5 h-5 text-muted-foreground" />}
            testId="section-background"
          >
            <p data-testid="text-prd-background-1">
              I decided to formalize structured difficulty because early prototyping made a pattern impossible to ignore: when drills felt
              too intense, people abandoned the session; when drills felt too easy, they finished but didn’t feel meaningfully trained.
              That mismatch is the fastest way to lose a daily habit.
            </p>
            <p data-testid="text-prd-background-2">
              In ~50 founder-led qualitative conversations, users consistently described the same tension: they have knowledge and ideas,
              but freeze in high-stakes moments. This product is not about teaching content—it’s about improving retrieval under pressure.
              A structured difficulty system gives users a safe, explicit way to opt into pressure.
            </p>
            <Card className="shadow-none border-border/60" data-testid="card-background-quote">
              <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed" data-testid="text-background-quote">
                “I know things but can’t think in the moment.” (paraphrased)
              </CardContent>
            </Card>
          </Section>
        </section>

        <Separator />

        <Section
          kicker="Problem"
          title="JTBD-style problem statements"
          icon={<Target className="w-5 h-5 text-muted-foreground" />}
          testId="section-problem-statements"
        >
          <div className="grid gap-6 md:grid-cols-3" data-testid="grid-problems">
            <Card className="shadow-none border-border/60" data-testid="card-problem-beginner">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Beginner</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-problem-beginner">
                  When I feel intimidated by speaking under time pressure, I want a low-friction drill that still counts as practice,
                  so I can complete today’s session without anxiety.
                </p>
                <ul className="list-disc pl-5 space-y-2" data-testid="list-problem-beginner">
                  <li>Primary barrier: fear of freezing</li>
                  <li>Desired outcome: “I spoke out loud today.”</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-problem-intermediate">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Intermediate</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-problem-intermediate">
                  When I want to sound clear in meetings or interviews, I need a drill that forces me to organize thoughts quickly,
                  so I can practice forming coherent responses under light pressure.
                </p>
                <ul className="list-disc pl-5 space-y-2" data-testid="list-problem-intermediate">
                  <li>Primary barrier: slow structure + overthinking</li>
                  <li>Desired outcome: “I can say something coherent fast.”</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-problem-advanced">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Advanced</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-problem-advanced">
                  When I want to be agile in social settings with unpredictable turns, I need a harder drill that increases cognitive load,
                  so I can practice storytelling and connecting ideas under real time pressure.
                </p>
                <ul className="list-disc pl-5 space-y-2" data-testid="list-problem-advanced">
                  <li>Primary barrier: pressure + complexity simultaneously</li>
                  <li>Desired outcome: “I stayed fluent under constraints.”</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        <Section
          kicker="Goals"
          title="Goals and success metrics"
          icon={<LineChart className="w-5 h-5 text-muted-foreground" />}
          testId="section-goals"
        >
          <div className="grid gap-6 md:grid-cols-2" data-testid="grid-goals-nongoals">
            <BulletCard
              title="Goals (what I will achieve)"
              testId="card-goals"
              items={[
                <>I will make difficulty selection obvious, fast, and confidence-building.</>,
                <>I will increase weekly completed sessions per user by reducing mismatch-driven drop-off.</>,
                <>I will improve completion rates by offering a safe entry point (Beginner) and an aspirational path (Advanced).</>,
              ]}
            />
            <BulletCard
              title="Non-goals (explicitly out of scope)"
              testId="card-nongoals"
              items={[
                <>Speaking quality evaluation (no scoring).</>,
                <>Humor evaluation (no “wit rating”).</>,
                <>Coaching / correction (no tips on what to say).</>,
                <>AI-generated feedback or judging (no LLM critique).</>,
              ]}
            />
          </div>

          <Card className="shadow-none border-border/60" data-testid="card-metrics">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Metrics mapping</CardTitle>
            </CardHeader>
            <CardContent className="text-sm" data-testid="card-metrics-content">
              <div className="hidden sm:grid grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-4 pb-2" data-testid="metrics-header">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Metric</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Baseline</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Target</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">How measured</div>
              </div>
              <div className="divide-y divide-border" data-testid="metrics-rows">
                <MetricRow
                  metric="Sessions per user per week"
                  baseline="TBD (current prototype)"
                  target="+ meaningful lift post-V1"
                  method="weekly_user_sessions_completed"
                  testId="metric-sessions-per-week"
                />
                <MetricRow
                  metric="Session completion rate"
                  baseline="TBD"
                  target="+15% (conservative)"
                  method="session_completed / session_started"
                  testId="metric-completion"
                />
                <MetricRow
                  metric="D7 retention"
                  baseline="TBD"
                  target="+10% (conservative)"
                  method="users_active_day_7"
                  testId="metric-d7"
                />
                <MetricRow
                  metric="Churn"
                  baseline="TBD"
                  target="-5% (conservative)"
                  method="paid_churn_rate (when pricing exists)"
                  testId="metric-churn"
                />
              </div>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        <Section
          kicker="Hypothesis"
          title="What I believe will happen"
          icon={<Compass className="w-5 h-5 text-muted-foreground" />}
          testId="section-hypothesis"
        >
          <Card className="shadow-none border-border/60" data-testid="card-hypothesis">
            <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed space-y-3">
              <p data-testid="text-hypothesis">
                I believe that giving users an explicit, structured choice (Beginner / Intermediate / Advanced) before starting a daily drill
                will reduce anxiety-driven drop-off and increase the sense of “this is the right challenge for me.”
              </p>
              <p data-testid="text-hypothesis-deltas">
                Conservatively, I expect a <strong className="text-foreground">15% lift in completion</strong>, a <strong className="text-foreground">10% lift in D7 retention</strong>,
                and a <strong className="text-foreground">5% reduction in churn</strong> as users build a consistent daily habit.
              </p>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        <Section
          kicker="Vision"
          title="Vision narrative"
          icon={<Shield className="w-5 h-5 text-muted-foreground" />}
          testId="section-vision"
        >
          <p data-testid="text-vision-1">
            I’m optimizing for a very specific moment: a social setting where the conversation turns quickly, everyone is watching, and the
            user wants to contribute—but their brain stalls.
          </p>
          <p data-testid="text-vision-2">
            In that moment, the user doesn’t need theory. They need reps that make the feeling of pressure familiar. Difficulty levels let
            them choose the amount of pressure they can handle today, and still walk away with a win.
          </p>
          <Card className="shadow-none border-border/60" data-testid="card-vision-callout">
            <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed" data-testid="text-vision-callout">
              I decided the product should feel like daily training, not a class. The core promise is a “warm start” for spontaneous speech.
            </CardContent>
          </Card>
        </Section>

        <Separator />

        <Section
          kicker="Scope"
          title="Rough scoping & timeline"
          icon={<CalendarDays className="w-5 h-5 text-muted-foreground" />}
          testId="section-scope"
        >
          <div className="grid gap-6 md:grid-cols-2" data-testid="grid-scope">
            <BulletCard
              title="V1 (ship in 1–2 weeks)"
              testId="card-scope-v1"
              items={[
                <>Difficulty selection step before drills (Beginner / Intermediate / Advanced).</>,
                <>Clear descriptions on each difficulty card: what happens, how long, what it trains.</>,
                <>Consistent drill templates per difficulty (timer + prompt format).</>,
                <>Instrumentation: difficulty_selected, session_started, session_completed.</>,
              ]}
            />
            <BulletCard
              title="Deferred / V2"
              testId="card-scope-v2"
              items={[
                <>Adaptive recommendations (suggest level based on behavior).</>,
                <>Expanded prompt variety + anti-repetition system.</>,
                <>“What this trains” explanations per exercise, richer and more explicit (see Risks section for fixes).</>,
                <>Retry / streak rules experiments.</>,
              ]}
            />
          </div>

          <Card className="shadow-none border-border/60" data-testid="card-timeline">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Proposed timeline</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed" data-testid="text-timeline">
              Week 1: design + implement difficulty selection UI, basic copy, and event logging. Week 2: integrate drills per level,
              add empty-state guidance, and validate flow with lightweight usability testing.
            </CardContent>
          </Card>
        </Section>

        <Separator />

        <Section
          kicker="Decisions"
          title="Key tradeoffs & decisions"
          icon={<GitBranch className="w-5 h-5 text-muted-foreground" />}
          testId="section-decisions"
        >
          <div className="grid gap-6 md:grid-cols-2" data-testid="grid-decisions">
            <Card className="shadow-none border-border/60" data-testid="card-decision-text-input">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">I rejected text input as the primary interaction</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-decision-text-input">
                  I decided against requiring typed responses because it changes the skill being trained. Typing encourages editing and
                  self-monitoring. Our user problem is verbal retrieval under pressure.
                </p>
                <ul className="list-disc pl-5 space-y-2" data-testid="list-decision-text-input">
                  <li>Typing increases friction and drop-off in short sessions.</li>
                  <li>Typing shifts the product toward “writing” rather than speaking.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-decision-ai-judging">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">I rejected AI judging and scoring for V1</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-decision-ai-judging">
                  I decided not to add AI evaluation because the risk profile is wrong for early habit formation. Judging increases anxiety.
                  Users already fear being evaluated; the product needs to feel safe.
                </p>
                <ul className="list-disc pl-5 space-y-2" data-testid="list-decision-ai-judging">
                  <li>Evaluation creates “grade pressure,” which is anti-spontaneity.</li>
                  <li>Reliability and fairness concerns are high without robust calibration.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        <Section
          kicker="Concept mocks"
          title="User flow + in-app references"
          icon={<ListChecks className="w-5 h-5 text-muted-foreground" />}
          testId="section-mocks"
        >
          <Card className="shadow-none border-border/60" data-testid="card-mock-flow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Visual flow (V1)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed" data-testid="card-mock-flow-content">
              <div className="grid gap-4" data-testid="mock-flow-steps">
                {[
                  {
                    t: "Dashboard",
                    d: "User taps the primary CTA for today’s session.",
                    i: <Timer className="w-4 h-4 text-muted-foreground" />,
                  },
                  {
                    t: "Difficulty selection",
                    d: "I show three cards with time + what the drill trains. One tap selects.",
                    i: <Target className="w-4 h-4 text-muted-foreground" />,
                  },
                  {
                    t: "Drill",
                    d: "Timed prompts. The user speaks out loud. No scoring.",
                    i: <CheckCircle2 className="w-4 h-4 text-muted-foreground" />,
                  },
                  {
                    t: "Completion",
                    d: "XP + streak update. Clear next best action.",
                    i: <LineChart className="w-4 h-4 text-muted-foreground" />,
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-background p-4"
                    data-testid={`mock-flow-step-${idx}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                        {s.i}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground" data-testid={`mock-flow-step-${idx}-title`}>
                          {s.t}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1" data-testid={`mock-flow-step-${idx}-desc`}>
                          {s.d}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60" data-testid="card-mock-screens">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">In-app screenshot references</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-mock-screens-1">
                  I reference the existing prototype screens to ground this PRD in what’s already built.
                </p>
                <ul className="list-disc pl-5 space-y-2" data-testid="list-mock-screens">
                  <li>Dashboard: “Today’s Session” card CTA</li>
                  <li>Session start: entry point into the drill flow</li>
                  <li>Timed prompt card: visible timer + prompt chips</li>
                  <li>Completion screen: XP and streak update</li>
                </ul>
              </div>
              
              <ScreenshotGallery 
                images={[
                  { 
                    src: "/prd/dashboard.png", 
                    alt: "Dashboard showing daily streak and CTA",
                    caption: "Dashboard: Clear entry point for today's session."
                  },
                  { 
                    src: "/prd/difficulty.png", 
                    alt: "Difficulty selection screen with Beginner, Intermediate, Advanced options",
                    caption: "Selection: Explicit choice of challenge level."
                  },
                  { 
                    src: "/prd/session.png", 
                    alt: "Active drill interface with timer and prompt",
                    caption: "Active Drill: Timed prompts for spoken practice."
                  },
                  { 
                    src: "/prd/completion.png", 
                    alt: "Session complete screen showing stats",
                    caption: "Completion: Instant feedback and streak updates."
                  }
                ]} 
                testId="gallery-prd-mockups"
              />
            </CardContent>
          </Card>
        </Section>

        <Separator />

        <Section
          kicker="Risks"
          title="Risks & mitigations"
          icon={<AlertTriangle className="w-5 h-5 text-muted-foreground" />}
          testId="section-risks"
        >
          <div className="grid gap-6" data-testid="grid-risks">
            <Card className="shadow-none border-border/60" data-testid="card-risk-arbitrary">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Risk: progression feels arbitrary</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-risk-arbitrary">
                  If users don’t understand what each level trains, “Beginner → Advanced” can feel cosmetic.
                </p>
                <p data-testid="text-risk-arbitrary-v2">
                  <strong className="text-foreground">Mitigation (V2):</strong> I will add “What this trains” explanations per difficulty (e.g.,
                  retrieval speed, structuring, narrative coherence) and tie them to real scenarios.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-risk-repetition">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Risk: prompts feel repetitive</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-risk-repetition">
                  A daily habit dies if the drills feel the same week after week.
                </p>
                <p data-testid="text-risk-repetition-v2">
                  <strong className="text-foreground">Mitigation (V2):</strong> I will add prompt pools by domain + novelty constraints
                  (avoid repeats within N days) and introduce lightweight themed days.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-risk-clarity">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Risk: unclear what skill is being trained</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p data-testid="text-risk-clarity">
                  Users may complete sessions but not connect the reps to real life (“How does this help me at a party?”).
                </p>
                <p data-testid="text-risk-clarity-v2">
                  <strong className="text-foreground">Mitigation (V2):</strong> I will add a short explanation after completion:
                  “Today you trained: fast retrieval under pressure.” I’ll also label drills with scenario context.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        <Section
          kicker="Open questions"
          title="What I still need to validate"
          icon={<HelpCircle className="w-5 h-5 text-muted-foreground" />}
          testId="section-open-questions"
        >
          <Card className="shadow-none border-border/60" data-testid="card-open-questions">
            <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc pl-5 space-y-2" data-testid="list-open-questions">
                <li>Do users prefer a default recommended level or explicit choice every day?</li>
                <li>What is the minimum copy needed to explain “what this trains” without adding reading friction?</li>
                <li>Should Advanced be locked behind completions, or always available for agency?</li>
                <li>What timer lengths maximize completion without reducing perceived challenge?</li>
              </ul>
            </CardContent>
          </Card>
        </Section>

        <Separator />

        <Section
          kicker="Appendix"
          title="Tie-back to research insights"
          icon={<ListChecks className="w-5 h-5 text-muted-foreground" />}
          testId="section-appendix"
        >
          <div className="grid gap-6 md:grid-cols-2" data-testid="grid-appendix">
            <Card className="shadow-none border-border/60" data-testid="card-appendix-insights">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Relevant research insights</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed" data-testid="text-appendix-insights">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Flow priming beats long, infrequent classes for habit formation.</li>
                  <li>Pressure vs knowledge is the core gap (retrieval under stakes).</li>
                  <li>Fear blocks spontaneity; evaluation increases fear.</li>
                  <li>Users want reps—practice-as-sport, not theory.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60" data-testid="card-appendix-why-levels">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Why difficulty levels match the insight</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed" data-testid="text-appendix-why-levels">
                Structured difficulty is the simplest way to operationalize “safe pressure.” It gives users agency over stakes while keeping
                the daily practice loop short and repeatable.
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-none border-border/60" data-testid="card-appendix-instrumentation">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Instrumentation (V1)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed" data-testid="text-appendix-instrumentation">
              I will log difficulty_selected, session_started, and session_completed so I can read completion rates by level and iterate on
              copy + timers. This is intentionally lightweight and compatible with the prototype’s current analytics approach.
            </CardContent>
          </Card>
        </Section>

        <section className="not-prose pt-2" data-testid="section-prd-footer">
          <Card className="shadow-none border-border/60" data-testid="card-prd-footer">
            <CardContent className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" data-testid="text-prd-footer-kicker">
                  Next step
                </p>
                <p className="text-sm text-muted-foreground mt-2" data-testid="text-prd-footer-desc">
                  I will validate difficulty descriptions with 5 quick usability sessions and tune timers before expanding scope.
                </p>
              </div>
              <Link href="/app" asChild>
                <Button asChild className="rounded-full" data-testid="button-prd-launch">
                  <a data-testid="link-prd-launch">Launch app</a>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </PMPage>
  );
}
