
import { PageLayout } from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function BlogSettings() {
  return (
    <PageLayout title="Blog Settings" description="Configure your blog settings">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure basic blog settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blog-title">Blog Title</Label>
                <Input id="blog-title" placeholder="Enter blog title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="posts-per-page">Posts Per Page</Label>
                <Input id="posts-per-page" type="number" defaultValue="10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-description">Blog Description</Label>
              <Textarea id="blog-description" placeholder="Enter blog description" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="enable-comments" />
              <Label htmlFor="enable-comments">Enable Comments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="enable-rss" />
              <Label htmlFor="enable-rss">Enable RSS Feed</Label>
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
