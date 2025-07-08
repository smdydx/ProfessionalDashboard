import { useState } from "react";
import { Menu, Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  return (
    <header className="gradient-header shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="lg:hidden text-white hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>
            <p className="text-sm text-white/70">Home / Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
            <Input
              type="search"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-white/30 backdrop-blur-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:scale-105 transition-all duration-300">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-slow"></span>
          </Button>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center glow-effect">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
