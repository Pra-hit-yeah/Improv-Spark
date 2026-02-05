import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Zap, Clock, Target, Sparkles } from "lucide-react";

const goals = [
  { key: "confidence", label: "Confidence", icon: Zap },
  { key: "wit", label: "Wit", icon: Sparkles },
  { key: "social_ease", label: "Social ease", icon: Target },
  { key: "presence", label: "Presence", icon: ArrowRight },
] as const;

const times = [
  { key: "morning", label: "Morning", desc: "Start your day sharp" },
  { key: "afternoon", label: "Afternoon", desc: "Mid-day mental reset" },
  { key: "evening", label: "Evening", desc: "Wind down with words" },
] as const;

export default function Onboarding() {
  const [step, setStep] = useState<1 | 2>(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Welcome to Quick-Wit</h1>
          <p className="text-muted-foreground">Let's personalize your experience.</p>
        </div>
        <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
          Step {step} of 2
        </Badge>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>
            {step === 1 ? "What are you training for?" : "When do you want to practice?"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {step === 1 
              ? "We'll tailor your dashboard and track suggestions." 
              : "Pick a default reminder window. You can change this later."}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {goals.map((g) => (
                <button
                  key={g.key}
                  data-testid={`button-goal-${g.key}`}
                  onClick={() => setGoal(g.key)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    goal === g.key 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border hover:bg-muted/30 hover:border-muted-foreground/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${goal === g.key ? "bg-primary/10" : "bg-muted"}`}>
                      <g.icon className={`w-4 h-4 ${goal === g.key ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="font-semibold">{g.label}</p>
                      <p className="text-xs text-muted-foreground">Daily drills tuned for {g.label.toLowerCase()}.</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-3">
              {times.map((t) => (
                <button
                  key={t.key}
                  data-testid={`button-time-${t.key}`}
                  onClick={() => setTime(t.key)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    time === t.key 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border hover:bg-muted/30 hover:border-muted-foreground/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={`w-4 h-4 ${time === t.key ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold">{t.label}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
            <Link href="/app">
              <Button variant="ghost" data-testid="button-onboarding-skip">
                Skip for now
              </Button>
            </Link>

            <div className="flex gap-2">
              {step === 2 && (
                <Button 
                  variant="outline" 
                  data-testid="button-onboarding-back" 
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              
              {step === 1 ? (
                <Button
                  data-testid="button-onboarding-continue"
                  disabled={!goal}
                  onClick={() => setStep(2)}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Link href="/app">
                  <Button data-testid="button-onboarding-finish" disabled={!time}>
                    Get Started
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
