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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const ChangeIcon = card.changeType === "positive" ? ArrowUp : ArrowDown;
        const changeColor = card.changeType === "positive" ? "text-green-600" : card.changeType === "negative" ? "text-red-600" : "text-gray-600";
        
        return (
          <Card key={card.title} className="glass-card">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-xs sm:text-sm font-medium text-white/70 truncate">{card.title}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{card.value}</p>
                  {card.change && (
                    <p className={`text-xs sm:text-sm flex items-center mt-1 ${changeColor}`}>
                      <ChangeIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span>{card.change}</span>
                    </p>
                  )}
                  <p className="text-xs text-white/50 mt-1 hover:text-white/80 cursor-pointer transition-colors hidden sm:block">View more...</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${card.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
