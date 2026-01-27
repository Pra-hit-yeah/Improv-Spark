import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Drill } from "@/components/session/Drill";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function SessionPage() {
  const [selectedMode, setSelectedMode] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

  if (selectedMode) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Button variant="ghost" onClick={() => setSelectedMode(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to selection
        </Button>
        <Drill difficulty={selectedMode} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-heading font-bold">Select Difficulty</h1>
        <p className="text-muted-foreground">Choose your challenge level for today.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:border-primary hover:shadow-lg transition-all"
          onClick={() => setSelectedMode('beginner')}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
               <span className="text-2xl">🌱</span>
            </div>
            <CardTitle>Beginner</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Word Association</p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• One word prompts</li>
              <li>• 5 seconds per word</li>
              <li>• 10 words total</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:border-primary hover:shadow-lg transition-all"
          onClick={() => setSelectedMode('intermediate')}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
               <span className="text-2xl">💼</span>
            </div>
            <CardTitle>Intermediate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">The Elevator Pitch</p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Two random words</li>
              <li>• 30 second pitch</li>
              <li>• Connect the concepts</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:border-primary hover:shadow-lg transition-all"
          onClick={() => setSelectedMode('advanced')}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
               <span className="text-2xl">🎭</span>
            </div>
            <CardTitle>Advanced</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Story Weaver</p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Five random words</li>
              <li>• 45 second story</li>
              <li>• Complex narrative</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
