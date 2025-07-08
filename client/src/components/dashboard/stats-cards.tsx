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
      change: "+12%",
      changeType: "positive" as const,
      icon: ShoppingCart,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Total Sales",
      value: `Rs.${stats?.totalRevenue?.toLocaleString() || "52.6K"}`,
      change: "+8%",
      changeType: "positive" as const,
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Total Customers",
      value: stats?.totalUsers || 351,
      change: "+15%",
      changeType: "positive" as const,
      icon: Users,
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-500/20 to-violet-500/20",
    },
    {
      title: "People Online",
      value: 24,
      change: "+5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
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
    <div className="grid-enterprise-stats">
      {cards.map((card) => {
        const Icon = card.icon;
        const ChangeIcon = card.changeType === "positive" ? ArrowUp : ArrowDown;
        const changeColor = card.changeType === "positive" ? "text-green-600" : card.changeType === "negative" ? "text-red-600" : "text-gray-600";
        
        return (
          <Card key={card.title} className="enterprise-card-elevated">
            <CardContent className="padding-enterprise-compact">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-enterprise-caption">{card.title}</p>
                  <p className="text-enterprise-heading mt-1">{card.value}</p>
                  <div className={`flex items-center text-sm mt-2 ${changeColor} font-medium`}>
                    <ChangeIcon className="w-4 h-4 mr-1" />
                    {card.change}
                  </div>
                </div>
                <div className={`
                  w-12 h-12 rounded-lg 
                  bg-gradient-to-r ${card.bgGradient}
                  flex items-center justify-center
                  transition-all duration-200
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
