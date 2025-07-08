import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageLayout({ children, title, subtitle, actions }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {(title || subtitle || actions) && (
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    {title && (
                      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                    )}
                    {subtitle && (
                      <p className="text-muted-foreground">{subtitle}</p>
                    )}
                  </div>
                  {actions && (
                    <div className="flex gap-2">{actions}</div>
                  )}
                </div>
              </div>
            )}
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}