import type { User, UserProgress, Track, UserTrackProgress, Session } from "@shared/schema";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new ApiError(response.status, error.error || "Request failed");
  }

  return response.json();
}

// Auth API
export const authApi = {
  signup: (email: string, username: string, password: string) =>
    fetchApi<{ user: Omit<User, "password"> }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    }),

  login: (email: string, password: string) =>
    fetchApi<{ user: Omit<User, "password"> }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    fetchApi<{ message: string }>("/api/auth/logout", {
      method: "POST",
    }),

  me: () => fetchApi<{ user: Omit<User, "password"> }>("/api/auth/me"),

  activate: () =>
    fetchApi<{ user: Omit<User, "password"> }>("/api/users/activate", {
      method: "PATCH",
    }),
};

// Progress API
export const progressApi = {
  get: () => fetchApi<UserProgress>("/api/progress"),
};

// Tracks API
export const tracksApi = {
  getAll: () => fetchApi<Track[]>("/api/tracks"),
  getUserProgress: () => fetchApi<UserTrackProgress[]>("/api/tracks/progress"),
  getTrackProgress: (trackId: string) =>
    fetchApi<UserTrackProgress>(`/api/tracks/${trackId}/progress`),
  updateTrackProgress: (trackId: string, updates: Partial<UserTrackProgress>) =>
    fetchApi<UserTrackProgress>(`/api/tracks/${trackId}/progress`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
};

// Sessions API
export const sessionsApi = {
  create: (sessionData: {
    trackId?: string;
    difficulty: string;
    durationSeconds: number;
    xpEarned: number;
    promptsCompleted: number;
  }) =>
    fetchApi<Session>("/api/sessions", {
      method: "POST",
      body: JSON.stringify(sessionData),
    }),

  getAll: (limit?: number) =>
    fetchApi<Session[]>(`/api/sessions${limit ? `?limit=${limit}` : ""}`),

  getStats: () =>
    fetchApi<{
      totalSessions: number;
      totalTimeMinutes: number;
      totalXp: number;
    }>("/api/sessions/stats"),
};

export { ApiError };
