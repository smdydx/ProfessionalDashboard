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
import Downloads from "@/pages/catalog/downloads";
import Reviews from "@/pages/catalog/reviews";
import Information from "@/pages/catalog/information";
import Attributes from "@/pages/catalog/attributes";
import Options from "@/pages/catalog/options";
import Filters from "@/pages/catalog/filters";
import Recurring from "@/pages/catalog/recurring";

// Sales
import Orders from "@/pages/sales/orders";
import Returns from "@/pages/sales/returns";
import Coupons from "@/pages/sales/coupons";
import RecurringOrders from "@/pages/sales/recurring-orders";
import Vouchers from "@/pages/sales/vouchers/vouchers";
import VoucherThemes from "@/pages/sales/vouchers/themes";

// Customers
import Customers from "@/pages/customers/customers";
import CustomerGroups from "@/pages/customers/groups";
import CustomerApprovals from "@/pages/customers/approvals";
import CustomFields from "@/pages/customers/custom-fields";

// Journal
import JournalLayouts from "@/pages/journal/layouts";
import JournalHeader from "@/pages/journal/header";
import JournalFooter from "@/pages/journal/footer";
import JournalModules from "@/pages/journal/modules";
import JournalSkins from "@/pages/journal/skins";
import JournalStyles from "@/pages/journal/styles";
import JournalVariables from "@/pages/journal/variables";
import ProductExtras from "@/pages/journal/product-extras";

// Journal Blog
import BlogSettings from "@/pages/journal/blog/settings";
import BlogCategories from "@/pages/journal/blog/categories";
import BlogPosts from "@/pages/journal/blog/posts";
import BlogComments from "@/pages/journal/blog/comments";

// Journal System
import JournalSystemSettings from "@/pages/journal/system/settings";
import JournalNewsletter from "@/pages/journal/system/newsletter";
import JournalFormEmails from "@/pages/journal/system/form-emails";
import JournalImportExport from "@/pages/journal/system/import-export";
import JournalSystem from "@/pages/journal/system/system";

// Design
import DesignLayouts from "@/pages/design/layouts";
import ThemeEditor from "@/pages/design/theme-editor";
import LanguageEditor from "@/pages/design/language-editor";
import Banners from "@/pages/design/banners";
import SeoUrl from "@/pages/design/seo-url";

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

// Extensions Events
import ExtensionEvents from "@/pages/extensions/events";

// Product Import
import PriceManagement from "@/pages/product-import/price-management";
import ExportImport from "@/pages/product-import/export-import";
import InventoryUpdate from "@/pages/product-import/inventory-update";

// System Users
import SystemUsers from "@/pages/system/users/users";
import UserGroups from "@/pages/system/users/user-groups";
import SystemAPI from "@/pages/system/users/api";

// System Localisation
import StoreLocation from "@/pages/system/localisation/store-location";
import Languages from "@/pages/system/localisation/languages";
import Currencies from "@/pages/system/localisation/currencies";
import StockStatuses from "@/pages/system/localisation/stock-statuses";
import OrderStatuses from "@/pages/system/localisation/order-statuses";
import ReturnStatuses from "@/pages/system/localisation/returns/statuses";
import ReturnActions from "@/pages/system/localisation/returns/actions";
import ReturnReasons from "@/pages/system/localisation/returns/reasons";
import Countries from "@/pages/system/localisation/countries";
import Zones from "@/pages/system/localisation/zones";
import GeoZones from "@/pages/system/localisation/geo-zones";
import TaxClasses from "@/pages/system/localisation/taxes/classes";
import TaxRates from "@/pages/system/localisation/taxes/rates";
import LengthClasses from "@/pages/system/localisation/length-classes";
import WeightClasses from "@/pages/system/localisation/weight-classes";

// System Maintenance
import BackupRestore from "@/pages/system/maintenance/backup-restore";
import Uploads from "@/pages/system/maintenance/uploads";
import ErrorLogs from "@/pages/system/maintenance/error-logs";
import LocalisationIndex from "@/pages/system/localisation/index";
import MaintenanceIndex from "@/pages/system/maintenance/index";

