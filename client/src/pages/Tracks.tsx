import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { Play, ChevronDown, Zap, BrainCircuit, Target, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import type { Track } from "@shared/schema";

const TrackCard = ({ track, isRecommended }: { track: Track; isRecommended?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const trackPayoffs: Record<string, string> = {
    "Verbal Reflexes": "Never get stuck searching for a word in casual conversation or meetings.",
    "Persuasive Pitching": "Deliver clear, convincing updates in stand-ups and stakeholder reviews.",
    "Narrative Weaving": "Turn dry data points into engaging stories during presentations.",
  };

  const trackSkills: Record<string, string[]> = {
    "Verbal Reflexes": ["Speed of Association", "Staying Out of Your Head", "Vocabulary Access"],
    "Persuasive Pitching": ["Structure Under Pressure", "Audience Awareness", "Clear Articulation"],
    "Narrative Weaving": ["Narrative Flexibility", "Contextual Weaving", "Metaphor Usage"],
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group">
      <Card className={`overflow-hidden transition-all duration-300 border-2 ${
        isOpen 
          ? 'border-orange-500/20 shadow-lg shadow-orange-500/5 bg-white'
          : 'border-transparent hover:border-orange-500/20 hover:shadow-md bg-white'
      }`}>
        <div className="flex flex-col">
           <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 bg-orange-50 text-orange-600 group-hover:scale-105">
                <Zap className="w-6 h-6" />
              </div>

              <div className="flex-1 space-y-2">
                 <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground">{track.name}</h3>
                    <Badge variant="outline" className="gap-1 font-normal">
                      {track.difficulty}
                    </Badge>
                    {isRecommended && (
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0 gap-1">
                        <Target className="w-3 h-3" /> Recommended Focus
                      </Badge>
                    )}
                 </div>
                 <p className="text-muted-foreground leading-relaxed">
                   {track.description}
                 </p>
                 
                 <div className="md:hidden flex items-center gap-1 text-xs text-orange-600 font-medium pt-2">
                   {isOpen ? 'Show less' : 'View details'} <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                 </div>
              </div>

              <div className="hidden md:flex flex-col items-end gap-3 min-w-[140px]">
                <Link href="/app/session">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-200">
                    <Play className="w-4 h-4 mr-2 fill-current" /> Train
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-8" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>
                  {isOpen ? 'Less info' : 'More info'} 
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
           </div>

           <CollapsibleContent className="animate-in slide-in-from-top-2 fade-in duration-200">
             <div className="px-6 pb-6 pt-0 space-y-6">
               <div className="h-px w-full bg-border/50 mb-6" />
               
               <div className="grid md:grid-cols-3 gap-8">
                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                     <Target className="w-4 h-4 text-orange-500" />
                     Real World Payoff
                   </div>
                   <p className="text-muted-foreground leading-relaxed">
                     {trackPayoffs[track.name] || "Build fluency through consistent practice."}
                   </p>
                 </div>

                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                     <BrainCircuit className="w-4 h-4 text-blue-500" />
                     Skills Trained
                   </div>
                   <ul className="space-y-2">
                     {(trackSkills[track.name] || ["Core Fluency", "Quick Thinking"]).map((skill) => (
                       <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                         <Zap className="w-3 h-3 text-amber-500" />
                         {skill}
                       </li>
                     ))}
                   </ul>
                 </div>

                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                     <BookOpen className="w-4 h-4 text-emerald-500" />
                     Format
                   </div>
                   <p className="text-muted-foreground leading-relaxed">
                     {track.moduleCount} modules of timed drills with increasing difficulty.
                   </p>
                 </div>
               </div>

               <div className="md:hidden pt-4">
                 <Link href="/app/session" className="w-full">
                   <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-200">
                     <Play className="w-4 h-4 mr-2 fill-current" /> Start Training
                   </Button>
                 </Link>
               </div>
             </div>
           </CollapsibleContent>
        </div>
      </Card>
    </Collapsible>
  );
};

export default function Tracks() {
  const { tracks, loadUserData } = useStore();

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const sortedTracks = [...tracks].sort((a, b) => {
    const order = { "Beginner": 0, "Intermediate": 1, "Advanced": 2 };
    return (order[a.difficulty as keyof typeof order] ?? 0) - (order[b.difficulty as keyof typeof order] ?? 0);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-heading font-bold">Training Tracks</h1>
        <p className="text-muted-foreground">Structured skill progressions designed for measurable growth.</p>
      </div>

      <div className="space-y-4">
        {sortedTracks.map((track, index) => (
          <TrackCard key={track.id} track={track} isRecommended={index === 0} />
        ))}
      </div>

      {tracks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Loading tracks...</p>
        </div>
      )}
    </div>
  );
}
