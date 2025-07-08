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
    <div className="grid-ecom-stats">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const ChangeIcon = card.changeType === "positive" ? ArrowUp : ArrowDown;
        const changeColor = card.changeType === "positive" ? "text-green-600" : card.changeType === "negative" ? "text-red-600" : "text-amber-600";
        
        return (
          <Card 
            key={card.title} 
            className="ecom-card-gradient hover-float animate-bounce-in" 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="padding-ecom-compact">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-ecom-caption text-slate-600 dark:text-slate-400">{card.title}</p>
                  <p className="text-ecom-heading text-slate-800 dark:text-slate-100 mt-2">{card.value}</p>
                  <div className={`flex items-center text-sm mt-3 ${changeColor} font-bold`}>
                    <ChangeIcon className="w-4 h-4 mr-2" />
                    <span className="bg-gradient-to-r from-current to-current bg-clip-text">{card.change}</span>
                  </div>
                </div>
                <div className={`
                  w-16 h-16 rounded-2xl 
                  bg-gradient-to-br ${card.bgGradient}
                  flex items-center justify-center
                  transition-all duration-500 hover:scale-110 hover:rotate-6
                  shadow-lg hover:shadow-xl
                  animate-pulse-glow
                `}>
                  <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
