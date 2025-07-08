import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Home, Plus, Settings, RefreshCw } from "lucide-react";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onAdd?: () => void;
  addButtonText?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  stats?: Array<{ label: string; value: string | number; variant?: "default" | "secondary" | "destructive" }>;
}

export default function PageLayout({
  title,
  description,
  children,
  actions,
  stats = [],
  breadcrumb = [],
}: PageLayoutProps) {
  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      <div className="space-y-3 sm:space-y-4">
        {/* Breadcrumbs */}
        {breadcrumb.length > 0 && (
          <div className="overflow-x-auto">
            <Breadcrumb>
              <BreadcrumbList className="flex-nowrap">
                {breadcrumb.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="whitespace-nowrap">
                      {item.href ? (
                        <BreadcrumbLink href={item.href} className="text-xs sm:text-sm">
                          {item.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-xs sm:text-sm">
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}

        {/* Page Header */}
        <div className="header-responsive flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground truncate">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground mt-1 text-sm sm:text-base line-clamp-2">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {actions}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {stats.length > 0 && (
          <div className="dashboard-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="card-responsive bg-card shadow-sm border-border hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                        {stat.label}
                      </p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <Badge variant={stat.variant || "default"} className="ml-2 shrink-0">
                      {stat.variant === "destructive" ? "Low" : "Active"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Separator className="my-4 sm:my-6" />

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}