import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check, Zap, MessageCircle, Mic2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-secondary/5 blur-[120px]" />
        
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Daily Advanced Tracks Available
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
            Master the art of <br/>
            <span className="text-gradient">spontaneous</span> speech.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The Duolingo for improv. Build confidence, think faster, and command any room with daily gamified communication drills.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                Start for free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/#how-it-works">
               <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/80">
                How it works
               </Button>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground font-medium">
            Trusted by speakers from <span className="text-foreground">Google</span>, <span className="text-foreground">TEDx</span>, and <span className="text-foreground">Toastmasters</span>
          </div>

          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur opacity-20" />
            <img 
              src="/hero-abstract.png" 
              alt="App Dashboard Preview" 
              className="relative rounded-xl shadow-2xl border border-white/10 w-full aspect-[21/9] object-cover"
            />
             {/* Float Card Mockup */}
            <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-xl shadow-xl border border-border hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">✓</div>
                 <div>
                    <p className="text-xs font-bold text-foreground">Streak Kept!</p>
                    <p className="text-[10px] text-muted-foreground">You're on fire 🔥</p>
                 </div>
              </div>
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
