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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppShell>
      <Switch>
        {/* Public */}
        <Route path="/" component={LandingPage} />
        <Route path="/product" component={ProductCaseStudy} />
        <Route path="/login" component={AuthPage} />
        <Route path="/signup" component={AuthPage} />
        
        {/* App Shell */}
        <Route path="/app" component={Dashboard} />
        <Route path="/app/tracks" component={Tracks} />
        <Route path="/app/progress" component={Progress} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/app/session" component={SessionPage} />

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
