import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 19000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 25000 },
  { name: "May", revenue: 22000 },
  { name: "Jun", revenue: 30000 },
];

const activityData = [
  { name: "Active", value: 45, color: "#10b981" },
  { name: "Inactive", value: 25, color: "#f59e0b" },
  { name: "Pending", value: 30, color: "#ef4444" },
];

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card hover:glow-effect transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white">World Map</CardTitle>
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
              +−
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-white/5 rounded-lg relative overflow-hidden backdrop-blur-sm">
            {/* World Map SVG */}
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Background */}
              <rect width="1000" height="500" fill="rgba(255,255,255,0.05)" />
              
              {/* Simplified world map paths */}
              {/* North America */}
              <path d="M100 100 L200 80 L250 120 L220 180 L150 200 L100 150 Z" 
                    fill="rgba(168, 85, 247, 0.6)" 
                    className="hover:fill-purple-400 transition-colors cursor-pointer"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                <title>North America - 2,340 orders</title>
              </path>
              
              {/* Europe */}
              <path d="M450 120 L520 110 L550 140 L530 170 L480 160 L450 140 Z" 
                    fill="rgba(34, 197, 94, 0.6)" 
                    className="hover:fill-green-400 transition-colors cursor-pointer"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                <title>Europe - 1,850 orders</title>
              </path>
              
              {/* Asia */}
              <path d="M600 100 L750 90 L800 130 L780 180 L720 190 L650 170 L600 140 Z" 
                    fill="rgba(59, 130, 246, 0.6)" 
                    className="hover:fill-blue-400 transition-colors cursor-pointer"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                <title>Asia - 3,120 orders</title>
              </path>
              
              {/* South America */}
              <path d="M200 250 L280 240 L290 320 L250 380 L220 360 L200 300 Z" 
                    fill="rgba(234, 179, 8, 0.6)" 
                    className="hover:fill-yellow-400 transition-colors cursor-pointer"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                <title>South America - 890 orders</title>
              </path>
              
              {/* Africa */}
              <path d="M450 200 L520 190 L540 280 L510 350 L470 340 L450 260 Z" 
                    fill="rgba(239, 68, 68, 0.6)" 
                    className="hover:fill-red-400 transition-colors cursor-pointer"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                <title>Africa - 650 orders</title>
              </path>
              
              {/* Australia */}
              <path d="M720 300 L780 295 L790 320 L770 340 L730 335 Z" 
                    fill="rgba(168, 85, 247, 0.6)" 
                    className="hover:fill-purple-400 transition-colors cursor-pointer"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                <title>Australia - 420 orders</title>
              </path>
              
              {/* Activity dots */}
              <circle cx="150" cy="140" r="3" fill="#10b981" className="animate-pulse">
                <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="480" cy="140" r="2" fill="#3b82f6" className="animate-pulse" style={{animationDelay: '0.5s'}}>
                <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="680" cy="140" r="4" fill="#f59e0b" className="animate-pulse" style={{animationDelay: '1s'}}>
                <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="240" cy="300" r="2" fill="#ef4444" className="animate-pulse" style={{animationDelay: '1.5s'}}>
                <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-3 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-purple-500"></div>
                  <span className="text-white/80">North America</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span className="text-white/80">Europe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span className="text-white/80">Asia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-yellow-500"></div>
                  <span className="text-white/80">S. America</span>
                </div>
              </div>
            </div>
            
            {/* Stats overlay */}
            <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs text-white/80">
                <div>Total Orders: <span className="text-green-400 font-semibold">9,270</span></div>
                <div>Active Users: <span className="text-blue-400 font-semibold">1,340</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card hover:glow-effect transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white">Sales Analytics</CardTitle>
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} stroke="rgba(255,255,255,0.6)" />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: "#a855f7", strokeWidth: 2 }}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-white/70">Orders</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-white/70">Customers</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
