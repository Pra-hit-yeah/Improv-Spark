import { logEvent } from "@/lib/analytics";

export type DashboardCtaVariant = "A" | "B";

const LS_KEY = "quickwit:exp:dashboard_cta";

export function getDashboardCtaVariant(userId?: string | null): DashboardCtaVariant {
  const existing = localStorage.getItem(LS_KEY);
  if (existing === "A" || existing === "B") return existing;

  const assigned: DashboardCtaVariant = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem(LS_KEY, assigned);

  logEvent({
    name: "experiment_exposed",
    userId: userId ?? null,
    properties: {
      experiment_key: "dashboard_primary_cta_text",
      variant: assigned,
    },
  });

  return assigned;
}

export function getDashboardCtaText(variant: DashboardCtaVariant) {
  return variant === "A" ? "Start your daily session" : "Train your wit now";
}
