import { PMPage } from "@/components/layout/PMPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Zap, 
  Flag, 
  Megaphone, 
  GitMerge, 
  DollarSign, 
  BarChart2,
  Users,
  MessageSquare
} from "lucide-react";

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

export default function GTMPage() {
  return (
    <PMPage
      eyebrow="GTM Strategy"
      title="Go-to-Market Strategy"
      subtitle="A hypothesis-driven plan to validate the value proposition and achieve initial traction."
    >
      
      {/* 1. Target Market */}
      <Section title="1. Target Market (Beachhead)" icon={<Target className="w-5 h-5" />} testId="section-target">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Primary Buyer: "The Ambitious Student"</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <strong>Socially anxious but ambitious college students.</strong> 
              <br/><br/>
              They are involved in clubs, Greek life, or student government. They <em>want</em> to lead and speak up, but fear "blanking out" prevents them. 
              <br/>
              <em>Why start here?</em> Dense networks (viral potential), high stakes (interviews/dating), and existing habit of paying for self-improvement.
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60 bg-muted/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Psychographics</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>Values <strong>competence</strong> and <strong>social status</strong>.</li>
                <li>Fears <strong>public embarrassment</strong> and being seen as "quiet" or "awkward".</li>
                <li>Already uses: Duolingo, Headspace, Spotify.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* 2. Value Proposition */}
      <Section title="2. Value Proposition" icon={<Zap className="w-5 h-5" />} testId="section-value">
        <div className="space-y-4">
          <Card className="shadow-none border-primary/20 bg-primary/5">
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">Primary Promise</p>
              <p className="text-xl font-bold text-foreground">"Never blank out in a conversation again."</p>
            </CardContent>
          </Card>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border/60">
              <p className="font-semibold text-foreground mb-1">Confidence</p>
              <p className="text-xs text-muted-foreground">Stop second-guessing your words before you say them.</p>
            </div>
            <div className="p-4 rounded-lg border border-border/60">
              <p className="font-semibold text-foreground mb-1">Speed</p>
              <p className="text-xs text-muted-foreground">Close the gap between having a thought and speaking it.</p>
            </div>
            <div className="p-4 rounded-lg border border-border/60">
              <p className="font-semibold text-foreground mb-1">Comebacks</p>
              <p className="text-xs text-muted-foreground">Always have a witty response ready, even under pressure.</p>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* 3. Objectives */}
      <Section title="3. Launch Objectives (30 Days)" icon={<Flag className="w-5 h-5" />} testId="section-objectives">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Signups", val: "500", sub: "Total Accounts" },
            { label: "Activation", val: "100", sub: "Weekly Active Users" },
            { label: "Revenue", val: "20", sub: "Paid Subscribers" },
            { label: "Retention", val: "30%", sub: "Day 7 Retention" },
          ].map((m, i) => (
            <Card key={i} className="shadow-none border-border/60 text-center p-4">
              <div className="text-2xl font-bold text-foreground">{m.val}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">{m.label}</div>
              <div className="text-[10px] text-muted-foreground/60">{m.sub}</div>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          <em>Qualitative Goal:</em> Collect 10 video testimonials/stories of "It worked in real life."
        </p>
      </Section>

      <Separator />

      {/* 4. Marketing Plan */}
      <Section title="4. Marketing Plan" icon={<Megaphone className="w-5 h-5" />} testId="section-marketing">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Primary Channels</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Campus Ambassadors:</strong> Recruit 5 "Social Chairs" from major clubs to host "Improv-Lite" workshops using the app.
                  <br/><span className="text-xs opacity-70">Why: High trust, instant social proof.</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">TikTok / Reels:</strong> "POV: You blanked in an interview vs. You used Quick-Wit."
                  <br/><span className="text-xs opacity-70">Why: Visualizes the pain point instantly.</span>
                </div>
              </li>
            </ul>
          </div>
          <Card className="shadow-none border-border/60 bg-muted/10">
            <CardContent className="p-4 text-sm text-muted-foreground leading-relaxed">
              <strong>Strategy Rationale: Authenticity.</strong>
              <br/>
              We are not selling a "course." We are selling a "secret weapon." Marketing should feel like a peer sharing a life hack, not a corporation selling training.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* 5. Funnel & Activation */}
      <Section title="5. Funnel & Activation" icon={<GitMerge className="w-5 h-5" />} testId="section-funnel">
        <div className="relative overflow-hidden rounded-lg border border-border/60">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border/60">
              <tr>
                <th className="p-3 pl-4">Stage</th>
                <th className="p-3">Definition</th>
                <th className="p-3">Primary Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-background">
              <tr>
                <td className="p-3 pl-4 font-medium">Acquisition</td>
                <td className="p-3 text-muted-foreground">Visits landing page</td>
                <td className="p-3 text-muted-foreground">"Is this just another game?"</td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-medium">Activation</td>
                <td className="p-3 text-muted-foreground">Completes 3 sessions in 1 week</td>
                <td className="p-3 text-muted-foreground"><strong>Drop-off after session 1.</strong> (User feels awkward doing it alone).</td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-medium">Retention</td>
                <td className="p-3 text-muted-foreground">Opens app 3x/week for 4 weeks</td>
                <td className="p-3 text-muted-foreground">Novelty wears off; needs progression.</td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-medium">Revenue</td>
                <td className="p-3 text-muted-foreground">Upgrades to Pro</td>
                <td className="p-3 text-muted-foreground">Free tier is "good enough".</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Separator />

      {/* 6. Pricing & Packaging */}
      <Section title="6. Pricing & Packaging" icon={<DollarSign className="w-5 h-5" />} testId="section-pricing">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Free Tier (Freemium)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>Daily "Gym" Access (1 session/day)</li>
                <li>Beginner Level drills only</li>
                <li>Basic stats</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-none border-primary/40 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Pro Tier ($9.99/mo)</CardTitle>
                <Badge>Anchor: 1 Fast Food Lunch</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-foreground leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>Unlimited practice sessions</li>
                <li>Advanced & "Pro" level drills (Interview, Date Night)</li>
                <li>Full analytics & history</li>
                <li><strong>Validation Goal:</strong> 4% conversion rate.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* 7. Measure & Optimize */}
      <Section title="7. Measure & Optimize" icon={<BarChart2 className="w-5 h-5" />} testId="section-measure">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
             <Card className="shadow-none border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">First Experiment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-medium">
                Campus-only geofenced launch. Focus marketing on ONE campus (ASU) to build density.
              </CardContent>
            </Card>
            <Card className="shadow-none border-red-200 bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wide text-red-700">Kill Criterion</CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-medium text-red-900">
                If D30 retention is &lt; 10% OR 0 paid conversions after 500 users, pivot the core mechanic or audience.
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "We are optimizing for <strong>learning velocity</strong>. Revenue is just proof of value, not the goal itself right now."
          </p>
        </div>
      </Section>

    </PMPage>
  );
}
