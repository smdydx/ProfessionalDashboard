import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentActivity() {
  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-center justify-center">
          <p className="text-slate-500">No results!</p>
        </div>
      </CardContent>
    </Card>
  );
}