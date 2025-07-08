import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Puzzle, Download, Settings, Star, Shield } from "lucide-react";

const extensionSchema = z.object({
  name: z.string().min(1, "Extension name is required"),
  description: z.string().optional(),
  version: z.string().min(1, "Version is required"),
  enabled: z.boolean(),
});

type ExtensionFormData = z.infer<typeof extensionSchema>;

// Mock extensions data
const mockExtensions = [
  {
    id: 1,
    name: "Payment Gateway Pro",
    description: "Advanced payment gateway with multiple providers",
    version: "2.1.0",
    enabled: true,
    category: "Payment",
    rating: 4.8,
    downloads: 12500,
    price: "Free",
    author: "OpenCart Team"
  },
  {
    id: 2,
    name: "SEO Toolkit",
    description: "Complete SEO optimization tools",
    version: "1.5.2",
    enabled: true,
    category: "Marketing",
    rating: 4.6,
    downloads: 8900,
    price: "$29.99",
    author: "SEO Solutions"
  },
  {
    id: 3,
    name: "Advanced Analytics",
    description: "Detailed analytics and reporting dashboard",
    version: "3.0.1",
    enabled: false,
    category: "Analytics",
    rating: 4.9,
    downloads: 5600,
    price: "$49.99",
    author: "Analytics Pro"
  },
  {
    id: 4,
    name: "Social Media Integration",
    description: "Connect with all major social media platforms",
    version: "1.8.0",
    enabled: true,
    category: "Social",
    rating: 4.4,
    downloads: 7800,
    price: "$19.99",
    author: "Social Connect"
  },
  {
    id: 5,
    name: "Inventory Manager Plus",
    description: "Advanced inventory management features",
    version: "2.3.0",
    enabled: false,
    category: "Inventory",
    rating: 4.7,
    downloads: 4300,
    price: "$39.99",
    author: "Inventory Solutions"
  },
];

export default function Extensions() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: extensions = mockExtensions, isLoading = false } = useQuery({
    queryKey: ["/api/extensions"],
    queryFn: () => Promise.resolve(mockExtensions),
  });

  const form = useForm<ExtensionFormData>({
    resolver: zodResolver(extensionSchema),
    defaultValues: {
      name: "",
      description: "",
      version: "",
      enabled: false,
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) => {
      // Mock API call
      return Promise.resolve({ id, enabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/extensions"] });
      toast({ title: "Extension updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update extension", variant: "destructive" });
    },
  });

  const installMutation = useMutation({
    mutationFn: (data: ExtensionFormData) => {
      // Mock API call
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/extensions"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Extension installed successfully" });
    },
    onError: () => {
      toast({ title: "Failed to install extension", variant: "destructive" });
    },
  });

  const uninstallMutation = useMutation({
    mutationFn: (id: number) => {
      // Mock API call
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/extensions"] });
      toast({ title: "Extension uninstalled successfully" });
    },
    onError: () => {
      toast({ title: "Failed to uninstall extension", variant: "destructive" });
    },
  });

  const filteredExtensions = extensions?.filter((extension: any) =>
    extension.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    extension.description?.toLowerCase().includes(searchValue.toLowerCase()) ||
    extension.category?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const columns = [
    {
      key: "icon",
      header: "Icon",
      render: () => (
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Puzzle className="w-6 h-6 text-white" />
        </div>
      ),
    },
    {
      key: "name",
      header: "Extension",
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            by {item.author} • v{item.version}
          </div>
        </div>
      ),
    },
    { key: "description", header: "Description" },
    {
      key: "category",
      header: "Category",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "downloads",
      header: "Downloads",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Download className="w-4 h-4 text-gray-400" />
          <span>{value.toLocaleString()}</span>
        </div>
      ),
    },
    { key: "price", header: "Price" },
    {
      key: "enabled",
      header: "Status",
      render: (value: boolean, item: any) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={value}
            onCheckedChange={(enabled) => toggleMutation.mutate({ id: item.id, enabled })}
          />
          <Badge variant={value ? "default" : "secondary"}>
            {value ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      ),
    },
  ];

  const onSubmit = (data: ExtensionFormData) => {
    installMutation.mutate(data);
  };

  const handleUninstall = (extension: any) => {
    if (window.confirm(`Are you sure you want to uninstall ${extension.name}?`)) {
      uninstallMutation.mutate(extension.id);
    }
  };

  const handleSettings = (extension: any) => {
    setSelectedExtension(extension);
    // Open settings dialog or navigate to settings page
    toast({ title: `Opening settings for ${extension.name}` });
  };

  const handleAdd = () => {
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Extensions"
      description="Manage and install extensions to enhance your store"
      onAdd={handleAdd}
      addButtonText="Install Extension"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      {/* Extension Store Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
          <CardHeader className="text-center">
            <Puzzle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <CardTitle>Extension Store</CardTitle>
            <CardDescription>
              Browse thousands of extensions in our marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Browse Store
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
          <CardHeader className="text-center">
            <Download className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <CardTitle>Upload Extension</CardTitle>
            <CardDescription>
              Install from a ZIP file or custom package
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Upload ZIP
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <CardTitle>Developer Tools</CardTitle>
            <CardDescription>
              Create and test your own extensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Dev Center
            </Button>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={filteredExtensions}
        columns={columns}
        onEdit={handleSettings}
        onDelete={handleUninstall}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Puzzle className="w-5 h-5" />
              Install Extension
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extension Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter extension name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input placeholder="1.0.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter extension description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable After Install</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Activate extension immediately after installation
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={installMutation.isPending}>
                  Install Extension
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}