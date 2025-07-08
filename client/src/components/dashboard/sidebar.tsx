import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  User,
  TrendingUp,
  BookOpen,
  Upload,
  Puzzle,
  Palette,
  DollarSign,
  Megaphone,
  Monitor,
  FileText,
  Tag,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  subItems?: Array<{
    name: string;
    href: string;
    current: boolean;
  }>;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: Home, current: true },
  { 
    name: "Journal", 
    href: "/journal", 
    icon: BookOpen, 
    current: false,
    subItems: [
      { name: "Variables", href: "/journal/variables", current: false },
      { name: "Styles", href: "/journal/styles", current: false },
      { name: "Skins", href: "/journal/skins", current: false },
      { name: "Header", href: "/journal/header", current: false },
      { name: "Footer", href: "/journal/footer", current: false },
      { name: "Layouts", href: "/journal/layouts", current: false },
      { name: "Modules", href: "/journal/modules", current: false },
      { name: "Product Extras", href: "/journal/product-extras", current: false },
      { name: "Blog", href: "/journal/blog", current: false },
      { name: "System", href: "/journal/system", current: false }
    ]
  },
  { 
    name: "Catalog", 
    href: "/catalog", 
    icon: Package, 
    current: false,
    subItems: [
      { name: "Categories", href: "/catalog/categories", current: false },
      { name: "Products", href: "/catalog/products", current: false },
      { name: "Recurring Profiles", href: "/catalog/recurring", current: false },
      { name: "Filters", href: "/catalog/filters", current: false },
      { name: "Attributes", href: "/catalog/attributes", current: false },
      { name: "Options", href: "/catalog/options", current: false },
      { name: "Manufacturers", href: "/catalog/manufacturers", current: false },
      { name: "Downloads", href: "/catalog/downloads", current: false },
      { name: "Reviews", href: "/catalog/reviews", current: false },
      { name: "Information", href: "/catalog/information", current: false }
    ]
  },
  { 
    name: "Product Import", 
    href: "/product-import", 
    icon: Upload, 
    current: false,
    subItems: [
      { name: "Price Management", href: "/product-import/price-management", current: false },
      { name: "Export / Import", href: "/product-import/export-import", current: false },
      { name: "Inventory Qty or Price Update", href: "/product-import/inventory-update", current: false }
    ]
  },
  { 
    name: "Extensions", 
    href: "/extensions", 
    icon: Puzzle, 
    current: false,
    subItems: [
      { name: "Installer", href: "/extensions/installer", current: false },
      { name: "Modifications", href: "/extensions/modifications", current: false },
      { name: "Events", href: "/extensions/events", current: false }
    ]
  },
  { 
    name: "Design", 
    href: "/design", 
    icon: Palette, 
    current: false,
    subItems: [
      { name: "Layouts", href: "/design/layouts", current: false },
      { name: "Banners", href: "/design/banners", current: false },
      { name: "Translations", href: "/design/translations", current: false }
    ]
  },
  { 
    name: "Sales", 
    href: "/sales", 
    icon: DollarSign, 
    current: false,
    subItems: [
      { name: "Orders", href: "/sales/orders", current: false },
      { name: "Recurring Orders", href: "/sales/recurring-orders", current: false },
      { name: "Returns", href: "/sales/returns", current: false },
      { name: "Gift Vouchers", href: "/sales/vouchers", current: false },
      { name: "PayPal", href: "/sales/paypal", current: false }
    ]
  },
  { 
    name: "Customers", 
    href: "/customers", 
    icon: Users, 
    current: false,
    subItems: [
      { name: "Customers", href: "/customers/customers", current: false },
      { name: "Customer Groups", href: "/customers/groups", current: false },
      { name: "Customer Approvals", href: "/customers/approvals", current: false },
      { name: "Custom Fields", href: "/customers/custom-fields", current: false }
    ]
  },
  { 
    name: "Marketing", 
    href: "/marketing", 
    icon: Megaphone, 
    current: false,
    subItems: [
      { name: "Marketing", href: "/marketing/marketing", current: false },
      { name: "Coupons", href: "/marketing/coupons", current: false },
      { name: "Mail", href: "/marketing/mail", current: false }
    ]
  },
  { 
    name: "System", 
    href: "/system", 
    icon: Monitor, 
    current: false,
    subItems: [
      { name: "Settings", href: "/system/settings", current: false },
      { name: "Users", href: "/system/users", current: false },
      { name: "User Groups", href: "/system/user-groups", current: false },
      { name: "API", href: "/system/api", current: false },
      { name: "Maintenance", href: "/system/maintenance", current: false }
    ]
  },
  { 
    name: "Reports", 
    href: "/reports", 
    icon: FileText, 
    current: false,
    subItems: [
      { name: "Sales", href: "/reports/sales", current: false },
      { name: "Products", href: "/reports/products", current: false },
      { name: "Customers", href: "/reports/customers", current: false },
      { name: "Marketing", href: "/reports/marketing", current: false }
    ]
  },

];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpansion = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const renderNavItem = (item: NavigationItem) => {
    const Icon = item.icon;
    const isActive = location === item.href;
    const isExpanded = expandedItems.includes(item.name);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div key={item.name}>
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-slate-700 hover:bg-slate-100"
          )}
          onClick={() => {
            if (hasSubItems) {
              toggleExpansion(item.name);
            } else {
              if (isMobile) onClose();
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </div>
          {hasSubItems && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
        
        {hasSubItems && isExpanded && (
          <div className="ml-4 mt-2 space-y-1">
            {item.subItems!.map((subItem) => {
              const isSubActive = location === subItem.href;
              return (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  onClick={isMobile ? onClose : undefined}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isSubActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <div className="w-2 h-2 rounded-full bg-slate-400 mr-3"></div>
                  <span>{subItem.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto",
        isMobile && !isOpen && "-translate-x-full",
        !isMobile && "translate-x-0"
      )}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">OpenCart</h1>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => renderNavItem(item))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Devendra Mishra</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
