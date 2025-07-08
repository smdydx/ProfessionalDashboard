import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  Globe, 
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function SystemPage() {
  const [isLoading, setIsLoading] = useState(false);

  const systemInfo = {
    version: "4.0.2.3",
    phpVersion: "8.1.0",
    mysqlVersion: "8.0.25",
    serverSoftware: "Apache/2.4.41",
    diskSpace: "75%",
    memoryUsage: "45%"
  };

  const systemChecks = [
    { name: "PHP Version", status: "ok", message: "PHP 8.1.0" },
    { name: "MySQL Connection", status: "ok", message: "Connected to MySQL 8.0.25" },
    { name: "File Permissions", status: "warning", message: "Some files are not writable" },
    { name: "SSL Certificate", status: "ok", message: "Valid SSL certificate" },
    { name: "Memory Limit", status: "ok", message: "512M available" },
    { name: "Max Upload Size", status: "warning", message: "2M limit may be too low" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <PageLayout
      title="System"
      description="System information and server status"
      isLoading={isLoading}
    >
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">OpenCart Version</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.version}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">PHP Version</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.phpVersion}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">MySQL Version</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.mysqlVersion}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Server Software</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">{systemInfo.serverSoftware}</div>
              </CardContent>
            </Card>
          </div>

          {/* System Health Checks */}
          <Card>
            <CardHeader>
              <CardTitle>System Health Check</CardTitle>
              <CardDescription>Current system status and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(check.status)}
                      <div>
                        <div className="font-medium">{check.name}</div>
                        <div className="text-sm text-gray-500">{check.message}</div>
                      </div>
                    </div>
                    <Badge variant={check.status === 'ok' ? 'default' : check.status === 'warning' ? 'secondary' : 'destructive'}>
                      {check.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.diskSpace}</div>
                <div className="text-xs text-muted-foreground">of total space used</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.memoryUsage}</div>
                <div className="text-xs text-muted-foreground">of available memory</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.cpuUsage}</div>
                <div className="text-xs text-muted-foreground">current load</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cache Management</CardTitle>
                <CardDescription>Clear and manage system cache</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">Clear Template Cache</Button>
                <Button variant="outline" className="w-full">Clear Image Cache</Button>
                <Button variant="outline" className="w-full">Clear All Cache</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Maintenance</CardTitle>
                <CardDescription>Optimize and repair database</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">Optimize Database</Button>
                <Button variant="outline" className="w-full">Repair Tables</Button>
                <Button variant="outline" className="w-full">Check Database</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}