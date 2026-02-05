import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Timer, ArrowRight, CheckCircle2, Pause, Play, BrainCircuit, Activity, Zap } from "lucide-react";
import { useStore } from "@/lib/store";
import { logEvent } from "@/lib/analytics";
import { useLocation } from "wouter";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

const WORDS = [
  "Apple", "Rocket", "Silence", "Ocean", "Bridge", "Chaos", 
  "Market", "Whisper", "Velocity", "Shadow", "Fortune", "Echo"
];

const CONFIG = {
  beginner: { 
    duration: 5, 
    promptCount: 10, 
    type: 'association',
    desc: "Say the first word that comes to mind.",
    instruction: "You'll see a word every 5 seconds. Don't overthink it—just speak the first association aloud."
  },
  intermediate: { 
    duration: 30, 
    promptCount: 1, 
    type: 'pitch',
    desc: "Connect two concepts into a pitch.",
    instruction: "You have 30 seconds to deliver a convincing elevator pitch connecting two random words. Keep it flowing."
  },
  advanced: { 
    duration: 45, 
    promptCount: 1, 
    type: 'story',
    desc: "Weave a complex narrative.",
    instruction: "You have 45 seconds to tell a cohesive story using all 5 words shown. No pauses allowed!"
  },
};

export function Drill({ difficulty }: { difficulty: Difficulty }) {
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [prompts, setPrompts] = useState<string[]>([]);
  const { completeSession } = useStore();
  const [, setLocation] = useLocation();

  // New State for Upgraded Features
  const [showPreStart, setShowPreStart] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hasPaused, setHasPaused] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState<'yes' | 'somewhat' | 'no' | null>(null);

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
    if (!active || completed || isPaused || countdown !== null) return;

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
  }, [active, completed, isPaused, countdown, difficulty, currentWordIndex, prompts.length]);

  // Countdown Logic
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setActive(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c! - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleStartCountdown = () => {
    setShowPreStart(false);
    setCountdown(3);
    logEvent({ name: "difficulty_selected", userId: null, properties: { difficulty } });
    logEvent({ name: "session_started", userId: null, properties: { difficulty } });
  };

  const handleTogglePause = () => {
    if (!isPaused) setHasPaused(true);
    setIsPaused(!isPaused);
  };

  const handleFinish = () => {
    completeSession(difficulty, 60, !hasPaused, reflectionAnswer || undefined);
    setTimeout(() => {
      setLocation("/app");
    }, 500);
  };

  // 6. Pre-Drill Instruction Modal
  if (showPreStart) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md" data-testid="modal-pre-drill">
           <DialogHeader>
             <DialogTitle className="text-2xl font-bold flex items-center gap-2">
               <span className="text-3xl">{difficulty === 'beginner' ? '🌱' : difficulty === 'intermediate' ? '💼' : '🎭'}</span>
               {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Session
             </DialogTitle>
             <DialogDescription className="text-base pt-2">
               {CONFIG[difficulty].instruction}
             </DialogDescription>
           </DialogHeader>
           
           <div className="space-y-4 py-4">
             <div className="bg-muted/30 p-4 rounded-lg space-y-3">
               <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">What you're training today</h4>
               <ul className="space-y-2">
                 <li className="flex gap-2 items-center text-sm font-medium">
                   <Zap className="w-4 h-4 text-amber-500" /> Speed of association
                 </li>
                 <li className="flex gap-2 items-center text-sm font-medium">
                   <BrainCircuit className="w-4 h-4 text-primary" /> Staying out of your head
                 </li>
                 <li className="flex gap-2 items-center text-sm font-medium">
                   <Activity className="w-4 h-4 text-green-500" /> Speaking without pre-editing
                 </li>
               </ul>
             </div>
           </div>

           <Button size="lg" className="w-full text-lg h-12" onClick={handleStartCountdown} data-testid="button-start-drill-countdown">
             I'm Ready
           </Button>
        </DialogContent>
      </Dialog>
    );
  }

  // Countdown Screen
  if (countdown !== null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <div className="text-9xl font-black text-primary animate-in zoom-in-50 duration-300">
           {countdown === 0 ? "GO!" : countdown}
         </div>
      </div>
    );
  }

  // Completion Screen (Upgraded)
  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in-95 duration-500 max-w-md mx-auto">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-200/60">
          <CheckCircle2 className="w-12 h-12 text-emerald-700" />
        </div>
        <h2 className="text-3xl font-bold mb-2" data-testid="text-session-complete-title">Session Complete!</h2>
        
        {/* 5. Flow Moment */}
        {!hasPaused && (
          <div className="mb-6 px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200 inline-flex items-center gap-2">
            <Zap className="w-4 h-4 fill-amber-800" />
            You stayed in flow the entire session.
          </div>
        )}

        <div className="w-full space-y-6">
          
          {/* 1. Reflection Checkpoint */}
          {!reflectionAnswer ? (
             <Card className="app-surface border-l-4 border-l-primary animate-in slide-in-from-bottom-4">
               <CardHeader className="pb-2">
                 <CardTitle className="text-lg">Reflection</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <p className="text-sm text-muted-foreground">Did you feel more fluent by the end of this session?</p>
                 <div className="grid grid-cols-3 gap-2">
                   {['Yes', 'Somewhat', 'No'].map((opt) => (
                     <Button 
                       key={opt} 
                       variant="outline" 
                       size="sm" 
                       onClick={() => setReflectionAnswer(opt.toLowerCase() as any)}
                       className="hover:bg-primary hover:text-primary-foreground hover:border-primary"
                     >
                       {opt}
                     </Button>
                   ))}
                 </div>
               </CardContent>
             </Card>
          ) : (
            <Card className="bg-muted/20 border-none animate-in fade-in">
              <CardContent className="p-4 text-sm text-muted-foreground">
                Thanks for reflecting. Most users report noticeable improvement after 3–5 sessions.
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4" data-testid="grid-session-rewards">
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
          
          <Button size="lg" onClick={handleFinish} className="w-full" disabled={!reflectionAnswer} data-testid="button-session-return-dashboard">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Active Drill UI (Upgraded)
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="space-y-12">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest" data-testid="text-drill-stage">
            {difficulty === 'beginner' ? `Word ${currentWordIndex + 1} of ${prompts.length}` : "Time Remaining"}
          </span>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={handleTogglePause} className="rounded-full hover:bg-muted">
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
             </Button>
             <div className="flex items-center gap-2 font-mono text-2xl font-bold text-primary" data-testid="text-drill-timer">
              <Timer className="w-6 h-6" />
              00:{timeLeft.toString().padStart(2, '0')}
             </div>
          </div>
        </div>
        
        <Progress
          value={(timeLeft / (difficulty === 'beginner' ? 5 : difficulty === 'intermediate' ? 30 : 45)) * 100}
          className="h-2 bg-secondary/15"
          data-testid="progress-drill-timer"
        />

        {/* Prompt Card */}
        <div className="relative">
           {!isPaused && (
             <div className="absolute inset-0 bg-linear-to-r from-primary/25 via-indigo-500/15 to-secondary/25 blur-3xl opacity-60 rounded-full pointer-events-none animate-pulse" />
           )}
           <div className={`relative bg-white/70 backdrop-blur-sm border border-white/30 shadow-2xl rounded-3xl p-16 text-center min-h-[300px] flex items-center justify-center flex-col gap-6 transition-all duration-300 ${isPaused ? 'opacity-50 blur-sm scale-95' : 'scale-100'}`}>
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

           {/* 7. Mock Mic UI */}
           {!isPaused && (
             <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
                <div className="bg-background/80 backdrop-blur-md border border-primary/20 text-primary px-6 py-2 rounded-full flex items-center gap-3 shadow-lg animate-in slide-in-from-bottom-4">
                   <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                   </span>
                   <Mic className="w-4 h-4" />
                   <span className="text-sm font-bold tracking-wide">LISTENING...</span>
                </div>
             </div>
           )}

           {isPaused && (
             <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="bg-background/90 backdrop-blur border border-border px-8 py-4 rounded-xl shadow-2xl font-bold text-xl flex items-center gap-2">
                 <Pause className="w-6 h-6" /> PAUSED
               </div>
             </div>
           )}
        </div>

        <div className="flex justify-center pt-8">
           <Button variant="ghost" onClick={() => setCompleted(true)} className="text-muted-foreground hover:text-destructive text-sm">
             End Session Early
           </Button>
        </div>
      </div>
    </div>
  );
}
