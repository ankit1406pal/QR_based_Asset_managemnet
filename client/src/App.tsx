import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import StatusUpdatePage from "@/pages/StatusUpdatePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/edit/:id" component={HomePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/status/:id" component={StatusUpdatePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
