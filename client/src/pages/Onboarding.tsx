import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

const goals = [
  { key: "confidence", label: "Confidence" },
  { key: "wit", label: "Wit" },
  { key: "social_ease", label: "Social ease" },
  { key: "presence", label: "Presence" },
] as const;

const times = [
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "evening", label: "Evening" },
] as const;

export default function Onboarding() {
  const { user, setOnboarding } = useStore();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const initialGoal = user?.goal ?? null;
  const initialTime = user?.daily_time ?? null;

  const [goal, setGoal] = useState<string | null>(initialGoal);
  const [time, setTime] = useState<string | null>(initialTime);

  const canContinue = step === 1 ? !!goal : !!time;

  const title = useMemo(() => {
    if (step === 1) return "What are you training for?";
    return "When do you want to practice?";
  }, [step]);

  const sub = useMemo(() => {
    if (step === 1) return "We will tailor your dashboard and track suggestions.";
    return "Pick a default reminder window. You can change this later.";
  }, [step]);

  const handleFinish = async () => {
    setLoading(true);
    try {
      await setOnboarding({ goal, daily_time: time });
      // Use window.location for more reliable navigation on mobile
      window.location.href = "/app";
    } catch (error) {
      console.error("Onboarding error:", error);
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      await setOnboarding({ goal: null, daily_time: null });
      // Use window.location for more reliable navigation on mobile
      window.location.href = "/app";
    } catch (error) {
      console.error("Skip error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Onboarding</h1>
          <p className="text-muted-foreground">Two quick steps to personalize Quick-Wit.</p>
        </div>
        <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">Step {step} of 2</Badge>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{sub}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {goals.map((g) => (
                <button
                  key={g.key}
                  data-testid={`button-goal-${g.key}`}
                  onClick={() => setGoal(g.key)}
                  className={`text-left p-4 rounded-xl border transition-colors ${goal === g.key ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"}`}
                >
                  <p className="font-semibold">{g.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">Daily drills tuned for {g.label.toLowerCase()}.</p>
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
                  className={`text-left p-4 rounded-xl border transition-colors ${time === t.key ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"}`}
                >
                  <p className="font-semibold">{t.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">A consistent habit window.</p>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="ghost"
              data-testid="button-onboarding-skip"
              disabled={loading}
              onClick={handleSkip}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Skip for now
            </Button>

            <div className="flex gap-2">
              {step === 2 && (
                <Button variant="outline" data-testid="button-onboarding-back" onClick={() => setStep(1)}>
                  Back
                </Button>
              )}
              <Button
                data-testid="button-onboarding-continue"
                disabled={!canContinue || loading}
                onClick={() => {
                  if (step === 1) {
                    setStep(2);
                    return;
                  }
                  handleFinish();
                }}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {step === 1 ? "Continue" : "Finish"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
