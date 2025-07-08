import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersStatus() {
  const orderStatuses = [
    { label: "Orders Completed", value: "0%", count: 0 },
    { label: "Orders Processing", value: "0%", count: 0 },
    { label: "Other Statuses", value: "0%", count: 0 },
  ];

  return (
    <Card className="glass-card hover:glow-effect transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderStatuses.map((status, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-sm text-white/80">{status.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">{status.value}</span>
                <span className="text-xs text-white/60">{status.count}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}