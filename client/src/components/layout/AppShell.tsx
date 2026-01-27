import { Link, useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { Navbar } from "./Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { isAuthenticated } = useStore();

  const isAppRoute = location.startsWith("/app");

  useEffect(() => {
    // Ideally this checks auth state and redirects
    if (isAppRoute && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAppRoute, isAuthenticated, setLocation]);

  if (isAppRoute) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-screen overflow-y-auto">
          <div className="container max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Quick-Wit. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/product"><a className="hover:text-foreground">Product Case Study</a></Link>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
