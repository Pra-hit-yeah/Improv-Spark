import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Zap, 
  TrendingUp, 
  BrainCircuit, 
  Activity, 
  MessageSquare,
  Award,
  Flame,
  Trophy
} from "lucide-react";
import { useEffect } from "react";

function SkillExposureMap() {
  const { sessions } = useStore();

  const skillCounts = {
    speed: 0,
    context: 0,
    narrative: 0,
    calm: 0
  };

  sessions.forEach(s => {
    skillCounts.calm += 1;
    if (s.difficulty === 'beginner') skillCounts.speed += 1;
    if (s.difficulty === 'intermediate') skillCounts.context += 1;
    if (s.difficulty === 'advanced') skillCounts.narrative += 1;
  });

  const maxVal = Math.max(skillCounts.speed, skillCounts.context, skillCounts.narrative, skillCounts.calm, 1);

  const skills = [
    { label: "Association Speed", val: skillCounts.speed, icon: Zap, color: "bg-amber-500" },
    { label: "Staying Out of Head", val: skillCounts.calm, icon: BrainCircuit, color: "bg-blue-500" },
    { label: "Context Weaving", val: skillCounts.context, icon: Activity, color: "bg-emerald-500" },
    { label: "Narrative Flex", val: skillCounts.narrative, icon: MessageSquare, color: "bg-purple-500" },
  ];

  return (
    <Card className="app-surface md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Skill Exposure Map</CardTitle>
        <p className="text-xs text-muted-foreground">How often you train specific cognitive pillars</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.label} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <skill.icon className="w-3 h-3 text-muted-foreground" />
                  <span>{skill.label}</span>
                </div>
                <span className="text-muted-foreground">{skill.val} sessions</span>
              </div>
              <div className="h-2 w-full bg-secondary/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${skill.color} rounded-full transition-all duration-500`} 
                  style={{ width: `${(skill.val / maxVal) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SessionHistory() {
  const { sessions } = useStore();

  if (sessions.length === 0) {
    return (
      <Card className="app-surface">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Complete a session to start tracking your progress.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="app-surface">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Recent Sessions
        </CardTitle>
        <p className="text-xs text-muted-foreground">Your last {Math.min(sessions.length, 7)} practice sessions</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 pt-2">
          {sessions.slice(0, 7).map((session) => {
            const difficultyColors: Record<string, string> = {
              beginner: "bg-green-100 text-green-700",
              intermediate: "bg-blue-100 text-blue-700",
              advanced: "bg-purple-100 text-purple-700",
            };
            return (
              <div key={session.id} className="flex items-center justify-between p-2 rounded-lg bg-white/50 border border-border/30">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[session.difficulty] || "bg-gray-100"}`}>
                    {session.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(session.completedAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-bold text-primary">+{session.xpEarned} XP</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Progress() {
  const { userProgress, loadUserData } = useStore();

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const totalXp = userProgress?.totalXp ?? 0;
  const streak = userProgress?.currentStreak ?? 0;
  const level = Math.floor(totalXp / 200) + 1;
  const totalSessions = userProgress?.totalSessions ?? 0;

  const data = [
    { day: 'Mon', xp: 120 },
    { day: 'Tue', xp: 200 },
    { day: 'Wed', xp: 150 },
    { day: 'Thu', xp: 300 },
    { day: 'Fri', xp: 250 },
    { day: 'Sat', xp: 180 },
    { day: 'Sun', xp: totalSessions > 0 ? 100 : 0 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-heading font-bold">Your Progress</h1>
        <p className="text-muted-foreground">Track your improvement over time.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="app-callout border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-1" data-testid="text-progress-total-xp">{totalXp}</div>
              <p className="text-sm text-muted-foreground">Total XP Earned</p>
            </div>
          </CardContent>
        </Card>
        <Card className="app-surface">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-3">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-1" data-testid="text-progress-streak">{streak}</div>
              <p className="text-sm text-muted-foreground">Current Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card className="app-surface">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-1" data-testid="text-progress-level">{level}</div>
              <p className="text-sm text-muted-foreground">Current Level</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SessionHistory />
        <SkillExposureMap />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="xp" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
