import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Smile, 
  Meh, 
  Frown, 
  Zap, 
  TrendingUp, 
  BrainCircuit, 
  Activity, 
  MessageSquare,
  Award
} from "lucide-react";

// --- Derived Data Components ---

function ReflectionTrend() {
  const { sessions } = useStore();
  
  // Get last 7 sessions, sorted by date desc, then reverse for timeline display
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
    .slice(0, 7)
    .reverse();

  if (recentSessions.length === 0) {
    return (
      <Card className="app-surface">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Reflection Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Complete a session to start tracking your self-perceived fluency.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="app-surface">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Reflection Trend
        </CardTitle>
        <p className="text-xs text-muted-foreground">How fluent you felt in your last 7 sessions</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center gap-2 pt-2">
          {recentSessions.map((session, idx) => {
            const answer = session.reflection_answer;
            let icon = <div className="w-2 h-2 rounded-full bg-muted" />;
            let color = "bg-muted";
            
            if (answer === 'yes') {
              icon = <Smile className="w-5 h-5 text-emerald-600" />;
              color = "bg-emerald-100";
            } else if (answer === 'somewhat') {
              icon = <Meh className="w-5 h-5 text-amber-500" />;
              color = "bg-amber-100";
            } else if (answer === 'no') {
              icon = <Frown className="w-5 h-5 text-red-500" />;
              color = "bg-red-100";
            } else {
              // Fallback for sessions without reflection
              icon = <div className="w-2 h-2 rounded-full bg-slate-200" />;
              color = "bg-slate-50";
            }

            return (
              <div key={session.id} className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${color} shadow-sm transition-transform hover:scale-110`}>
                  {icon}
                </div>
                <span className="text-[10px] text-muted-foreground uppercase">{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SignalsCard() {
  const { sessions } = useStore();
  
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
    .slice(0, 10);

  // Flow: count sessions where flow_state is true
  const flowCount = recentSessions.filter(s => s.flow_state).length;
  
  // Positivity: count 'yes' reflections
  const positiveCount = recentSessions.filter(s => s.reflection_answer === 'yes').length;

  // Consistency: dumb consecutive check logic (mocked for now as real logic needs date diffing)
  const consistencyScore = Math.min(recentSessions.length, 5); // Just cap at 5 for visual

  return (
    <Card className="app-surface">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Confidence Signals
        </CardTitle>
        <p className="text-xs text-muted-foreground">Qualitative signals from your last 10 sessions</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between p-3 bg-white/50 border border-white/40 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Flow State</p>
              <p className="text-xs text-muted-foreground">Sessions without pausing</p>
            </div>
          </div>
          <div className="text-xl font-bold text-blue-600">{flowCount}</div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/50 border border-white/40 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full">
              <Smile className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Self-Belief</p>
              <p className="text-xs text-muted-foreground">"Felt fluent" sessions</p>
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-600">{positiveCount}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function SkillExposureMap() {
  const { sessions } = useStore();

  // Map difficulty to skills
  // Beginner: Speed of Association
  // Intermediate: Contextual Weaving
  // Advanced: Narrative Flexibility
  
  const skillCounts = {
    speed: 0,
    context: 0,
    narrative: 0,
    calm: 0 // "Staying out of head" applies to all completed sessions
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

export default function Progress() {
  const { user } = useStore();

  const data = [
    { day: 'Mon', xp: 120 },
    { day: 'Tue', xp: 200 },
    { day: 'Wed', xp: 150 },
    { day: 'Thu', xp: 300 },
    { day: 'Fri', xp: 250 },
    { day: 'Sat', xp: 180 },
    { day: 'Sun', xp: user?.last_session_date ? 100 : 0 },
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
              <div className="text-4xl font-bold text-primary mb-1" data-testid="text-progress-total-xp">{user?.total_xp}</div>
              <p className="text-sm text-muted-foreground">Total XP Earned</p>
            </div>
          </CardContent>
        </Card>
        <Card className="app-surface">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-1" data-testid="text-progress-streak">{user?.streak}</div>
              <p className="text-sm text-muted-foreground">Current Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card className="app-surface">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1" data-testid="text-progress-level">{user?.level}</div>
              <p className="text-sm text-muted-foreground">Current Level</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Qualitative Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <ReflectionTrend />
        <SignalsCard />
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
