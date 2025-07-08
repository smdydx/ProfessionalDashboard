import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import StatsCards from "@/components/dashboard/stats-cards";
import ChartsSection from "@/components/dashboard/charts-section";
import DataTable from "@/components/dashboard/data-table";
import OrdersStatus from "@/components/dashboard/orders-status";
import RecentActivity from "@/components/dashboard/recent-activity";


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="lg:ml-64">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
            <div className="xl:col-span-3">
              <StatsCards />
            </div>
            <div className="xl:col-span-1">
              <OrdersStatus />
            </div>
          </div>
          
          <ChartsSection />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            <div className="xl:col-span-2 order-2 xl:order-1">
              <DataTable />
            </div>
            <div className="xl:col-span-1 order-1 xl:order-2">
              <RecentActivity />
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-8 py-4 border-t border-white/10 glass-card">
            <div className="text-center text-sm text-white/70">
              <span className="text-gradient">OpenCart</span> © 2009-2025 All Rights Reserved.
              <br />
              Version 3.0.3.8 - <span className="text-white/50">Advanced Professional Theme</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
