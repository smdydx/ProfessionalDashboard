import { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar isOpen={true} onClose={() => {}} />
        <SidebarInset className="flex-1">
          <Header />
          <main className="flex-1 p-6">
            {title && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              </div>
            )}
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}