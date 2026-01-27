import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/store";
import { Link } from "wouter";
import { Play, Zap, Trophy, Flame } from "lucide-react";

export default function Dashboard() {
  const { user, tracks } = useStore();

  const currentTrack = tracks.find(t => !t.locked) || tracks[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-heading font-bold">Good Morning, {user?.name?.split(' ')[0]}</h1>
           <p className="text-muted-foreground">Ready to sharpen your mind today?</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border shadow-xs">
           <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
           <span className="font-bold">{user?.streak} Day Streak</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Action Card */}
        <Card className="md:col-span-2 bg-linear-to-br from-primary to-violet-700 text-white border-0 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <CardHeader>
            <CardTitle className="text-2xl">Today's Session</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Continue your {currentTrack.title} track.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                 <p className="text-sm font-medium opacity-80 mb-1">Current Level</p>
                 <div className="text-4xl font-bold">{user?.level}</div>
              </div>
              <Link href="/app/session">
                <Button size="lg" variant="secondary" className="h-12 px-8 font-bold shadow-lg">
                   <Play className="w-4 h-4 mr-2 fill-current" />
                   Start Session
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Your Stats
             </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <div className="flex justify-between text-sm mb-1">
                   <span className="text-muted-foreground">Total XP</span>
                   <span className="font-bold">{user?.total_xp}</span>
                </div>
                <Progress value={65} className="h-2" />
             </div>
             <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
                <div className="text-center">
                   <p className="text-2xl font-bold">12</p>
                   <p className="text-xs text-muted-foreground">Sessions</p>
                </div>
                <div className="text-center">
                   <p className="text-2xl font-bold">4.5h</p>
                   <p className="text-xs text-muted-foreground">Practice Time</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Your Tracks</h2>
      <div className="grid md:grid-cols-3 gap-6">
         {tracks.map(track => (
            <Link key={track.id} href="/app/tracks">
              <a className="block h-full">
                <Card className={`h-full transition-all hover:border-primary/50 hover:shadow-md ${track.locked ? 'opacity-60 grayscale' : ''}`}>
                  <CardHeader>
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-2">
                       <Zap className={`w-5 h-5 ${track.locked ? 'text-muted-foreground' : 'text-primary'}`} />
                    </div>
                    <CardTitle className="text-lg">{track.title}</CardTitle>
                    <CardDescription>{track.total_modules} Modules</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground mb-4">{track.description}</p>
                     <Progress value={(track.completed_modules / track.total_modules) * 100} />
                  </CardContent>
                </Card>
              </a>
            </Link>
         ))}
      </div>
    </div>
  );
}
