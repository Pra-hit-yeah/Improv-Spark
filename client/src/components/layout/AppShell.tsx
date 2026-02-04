import { useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { PMLayout } from "@/components/layout/PMLayout";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { isAuthenticated } = useStore();

  // Route theme for global typography + tokens
  useEffect(() => {
    const root = document.documentElement;
    const isPM =
      location === "/product" ||
      location === "/research" ||
      location === "/experiments" ||
      location === "/market" ||
      location === "/gtm" ||
      location === "/prd" ||
      location === "/roadmap";
    root.setAttribute("data-theme", isPM ? "pm" : "app");
  }, [location]);

  const isAppRoute = location.startsWith("/app");
  const isPMRoute =
    location === "/product" ||
    location === "/research" ||
    location === "/experiments" ||
    location === "/market" ||
    location === "/gtm" ||
    location === "/prd" ||
    location === "/roadmap";

  useEffect(() => {
    // Ideally this checks auth state and redirects
    if (isAppRoute && !isAuthenticated && !useStore.getState().testerBypassEnabled) {
      setLocation("/login");
      return;
    }

    if (location === "/app" && (isAuthenticated || useStore.getState().testerBypassEnabled) && !useStore.getState().user?.activated) {
      setLocation("/app/onboarding");
    }
  }, [isAppRoute, isAuthenticated, location, setLocation]);

  if (isAppRoute) {
    return (
      <div className="min-h-screen bg-background flex" data-testid="layout-app">
        <Sidebar />
        <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-screen overflow-y-auto">
          <div className="container max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    );
  }

  if (isPMRoute) {
    return <PMLayout>{children}</PMLayout>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="layout-public">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Quick-Wit. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
            <a href="#" className="hover:text-foreground" data-testid="link-footer-terms">Terms</a>
            <a href="#" className="hover:text-foreground" data-testid="link-footer-privacy">Privacy</a>
            <a href="#" className="hover:text-foreground" data-testid="link-footer-contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