// Price Management
import OrdersCompleted from "@/pages/price-management/orders-completed";
import OrdersProcessing from "@/pages/price-management/orders-processing";
import OtherOrder from "@/pages/price-management/other-order";

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
                <Route path="/catalog/downloads" component={() => <Downloads />} />
                <Route path="/catalog/reviews" component={() => <Reviews />} />
                <Route path="/catalog/information" component={() => <Information />} />
                <Route path="/catalog/attributes" component={() => <Attributes />} />
                <Route path="/catalog/options" component={() => <Options />} />
                <Route path="/catalog/filters" component={() => <Filters />} />
                <Route path="/catalog/recurring" component={() => <Recurring />} />

                {/* Sales */}
                <Route path="/sales/orders" component={() => <Orders />} />
                <Route path="/sales/returns" component={() => <Returns />} />
                <Route path="/sales/coupons" component={() => <Coupons />} />
                <Route path="/sales/recurring-orders" component={() => <RecurringOrders />} />
                <Route path="/sales/vouchers/vouchers" component={() => <Vouchers />} />
                <Route path="/sales/vouchers/themes" component={() => <VoucherThemes />} />

                {/* Customers */}
                <Route path="/customers" component={() => <Customers />} />
                <Route path="/customers/customers" component={() => <Customers />} />
                <Route path="/customers/groups" component={() => <CustomerGroups />} />
                <Route path="/customers/approvals" component={() => <CustomerApprovals />} />
                <Route path="/customers/custom-fields" component={() => <CustomFields />} />

                {/* Journal */}
                <Route path="/journal/layouts" component={() => <JournalLayouts />} />
                <Route path="/journal/header" component={() => <JournalHeader />} />
                <Route path="/journal/footer" component={() => <JournalFooter />} />
                <Route path="/journal/modules" component={() => <JournalModules />} />
                <Route path="/journal/skins" component={() => <JournalSkins />} />
                <Route path="/journal/styles" component={() => <JournalStyles />} />
                <Route path="/journal/variables" component={() => <JournalVariables />} />
                <Route path="/journal/product-extras" component={() => <ProductExtras />} />

                {/* Journal Blog Routes */}
                <Route path="/journal/blog/settings" component={() => <BlogSettings />} />
                <Route path="/journal/blog/categories" component={() => <BlogCategories />} />
                <Route path="/journal/blog/posts" component={() => <BlogPosts />} />
                <Route path="/journal/blog/comments" component={() => <BlogComments />} />

                {/* Journal System Routes */}
                <Route path="/journal/system/settings" component={() => <JournalSystemSettings />} />
                <Route path="/journal/system/newsletter" component={() => <JournalNewsletter />} />
                <Route path="/journal/system/form-emails" component={() => <JournalFormEmails />} />
                <Route path="/journal/system/import-export" component={() => <JournalImportExport />} />
                <Route path="/journal/system/system" component={() => <JournalSystem />} />

                {/* Design */}
                <Route path="/design/layouts" component={() => <DesignLayouts />} />
                <Route path="/design/theme-editor" component={() => <ThemeEditor />} />
                <Route path="/design/language-editor" component={() => <LanguageEditor />} />
                <Route path="/design/banners" component={() => <Banners />} />
                <Route path="/design/seo-url" component={() => <SeoUrl />} />

                {/* Extensions */}
                <Route path="/extensions" component={() => <Extensions />} />
                <Route path="/extensions/extensions" component={() => <Extensions />} />
                <Route path="/extensions/modifications" component={() => <Modifications />} />
                <Route path="/extensions/events" component={() => <ExtensionEvents />} />

                {/* Product Import */}
                <Route path="/product-import/price-management" component={() => <PriceManagement />} />
                <Route path="/product-import/export-import" component={() => <ExportImport />} />
                <Route path="/product-import/inventory-update" component={() => <InventoryUpdate />} />

                {/* System */}
                <Route path="/system/settings" component={() => <Settings />} />
                <Route path="/system/users" component={() => <Users />} />
                <Route path="/system/users/users" component={() => <SystemUsers />} />
                <Route path="/system/users/user-groups" component={() => <UserGroups />} />
                <Route path="/system/users/api" component={() => <SystemAPI />} />
                <Route path="/system/localisation" component={() => <LocalisationIndex />} />
                <Route path="/system/localisation/store-location" component={() => <StoreLocation />} />
                <Route path="/system/localisation/languages" component={() => <Languages />} />
                <Route path="/system/localisation/currencies" component={() => <Currencies />} />
                <Route path="/system/localisation/stock-statuses" component={() => <StockStatuses />} />
                <Route path="/system/localisation/order-statuses" component={() => <OrderStatuses />} />
                <Route path="/system/localisation/returns/statuses" component={() => <ReturnStatuses />} />
                <Route path="/system/localisation/returns/actions" component={() => <ReturnActions />} />
                <Route path="/system/localisation/returns/reasons" component={() => <ReturnReasons />} />
                <Route path="/system/localisation/countries" component={() => <Countries />} />
                <Route path="/system/localisation/zones" component={() => <Zones />} />
                <Route path="/system/localisation/geo-zones" component={() => <GeoZones />} />
                <Route path="/system/localisation/taxes/classes" component={() => <TaxClasses />} />
                <Route path="/system/localisation/taxes/rates" component={() => <TaxRates />} />
                <Route path="/system/localisation/length-classes" component={() => <LengthClasses />} />
                <Route path="/system/localisation/weight-classes" component={() => <WeightClasses />} />
                <Route path="/system/maintenance" component={() => <MaintenanceIndex />} />
                <Route path="/system/maintenance/backup-restore" component={() => <BackupRestore />} />
                <Route path="/system/maintenance/uploads" component={() => <Uploads />} />
                <Route path="/system/maintenance/error-logs" component={() => <ErrorLogs />} />
                <Route path="/system/newsletter" component={() => <Newsletter />} />
                <Route path="/system/form-emails" component={() => <FormEmails />} />
                <Route path="/system/import-export" component={() => <ImportExport />} />
                <Route path="/system/system" component={() => <SystemPage />} />

                {/* Price Management */}
                <Route path="/price-management/orders-completed" component={() => <OrdersCompleted />} />
                <Route path="/price-management/orders-processing" component={() => <OrdersProcessing />} />
                <Route path="/price-management/other-order" component={() => <OtherOrder />} />

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
                <Route path="/profile/admin" component={() => <AdminProfile />} />

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