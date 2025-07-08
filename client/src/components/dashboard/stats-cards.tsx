import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, DollarSign, ShoppingCart, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const cards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 55,
      change: "0%",
      changeType: "neutral" as const,
      icon: ShoppingCart,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Sales",
      value: `Rs.${stats?.totalRevenue?.toLocaleString() || "52.6K"}`,
      change: "0%",
      changeType: "neutral" as const,
      icon: DollarSign,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Customers",
      value: stats?.totalUsers || 351,
      change: "0%",
      changeType: "neutral" as const,
      icon: Users,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "People Online",
      value: 0,
      change: "",
      changeType: "neutral" as const,
      icon: TrendingUp,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const ChangeIcon = card.changeType === "positive" ? ArrowUp : ArrowDown;
        const changeColor = card.changeType === "positive" ? "text-green-600" : card.changeType === "negative" ? "text-red-600" : "text-gray-600";
        
        return (
          <Card key={card.title} className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                  {card.change && (
                    <p className={`text-sm flex items-center mt-1 ${changeColor}`}>
                      <ChangeIcon className="w-3 h-3 mr-1" />
                      <span>{card.change}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">View more...</p>
                </div>
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
