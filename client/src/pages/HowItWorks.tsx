import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Mic2, Timer, Target, BrainCircuit, Sparkles, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            The Science of Spontaneity
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 max-w-3xl mx-auto">
            How Quick-Wit builds <br className="hidden md:block"/>verbal reflexes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We don't teach you *what* to say. We train your brain to retrieve what you already know, faster and with less anxiety.
          </p>
        </div>
      </section>

      {/* The Core Loop */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Core Loop</h2>
            <p className="text-muted-foreground">A 5-minute daily workout for your speaking muscles.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: "1. Select Difficulty",
                desc: "Choose your pressure level. From low-stakes association to high-pressure storytelling.",
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                icon: Mic2,
                title: "2. Speak Instantly",
                desc: "You get a prompt. The timer starts. You speak out loud. No editing, no typing, no second-guessing.",
                color: "text-orange-500",
                bg: "bg-orange-500/10"
              },
              {
                icon: BrainCircuit,
                title: "3. Build Fluency",
                desc: "Complete the set to earn XP. Consistency rewires your brain to bypass the 'freeze' response.",
                color: "text-green-500",
                bg: "bg-green-500/10"
              }
            ].map((step, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-background border border-border shadow-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${step.bg}`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difficulty Levels */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Progressive Overload</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Just like weightlifting, we start light and build up. You can't run a marathon if you can't walk around the block.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    level: "Beginner",
                    focus: "Word Association",
                    desc: "Simple one-word prompts. Train speed of retrieval.",
                    icon: Zap
                  },
                  {
                    level: "Intermediate",
                    focus: "The Pitch",
                    desc: "Connect two unrelated concepts into a coherent pitch.",
                    icon: Timer
                  },
                  {
                    level: "Advanced",
                    focus: "Story Weaver",
                    desc: "Complex multi-point narratives under strict time limits.",
                    icon: BrainCircuit
                  }
                ].map((lvl, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <lvl.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{lvl.level}: {lvl.focus}</h4>
                      <p className="text-sm text-muted-foreground">{lvl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-50" />
              <div className="relative bg-white border border-border rounded-2xl shadow-xl p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="font-bold">Session Preview</span>
                  <span className="text-xs font-mono text-muted-foreground">00:45</span>
                </div>
                <div className="space-y-2 text-center py-8">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">Your Prompt</p>
                  <p className="text-4xl font-heading font-bold text-foreground">"Innovation" + "Cactus"</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full w-2/3" />
                </div>
                <Button className="w-full" size="lg">Start Speaking</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start training?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="rounded-full h-12 px-8">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
