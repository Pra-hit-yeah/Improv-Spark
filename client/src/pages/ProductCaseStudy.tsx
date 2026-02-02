import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Target, 
  Users, 
  Zap, 
  Timer, 
  Trophy, 
  BarChart3, 
  GitBranch, 
  Layers, 
  CheckCircle2, 
  Lightbulb,
  Beaker
} from "lucide-react";

import { PMPage } from "@/components/layout/PMPage";

export default function ProductCaseStudy() {
  return (
    <PMPage
      eyebrow="Product case study"
      title="Quick-Wit"
      subtitle="Duolingo for spontaneous communication"
    >
      <div className="not-prose">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3" data-testid="product-hero-ctas">
          <Link href="/app">
            <Button
              size="lg"
              className="h-11 px-6 rounded-full"
              data-testid="button-product-try-app"
            >
              Try live app
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-6 rounded-full"
            data-testid="button-product-scroll-thinking"
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
          >
            View product thinking
          </Button>
          <Link href="/prd">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 px-6 rounded-full"
              data-testid="button-product-view-prd"
            >
              <a>View PRD</a>
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-16">
        
        {/* 2. Problem Statement */}
        <section id="problem" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> The Problem
              </h2>
              <h3 className="text-3xl font-heading font-bold">The "Freeze" Moment</h3>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Smart people often struggle to articulate their thoughts under pressure. Whether in interviews, meetings, or social settings, the gap between thinking and speaking causes anxiety ("the freeze"), filler words ("umms"), and missed opportunities.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* 3. Target User */}
        <section>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" /> Target User
              </h2>
              <h3 className="text-3xl font-heading font-bold">High-Stakes Communicators</h3>
            </div>
            <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
              <Card className="bg-background border-border/60 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">The Professional</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Founders, PMs, and consultants who need to pitch ideas, handle Q&A, and lead meetings without preparation.
                </CardContent>
              </Card>
              <Card className="bg-background border-border/60 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">The Social Learner</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Individuals looking to build social confidence, improve wit, and become better storytellers in daily life.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        {/* 4. Solution */}
        <section>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> The Solution
              </h2>
              <h3 className="text-3xl font-heading font-bold">Gamified Verbal Gym</h3>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Quick-Wit transforms the abstract skill of "being articulate" into concrete, daily micro-exercises.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                 <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Timer className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold mb-1">Time Pressure</h4>
                    <p className="text-xs text-muted-foreground">Forcing rapid neural pathways via strict timers.</p>
                 </div>
                 <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                      <Trophy className="w-5 h-5 text-orange-500" />
                    </div>
                    <h4 className="font-bold mb-1">Streaks & XP</h4>
                    <p className="text-xs text-muted-foreground">Building habit loops through visual progress tracking.</p>
                 </div>
                 <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                      <Layers className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className="font-bold mb-1">Scaffolding</h4>
                    <p className="text-xs text-muted-foreground">Progressive difficulty from associations to storytelling.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Product Decisions */}
        <section className="bg-muted/20 -mx-6 md:-mx-12 px-6 md:px-12 py-16 rounded-3xl">
          <div className="mb-10 text-center max-w-2xl mx-auto">
             <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                Product Thinking
              </h2>
              <h3 className="text-3xl font-heading font-bold mb-4">Key Design Decisions</h3>
              <p className="text-muted-foreground">
                We made specific tradeoffs to prioritize habit formation over perfection.
              </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
             {[
               {
                 title: "Short Sessions (<2 mins)",
                 rationale: "Lowering the barrier to start. Users can play while waiting for coffee, increasing daily retention.",
                 icon: Timer
               },
               {
                 title: "Audio-First (No Typing)",
                 rationale: "Mimics real-world pressure. Typing allows for editing and hesitation; speaking requires commitment.",
                 icon: Users
               },
               {
                 title: "Strict Timers",
                 rationale: "Panic is the point. We want to desensitize users to the feeling of 'running out of time' so they stay calm in real life.",
                 icon: Zap
               }
             ].map((item, i) => (
               <Card key={i} className="border-border/50 shadow-sm bg-background">
                 <CardHeader>
                   <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                     <item.icon className="w-5 h-5 text-secondary-foreground" />
                   </div>
                   <CardTitle className="text-lg">{item.title}</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground leading-relaxed">{item.rationale}</p>
                 </CardContent>
               </Card>
             ))}
          </div>
        </section>

        {/* 6. Metrics Framework */}
        <section>
          <div className="mb-8">
             <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Metrics Framework
              </h2>
              <h3 className="text-3xl font-heading font-bold">Measuring Success</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                   <p className="text-xs font-bold uppercase text-primary tracking-wider">North Star</p>
                </CardHeader>
                <CardContent>
                   <p className="text-xl md:text-2xl font-bold">Weekly Active Drills</p>
                   <p className="text-[10px] text-muted-foreground mt-1">Reflects true value realization</p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                   <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Activation</p>
                </CardHeader>
                <CardContent>
                   <p className="text-xl md:text-2xl font-bold">D1 Retention</p>
                   <p className="text-[10px] text-muted-foreground mt-1">% who return next day</p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                   <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Engagement</p>
                </CardHeader>
                <CardContent>
                   <p className="text-xl md:text-2xl font-bold">Session Length</p>
                   <p className="text-[10px] text-muted-foreground mt-1">Time spent practicing</p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                   <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Conversion</p>
                </CardHeader>
                <CardContent>
                   <p className="text-xl md:text-2xl font-bold">Sign-up Rate</p>
                   <p className="text-[10px] text-muted-foreground mt-1">Visitor to User %</p>
                </CardContent>
             </Card>
          </div>
        </section>

        <Separator />

        {/* 7. Experiment Example */}
        <section>
          <div className="flex flex-col md:flex-row gap-12 items-start">
             <div className="md:w-1/3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <Beaker className="w-4 h-4" /> Experiment
              </h2>
              <h3 className="text-3xl font-heading font-bold">Dashboard CTA Copy Test</h3>
              <p className="text-sm text-muted-foreground mt-3">Simulated outcome unless analytics data exists.</p>
            </div>
            <div className="md:w-2/3">
               <Card className="border-border shadow-md overflow-hidden">
                  <div className="bg-muted/50 p-4 border-b border-border flex justify-between items-center">
                     <span className="font-mono text-xs font-bold text-muted-foreground">EXP-CTA-001</span>
                     <Badge variant="outline" className="text-amber-800 bg-amber-50 border-amber-200">Simulated</Badge>
                  </div>
                  <CardContent className="p-6 space-y-6">
                     <div>
                        <h4 className="font-bold text-sm mb-1">Hypothesis</h4>
                        <p className="text-muted-foreground text-sm">A more action-oriented CTA will increase session starts from the dashboard by at least 8%.</p>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm mb-2">What we tested</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg border border-border bg-background">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variant A</p>
                            <p className="font-semibold mt-1">Start your daily session</p>
                          </div>
                          <div className="p-3 rounded-lg border border-border bg-background">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variant B</p>
                            <p className="font-semibold mt-1">Train your wit now</p>
                          </div>
                        </div>
                      </div>
                     <div>
                        <h4 className="font-bold text-sm mb-1">Outcome</h4>
                        <p className="text-muted-foreground text-sm">Variant B increased CTA clicks by 11% with no decrease in completion rate.</p>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm mb-1">Conclusion</h4>
                        <p className="text-muted-foreground text-sm">Ship Variant B as default, keep Variant A as fallback for users with low confidence goal.</p>
                     </div>
                  </CardContent>
               </Card>
            </div>
          </div>
        </section>

         {/* 8. Roadmap */}
        <section>
          <div className="mb-10">
             <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <GitBranch className="w-4 h-4" /> Roadmap
              </h2>
              <h3 className="text-3xl font-heading font-bold">What's Next</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <h4 className="font-bold text-sm uppercase tracking-wide">Now</h4>
                </div>
                <ul className="space-y-3">
                   <li className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Core Drill Engine</li>
                   <li className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Auth & Profiles</li>
                   <li className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Streak System</li>
                </ul>
             </div>
             <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                   <div className="w-2 h-2 rounded-full bg-yellow-500" />
                   <h4 className="font-bold text-sm uppercase tracking-wide">Next</h4>
                </div>
                <ul className="space-y-3">
                   <li className="flex gap-2 text-sm text-muted-foreground"><Lightbulb className="w-4 h-4 text-muted-foreground shrink-0" /> AI Speech Analysis</li>
                   <li className="flex gap-2 text-sm text-muted-foreground"><Lightbulb className="w-4 h-4 text-muted-foreground shrink-0" /> Personalized Tracks</li>
                   <li className="flex gap-2 text-sm text-muted-foreground"><Lightbulb className="w-4 h-4 text-muted-foreground shrink-0" /> Mobile PWA</li>
                </ul>
             </div>
             <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   <h4 className="font-bold text-sm uppercase tracking-wide">Later</h4>
                </div>
                <ul className="space-y-3">
                   <li className="flex gap-2 text-sm text-muted-foreground"><Lightbulb className="w-4 h-4 text-muted-foreground shrink-0" /> Multiplayer Duels</li>
                   <li className="flex gap-2 text-sm text-muted-foreground"><Lightbulb className="w-4 h-4 text-muted-foreground shrink-0" /> Community Rooms</li>
                   <li className="flex gap-2 text-sm text-muted-foreground"><Lightbulb className="w-4 h-4 text-muted-foreground shrink-0" /> Enterprise Teams</li>
                </ul>
             </div>
          </div>
        </section>

        <Separator />

         {/* 9. Role */}
        <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center">
           <h3 className="text-2xl font-heading font-bold mb-4">My Role</h3>
           <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              I led this project from 0 to 1, owning the entire product lifecycle: from initial user research and problem definition, to UI/UX design in Figma, and final full-stack implementation using Next.js and Supabase.
           </p>
           <div className="flex flex-wrap justify-center gap-3">
              {["Product Strategy", "UX/UI Design", "Frontend Engineering", "Data Modeling"].map(skill => (
                 <Badge key={skill} variant="secondary" className="px-3 py-1 bg-white shadow-xs hover:bg-white">{skill}</Badge>
              ))}
           </div>
        </section>

      </div>
    </PMPage>
  );
}
