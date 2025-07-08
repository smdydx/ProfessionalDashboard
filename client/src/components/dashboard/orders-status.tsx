import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersStatus() {
  const orderStatuses = [
    { label: "Orders Completed", value: "0%", count: 0 },
    { label: "Orders Processing", value: "0%", count: 0 },
    { label: "Other Statuses", value: "0%", count: 0 },
  ];

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderStatuses.map((status, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-slate-600">{status.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{status.value}</span>
                <span className="text-xs text-slate-500">{status.count}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}