import { PMPage } from "@/components/layout/PMPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine
} from "recharts";
import { 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  ArrowRight,
  TrendingUp,
  Filter
} from "lucide-react";

// Mock Data for Charts
const activationData = [
  { name: "Original", value: 42, label: "1 session/wk" },
  { name: "New", value: 68, label: "3 sessions/wk" },
];

const difficultyData = [
  { day: "D1", easy: 100, hard: 100 },
  { day: "D2", easy: 85, hard: 60 },
  { day: "D3", easy: 75, hard: 45 },
  { day: "D7", easy: 60, hard: 30 },
];

function Section({
  title,
  icon,
  children,
  testId,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <section className="space-y-6" data-testid={testId}>
      <div className="flex items-center gap-3">
        {icon && <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground">{icon}</div>}
        <h2 className="pm-h2 m-0" data-testid={`${testId}-title`}>{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function ExperimentStatus({ status }: { status: "won" | "lost" | "inconclusive" | "running" }) {
  if (status === "won") return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 shadow-none">Win</Badge>;
  if (status === "lost") return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100 shadow-none">Loss</Badge>;
  if (status === "running") return <Badge variant="outline" className="border-blue-200 text-blue-800 bg-blue-50">Running</Badge>;
  return <Badge variant="outline" className="border-amber-200 text-amber-800 bg-amber-50">Inconclusive</Badge>;
}

export default function ExperimentsPage() {
  return (
    <PMPage
      eyebrow="Experiments"
      title="Experimentation log"
      subtitle="A rigid framework for validating product decisions with data, not just intuition."
    >
      {/* Top Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900">
          <strong>Early Prototype Data:</strong> Metrics below are illustrative mockups based on small-n prototype testing (n&lt;50). They demonstrate the <em>methodology</em> and <em>rigor</em> we apply, rather than statistical significance at scale.
        </div>
      </div>

      <Separator />

      {/* 1. Experiment Framework */}
      <Section title="The framework" icon={<Search className="w-5 h-5" />} testId="section-framework">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">What counts?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Any change where the outcome is unknown and reversible. We don't experiment on bug fixes or obvious usability improvements.
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Small Data</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              At &lt;100 users, we look for "signal," not p-values. If a change doesn't move the needle by &gt;20%, it's noise.
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Kill Criteria</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              We define failure <em>before</em> we launch. If retention drops &gt;5%, we roll back immediately.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* 2. Experiment Log Table */}
      <Section title="Recent experiments" icon={<FlaskConical className="w-5 h-5" />} testId="section-log">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border/60">
              <tr>
                <th className="p-3 pl-4 w-[25%]">Experiment</th>
                <th className="p-3 w-[25%]">Hypothesis</th>
                <th className="p-3 w-[15%]">Metric</th>
                <th className="p-3 w-[15%]">Result</th>
                <th className="p-3 w-[20%]">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-background">
              <tr>
                <td className="p-3 pl-4 font-medium">
                  EXP-01: CTA Copy
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">"Start Drill" vs "Practice Now"</div>
                </td>
                <td className="p-3 text-muted-foreground">Urgency increases CTR</td>
                <td className="p-3 text-muted-foreground">CTR</td>
                <td className="p-3 font-medium text-green-600">+12%</td>
                <td className="p-3"><ExperimentStatus status="won" /></td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-medium">
                  EXP-02: Activation Def.
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">1 session vs 3 sessions</div>
                </td>
                <td className="p-3 text-muted-foreground">Harder goal filters for intent</td>
                <td className="p-3 text-muted-foreground">W2 Retention</td>
                <td className="p-3 font-medium text-green-600">+26%</td>
                <td className="p-3"><ExperimentStatus status="won" /></td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-medium">
                  EXP-03: Difficulty Select
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">User-choice vs Auto-ramp</div>
                </td>
                <td className="p-3 text-muted-foreground">Choice reduces anxiety</td>
                <td className="p-3 text-muted-foreground">Completion</td>
                <td className="p-3 font-medium text-red-600">-15%</td>
                <td className="p-3"><ExperimentStatus status="lost" /></td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-medium">
                  EXP-04: AI Framing
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">"AI Coach" vs "Training Bot"</div>
                </td>
                <td className="p-3 text-muted-foreground">"Coach" implies judgment</td>
                <td className="p-3 text-muted-foreground">Start Rate</td>
                <td className="p-3 font-medium text-muted-foreground">~0%</td>
                <td className="p-3"><ExperimentStatus status="inconclusive" /></td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-medium">
                  EXP-05: Paywall Place
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">Onboarding vs After D1</div>
                </td>
                <td className="p-3 text-muted-foreground">Value first increases conversion</td>
                <td className="p-3 text-muted-foreground">Convert %</td>
                <td className="p-3 font-medium text-blue-600">Pending</td>
                <td className="p-3"><ExperimentStatus status="running" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Separator />

      {/* 3. Deep Dives */}
      <Section title="Deep dives" icon={<Search className="w-5 h-5" />} testId="section-deep-dives">
        <div className="space-y-12">
          
          {/* Deep Dive 1: Activation */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-2">EXP-02</Badge>
              <h3 className="text-xl font-bold text-foreground">Redefining "Activation"</h3>
              
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Context</p>
                <p className="text-sm text-foreground leading-relaxed">
                  We originally defined activation as "User completes 1 session." Data showed 60% churn after D1.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Hypothesis</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Users who complete 3 sessions in their first week build the habit loop. 1 session is just novelty seeking.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-3 rounded-md">
                <p className="text-sm font-medium text-green-900">
                  <strong>Decision:</strong> Updated core KPI. We now optimize onboarding to get users to <em>3 sessions</em>, not just one.
                </p>
              </div>
            </div>

            <Card className="shadow-none border-border/60 h-[300px]">
              <CardHeader className="pb-0">
                <CardTitle className="text-sm text-muted-foreground">W2 Retention Rate by Activation Type</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={40} label={{ position: 'right', fill: '#666' }} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Separator className="border-dashed" />

          {/* Deep Dive 2: Difficulty */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <Card className="shadow-none border-border/60 h-[300px] order-2 md:order-1">
              <CardHeader className="pb-0">
                <CardTitle className="text-sm text-muted-foreground">Completion Rate Drop-off</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={difficultyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tick={{fontSize: 12}} />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="easy" stroke="#22c55e" strokeWidth={2} name="Auto-Ramp (Control)" />
                    <Line type="monotone" dataKey="hard" stroke="#ef4444" strokeWidth={2} name="User Choice (Variant)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4 order-1 md:order-2">
              <Badge variant="outline" className="mb-2">EXP-03</Badge>
              <h3 className="text-xl font-bold text-foreground">The Paradox of Choice</h3>
              
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Context</p>
                <p className="text-sm text-foreground leading-relaxed">
                  We let users choose "Easy, Medium, Hard" before every drill, thinking it gave them control.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Outcome</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Completion rates <strong>plummeted by 15%</strong>. Users spent more time deciding than doing. They often picked "Hard," failed, and quit.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-3 rounded-md">
                <p className="text-sm font-medium text-green-900">
                  <strong>Decision:</strong> Removed choice. The app now auto-ramps difficulty based on streak. "Don't make them think."
                </p>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <Separator />

      {/* 4. Failed/Inconclusive */}
      <Section title="Failed experiments" icon={<XCircle className="w-5 h-5" />} testId="section-failed">
        <Card className="shadow-none border-border/60 bg-muted/10">
          <CardHeader>
            <CardTitle className="text-base text-foreground">The "AI Feedback" Deferral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Hypothesis:</strong> Giving users instant AI scores (1-10) on their speech would gamify the experience and increase replay value.
            </p>
            <p>
              <strong>Reality:</strong> In user testing, 3/5 users reported <em>increased anxiety</em> knowing they were being "graded." It triggered the exact performance anxiety we aim to cure.
            </p>
            <p className="text-foreground font-medium">
              → Decision: Feature cut from V1. Replaced with simple "Completion Streaks" (non-judgmental consistency).
            </p>
          </CardContent>
        </Card>
      </Section>

      <Separator />

      {/* 5. Next Steps */}
      <Section title="Next instrumentation step" icon={<TrendingUp className="w-5 h-5" />} testId="section-next">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Moving from "hacky prototype logging" to robust event-based analytics.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <Filter className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Tool Selection:</strong> PostHog (for session replay + events).
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Filter className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Core Taxonomy:</strong>
                  <br/>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">session_start</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">drill_complete</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">paywall_view</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">subscription_start</code>.
                </div>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-border/60 bg-background flex flex-col justify-center items-center text-center">
            <p className="text-sm font-medium text-foreground mb-2">Why wait?</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              "Premature optimization is the root of all evil." We validated the core loop manually first. Now we scale the measurement.
            </p>
          </div>
        </div>
      </Section>
    </PMPage>
  );
}
