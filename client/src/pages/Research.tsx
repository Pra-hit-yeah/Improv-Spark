import { PMPage } from "@/components/layout/PMPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  Search, 
  BrainCircuit, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  Quote
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

function PersonaCard({
  name,
  role,
  age,
  image,
  quote,
  traits,
  testId
}: {
  name: string;
  role: string;
  age: string;
  image: string;
  quote: string;
  traits: { label: string; value: string }[];
  testId: string;
}) {
  return (
    <Card className="shadow-none border-border/60 overflow-hidden" data-testid={testId}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-muted/30 p-6 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border/60">
          <Avatar className="w-32 h-32 mb-4 border-4 border-background shadow-sm">
            <AvatarImage src={image} alt={name} className="object-cover" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{role}, {age}</p>
        </div>
        <div className="md:w-2/3 p-6 space-y-6">
          <div className="relative pl-4 border-l-4 border-primary/20">
            <Quote className="w-4 h-4 text-primary/40 absolute -top-2 -left-2" />
            <p className="text-lg italic text-muted-foreground font-medium leading-relaxed">"{quote}"</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((t, i) => (
              <div key={i}>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{t.label}</p>
                <p className="text-sm font-medium text-foreground">{t.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ResearchPage() {
  return (
    <PMPage
      eyebrow="Research"
      title="User research & insights"
      subtitle="Recruiter-grade summary of ~50 qualitative conversations, defining the 'freeze' moment and the daily habit opportunity."
    >
      {/* 1. Methods */}
      <Section title="Research methods" icon={<Search className="w-5 h-5" />} testId="section-methods">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "1:1 Interviews", val: "25+", icon: Users },
            { label: "Coaching Sessions", val: "15+", icon: BrainCircuit },
            { label: "Group Discussions", val: "5", icon: MessageSquare },
            { label: "Async Chats", val: "50+", icon: MessageSquare },
          ].map((m, i) => (
            <Card key={i} className="shadow-none border-border/60 bg-muted/10 text-center p-4">
              <div className="flex justify-center mb-2">
                <m.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{m.val}</div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{m.label}</div>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Discovery was founder-led, evolving from casual mentoring to structured problem interviews. The goal was to identify the root cause of "bad communication" in high-stakes moments.
        </p>
      </Section>

      <Separator />

      {/* 2. Personas */}
      <Section title="Primary personas" icon={<Users className="w-5 h-5" />} testId="section-personas">
        <div className="space-y-8">
          <PersonaCard 
            name="Ellias"
            role="College Student (ASU)"
            age="21"
            image="/personas/ellias.png"
            quote="I know the answers in class, but when the professor cold calls me, my mind goes blank. I feel like I'm losing opportunities because I can't speak up fast enough."
            testId="persona-ellias"
            traits={[
              { label: "Context", value: "Internship interviews, seminars, social mixers." },
              { label: "Trigger", value: "Being put on the spot; 'Tell me about yourself.'" },
              { label: "Current Fix", value: "Over-preparing scripts (which sound robotic)." },
              { label: "Goal", value: "Sound smart without prepping for hours." },
            ]}
          />
          
          <PersonaCard 
            name="Nicole"
            role="Senior Consultant"
            age="52"
            image="/personas/nicole.png"
            quote="I used to be sharp in the office. Now with remote work, I feel rusty. I need to keep my verbal agility high for client calls, but I don't have anyone to practice with."
            testId="persona-nicole"
            traits={[
              { label: "Context", value: "Client Q&A, board updates, team leadership." },
              { label: "Trigger", value: "Unexpected questions; defending a strategy." },
              { label: "Current Fix", value: "Reading books (passive); avoided improv classes." },
              { label: "Goal", value: "Maintain cognitive sharpness and authority." },
            ]}
          />
        </div>
      </Section>

      <Separator />

      {/* 3. The Pain */}
      <Section title="The pain: Frequency & severity" icon={<AlertTriangle className="w-5 h-5" />} testId="section-pain">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-none border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">The "Freeze" Loop</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                Users consistently described a cycle: 
                <br/>
                <strong>Pressure → Anxiety Spike → Working Memory Block → Silence/Filler Words → Shame.</strong>
              </p>
              <p>
                This happens <strong>daily/weekly</strong> for Ellias (social + academic) and <strong>weekly/monthly</strong> for Nicole (high-stakes meetings). The severity is high because it directly impacts <strong>perceived competence</strong>.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/60 bg-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Verbatim Quotes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "I have the knowledge, but I can't access it when eyes are on me.",
                "Improv classes are too long, too expensive, and terrifying.",
                "I just want to practice for 5 minutes before my interview.",
                "Books teach me theory, but they don't talk back."
              ].map((q, i) => (
                <div key={i} className="relative pl-3 border-l-2 border-primary/30">
                  <p className="text-sm italic text-muted-foreground">"{q}"</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* 4. Product Implications */}
      <Section title="From research to product" icon={<Target className="w-5 h-5" />} testId="section-implications">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The core gap in the market is <strong>low-stakes, high-frequency practice</strong>. Existing solutions are either too passive (books/videos) or too intense (improv classes/Toastmasters).
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="shadow-none border-border/60">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit mb-2">Insight</Badge>
                <CardTitle className="text-base">Fear blocks flow</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <strong>Decision:</strong> No AI judging in V1. Focus on completion and "safe" pressure to build confidence first.
              </CardContent>
            </Card>
            
            <Card className="shadow-none border-border/60">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit mb-2">Insight</Badge>
                <CardTitle className="text-base">Consistency &gt; Intensity</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <strong>Decision:</strong> 2-5 minute daily drills. streaks &gt; session length. "Warm start" for the brain.
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/60">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit mb-2">Insight</Badge>
                <CardTitle className="text-base">Context matters</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <strong>Decision:</strong> Scaffolding (Beginner to Advanced) to match the user's daily energy and courage level.
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Separator />

      {/* 5. Core Insight */}
      <Section title="The core insight" icon={<Lightbulb className="w-5 h-5" />} testId="section-core-insight">
        <Card className="shadow-none border-primary/20 bg-primary/5">
          <CardContent className="pt-6 pb-6">
            <p className="text-lg font-medium text-foreground leading-relaxed text-center">
              "Spontaneity is treated as a talent, but it behaves like a muscle. <br/>
              It atrophies without use and strengthens with reps. <br/>
              Users don't need a teacher; they need a gym."
            </p>
          </CardContent>
        </Card>
      </Section>

    </PMPage>
  );
}
