import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Plus, FileText } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add New User",
      description: "Create a new user account with role assignment.",
      icon: UserPlus,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      action: () => console.log("Add user clicked"),
    },
    {
      title: "Add Product",
      description: "Add a new product to your inventory.",
      icon: Plus,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
      action: () => console.log("Add product clicked"),
    },
    {
      title: "Generate Report",
      description: "Create detailed analytics and sales reports.",
      icon: FileText,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      action: () => console.log("Generate report clicked"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {actions.map((action) => {
        const Icon = action.icon;
        
        return (
          <Card key={action.title} className="border border-slate-200">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${action.iconColor}`} />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 truncate">{action.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2">{action.description}</p>
              <Button
                className={`w-full ${action.buttonColor} text-white font-medium text-xs sm:text-sm h-8 sm:h-10`}
                onClick={action.action}
              >
                {action.title.includes("Add") ? "Create" : "Generate"} {action.title.split(" ").pop()}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
