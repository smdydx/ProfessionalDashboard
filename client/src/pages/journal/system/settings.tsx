
import PageLayout from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function JournalSystemSettings() {
  return (
    <PageLayout title="Journal System Settings" description="Configure journal system settings">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>
              Configure journal system settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                <Input id="cache-duration" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                <Input id="max-file-size" type="number" defaultValue="10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-theme">Default Theme</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="debug-mode" />
              <Label htmlFor="debug-mode">Debug Mode</Label>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Settings</Button>
        </div>
      </div>
    </PageLayout>
  );
}
