import { PMPage } from "@/components/layout/PMPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Section({
  title,
  children,
  testId,
}: {
  title: string;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <section className="space-y-4" data-testid={testId}>
      <h2 className="pm-h2" data-testid={`${testId}-title`}>{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function GTMPage() {
  return (
    <PMPage
      eyebrow="GTM"
      title="Go-to-market strategy"
      subtitle="Positioning, early adopters, and distribution plan. Written as internal strategy documentation."
    >
      <Section title="Positioning" testId="section-gtm-positioning">
        <Card className="shadow-none border-border/60">
          <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
            <p className="text-foreground"><strong>Positioning statement</strong></p>
            <p>
              For socializers and professionals who want to get out of their head and be verbally spontaneouswithout long improv classes
              Quick-Wit is a daily drill app that primes fast thinking through timed prompts and progressive difficulty.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Clear non-goals" testId="section-gtm-non-goals">
        <ul className="list-disc pl-5 space-y-2">
          <li>Not an improv-actor training app or stage performance program.</li>
          <li>Not a library of what to say scripts or canned lines.</li>
          <li>Not a passive content product (videos, lectures) as the primary mechanism.</li>
        </ul>
      </Section>

      <Section title="Differentiation" testId="section-gtm-differentiation">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Vs improv classes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Improv classes are long, scheduled, and infrequent. Quick-Wit is short, daily, and designed to create repetition.
              The goal isnt performanceits retrieval under pressure.
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Vs books / YouTube</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Passive learning can inspire but doesnt create reps. Quick-Wit behaves like a practice partner: it prompts, times, advances,
              and reinforces completion.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="ICP and early adopters" testId="section-gtm-icp">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">ICP</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Ages 1640 high-stakes communicators who experience freeze under pressure and want a practical daily routine.
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Early adopters</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              College students and early-career professionals: high repetition of social + professional speaking, high willingness to try
              habit products, and clear moments of value.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Launch strategy" testId="section-gtm-launch">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Campus-led distribution:</strong> student ambassadors, clubs, career centers.</li>
          <li><strong>Events:</strong> quick timed prompt booths, improv-lite challenges, social confidence workshops.</li>
          <li><strong>Job fairs:</strong> Interview warm-up framing; first use happens minutes before real stakes.</li>
          <li><strong>Organic loop:</strong> users share prompt results or streak milestones as proof of practice.</li>
        </ul>
      </Section>

      <Section title="Activation moment" testId="section-gtm-activation">
        <Card className="shadow-none border-border/60">
          <CardContent className="pt-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Activation moment:</strong> the first time a user has a clever thought and actually speaks it out loud during a drill.
              The felt win is I did itnot the score.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Retention loop" testId="section-gtm-retention">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Trigger:</strong> daily reminder  quick session expectation (25 minutes).</li>
          <li><strong>Action:</strong> timed drill (pressure + novelty).</li>
          <li><strong>Variable reward:</strong> new prompts; occasional surprise moments of fluent speech.</li>
          <li><strong>Investment:</strong> streak and personal identity: I train my creative muscle daily.</li>
        </ul>
      </Section>

      <Section title="Pricing hypothesis" testId="section-gtm-pricing">
        <Card className="shadow-none border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Initial hypothesis</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            1-week free daily session. Then subscription: $12/month or $9.99 annual (test willingness-to-pay by cohort and by outcomes).
          </CardContent>
        </Card>
      </Section>

      <Section title="Expansion" testId="section-gtm-expansion">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">AI coaching packages</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Add optional coaching modules: banter, humor, flirting, conflict resolution. Sell as premium packs rather than bloating the core.
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">B2B wedge</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Team plans for cohorts and organizations that value communication (campus orgs, sales teams, consulting clubs).
            </CardContent>
          </Card>
        </div>
      </Section>
    </PMPage>
  );
}
