
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Users, FileText, Calendar } from "lucide-react";

export default function MailPage() {
  const [isLoading, setIsLoading] = useState(false);

  const campaigns = [
    { id: 1, name: "Summer Sale", subject: "50% Off Summer Collection", status: "sent", sent: "2024-01-15", recipients: 1250, opens: 850, clicks: 120 },
    { id: 2, name: "Newsletter #12", subject: "Monthly Product Updates", status: "draft", sent: null, recipients: 0, opens: 0, clicks: 0 },
    { id: 3, name: "Black Friday", subject: "Biggest Sale of the Year!", status: "scheduled", sent: "2024-01-20", recipients: 2000, opens: 0, clicks: 0 },
  ];

  const customerGroups = [
    { id: 1, name: "All Customers", count: 1250 },
    { id: 2, name: "VIP Customers", count: 85 },
    { id: 3, name: "Newsletter Subscribers", count: 950 },
    { id: 4, name: "Recent Purchasers", count: 320 },
  ];

  return (
    <PageLayout
      title="Mail"
      description="Create and manage email marketing campaigns"
      isLoading={isLoading}
    >
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="groups">Customer Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Campaign Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.recipients, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Opens</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.opens, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.clicks, 0)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns List */}
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Manage your marketing email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{campaign.name}</h3>
                        <Badge variant={
                          campaign.status === 'sent' ? 'default' : 
                          campaign.status === 'scheduled' ? 'secondary' : 
                          'outline'
                        }>
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{campaign.subject}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>Recipients: {campaign.recipients}</span>
                        <span>Opens: {campaign.opens}</span>
                        <span>Clicks: {campaign.clicks}</span>
                        {campaign.sent && <span>Sent: {campaign.sent}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {campaign.status === 'draft' && (
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose Email Campaign</CardTitle>
              <CardDescription>Create a new email marketing campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="Enter campaign name" />
                </div>
                <div>
                  <Label htmlFor="customer-group">Customer Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer group" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.name} ({group.count} customers)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email-subject">Email Subject</Label>
                <Input id="email-subject" placeholder="Enter email subject" />
              </div>
              
              <div>
                <Label htmlFor="email-content">Email Content</Label>
                <Textarea id="email-content" placeholder="Enter email content" rows={10} />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Groups</CardTitle>
              <CardDescription>Manage customer segments for targeted campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.count} customers</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
