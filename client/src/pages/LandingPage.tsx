import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check, Zap, MessageCircle, Mic2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-secondary/5 blur-[120px]" />

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4" data-testid="badge-hero-new">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Daily timed drills • 3 difficulty levels
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-foreground mb-6 leading-[1.05]" data-testid="text-hero-headline">
                Speak with confidence—
                <span className="block">even when it’s spontaneous.</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed" data-testid="text-hero-subtitle">
                Quick-Wit is a Duolingo-style training app for verbal fluency. Practice daily, under time pressure, and build a real streak.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4" data-testid="hero-ctas">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" data-testid="button-hero-start-free">
                    Start for free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/#how-it-works">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/80" data-testid="button-hero-how-it-works">
                    How it works
                  </Button>
                </Link>
              </div>

              <div className="mt-10 text-sm text-muted-foreground font-medium" data-testid="text-hero-social-proof">
                Built for interviews, meetings, and high-stakes conversations.
              </div>
            </div>

            {/* Minimal, on-theme hero treatment (no abstract art, no streak/XP CTAs) */}
            <div className="relative" data-testid="hero-visual">
              <div className="rounded-3xl border border-border bg-white/60 backdrop-blur-sm shadow-xl shadow-primary/5 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-border bg-white/50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Mic2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground" data-testid="text-hero-card-title">Timed prompt</p>
                        <p className="text-xs text-muted-foreground" data-testid="text-hero-card-subtitle">Respond out loud—no prep</p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground" data-testid="pill-hero-timer">
                      <span className="inline-block w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                      00:30
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <p className="text-sm text-muted-foreground" data-testid="text-hero-instruction">Use these words to pitch a quick idea:</p>

                  <div className="flex flex-wrap gap-2" data-testid="list-hero-words">
                    {[
                      { w: "deadline", tone: "bg-primary/10 text-primary" },
                      { w: "customer", tone: "bg-secondary/10 text-secondary-foreground" },
                      { w: "tradeoff", tone: "bg-amber-100 text-amber-900" },
                      { w: "clarity", tone: "bg-emerald-100 text-emerald-900" },
                    ].map((t) => (
                      <span
                        key={t.w}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border border-border/60 ${t.tone}`}
                        data-testid={`chip-hero-word-${t.w}`}
                      >
                        {t.w}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2" data-testid="hero-flow">
                    {["Think", "Speak", "Refine"].map((label, idx) => (
                      <div key={label} className="rounded-2xl border border-border bg-background p-3" data-testid={`card-hero-step-${idx}`}> 
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Step {idx + 1}</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
                        <div className="mt-3 h-2 rounded-full bg-muted/50 overflow-hidden">
                          <div className="h-full bg-primary/60" style={{ width: `${(idx + 1) * 33}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1" data-testid="hero-footer-row">
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="w-4 h-4" />
                      Fast, daily practice
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      Better responses
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 -inset-8 bg-primary/5 blur-3xl" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Think Faster",
                desc: "Eliminate 'umms' and 'uhhs' with rapid-fire word association drills designed to grease your mental gears."
              },
              {
                icon: Mic2,
                title: "Speak Bolder",
                desc: "Practice pitching and storytelling in a low-stakes environment before you have to do it for real."
              },
              {
                icon: MessageCircle,
                title: "Connect Deeper",
                desc: "Learn to listen actively and build on others' ideas with the core principles of improv comedy."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-border bg-background hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Quick-Wit Works</h2>
            <p className="text-muted-foreground">Three simple steps to becoming a more charismatic communicator.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connector Line */}
             <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border -z-10" />

             {[
               { step: "01", title: "Choose a Track", desc: "Select from Beginner Reflexes, Intermediate Pitching, or Advanced Storytelling." },
               { step: "02", title: "Play Daily Drills", desc: "Complete 5-minute gamified audio sessions. No preparation needed." },
               { step: "03", title: "Track Progress", desc: "Earn XP, maintain your streak, and watch your confidence grow." }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center bg-background md:bg-transparent p-6 rounded-xl md:p-0">
                 <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center text-2xl font-bold font-heading text-primary shadow-sm mb-6">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                 <p className="text-muted-foreground text-sm">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to find your voice?</h2>
               <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                 Join thousands of professionals mastering the art of spontaneous communication today.
               </p>
               <Link href="/signup">
                 <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-xl">
                   Get Started for Free
                 </Button>
               </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
