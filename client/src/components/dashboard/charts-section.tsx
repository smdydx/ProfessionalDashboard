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
      <Card className="border border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">World Map</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              +−
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">World Map View</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">Sales Analytics</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: "#2563eb" }}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-600">Orders</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-slate-600">Customers</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
