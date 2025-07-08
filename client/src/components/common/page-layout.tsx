import { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  onAdd?: () => void;
  addButtonText?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
}

export default function PageLayout({ 
  children, 
  title, 
  description, 
  onAdd, 
  addButtonText = "Add", 
  searchValue, 
  onSearchChange, 
  isLoading 
}: PageLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar isOpen={true} onClose={() => {}} />
        <SidebarInset className="flex-1">
          <Header />
          <main className="flex-1 p-6">
            {title && (
              <div className="mb-6">
                <div className="flex items-center justify-between space-y-2">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    {description && (
                      <p className="text-muted-foreground">{description}</p>
                    )}
                  </div>
                  {onAdd && (
                    <Button onClick={onAdd} disabled={isLoading}>
                      <Plus className="mr-2 h-4 w-4" />
                      {addButtonText}
                    </Button>
                  )}
                </div>
                {onSearchChange && (
                  <div className="flex items-center space-x-2 mt-4">
                    <Search className="h-4 w-4" />
                    <Input 
                      placeholder="Search..." 
                      className="max-w-sm" 
                      value={searchValue}
                      onChange={(e) => onSearchChange(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}