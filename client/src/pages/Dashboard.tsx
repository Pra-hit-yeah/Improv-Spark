import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/store";
import { Link } from "wouter";
import { Play, Zap, Trophy, Flame, History, ArrowUpRight } from "lucide-react";
import { getDashboardCtaText, getDashboardCtaVariant } from "@/lib/experiments";
import { logEvent } from "@/lib/analytics";

function LastSessionRecap({ user }: { user: any }) {
  if (!user?.last_session_completed || !user?.last_session_difficulty) return null;

  const difficultyLabel = {
    beginner: "Verbal Reflexes",
    intermediate: "Elevator Pitch",
    advanced: "Story Weaving"
  }[user.last_session_difficulty as string] || "Practice";

  return (
    <Card className="app-surface mb-6 border-l-4 border-l-primary/40">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-muted rounded-full">
             <History className="w-4 h-4 text-muted-foreground" />
           </div>
           <div>
             <p className="text-sm font-medium text-foreground">Last Session: {difficultyLabel}</p>
             <p className="text-sm text-muted-foreground italic">
               {user.last_session_difficulty === 'beginner' && "You built stronger verbal reflexes."}
               {user.last_session_difficulty === 'intermediate' && "You practiced structure under pressure."}
               {user.last_session_difficulty === 'advanced' && "You exercised narrative flexibility."}
             </p>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { user, tracks } = useStore();

  const currentTrack = tracks.find(t => !t.locked) || tracks[0];
  const variant = getDashboardCtaVariant(user?.id ?? null);
  const ctaText = getDashboardCtaText(variant);

  // Recommendation Logic
  let recommendedDifficulty = "beginner";
  let recommendationReason = "Start here to build your base.";

  if (user?.last_session_completed) {
    if (user.last_session_difficulty === "beginner") {
      recommendedDifficulty = "intermediate";
      recommendationReason = "Builds on your verbal reflexes.";
    } else if (user.last_session_difficulty === "intermediate") {
      recommendedDifficulty = "advanced";
      recommendationReason = "Challenges your storytelling depth.";
    } else {
      recommendedDifficulty = "advanced";
      recommendationReason = "Keeps your narrative skills sharp.";
    }
  }

  const headline = user?.goal === 'confidence'
    ? 'Build calm confidence'
    : user?.goal === 'wit'
      ? 'Sharpen your wit'
      : user?.goal === 'social_ease'
        ? 'Make conversations feel easy'
        : user?.goal === 'presence'
          ? 'Speak with presence'
          : `Good Morning, ${user?.name?.split(' ')[0]}`;

  const subtext = user?.daily_time === 'morning'
    ? 'A quick drill to start the day strong.'
    : user?.daily_time === 'afternoon'
      ? 'A quick reset for clearer thinking.'
      : user?.daily_time === 'evening'
        ? 'A short drill to end on a high note.'
        : 'Ready to sharpen your mind today?';

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold" data-testid="text-dashboard-headline">{headline}</h1>
          <p className="text-muted-foreground" data-testid="text-dashboard-subtext">{subtext}</p>
        </div>
        <div className="flex items-center gap-2 app-surface px-4 py-2 rounded-full app-ring" data-testid="pill-dashboard-streak">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <span className="font-bold">{user?.streak} Day Streak</span>
        </div>
      </div>

      <LastSessionRecap user={user} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Action Card */}
        <Card className="md:col-span-2 bg-orange-500 text-white border-0 shadow-xl overflow-hidden relative app-glow">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Today's Session</CardTitle>
                <CardDescription className="text-white/90 font-medium text-base mt-1">
                  {recommendationReason}
                </CardDescription>
                <p className="text-white/70 text-sm mt-2 max-w-md">
                   Trains <span className="font-semibold text-white/90">Speed of Association</span> to help you respond faster in meetings and conversations.
                </p>
              </div>
              {user?.last_session_completed && (
                <div className="hidden sm:flex bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white/80 items-center gap-1 border border-white/10">
                  <ArrowUpRight className="w-3 h-3" />
                  Optional: {recommendedDifficulty.charAt(0).toUpperCase() + recommendedDifficulty.slice(1)}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                 <p className="text-sm font-medium opacity-80 mb-1">Current Level</p>
                 <div className="text-4xl font-bold">{user?.level}</div>
              </div>
              <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                <Link href="/app/session" asChild>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8 font-bold shadow-lg bg-white text-orange-600 hover:bg-white/90 w-full sm:w-auto"
                    data-testid="button-dashboard-primary-cta"
                  >
                    <a
                      data-testid="link-dashboard-primary-cta"
                      onClick={() => {
                        logEvent({
                          name: "cta_clicked",
                          userId: user?.id ?? null,
                          properties: {
                            experiment_key: "dashboard_primary_cta_text",
                            variant,
                            cta_text: ctaText,
                          },
                        });
                      }}
                    >
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      {ctaText}
                    </a>
                  </Button>
                </Link>
                <span className="text-xs text-white/60 font-medium text-center sm:text-right w-full block">
                  Most users feel more fluent after 3–5 sessions.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="bg-linear-to-br from-white to-amber-50/50 border-amber-100/50 shadow-lg shadow-amber-500/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-950">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
              Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
             <div>
                <div className="flex justify-between text-sm mb-2">
                   <span className="text-amber-900/60 font-medium">Total XP</span>
                   <span className="font-bold text-amber-900">{user?.total_xp}</span>
                </div>
                <Progress value={65} className="h-2.5 bg-amber-100" />
             </div>
             <div className="pt-4 border-t border-amber-100 grid grid-cols-2 gap-4">
                <div className="text-center p-2 rounded-lg bg-white/50 border border-amber-100/50">
                   <p className="text-2xl font-bold text-amber-900">12</p>
                   <p className="text-xs text-amber-700/60 font-medium uppercase tracking-wide">Sessions</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/50 border border-amber-100/50">
                   <p className="text-2xl font-bold text-amber-900">4.5h</p>
                   <p className="text-xs text-amber-700/60 font-medium uppercase tracking-wide">Time</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mt-12 mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-orange-500" />
        Your Tracks
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
         {tracks.map(track => (
            <Link key={track.id} href="/app/tracks" className="block h-full group" data-testid={`card-track-${track.id}`}>
              <Card className={`h-full transition-all duration-300 border-2 ${track.locked 
                ? "opacity-60 grayscale bg-muted/30 border-transparent" 
                : "bg-white border-transparent hover:border-orange-500/20 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1"
              }`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm ${
                    track.locked 
                      ? "bg-muted text-muted-foreground" 
                      : "bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform duration-300"
                  }`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-bold">{track.title}</CardTitle>
                  <CardDescription className="font-medium text-xs uppercase tracking-wider text-muted-foreground/80">{track.total_modules} Modules</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed min-h-[40px]">{track.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-orange-600">{Math.round((track.completed_modules / track.total_modules) * 100)}%</span>
                    </div>
                    <Progress value={(track.completed_modules / track.total_modules) * 100} className="h-2 bg-orange-100 [&>div]:bg-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </Link>
         ))}
      </div>
    </div>
  );
}
