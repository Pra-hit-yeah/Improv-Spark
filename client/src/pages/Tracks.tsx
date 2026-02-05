import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { Lock, Play, CheckCircle, ChevronDown, ChevronUp, Zap, ArrowRight, BrainCircuit, Target, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Track } from "@/lib/store";

// Mock progress data generator since we don't have real per-track history yet
const getTrackProgress = (trackId: string, sessions: any[]) => {
  // Simple heuristic based on track ID and session count
  if (trackId === 't1') return { trainedSessions: sessions.length, lastTrained: '2 days ago' };
  if (trackId === 't2') return { trainedSessions: Math.max(0, sessions.length - 3), lastTrained: '5 days ago' };
  return { trainedSessions: 0, lastTrained: 'Never' };
};

const TrackCard = ({ track, isRecommended }: { track: Track; isRecommended?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { sessions } = useStore();
  const progress = getTrackProgress(track.id, sessions);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group">
      <Card className={`overflow-hidden transition-all duration-300 border-2 ${
        track.locked 
          ? 'bg-muted/10 border-transparent opacity-80' 
          : isOpen 
            ? 'border-orange-500/20 shadow-lg shadow-orange-500/5 bg-white'
            : 'border-transparent hover:border-orange-500/20 hover:shadow-md bg-white'
      }`}>
        <div className="flex flex-col">
           {/* Header / Trigger Area */}
           <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                track.locked 
                  ? 'bg-muted text-muted-foreground' 
                  : 'bg-orange-50 text-orange-600 group-hover:scale-105'
              }`}>
                {track.locked ? <Lock className="w-5 h-5" /> : <Zap className="w-6 h-6" />}
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-2">
                 <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground">{track.title}</h3>
                    {track.locked && (
                      <Badge variant="outline" className="gap-1 font-normal bg-muted/50 border-border">
                         Waitlist
                      </Badge>
                    )}
                    {isRecommended && !track.locked && (
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0 gap-1">
                        <Target className="w-3 h-3" /> Recommended Focus
                      </Badge>
                    )}
                 </div>
                 <p className="text-muted-foreground leading-relaxed">
                   {track.description}
                 </p>
                 
                 {/* Mobile Toggle Hint */}
                 <div className="md:hidden flex items-center gap-1 text-xs text-orange-600 font-medium pt-2">
                   {isOpen ? 'Show less' : 'View details'} <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                 </div>
              </div>

              {/* Action Area (Desktop) */}
              <div className="hidden md:flex flex-col items-end gap-3 min-w-[140px]">
                {track.locked ? (
                  <div className="text-right">
                    <span className="text-xs font-medium text-muted-foreground block mb-1">Unlocks when ready</span>
                  </div>
                ) : (
                  <Link href="/app/session">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-200">
                      <Play className="w-4 h-4 mr-2 fill-current" /> Train
                    </Button>
                  </Link>
                )}
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-8">
                    {isOpen ? 'Less info' : 'More info'} 
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
              </div>
           </div>

           {/* Expanded Content */}
           <CollapsibleContent className="animate-in slide-in-from-top-2 fade-in duration-200">
             <div className="px-6 pb-6 pt-0 space-y-6">
               <div className="h-px w-full bg-border/50 mb-6" />
               
               <div className="grid md:grid-cols-3 gap-8">
                 {/* 1. Real World Payoff */}
                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                     <BookOpen className="w-4 h-4 text-orange-500" /> Real World Payoff
                   </div>
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     {track.payoff}
                   </p>
                 </div>

                 {/* 2. Skills Trained */}
                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                     <BrainCircuit className="w-4 h-4 text-blue-500" /> Skills Trained
                   </div>
                   <ul className="space-y-2">
                     {(track.skills || []).map(skill => (
                       <li key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                         {skill}
                       </li>
                     ))}
                     {(!track.skills || track.skills.length === 0) && (
                       <li className="text-sm text-muted-foreground italic">Skills loading...</li>
                     )}
                   </ul>
                 </div>

                 {/* 3. Progress & Status */}
                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                     <Zap className="w-4 h-4 text-emerald-500" /> Exposure
                   </div>
                   
                   {track.locked ? (
                     <div className="bg-muted/30 p-3 rounded-lg border border-border/50 text-sm text-muted-foreground">
                       <p className="font-medium text-foreground mb-1">Not Ready Yet</p>
                       {track.unlockCriteria}
                     </div>
                   ) : (
                     <div className="space-y-2">
                       <p className="text-sm text-muted-foreground">
                         Trained in <span className="font-bold text-foreground">{progress.trainedSessions} sessions</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Last active: {progress.lastTrained}
                       </p>
                       <div className="pt-2 md:hidden">
                          <Link href="/app/session">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                              <Play className="w-4 h-4 mr-2 fill-current" /> Start Training
                            </Button>
                          </Link>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             </div>
           </CollapsibleContent>
        </div>
      </Card>
    </Collapsible>
  );
};

export default function Tracks() {
  const { tracks } = useStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-heading font-bold mb-2">Learning Tracks</h1>
        <p className="text-muted-foreground text-lg">
          Structured paths to master specific aspects of spontaneous communication.
          Focus on one track at a time to build deep neural pathways.
        </p>
      </div>

      <div className="space-y-4">
        {tracks.map((track, idx) => (
          <TrackCard 
            key={track.id} 
            track={track} 
            isRecommended={idx === 0 && !track.locked} 
          />
        ))}
      </div>
    </div>
  );
}
