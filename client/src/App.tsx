import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from "@/components/layout/AppShell";

import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import Tracks from "@/pages/Tracks";
import Progress from "@/pages/Progress";
import Settings from "@/pages/Settings";
import SessionPage from "@/pages/Session";
import ProductCaseStudy from "@/pages/ProductCaseStudy";
import RoadmapPage from "@/pages/Roadmap";
import PRDHub from "@/pages/PRD";
import Onboarding from "@/pages/Onboarding";
import AnalyticsPage from "@/pages/Analytics";
import AnalyticsGate from "@/pages/AnalyticsGate";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppShell>
      <Switch>
        {/* Public */}
        <Route path="/" component={LandingPage} />
        <Route path="/product" component={ProductCaseStudy} />
        <Route path="/prd" component={PRDHub} />
        <Route path="/roadmap" component={RoadmapPage} />
        <Route path="/login" component={AuthPage} />
        <Route path="/signup" component={AuthPage} />
        
        {/* App Shell */}
        <Route path="/app" component={Dashboard} />
        <Route path="/app/onboarding" component={Onboarding} />
        <Route path="/app/tracks" component={Tracks} />
        <Route path="/app/progress" component={Progress} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/app/session" component={SessionPage} />
        <Route path="/app/analytics">
          <AnalyticsGate>
            <AnalyticsPage />
          </AnalyticsGate>
        </Route>

        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
    </QueryClientProvider>
  );
}

export default App;
