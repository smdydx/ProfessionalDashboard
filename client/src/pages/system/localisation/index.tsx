
import React from "react";
import { PageLayout } from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  DollarSign, 
  MapPin, 
  Languages, 
  Package, 
  ArrowRight,
  Settings,
  Users,
  FileText
} from "lucide-react";

const localisationSections = [
  {
    title: "Basic Settings",
    description: "Core localisation settings",
    items: [
      { name: "Store Location", href: "/system/localisation/store-location", icon: MapPin, description: "Set your store's physical location" },
      { name: "Languages", href: "/system/localisation/languages", icon: Languages, description: "Manage supported languages" },
      { name: "Currencies", href: "/system/localisation/currencies", icon: DollarSign, description: "Configure currencies and exchange rates" }
    ]
  },
  {
    title: "Status Management",
    description: "Configure various status types",
    items: [
      { name: "Stock Statuses", href: "/system/localisation/stock-statuses", icon: Package, description: "Define product stock statuses" },
      { name: "Order Statuses", href: "/system/localisation/order-statuses", icon: FileText, description: "Manage order processing statuses" }
    ]
  },
  {
    title: "Geographic Settings",
    description: "Location and region settings",
    items: [
      { name: "Countries", href: "/system/localisation/countries", icon: Globe, description: "Manage country list and settings" },
      { name: "Zones", href: "/system/localisation/zones", icon: MapPin, description: "Configure zones and regions" },
      { name: "Geo Zones", href: "/system/localisation/geo-zones", icon: Globe, description: "Set up geographical zones for shipping and taxes" }
    ]
  },
  {
    title: "Returns & Taxes",
    description: "Return policies and tax settings",
    items: [
      { name: "Tax Classes", href: "/system/localisation/taxes/classes", icon: FileText, description: "Define tax classes for products" },
      { name: "Tax Rates", href: "/system/localisation/taxes/rates", icon: DollarSign, description: "Set up tax rates by location" },
      { name: "Return Statuses", href: "/system/localisation/returns/statuses", icon: Package, description: "Configure return status options" },
      { name: "Return Actions", href: "/system/localisation/returns/actions", icon: Settings, description: "Define available return actions" },
      { name: "Return Reasons", href: "/system/localisation/returns/reasons", icon: FileText, description: "Set up return reason codes" }
    ]
  },
  {
    title: "Measurement Units",
    description: "Weight and length measurements",
    items: [
      { name: "Length Classes", href: "/system/localisation/length-classes", icon: Package, description: "Configure length measurement units" },
      { name: "Weight Classes", href: "/system/localisation/weight-classes", icon: Package, description: "Set up weight measurement units" }
    ]
  }
];

export default function LocalisationIndex() {
  return (
    <PageLayout
      title="Localisation"
      description="Configure store localisation settings including languages, currencies, and regional preferences"
    >
      <div className="grid gap-6">
        {localisationSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>{section.title}</span>
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="border-dashed hover:border-solid transition-all cursor-pointer group">
                    <CardContent className="p-4">
                      <div 
                        className="flex items-start space-x-3"
                        onClick={() => window.location.href = item.href}
                      >
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
