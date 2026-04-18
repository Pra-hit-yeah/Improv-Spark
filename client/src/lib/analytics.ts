export type AnalyticsEventName =
  | "user_signed_up"
  | "session_started"
  | "session_completed"
  | "difficulty_selected"
  | "streak_incremented"
  | "track_unlocked"
  | "experiment_exposed"
  | "cta_clicked";

export type AnalyticsEvent = {
  id: string;
  user_id: string | null;
  name: AnalyticsEventName;
  created_at: string;
  properties: Record<string, unknown>;
};

const LS_KEY = "quickwit:analytics_events";

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function localAppend(event: AnalyticsEvent) {
  const existing = safeParse<AnalyticsEvent[]>(localStorage.getItem(LS_KEY), []);
  localStorage.setItem(LS_KEY, JSON.stringify([event, ...existing].slice(0, 5000)));
}

export function getLocalEvents(): AnalyticsEvent[] {
  return safeParse<AnalyticsEvent[]>(localStorage.getItem(LS_KEY), []);
}

export async function logEvent(params: {
  name: AnalyticsEventName;
  userId?: string | null;
  properties?: Record<string, unknown>;
}) {
  const event: AnalyticsEvent = {
    id: crypto.randomUUID(),
    user_id: params.userId ?? null,
    name: params.name,
    created_at: new Date().toISOString(),
    properties: params.properties ?? {},
  };

  localAppend(event);
}
