import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { Lock, Play, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Tracks() {
  const { tracks, user } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Learning Tracks</h1>
        <p className="text-muted-foreground">Structured paths to master different aspects of communication.</p>
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <Card key={track.id} className={`overflow-hidden transition-all ${track.locked ? 'bg-muted/10' : 'hover:border-primary/50'}`}>
            <div className="flex flex-col md:flex-row">
               <div className={`w-full md:w-2 bg-primary/20 ${track.locked ? 'bg-gray-200' : 'bg-primary'}`} />
               <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{track.title}</h3>
                        {track.locked && <Badge variant="outline" className="gap-1"><Lock className="w-3 h-3" /> Locked</Badge>}
                        {!track.locked && <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">Active</Badge>}
                     </div>
                     <p className="text-muted-foreground mb-4">{track.description}</p>
                     
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {track.completed_modules}/{track.total_modules} Modules</span>
                        <span>•</span>
                        <span>Level {track.level_req}+ Required</span>
                     </div>
                  </div>

                  <div>
                    {track.locked ? (
                      <Button disabled variant="outline">Locked</Button>
                    ) : (
                      <Link href="/app/session">
                        <Button>Continue Track</Button>
                      </Link>
                    )}
                  </div>
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
