import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { getLocalEvents } from "@/lib/analytics";
import { useStore } from "@/lib/store";

type Difficulty = "beginner" | "intermediate" | "advanced";

function formatPct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export default function AnalyticsPage() {
  const { sessions, user } = useStore();

  const { simulated, usersTotal, sessionsPerUser, completionByDifficulty, funnel, retention7d, dropoff } = useMemo(() => {
    const events = getLocalEvents();

    const signedUps = events.filter((e) => e.name === "user_signed_up");
    const totalUsers = Math.max(1, new Set(signedUps.map((e) => e.user_id).filter(Boolean) as string[]).size);

    const sessionsStarted = events.filter((e) => e.name === "session_started");
    const sessionsCompleted = events.filter((e) => e.name === "session_completed");

    const startedByDifficulty: Record<Difficulty, number> = { beginner: 0, intermediate: 0, advanced: 0 };
    const completedByDifficulty: Record<Difficulty, number> = { beginner: 0, intermediate: 0, advanced: 0 };

    for (const e of sessionsStarted) {
      const d = (e.properties?.difficulty as Difficulty) || "beginner";
      if (startedByDifficulty[d] !== undefined) startedByDifficulty[d]++;
    }

    for (const e of sessionsCompleted) {
      const d = (e.properties?.difficulty as Difficulty) || "beginner";
      if (completedByDifficulty[d] !== undefined) completedByDifficulty[d]++;
    }

    const completionRateByDifficulty: Record<Difficulty, number> = {
      beginner: startedByDifficulty.beginner ? completedByDifficulty.beginner / startedByDifficulty.beginner : 0,
      intermediate: startedByDifficulty.intermediate ? completedByDifficulty.intermediate / startedByDifficulty.intermediate : 0,
      advanced: startedByDifficulty.advanced ? completedByDifficulty.advanced / startedByDifficulty.advanced : 0,
    };

    const landing = events.filter((e) => e.name === "experiment_exposed" || e.name === "user_signed_up" || e.name === "session_started").length;
    const signups = signedUps.length;
    const start = sessionsStarted.length;
    const complete = sessionsCompleted.length;

    const today = new Date();
    const last7 = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      return { key, label: d.toLocaleDateString(undefined, { weekday: "short" }), count: 0 };
    });

    for (const s of sessions) {
      const key = s.completed_at.slice(0, 10);
      const row = last7.find((x) => x.key === key);
      if (row) row.count += 1;
    }

    const insufficient = sessions.length < 4;
    if (insufficient) {
      // Simulated retention with clear labeling
      for (let i = 0; i < last7.length; i++) {
        last7[i].count = [1, 2, 1, 3, 2, 4, 3][i] ?? 1;
      }
    }

    const totalSessions = sessionsCompleted.length;
    const sessionsPer = totalUsers ? totalSessions / totalUsers : 0;

    const drop = completionRateByDifficulty.beginner && completionRateByDifficulty.advanced
      ? completionRateByDifficulty.advanced / completionRateByDifficulty.beginner
      : 0;

    return {
      simulated: insufficient,
      usersTotal: totalUsers,
      sessionsPerUser: sessionsPer,
      completionByDifficulty: completionRateByDifficulty,
      funnel: { landing, signups, start, complete },
      retention7d: last7,
      dropoff: drop,
    };
  }, [sessions]);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Analytics</h1>
          <p className="text-muted-foreground">PM-only view for instrumentation, funnels, and retention.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">PM</Badge>
          {simulated && (
            <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">Simulated</Badge>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Users</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-analytics-total-users">{usersTotal}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sessions per User</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-analytics-sessions-per-user">{sessionsPerUser.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Beginner Completion</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-analytics-beginner-completion">{formatPct(completionByDifficulty.beginner)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Advanced Drop-off</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-analytics-dropoff">{dropoff ? formatPct(dropoff) : "0%"}</div>
            <p className="text-xs text-muted-foreground mt-1">Advanced completion vs beginner completion</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completion Rate by Difficulty</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          {(["beginner", "intermediate", "advanced"] as Difficulty[]).map((d) => (
            <div key={d} className="p-4 rounded-xl border border-border bg-muted/20">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{d}</p>
              <p className="text-2xl font-bold mt-2">{formatPct(completionByDifficulty[d])}</p>
              <p className="text-xs text-muted-foreground mt-1">Completed / started</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[{
              label: "Landing",
              value: funnel.landing,
            }, {
              label: "Signup",
              value: funnel.signups,
            }, {
              label: "Start Session",
              value: funnel.start,
            }, {
              label: "Complete Session",
              value: funnel.complete,
            }].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <p className="text-sm font-medium">{row.label}</p>
                <p className="font-mono text-sm" data-testid={`text-funnel-${row.label.replaceAll(" ", "-").toLowerCase()}`}>{row.value}</p>
              </div>
            ))}
            <Separator />
            <p className="text-xs text-muted-foreground">Counts are derived from logged events. If Supabase is unavailable, local fallback is used.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retention (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {retention7d.map((d) => (
                <div key={d.key} className="text-center">
                  <div className="h-16 rounded-lg bg-muted/30 border border-border flex items-end justify-center overflow-hidden">
                    <div className="w-full bg-primary/60" style={{ height: `${Math.min(100, d.count * 18)}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">{d.label}</p>
                  <p className="text-xs font-mono" data-testid={`text-retention-${d.key}`}>{d.count}</p>
                </div>
              ))}
            </div>
            {simulated && (
              <p className="text-xs text-muted-foreground mt-4">Simulated data shown due to insufficient session history.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/10">
        <CardHeader>
          <CardTitle>SQL Setup Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Use these fields/tables in Supabase (RLS friendly). This page works without them using local fallback.</p>
          <div className="rounded-xl bg-background border border-border p-4 font-mono text-xs overflow-auto">
            <pre>{`-- analytics_events
create table if not exists public.analytics_events (
  id uuid primary key,
  user_id uuid references auth.users(id),
  name text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- profiles additions
alter table public.profiles add column if not exists goal text;
alter table public.profiles add column if not exists daily_time text;
alter table public.profiles add column if not exists activated boolean not null default false;
alter table public.profiles add column if not exists exp_dashboard_cta text;

-- RLS example
alter table public.analytics_events enable row level security;
create policy "Users can insert their analytics" on public.analytics_events
for insert with check (auth.uid() = user_id);
create policy "Users can read their analytics" on public.analytics_events
for select using (auth.uid() = user_id);
`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
