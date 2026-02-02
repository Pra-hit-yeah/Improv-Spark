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

export default function ResearchPage() {
  return (
    <PMPage
      eyebrow="Research"
      title="Research & insights"
      subtitle="Founder-led discovery summary and how it directly shaped product decisions."
    >
      <div className="not-prose grid gap-6 sm:grid-cols-2" data-testid="grid-research-summary">
        <Card className="shadow-none border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Method</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            ~50 qualitative conversations (founder-led), plus lightweight synthesis into recurring patterns and tensions.
          </CardContent>
        </Card>
        <Card className="shadow-none border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Problem space</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Spontaneity breaks under pressure: the gap between what people know and what they can say in the moment.
          </CardContent>
        </Card>
      </div>

      <Section title="Research origin" testId="section-research-origin">
        <p>
          Discovery was founder-led and intentionally broad at the start: conversations began with lived moments where people felt
          "stuck" speaking, then worked backwards into triggers, context, and current coping behaviors.
        </p>
        <p>
          The consistent pattern across ~50 conversations: people dont lack ideas or intelligencethey lack access to their ideas
          when the stakes rise (interviews, meetings, dating, social groups, public speaking).
        </p>
      </Section>

      <Section title="Personas" testId="section-research-personas">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Primary persona (1640)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                High-stakes communicators: students, early-career professionals, and socializers who frequently need to speak on the fly.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Contexts: interviews, classes, meetings, networking, group hangouts.</li>
                <li>Motivation: confidence + momentum, not performance art.</li>
                <li>Constraints: limited time, low tolerance for long programs.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Secondary persona (4060)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                Cognitive sharpness and verbal agility: people who want to keep their mind quick and expressive in everyday conversation.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Contexts: work leadership, social settings, family conversations.</li>
                <li>Motivation: staying sharp, reducing social friction.</li>
                <li>Constraints: prefers simple, repeatable routines.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Core insights" testId="section-research-insights">
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Flow priming:</strong> many users dont need a full classthey need a daily warm start that primes quick thinking.
          </li>
          <li>
            <strong>Pressure vs knowledge:</strong> the core problem is retrieval under pressure, not lack of information.
          </li>
          <li>
            <strong>Fear blocks spontaneity:</strong> self-monitoring and fear of judgment consumes working memory and slows response.
          </li>
          <li>
            <strong>Practice-as-sport analogy:</strong> users describe spontaneity as a musclethey want reps, not theory.
          </li>
        </ul>
      </Section>

      <Section title="Key quotes (paraphrased)" testId="section-research-quotes">
        <div className="grid gap-6 md:grid-cols-2">
          {["I know things but cant think in the moment.",
            "I get stuck in my head and miss the moment.",
            "Improv classes are long and infrequentI need daily reps.",
            "Books and videos cant be a practice partner.",
            "When the room is watching, my brain goes blank.",
            "I want to prime the creative improv engine once a day.",
          ].map((q, idx) => (
            <Card key={idx} className="shadow-none border-border/60">
              <CardContent className="pt-6 text-sm leading-relaxed text-foreground">
                <p className="text-muted-foreground">“{q}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Jobs-to-be-Done" testId="section-research-jtbd">
        <div className="grid gap-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Core JTBD</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                When Im in a high-stakes conversation and I feel my brain freeze, I want a lightweight way to train quick responses
                so I can say something clear and confident without overthinking.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reduce latency between thought  speech</li>
                <li>Increase comfort with uncertainty</li>
                <li>Build evidence of progress through repeatable reps</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Supporting JTBD</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>When Im anxious, I want structure so I dont default to silence.</li>
                <li>When Im busy, I want a practice session that fits into 25 minutes.</li>
                <li>When Im improving, I want feedback and milestones that feel fair and motivating.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Implications for product design" testId="section-research-implications">
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Daily priming over long sessions:</strong> prioritize short, timed drills that create a warm start.
          </li>
          <li>
            <strong>Pressure as a feature:</strong> use timers intentionally to simulate stakes while keeping environment safe.
          </li>
          <li>
            <strong>Practice partner feel:</strong> prompts should respond/advance so it feels interactive, not passive consumption.
          </li>
          <li>
            <strong>Progress visible in seconds:</strong> streak and XP are reinforcement, but the felt win is I spoke.
          </li>
          <li>
            <strong>Scaffold difficulty:</strong> beginner  intermediate  advanced maps to confidence + complexity.
          </li>
        </ul>
      </Section>
    </PMPage>
  );
}
