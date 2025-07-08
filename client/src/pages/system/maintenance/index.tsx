
import React from "react";
import { PageLayout } from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Upload, 
  AlertTriangle, 
  ArrowRight,
  Settings,
  FileText,
  HardDrive,
  Shield
} from "lucide-react";

const maintenanceSections = [
  {
    title: "Data Management",
    description: "Backup and restore system data",
    items: [
      { 
        name: "Backup & Restore", 
        href: "/system/maintenance/backup-restore", 
        icon: Database, 
        description: "Create backups and restore from previous backups",
        status: "active"
      }
    ]
  },
  {
    title: "File Management",
    description: "Manage uploaded files and system storage",
    items: [
      { 
        name: "Uploads", 
        href: "/system/maintenance/uploads", 
        icon: Upload, 
        description: "View and manage uploaded files",
        status: "active"
      }
    ]
  },
  {
    title: "System Monitoring",
    description: "Monitor system health and troubleshoot issues",
    items: [
      { 
        name: "Error Logs", 
        href: "/system/maintenance/error-logs", 
        icon: AlertTriangle, 
        description: "View and analyze system error logs",
        status: "warning"
      }
    ]
  }
];

export default function MaintenanceIndex() {
  return (
    <PageLayout
      title="System Maintenance"
      description="Manage system maintenance tasks including backups, file management, and error monitoring"
    >
      <div className="grid gap-6">
        {maintenanceSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>{section.title}</span>
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="border-dashed hover:border-solid transition-all cursor-pointer group">
                    <CardContent className="p-4">
                      <div 
                        className="flex items-start space-x-3"
                        onClick={() => window.location.href = item.href}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          item.status === 'warning' 
                            ? 'bg-yellow-100 group-hover:bg-yellow-200' 
                            : 'bg-primary/10 group-hover:bg-primary/20'
                        }`}>
                          <item.icon className={`h-4 w-4 ${
                            item.status === 'warning' ? 'text-yellow-600' : 'text-primary'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
