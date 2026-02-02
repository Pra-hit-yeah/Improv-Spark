import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Timer, ArrowRight, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { logEvent } from "@/lib/analytics";
import { useLocation } from "wouter";

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

const WORDS = [
  "Apple", "Rocket", "Silence", "Ocean", "Bridge", "Chaos", 
  "Market", "Whisper", "Velocity", "Shadow", "Fortune", "Echo"
];

const CONFIG = {
  beginner: { duration: 5, promptCount: 10, type: 'association' }, // 5s per word
  intermediate: { duration: 30, promptCount: 1, type: 'pitch' },   // 30s total
  advanced: { duration: 45, promptCount: 1, type: 'story' },        // 45s total
};

export function Drill({ difficulty }: { difficulty: Difficulty }) {
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [prompts, setPrompts] = useState<string[]>([]);
  const { completeSession } = useStore();
  const [, setLocation] = useLocation();

  // Initialize
  useEffect(() => {
    // Randomize words
    const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
    
    if (difficulty === 'beginner') {
      setPrompts(shuffled.slice(0, 10));
      setTimeLeft(CONFIG.beginner.duration);
    } else if (difficulty === 'intermediate') {
      setPrompts([`${shuffled[0]} + ${shuffled[1]}`]); // Two random words
      setTimeLeft(CONFIG.intermediate.duration);
    } else {
      setPrompts([shuffled.slice(0, 5).join(", ")]); // 5 random words
      setTimeLeft(CONFIG.advanced.duration);
    }
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    if (!active || completed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time up logic
          if (difficulty === 'beginner') {
            if (currentWordIndex < prompts.length - 1) {
              setCurrentWordIndex(c => c + 1);
              return CONFIG.beginner.duration; // Reset for next word
            } else {
              setCompleted(true);
              return 0;
            }
          } else {
            setCompleted(true);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active, completed, difficulty, currentWordIndex, prompts.length]);

  const handleStart = () => {
    logEvent({ name: "difficulty_selected", userId: null, properties: { difficulty } });
    logEvent({ name: "session_started", userId: null, properties: { difficulty } });
    setActive(true);
  };

  const handleFinish = () => {
    completeSession(difficulty, 60); // Mock duration
    setTimeout(() => {
      setLocation("/app");
    }, 2000);
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-200/60">
          <CheckCircle2 className="w-12 h-12 text-emerald-700" />
        </div>
        <h2 className="text-3xl font-bold mb-2" data-testid="text-session-complete-title">Session Complete!</h2>
        <p className="text-muted-foreground mb-8" data-testid="text-session-complete-subtitle">Great job exercising your wit today.</p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8" data-testid="grid-session-rewards">
          <Card className="app-callout">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">XP Earned</p>
              <p className="text-2xl font-bold text-primary" data-testid="text-session-xp">+{difficulty === 'beginner' ? 10 : difficulty === 'intermediate' ? 25 : 50}</p>
            </CardContent>
          </Card>
          <Card className="app-surface">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-orange-600" data-testid="text-session-streak">🔥 +1</p>
            </CardContent>
          </Card>
        </div>
        <Button size="lg" onClick={handleFinish} className="w-full max-w-sm" data-testid="button-session-return-dashboard">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {!active ? (
        <Card className="border border-primary/15 bg-linear-to-br from-primary/6 via-background to-secondary/10 shadow-xl app-glow">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/12 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-2 ring-primary/10">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold capitalize" data-testid="text-drill-title">{difficulty} Drill</h1>
            <p className="text-muted-foreground text-lg" data-testid="text-drill-description">
              {difficulty === 'beginner' && "Quickly say the first word that comes to mind for each prompt."}
              {difficulty === 'intermediate' && "You have 30 seconds to pitch a company using these two words."}
              {difficulty === 'advanced' && "Weave a story using all 5 words in 45 seconds."}
            </p>
            <div className="flex justify-center pt-4">
              <Button size="lg" className="w-full max-w-xs text-lg h-12" onClick={handleStart} data-testid="button-drill-start">
                Start Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          {/* Timer Display */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest" data-testid="text-drill-stage">
              {difficulty === 'beginner' ? `Word ${currentWordIndex + 1} of ${prompts.length}` : "Time Remaining"}
            </span>
            <div className="flex items-center gap-2 font-mono text-2xl font-bold text-primary" data-testid="text-drill-timer">
              <Timer className="w-6 h-6" />
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>
          
          <Progress
            value={(timeLeft / (difficulty === 'beginner' ? 5 : difficulty === 'intermediate' ? 30 : 45)) * 100}
            className="h-2 bg-secondary/15"
            data-testid="progress-drill-timer"
          />

          {/* Prompt Card */}
          <div className="relative">
             <div className="absolute inset-0 bg-linear-to-r from-primary/25 via-indigo-500/15 to-secondary/25 blur-3xl opacity-60 rounded-full pointer-events-none" />
             <div className="relative bg-white/70 backdrop-blur-sm border border-white/30 shadow-2xl rounded-3xl p-16 text-center min-h-[300px] flex items-center justify-center flex-col gap-6">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Prompt</p>
                <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight animate-in zoom-in-90 duration-300 key={prompts[currentWordIndex]}">
                  {difficulty === 'beginner' ? prompts[currentWordIndex] : prompts[0]}
                </h2>
                {difficulty !== 'beginner' && (
                  <p className="text-muted-foreground max-w-md mx-auto mt-4">
                    {difficulty === 'intermediate' ? "Pitch a startup using these words." : "Tell a story incorporating all words."}
                  </p>
                )}
             </div>
          </div>

          <div className="flex justify-center">
             <Button variant="ghost" onClick={() => setCompleted(true)} className="text-muted-foreground hover:text-destructive">
               End Session Early
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}
