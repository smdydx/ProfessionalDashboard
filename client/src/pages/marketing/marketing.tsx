import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Mail, Percent, Gift, TrendingUp, Users, Target, Calendar } from "lucide-react";
import { format } from "date-fns";

const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  description: z.string().optional(),
  type: z.enum(["email", "discount", "promotion", "social"]),
  status: z.enum(["draft", "active", "paused", "completed"]),
  discountPercent: z.number().min(0).max(100).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

// Mock campaigns data
const mockCampaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    description: "Big summer discount campaign",
    type: "discount",
    status: "active",
    discountPercent: 25,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    targetAudience: "All Customers",
    clicks: 1250,
    conversions: 89,
    revenue: 15400
  },
  {
    id: 2,
    name: "New Customer Welcome",
    description: "Welcome email series for new customers",
    type: "email",
    status: "active",
    discountPercent: 10,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    targetAudience: "New Customers",
    clicks: 3400,
    conversions: 456,
    revenue: 8900
  },
  {
    id: 3,
    name: "Holiday Promotion",
    description: "Special holiday deals and offers",
    type: "promotion",
    status: "draft",
    discountPercent: 30,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    targetAudience: "VIP Customers",
    clicks: 0,
    conversions: 0,
    revenue: 0
  },
  {
    id: 4,
    name: "Social Media Blast",
    description: "Cross-platform social media campaign",
    type: "social",
    status: "completed",
    discountPercent: 15,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    targetAudience: "Social Followers",
    clicks: 5600,
    conversions: 234,
    revenue: 12300
  },
];

const audienceData = [
  { name: "All Customers", count: 1234, percentage: 100 },
  { name: "New Customers", count: 156, percentage: 12.6 },
  { name: "VIP Customers", count: 89, percentage: 7.2 },
  { name: "Inactive Customers", count: 234, percentage: 19.0 },
];

export default function Marketing() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: campaigns = mockCampaigns, isLoading = false } = useQuery({
    queryKey: ["/api/campaigns"],
    queryFn: () => Promise.resolve(mockCampaigns),
  });

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "email",
      status: "draft",
      discountPercent: 0,
      startDate: "",
      endDate: "",
      targetAudience: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CampaignFormData) => {
      // Mock API call
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Campaign created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create campaign", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CampaignFormData }) => {
      // Mock API call
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      setIsDialogOpen(false);
      setEditingCampaign(null);
      form.reset();
      toast({ title: "Campaign updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update campaign", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      // Mock API call
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({ title: "Campaign deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete campaign", variant: "destructive" });
    },
  });

  const filteredCampaigns = campaigns?.filter((campaign: any) =>
    campaign.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    campaign.type?.toLowerCase().includes(searchValue.toLowerCase()) ||
    campaign.status?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "completed": return "secondary";
      case "paused": return "outline";
      case "draft": return "outline";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return Mail;
      case "discount": return Percent;
      case "promotion": return Gift;
      case "social": return Megaphone;
      default: return Target;
    }
  };

  const columns = [
    {
      key: "type",
      header: "Type",
      render: (value: string) => {
        const Icon = getTypeIcon(value);
        return (
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gray-400" />
            <span className="capitalize">{value}</span>
          </div>
        );
      },
    },
    { key: "name", header: "Campaign Name" },
    {
      key: "targetAudience",
      header: "Target Audience",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: "discountPercent",
      header: "Discount",
      render: (value: number) => value ? `${value}%` : "-",
    },
    {
      key: "startDate",
      header: "Start Date",
      render: (value: string) => format(new Date(value), "MMM dd, yyyy"),
    },
    {
      key: "endDate",
      header: "End Date",
      render: (value: string) => format(new Date(value), "MMM dd, yyyy"),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>
          {value}
        </Badge>
      ),
    },
    {
      key: "conversions",
      header: "Conversions",
      render: (value: number) => (
        <div className="text-center">
          <div className="font-semibold">{value}</div>
          <div className="text-xs text-gray-500">conversions</div>
        </div>
      ),
    },
    {
      key: "revenue",
      header: "Revenue",
      render: (value: number) => (
        <span className="font-semibold text-green-600">Rs.{value?.toLocaleString()}</span>
      ),
    },
  ];

  const onSubmit = (data: CampaignFormData) => {
    if (editingCampaign) {
      updateMutation.mutate({ id: editingCampaign.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (campaign: any) => {
    setEditingCampaign(campaign);
    form.reset({
      name: campaign.name || "",
      description: campaign.description || "",
      type: campaign.type || "email",
      status: campaign.status || "draft",
      discountPercent: campaign.discountPercent || 0,
      startDate: campaign.startDate || "",
      endDate: campaign.endDate || "",
      targetAudience: campaign.targetAudience || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (campaign: any) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      deleteMutation.mutate(campaign.id);
    }
  };

  const handleAdd = () => {
    setEditingCampaign(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Marketing Campaigns"
      description="Create and manage marketing campaigns"
      onAdd={handleAdd}
      addButtonText="Create Campaign"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <DataTable
            data={filteredCampaigns}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceData.map((audience, index) => (
              <Card key={audience.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {audience.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{audience.count.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{audience.percentage}% of total</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Rs.36,600</div>
                <div className="text-sm text-green-600">+15% from last month</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Total Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">779</div>
                <div className="text-sm text-green-600">+23% from last month</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7.2%</div>
                <div className="text-sm text-red-600">-0.5% from last month</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter campaign name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="discount">Discount</SelectItem>
                          <SelectItem value="promotion">Promotion</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter target audience" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter campaign description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingCampaign ? "Update" : "Create"} Campaign
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}