
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Puzzle, Settings, Eye } from "lucide-react";

const moduleSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  description: z.string().optional(),
  type: z.enum(["slider", "banner", "products", "blog", "newsletter", "social", "custom"]),
  position: z.enum(["header", "footer", "sidebar", "content", "popup"]),
  displayOrder: z.number().min(1, "Display order must be positive"),
  enabled: z.boolean(),
  responsive: z.boolean(),
  showTitle: z.boolean(),
  title: z.string().optional(),
  content: z.string().optional(),
  settings: z.string().optional(),
  customCSS: z.string().optional(),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

const mockModules = [
  {
    id: 1,
    name: "Featured Products",
    description: "Display featured products on homepage",
    type: "products",
    position: "content",
    displayOrder: 1,
    enabled: true,
    responsive: true,
    showTitle: true,
    title: "Featured Products",
    content: "",
    settings: '{"limit": 8, "showPrice": true}',
    customCSS: ""
  },
  {
    id: 2,
    name: "Hero Slider",
    description: "Main banner slider for homepage",
    type: "slider",
    position: "header",
    displayOrder: 1,
    enabled: true,
    responsive: true,
    showTitle: false,
    title: "",
    content: "",
    settings: '{"autoplay": true, "duration": 5000}',
    customCSS: ""
  },
  {
    id: 3,
    name: "Newsletter Signup",
    description: "Email newsletter subscription form",
    type: "newsletter",
    position: "footer",
    displayOrder: 2,
    enabled: true,
    responsive: true,
    showTitle: true,
    title: "Subscribe to Newsletter",
    content: "Get the latest updates and offers",
    settings: '{"showPrivacy": true}',
    customCSS: ""
  }
];

export default function Modules() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: modules = mockModules, isLoading = false } = useQuery({
    queryKey: ["/api/journal/modules"],
    queryFn: () => Promise.resolve(mockModules),
  });

  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "custom",
      position: "content",
      displayOrder: 1,
      enabled: true,
      responsive: true,
      showTitle: true,
      title: "",
      content: "",
      settings: "",
      customCSS: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ModuleFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/modules"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Module created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ModuleFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/modules"] });
      setIsDialogOpen(false);
      setEditingModule(null);
      form.reset();
      toast({ title: "Module updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/modules"] });
      toast({ title: "Module deleted successfully" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/modules"] });
      toast({ title: "Module status updated" });
    },
  });

  const filteredModules = modules?.filter((module: any) =>
    module.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    module.type?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const columns = [
    {
      key: "name",
      header: "Module Name",
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{item.description}</div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: "position",
      header: "Position",
      render: (value: string, item: any) => (
        <div>
          <Badge variant="secondary">{value}</Badge>
          <div className="text-sm text-gray-500 mt-1">Order: {item.displayOrder}</div>
        </div>
      ),
    },
    {
      key: "enabled",
      header: "Status",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Enabled" : "Disabled"}
        </Badge>
      ),
    },
  ];

  const onSubmit = (data: ModuleFormData) => {
    if (editingModule) {
      updateMutation.mutate({ id: editingModule.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (module: any) => {
    setEditingModule(module);
    form.reset(module);
    setIsDialogOpen(true);
  };

  const handleDelete = (module: any) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      deleteMutation.mutate(module.id);
    }
  };

  const handleToggle = (module: any) => {
    toggleMutation.mutate(module.id);
  };

  const handleAdd = () => {
    setEditingModule(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Modules"
      description="Manage content modules and widgets"
      onAdd={handleAdd}
      addButtonText="Create Module"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredModules}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        additionalActions={(item) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleToggle(item)}
          >
            {item.enabled ? "Disable" : "Enable"}
          </Button>
        )}
      />

      {/* Module Preview Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.filter((module: any) => module.enabled).map((module: any) => (
          <Card key={module.id} className={`relative ${!module.enabled ? 'opacity-50' : ''}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Puzzle className="w-4 h-4" />
                {module.name}
                <Badge variant="outline" className="ml-auto">
                  {module.type}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{module.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span>Position: <Badge variant="secondary">{module.position}</Badge></span>
                <span>Order: {module.displayOrder}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEdit(module)}
                  className="flex-1"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleToggle(module)}
                >
                  {module.enabled ? "Disable" : "Enable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Puzzle className="w-5 h-5" />
              {editingModule ? "Edit Module" : "Create New Module"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Featured Products" {...field} />
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
                      <Textarea placeholder="Module description" {...field} />
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
                      <FormLabel>Module Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="slider">Slider</SelectItem>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="products">Products</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="header">Header</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
                          <SelectItem value="sidebar">Sidebar</SelectItem>
                          <SelectItem value="content">Content</SelectItem>
                          <SelectItem value="popup">Popup</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="showTitle"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Show Title</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Display module title
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

                {form.watch("showTitle") && (
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Module Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Module content or HTML"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="settings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Settings (JSON)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder='{"key": "value"}'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customCSS"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom CSS</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="/* Custom module styles */"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enabled</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Module is active and visible
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

                <FormField
                  control={form.control}
                  name="responsive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Responsive</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Adapt to different screen sizes
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
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingModule ? "Update" : "Create"} Module
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
