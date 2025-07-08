
import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";

// Dashboard
import Dashboard from "@/pages/dashboard";

// Catalog
import Products from "@/pages/catalog/products";
import Categories from "@/pages/catalog/categories";
import Manufacturers from "@/pages/catalog/manufacturers";
import ProductImport from "@/pages/catalog/product-import";

// Sales
import Orders from "@/pages/sales/orders";
import Returns from "@/pages/sales/returns";
import Coupons from "@/pages/sales/coupons";

// Customers
import Customers from "@/pages/customers/customers";

// Journal
import JournalLayouts from "@/pages/journal/layouts";
import JournalHeader from "@/pages/journal/header";
import JournalFooter from "@/pages/journal/footer";
import JournalModules from "@/pages/journal/modules";
import JournalSkins from "@/pages/journal/skins";
import JournalStyles from "@/pages/journal/styles";
import JournalVariables from "@/pages/journal/variables";
import ProductExtras from "@/pages/journal/product-extras";

// Design
import DesignLayouts from "@/pages/design/layouts";
import ThemeEditor from "@/pages/design/theme-editor";

// Extensions
import Extensions from "@/pages/extensions/extensions";
import Modifications from "@/pages/extensions/modifications";

// System
import Settings from "@/pages/system/settings";
import Users from "@/pages/system/users";
import Newsletter from "@/pages/system/newsletter";
import FormEmails from "@/pages/system/form-emails";
import ImportExport from "@/pages/system/import-export";
import SystemPage from "@/pages/system/system";

// Marketing
import Marketing from "@/pages/marketing/marketing";
import MarketingCoupons from "@/pages/marketing/coupons";
import Mail from "@/pages/marketing/mail";

// Reports
import Reports from "@/pages/reports/reports";
import WhosOnline from "@/pages/reports/whos-online";
import Statistics from "@/pages/reports/statistics";

// Profile
import AdminProfile from "@/pages/profile/admin-profile";

// 404
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Switch>
                {/* Dashboard */}
                <Route path="/" component={() => <Dashboard />} />
                <Route path="/dashboard" component={() => <Dashboard />} />

                {/* Catalog */}
                <Route path="/catalog/products" component={() => <Products />} />
                <Route path="/catalog/categories" component={() => <Categories />} />
                <Route path="/catalog/manufacturers" component={() => <Manufacturers />} />
                <Route path="/catalog/product-import" component={() => <ProductImport />} />

                {/* Sales */}
                <Route path="/sales/orders" component={() => <Orders />} />
                <Route path="/sales/returns" component={() => <Returns />} />
                <Route path="/sales/coupons" component={() => <Coupons />} />

                {/* Customers */}
                <Route path="/customers" component={() => <Customers />} />

                {/* Journal */}
                <Route path="/journal/layouts" component={() => <JournalLayouts />} />
                <Route path="/journal/header" component={() => <JournalHeader />} />
                <Route path="/journal/footer" component={() => <JournalFooter />} />
                <Route path="/journal/modules" component={() => <JournalModules />} />
                <Route path="/journal/skins" component={() => <JournalSkins />} />
                <Route path="/journal/styles" component={() => <JournalStyles />} />
                <Route path="/journal/variables" component={() => <JournalVariables />} />
                <Route path="/journal/product-extras" component={() => <ProductExtras />} />

                {/* Design */}
                <Route path="/design/layouts" component={() => <DesignLayouts />} />
                <Route path="/design/theme-editor" component={() => <ThemeEditor />} />

                {/* Extensions */}
                <Route path="/extensions" component={() => <Extensions />} />
                <Route path="/extensions/modifications" component={() => <Modifications />} />

                {/* System */}
                <Route path="/system/settings" component={() => <Settings />} />
                <Route path="/system/users" component={() => <Users />} />
                <Route path="/system/newsletter" component={() => <Newsletter />} />
                <Route path="/system/form-emails" component={() => <FormEmails />} />
                <Route path="/system/import-export" component={() => <ImportExport />} />
                <Route path="/system/system" component={() => <SystemPage />} />

                {/* Marketing */}
                <Route path="/marketing" component={() => <Marketing />} />
                <Route path="/marketing/coupons" component={() => <MarketingCoupons />} />
                <Route path="/marketing/mail" component={() => <Mail />} />

                {/* Reports */}
                <Route path="/reports" component={() => <Reports />} />
                <Route path="/reports/whos-online" component={() => <WhosOnline />} />
                <Route path="/reports/statistics" component={() => <Statistics />} />

                {/* Profile */}
                <Route path="/profile" component={() => <AdminProfile />} />

                {/* 404 */}
                <Route component={() => <NotFound />} />
              </Switch>
            </div>
          </Router>
        </SidebarProvider>
      </TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
