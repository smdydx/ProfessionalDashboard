
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

// Marketing
import Marketing from "@/pages/marketing/marketing";

// Reports
import Reports from "@/pages/reports/reports";

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
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Catalog */}
                <Route path="/catalog/products" element={<Products />} />
                <Route path="/catalog/categories" element={<Categories />} />
                <Route path="/catalog/manufacturers" element={<Manufacturers />} />
                <Route path="/catalog/product-import" element={<ProductImport />} />

                {/* Sales */}
                <Route path="/sales/orders" element={<Orders />} />
                <Route path="/sales/returns" element={<Returns />} />
                <Route path="/sales/coupons" element={<Coupons />} />

                {/* Customers */}
                <Route path="/customers" element={<Customers />} />

                {/* Journal */}
                <Route path="/journal/layouts" element={<JournalLayouts />} />
                <Route path="/journal/header" element={<JournalHeader />} />
                <Route path="/journal/footer" element={<JournalFooter />} />
                <Route path="/journal/modules" element={<JournalModules />} />
                <Route path="/journal/skins" element={<JournalSkins />} />
                <Route path="/journal/styles" element={<JournalStyles />} />
                <Route path="/journal/variables" element={<JournalVariables />} />
                <Route path="/journal/product-extras" element={<ProductExtras />} />

                {/* Design */}
                <Route path="/design/layouts" element={<DesignLayouts />} />
                <Route path="/design/theme-editor" element={<ThemeEditor />} />

                {/* Extensions */}
                <Route path="/extensions" element={<Extensions />} />
                <Route path="/extensions/modifications" element={<Modifications />} />

                {/* System */}
                <Route path="/system/settings" element={<Settings />} />
                <Route path="/system/users" element={<Users />} />

                {/* Marketing */}
                <Route path="/marketing" element={<Marketing />} />

                {/* Reports */}
                <Route path="/reports" element={<Reports />} />

                {/* Profile */}
                <Route path="/profile" element={<AdminProfile />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </SidebarProvider>
      </TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
