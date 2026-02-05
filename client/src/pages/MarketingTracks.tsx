import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap, Mic, Briefcase, BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketingTracks() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Curriculum Tracks</h1>
            <p className="text-xl text-muted-foreground">
              Structured paths designed to target specific communication muscles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Verbal Reflexes */}
            <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading">Verbal Reflexes</h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Foundations</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  The gymnasium for your brain. Eliminate hesitation and "tip of the tongue" syndrome by training raw speed of association.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">What it trains:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Retrieval speed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Vocabulary access
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Reducing filler words (um, uh)
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium italic text-foreground mb-4">
                    "Perfect for warming up before meetings."
                  </p>
                  <Link href="/signup" className="w-full">
                    <Button variant="outline" className="w-full">Start this Track</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Persuasive Pitching */}
            <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading">Persuasive Pitching</h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Intermediate</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Structure your thoughts on the fly. Learn to connect two unrelated concepts into a coherent value proposition in under 30 seconds.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">What it trains:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Structured thinking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Argument formation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Conciseness
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium italic text-foreground mb-4">
                    "I used this to prep for VC calls."
                  </p>
                  <Link href="/signup" className="w-full">
                    <Button variant="outline" className="w-full">Start this Track</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Narrative Weaving */}
            <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading">Narrative Weaving</h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Advanced</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Master the art of storytelling. We give you 5 random plot points; you weave them into a compelling story instantly.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">What it trains:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Creativity under pressure
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Story arcs & closing loops
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Emotional connection
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium italic text-foreground mb-4">
                    "Like improv class but for business."
                  </p>
                  <Link href="/signup" className="w-full">
                    <Button variant="outline" className="w-full">Start this Track</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Which track is right for you?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            You don't have to choose just one. Most users rotate through all tracks to build a well-rounded communication profile.
          </p>
          <Link href="/signup">
            <Button size="lg" className="rounded-full h-12 px-8">
              Start Training Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
