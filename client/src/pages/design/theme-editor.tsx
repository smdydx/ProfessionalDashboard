import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Palette, Download, Upload, Settings, Eye } from "lucide-react";

const themeSchema = z.object({
  name: z.string().min(1, "Theme name is required"),
  description: z.string().optional(),
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
  fontFamily: z.string().min(1, "Font family is required"),
  status: z.enum(["active", "inactive"]),
  version: z.string().min(1, "Version is required"),
});

type ThemeFormData = z.infer<typeof themeSchema>;

// Mock themes data
const mockThemes = [
  {
    id: 1,
    name: "Default OpenCart Theme",
    description: "Standard OpenCart theme with modern design",
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    fontFamily: "Arial, sans-serif",
    status: "active",
    version: "1.0.0",
    author: "OpenCart Team",
    preview: "/themes/default-preview.jpg"
  },
  {
    id: 2,
    name: "Modern Blue Theme",
    description: "Clean and modern blue theme",
    primaryColor: "#2563eb",
    secondaryColor: "#64748b",
    fontFamily: "Inter, sans-serif",
    status: "inactive",
    version: "2.1.0",
    author: "Theme Developer",
    preview: "/themes/modern-blue-preview.jpg"
  },
  {
    id: 3,
    name: "Dark Professional",
    description: "Professional dark theme for modern stores",
    primaryColor: "#1f2937",
    secondaryColor: "#374151",
    fontFamily: "Roboto, sans-serif",
    status: "inactive",
    version: "1.5.0",
    author: "Pro Themes",
    preview: "/themes/dark-professional-preview.jpg"
  },
];

export default function ThemeEditor() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: themes = mockThemes, isLoading = false } = useQuery({
    queryKey: ["/api/themes"],
    queryFn: () => Promise.resolve(mockThemes),
  });

  const form = useForm<ThemeFormData>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      name: "",
      description: "",
      primaryColor: "#007bff",
      secondaryColor: "#6c757d",
      fontFamily: "Arial, sans-serif",
      status: "inactive",
      version: "1.0.0",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ThemeFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/themes"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Theme created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create theme", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ThemeFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/themes"] });
      setIsDialogOpen(false);
      setEditingTheme(null);
      form.reset();
      toast({ title: "Theme updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update theme", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/themes"] });
      toast({ title: "Theme deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete theme", variant: "destructive" });
    },
  });

  const activateMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/themes"] });
      toast({ title: "Theme activated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to activate theme", variant: "destructive" });
    },
  });

  const filteredThemes = themes?.filter((theme: any) =>
    theme.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    theme.description?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getStatusVariant = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  const columns = [
    {
      key: "preview",
      header: "Preview",
      render: (value: string, item: any) => (
        <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Palette className="w-6 h-6 text-white" />
        </div>
      ),
    },
    {
      key: "name",
      header: "Theme Name",
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">v{item.version} by {item.author}</div>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (value: string) => (
        <div className="max-w-xs truncate">{value}</div>
      ),
    },
    {
      key: "primaryColor",
      header: "Colors",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: value }}
          />
          <div 
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: item.secondaryColor }}
          />
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>{value}</Badge>
      ),
    },
  ];

  const onSubmit = (data: ThemeFormData) => {
    if (editingTheme) {
      updateMutation.mutate({ id: editingTheme.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (theme: any) => {
    setEditingTheme(theme);
    form.reset({
      name: theme.name || "",
      description: theme.description || "",
      primaryColor: theme.primaryColor || "#007bff",
      secondaryColor: theme.secondaryColor || "#6c757d",
      fontFamily: theme.fontFamily || "Arial, sans-serif",
      status: theme.status || "inactive",
      version: theme.version || "1.0.0",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (theme: any) => {
    if (theme.status === "active") {
      toast({ title: "Cannot delete active theme", variant: "destructive" });
      return;
    }
    if (window.confirm("Are you sure you want to delete this theme?")) {
      deleteMutation.mutate(theme.id);
    }
  };

  const handleActivate = (theme: any) => {
    if (window.confirm(`Are you sure you want to activate "${theme.name}"?`)) {
      activateMutation.mutate(theme.id);
    }
  };

  const handleAdd = () => {
    setEditingTheme(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Theme Editor"
      description="Manage and customize store themes"
      onAdd={handleAdd}
      addButtonText="Create Theme"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <Tabs defaultValue="themes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="store">Theme Store</TabsTrigger>
        </TabsList>

        <TabsContent value="themes">
          <DataTable
            data={filteredThemes}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredThemes.filter((theme: any) => theme.status === "inactive").map((theme: any) => (
              <Card key={theme.id} className="relative">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <span className="text-sm text-gray-600">{theme.primaryColor}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleActivate(theme)}
                      className="flex-1"
                    >
                      Activate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(theme)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customize">
          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
              <CardDescription>Customize the active theme colors and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <input type="color" defaultValue="#007bff" className="w-full h-10 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Color</label>
                  <input type="color" defaultValue="#6c757d" className="w-full h-10 border rounded" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store">
          <div className="text-center py-12">
            <Download className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Theme Store</h3>
            <p className="text-gray-600 mb-4">Browse and download themes from our marketplace</p>
            <Button>Browse Themes</Button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              {editingTheme ? "Edit Theme" : "Create New Theme"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter theme name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fontFamily"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Family</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                        <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                        <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                        <SelectItem value="Open Sans, sans-serif">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
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
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Textarea placeholder="Enter theme description" {...field} />
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
                  {editingTheme ? "Update" : "Create"} Theme
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}