
import { PageLayout } from "@/components/common/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Download, Upload, Database, HardDrive } from "lucide-react";

export default function BackupRestore() {
  return (
    <PageLayout
      title="Backup / Restore"
      subtitle="Manage database backup and restore operations"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Database Backup
            </CardTitle>
            <CardDescription>
              Create a backup of your store database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-name">Backup Name</Label>
              <Input
                id="backup-name"
                placeholder="Enter backup name..."
                defaultValue={`backup-${new Date().toISOString().split('T')[0]}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                Database Size: ~45.2 MB
              </span>
            </div>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Database Restore
            </CardTitle>
            <CardDescription>
              Restore database from backup file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restore-file">Backup File</Label>
              <Input
                id="restore-file"
                type="file"
                accept=".sql,.zip"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>⚠️ Warning: This will overwrite your current database</p>
              <p>Supported formats: .sql, .zip</p>
            </div>
            <Button variant="destructive" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Restore Database
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Recent Backups
            </CardTitle>
            <CardDescription>
              View and manage your recent database backups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "backup-2024-01-15.sql", size: "45.2 MB", date: "2024-01-15 10:30:00" },
                { name: "backup-2024-01-14.sql", size: "44.8 MB", date: "2024-01-14 10:30:00" },
                { name: "backup-2024-01-13.sql", size: "44.1 MB", date: "2024-01-13 10:30:00" },
              ].map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{backup.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {backup.size} • {backup.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
