import { useEffect } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { isPmModeEnabled } from "@/lib/pm";

export default function AnalyticsGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, testerBypassEnabled } = useStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const ok = (isPmModeEnabled() && testerBypassEnabled) || (isAuthenticated && isPmModeEnabled());
    if (!ok) setLocation("/app");
  }, [isAuthenticated, testerBypassEnabled, setLocation]);

  return <>{children}</>;
}
