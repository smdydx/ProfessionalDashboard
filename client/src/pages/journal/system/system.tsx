
import { PageLayout } from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Database, Cpu, HardDrive, RefreshCw } from "lucide-react";

export default function JournalSystem() {
  return (
    <PageLayout title="Journal System" description="System information and maintenance">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Server Status</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge variant="default">Online</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Uptime: 99.9%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge variant="default">Connected</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Response: 12ms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground">
                Average load
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                Used of 100GB
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Detailed system information and configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Version:</span>
                  <span>3.0.3.8</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">PHP Version:</span>
                  <span>8.1.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Database:</span>
                  <span>MySQL 8.0.28</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Server OS:</span>
                  <span>Linux Ubuntu 20.04</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Memory Limit:</span>
                  <span>256M</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Max Execution Time:</span>
                  <span>30s</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Upload Max Size:</span>
                  <span>32M</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Session Save Path:</span>
                  <span>/tmp</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Maintenance</CardTitle>
            <CardDescription>
              Perform system maintenance tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <RefreshCw className="mr-2 h-4 w-4" />
                Clear Cache
              </Button>
              <Button variant="outline" className="justify-start">
                <Database className="mr-2 h-4 w-4" />
                Optimize Database
              </Button>
              <Button variant="outline" className="justify-start">
                <Server className="mr-2 h-4 w-4" />
                Restart Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
