import { PMPage } from "@/components/layout/PMPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Shield, 
  XCircle, 
  CheckCircle2,
  Target 
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

export default function MarketResearchPage() {
  return (
    <PMPage
      eyebrow="Market"
      title="Market & competitive landscape"
      subtitle="Defining the 'Impromptu Communication Training' category and why now is the time to win it."
    >
      
      {/* 1. Category Definition */}
      <Section title="Category definition" icon={<Globe className="w-5 h-5" />} testId="section-category">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">The Category</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <strong>Impromptu Communication Training (B2C)</strong>. 
              <br/><br/>
              Historically, this has been a service industry (coaches, classes). We are productizing it into a daily consumer habit. It sits at the intersection of <strong>Language Learning</strong> (Duolingo) and <strong>Professional Upskilling</strong> (LinkedIn Learning), but focused on <em>delivery</em> rather than content.
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Market Focus</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <strong>Consumer First.</strong>
              <br/><br/>
              While B2B sales/leadership training is huge, the individual pain point of "I feel awkward" is deeply personal. We target the individual (bottom-up) before the enterprise.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* 2. Competitive Landscape */}
      <Section title="Competitive landscape" icon={<Users className="w-5 h-5" />} testId="section-competitors">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border/60">
              <tr>
                <th className="p-4">Competitor Type</th>
                <th className="p-4">Examples</th>
                <th className="p-4">Why it fails the user</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-background">
              <tr>
                <td className="p-4 font-medium">Improv Classes</td>
                <td className="p-4 text-muted-foreground">Second City, local theaters</td>
                <td className="p-4 text-muted-foreground">High friction, socially terrifying, expensive, infrequent (weekly).</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Public Speaking Clubs</td>
                <td className="p-4 text-muted-foreground">Toastmasters</td>
                <td className="p-4 text-muted-foreground">Formal speeches, not spontaneous interaction. Antiquated vibe.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">AI Speech Coaches</td>
                <td className="p-4 text-muted-foreground">Orai, Yoodli, Poised</td>
                <td className="p-4 text-muted-foreground">Focus on "polish" (filler words, pace) not "content generation" or wit. Too clinical.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Passive Content</td>
                <td className="p-4 text-muted-foreground">YouTube, MasterClass, Books</td>
                <td className="p-4 text-muted-foreground">Zero practice reps. Intellectual entertainment, not skill building.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Separator />

      {/* 3. Differentiation */}
      <Section title="Our differentiation" icon={<Shield className="w-5 h-5" />} testId="section-differentiation">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Transferability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              We train underlying cognitive reflexes (association, structure, storytelling) that apply to <em>any</em> conversation, not just a specific speech.
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Privacy & Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Practice alone. Fail alone. Build confidence in private before performing in public.
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Daily Frequency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              5 mins/day beats 60 mins/week. We fit into the "dead time" of a commute or coffee break.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* 4. Why Now */}
      <Section title="Why now?" icon={<TrendingUp className="w-5 h-5" />} testId="section-whynow">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Technological Enabler</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Generative AI</strong> allows us to generate infinite, context-aware prompts. Previously, a human had to write every drill. Now, we can create a "simulated party" or "simulated interview" instantly.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Cultural Shift</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>The "Soft Skills" Crisis.</strong> As AI automates technical tasks, human connection and communication become the primary differentiator for career growth. People are realizing being "smart" isn't enough.
            </p>
          </div>
        </div>
      </Section>

      <Separator />

      {/* 5. GTM & Segments */}
      <Section title="Target segments" icon={<Target className="w-5 h-5" />} testId="section-segments">
        <Card className="shadow-none border-border/60 bg-muted/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Early Paying Segment: College Students</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              Students like Ellias (ASU) are in a high-stakes transition period. They face interviews, internships, and new social circles daily.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>High Motivation:</strong> Career outcomes directly tied to performance.</li>
              <li><strong>High Frequency:</strong> Daily interactions on campus.</li>
              <li><strong>Willingness to Pay:</strong> Accustomed to paying for educational tools/supplements.</li>
            </ul>
          </CardContent>
        </Card>
      </Section>

      <Separator />

      {/* 6. Rejected Optimizations */}
      <Section title="Rejected competitor paths" icon={<XCircle className="w-5 h-5" />} testId="section-rejected">
        <p className="text-sm text-muted-foreground mb-4">
          We explicitly chose <strong>not</strong> to follow these common paths in the category:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">"Uber for Coaches"</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Marketplaces have high rake but don't scale the core value. We want a product, not a service.
            </CardContent>
          </Card>
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">"Real-time Meeting Assistant"</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Distracting and crutch-forming. We want to train the brain, not replace it.
            </CardContent>
          </Card>
        </div>
      </Section>

    </PMPage>
  );
}
