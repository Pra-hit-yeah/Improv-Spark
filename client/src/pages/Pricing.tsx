import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, X, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Simple, transparent pricing</h1>
            <p className="text-xl text-muted-foreground">
              Invest in your communication skills for less than the cost of a coffee a week.
            </p>
          </div>

          {/* Prototype Note */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 items-start">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-800">Honest Prototype Note</p>
                <p className="text-sm text-amber-700/80 leading-relaxed">
                  Quick-Wit is currently in active development. All "Pro" features are currently free for early testers while we refine the product. We appreciate your feedback!
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <Card className="shadow-sm border-border">
              <CardHeader className="p-8 pb-4">
                <h3 className="text-2xl font-bold">Free</h3>
                <div className="mt-4 flex items-baseline text-foreground">
                  <span className="text-4xl font-extrabold tracking-tight">$0</span>
                  <span className="ml-1 text-xl font-semibold text-muted-foreground">/forever</span>
                </div>
                <p className="mt-4 text-muted-foreground">Essential drills to keep your reflexes sharp.</p>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <ul className="space-y-4">
                  {[
                    "Daily Word Association",
                    "Beginner Difficulty only",
                    "Basic Streak tracking",
                    "5 sessions per week limit"
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mr-3" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Link href="/signup" className="w-full">
                  <Button variant="outline" size="lg" className="w-full rounded-full">
                    Start Free
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className="shadow-lg border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <CardHeader className="p-8 pb-4">
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="mt-4 flex items-baseline text-foreground">
                  <span className="text-4xl font-extrabold tracking-tight">$12</span>
                  <span className="ml-1 text-xl font-semibold text-muted-foreground">/month</span>
                </div>
                <p className="mt-4 text-muted-foreground">Unlock full training capabilities and advanced tracks.</p>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <ul className="space-y-4">
                  {[
                    "Everything in Free",
                    "Unlimited sessions",
                    "All Difficulty Levels (Beginner to Advanced)",
                    "Specialized Tracks (Pitching, Storytelling)",
                    "Advanced Analytics & Insights",
                    "Priority Support"
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Link href="/signup" className="w-full">
                  <Button size="lg" className="w-full rounded-full shadow-lg shadow-primary/20">
                    Start Free Trial
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
