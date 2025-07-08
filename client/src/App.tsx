import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";

// Catalog Pages
import Products from "@/pages/catalog/products";
import Categories from "@/pages/catalog/categories";

// Sales Pages
import Orders from "@/pages/sales/orders";

// Customer Pages
import Customers from "@/pages/customers/customers";

// System Pages
import SystemSettings from "@/pages/system/settings";

// Reports Pages
import Reports from "@/pages/reports/reports";

// Extensions Pages
import Extensions from "@/pages/extensions/extensions";

// Marketing Pages
import Marketing from "@/pages/marketing/marketing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      
      {/* Catalog Routes */}
      <Route path="/catalog/products" component={Products} />
      <Route path="/catalog/categories" component={Categories} />
      
      {/* Sales Routes */}
      <Route path="/sales/orders" component={Orders} />
      
      {/* Customer Routes */}
      <Route path="/customers/customers" component={Customers} />
      
      {/* Extensions Routes */}
      <Route path="/extensions/extensions" component={Extensions} />
      
      {/* Marketing Routes */}
      <Route path="/marketing/marketing" component={Marketing} />
      
      {/* System Routes */}
      <Route path="/system/settings" component={SystemSettings} />
      
      {/* Reports Routes */}
      <Route path="/reports/reports" component={Reports} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
