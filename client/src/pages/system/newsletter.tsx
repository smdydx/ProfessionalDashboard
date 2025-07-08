
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mail, Users, Send, Settings } from "lucide-react";

export default function Newsletter() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const subscribers = [
    { id: 1, email: "user1@example.com", status: "active", subscribed: "2024-01-15" },
    { id: 2, email: "user2@example.com", status: "active", subscribed: "2024-01-10" },
    { id: 3, email: "user3@example.com", status: "unsubscribed", subscribed: "2024-01-05" },
  ];

  return (
    <PageLayout
      title="Newsletter"
      description="Manage newsletter subscribers and campaigns"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <Tabs defaultValue="subscribers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribers.filter(s => s.status === 'active').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribers.filter(s => s.status === 'unsubscribed').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subscribers List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{subscriber.email}</div>
                      <div className="text-sm text-gray-500">Subscribed: {subscriber.subscribed}</div>
                    </div>
                    <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                      {subscriber.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose Newsletter</CardTitle>
              <CardDescription>Create and send newsletters to your subscribers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter email subject" />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Enter newsletter content" rows={10} />
              </div>
              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Newsletter
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Settings</CardTitle>
              <CardDescription>Configure newsletter preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-newsletter">Enable Newsletter</Label>
                <Switch id="enable-newsletter" />
              </div>
              <div>
                <Label htmlFor="from-name">From Name</Label>
                <Input id="from-name" placeholder="Your Store Name" />
              </div>
              <div>
                <Label htmlFor="from-email">From Email</Label>
                <Input id="from-email" placeholder="newsletter@yourstore.com" />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
