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
import Manufacturers from "@/pages/catalog/manufacturers";
import ProductImport from "@/pages/catalog/product-import";

// Sales Pages
import Orders from "@/pages/sales/orders";
import Returns from "@/pages/sales/returns";
import Coupons from "@/pages/sales/coupons";

// Customer Pages
import Customers from "@/pages/customers/customers";

// System Pages
import SystemSettings from "@/pages/system/settings";
import Users from "@/pages/system/users";

// Reports Pages
import Reports from "@/pages/reports/reports";

// Extensions Pages
import Extensions from "@/pages/extensions/extensions";
import Modifications from "@/pages/extensions/modifications";

// Marketing Pages
import Marketing from "@/pages/marketing/marketing";

// Design Pages
import Layouts from "@/pages/design/layouts";
import ThemeEditor from "@/pages/design/theme-editor";

// Profile Pages
import AdminProfile from "@/pages/profile/admin-profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      
      {/* Catalog Routes */}
      <Route path="/catalog/products" component={Products} />
      <Route path="/catalog/categories" component={Categories} />
      <Route path="/catalog/manufacturers" component={Manufacturers} />
      <Route path="/catalog/product-import" component={ProductImport} />
      
      {/* Sales Routes */}
      <Route path="/sales/orders" component={Orders} />
      <Route path="/sales/returns" component={Returns} />
      <Route path="/sales/coupons" component={Coupons} />
      
      {/* Customer Routes */}
      <Route path="/customers/customers" component={Customers} />
      
      {/* Extensions Routes */}
      <Route path="/extensions/extensions" component={Extensions} />
      <Route path="/extensions/modifications" component={Modifications} />
      
      {/* Design Routes */}
      <Route path="/design/layouts" component={Layouts} />
      <Route path="/design/theme-editor" component={ThemeEditor} />
      
      {/* Marketing Routes */}
      <Route path="/marketing/marketing" component={Marketing} />
      
      {/* System Routes */}
      <Route path="/system/settings" component={SystemSettings} />
      <Route path="/system/users" component={Users} />
      
      {/* Reports Routes */}
      <Route path="/reports/reports" component={Reports} />
      
      {/* Profile Routes */}
      <Route path="/profile/admin" component={AdminProfile} />
      
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
