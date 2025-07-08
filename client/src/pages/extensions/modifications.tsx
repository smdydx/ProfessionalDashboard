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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Settings, Code, Upload, Download, Play, Pause, AlertTriangle, CheckCircle, FileText, Wrench } from "lucide-react";

const modificationSchema = z.object({
  name: z.string().min(1, "Modification name is required"),
  description: z.string().optional(),
  version: z.string().min(1, "Version is required"),
  author: z.string().min(1, "Author is required"),
  type: z.enum(["vqmod", "ocmod", "file_replacement", "sql_patch"]),
  status: z.enum(["enabled", "disabled", "error"]),
  priority: z.number().min(0).max(100).default(50),
  files: z.array(z.string()).optional(),
});

type ModificationFormData = z.infer<typeof modificationSchema>;

// Mock modifications data
const mockModifications = [
  {
    id: 1,
    name: "Enhanced Product Options",
    description: "Adds advanced product option features with conditional logic",
    version: "2.1.0",
    author: "ModDev Studio",
    type: "ocmod",
    status: "enabled",
    priority: 90,
    installDate: "2024-01-10",
    lastModified: "2024-01-15",
    files: ["catalog/model/product.php", "admin/controller/product.php"],
    conflicts: [],
    dependencies: ["product_extras"],
    fileCount: 8,
    backupAvailable: true
  },
  {
    id: 2,
    name: "Custom Checkout Process",
    description: "Streamlined one-page checkout with guest checkout option",
    version: "1.5.2",
    author: "CheckoutPro",
    type: "vqmod",
    status: "enabled",
    priority: 80,
    installDate: "2024-01-08",
    lastModified: "2024-01-12",
    files: ["catalog/controller/checkout.php", "catalog/view/checkout.twig"],
    conflicts: [],
    dependencies: [],
    fileCount: 12,
    backupAvailable: true
  },
  {
    id: 3,
    name: "Database Optimization Patch",
    description: "SQL queries optimization for better performance",
    version: "1.0.0",
    author: "Performance Team",
    type: "sql_patch",
    status: "disabled",
    priority: 70,
    installDate: "2024-01-05",
    lastModified: "2024-01-06",
    files: ["install/database.sql"],
    conflicts: ["advanced_cache"],
    dependencies: [],
    fileCount: 1,
    backupAvailable: false
  },
  {
    id: 4,
    name: "Theme Customization Pack",
    description: "Additional theme options and customization tools",
    version: "3.0.1",
    author: "ThemeDesign Co",
    type: "file_replacement",
    status: "error",
    priority: 60,
    installDate: "2024-01-03",
    lastModified: "2024-01-04",
    files: ["catalog/view/theme/default/", "admin/view/theme/default/"],
    conflicts: ["theme_override"],
    dependencies: ["theme_base"],
    fileCount: 25,
    backupAvailable: true
  },
];

export default function Modifications() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModification, setEditingModification] = useState<any>(null);
  const [selectedMod, setSelectedMod] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: modifications = mockModifications, isLoading = false } = useQuery({
    queryKey: ["/api/modifications"],
    queryFn: () => Promise.resolve(mockModifications),
  });

  const form = useForm<ModificationFormData>({
    resolver: zodResolver(modificationSchema),
    defaultValues: {
      name: "",
      description: "",
      version: "1.0.0",
      author: "",
      type: "ocmod",
      status: "disabled",
      priority: 50,
      files: [],
    },
  });

  const installMutation = useMutation({
    mutationFn: (data: ModificationFormData) => {
      return Promise.resolve({ 
        id: Date.now(),
        ...data,
        installDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        fileCount: 0,
        backupAvailable: false,
        conflicts: [],
        dependencies: []
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/modifications"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Modification installed successfully" });
    },
    onError: () => {
      toast({ title: "Failed to install modification", variant: "destructive" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return Promise.resolve({ id, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/modifications"] });
      toast({ title: "Modification status updated" });
    },
    onError: () => {
      toast({ title: "Failed to update modification", variant: "destructive" });
    },
  });

  const uninstallMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/modifications"] });
      toast({ title: "Modification uninstalled successfully" });
    },
    onError: () => {
      toast({ title: "Failed to uninstall modification", variant: "destructive" });
    },
  });

  const filteredModifications = modifications?.filter((mod: any) =>
    mod.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    mod.author?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "enabled": return "default";
      case "disabled": return "secondary";
      case "error": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "enabled": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "disabled": return <Pause className="w-4 h-4 text-gray-500" />;
      case "error": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ocmod": return <Code className="w-4 h-4" />;
      case "vqmod": return <FileText className="w-4 h-4" />;
      case "file_replacement": return <Upload className="w-4 h-4" />;
      case "sql_patch": return <Wrench className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const columns = [
    {
      key: "name",
      header: "Modification",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-3">
          {getTypeIcon(item.type)}
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">
              v{item.version} by {item.author}
            </div>
          </div>
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
      key: "type",
      header: "Type",
      render: (value: string) => (
        <Badge variant="outline" className="capitalize">
          {value.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          <Badge variant={getStatusVariant(value)}>{value}</Badge>
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (value: number) => (
        <div className="text-center">
          <div className="text-sm font-medium">{value}</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full" 
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "fileCount",
      header: "Files",
      render: (value: number) => (
        <span className="text-sm">{value} files</span>
      ),
    },
    {
      key: "installDate",
      header: "Installed",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
  ];

  const handleToggle = (mod: any) => {
    const newStatus = mod.status === "enabled" ? "disabled" : "enabled";
    toggleMutation.mutate({ id: mod.id, status: newStatus });
  };

  const handleUninstall = (mod: any) => {
    if (window.confirm(`Are you sure you want to uninstall "${mod.name}"? This action cannot be undone.`)) {
      uninstallMutation.mutate(mod.id);
    }
  };

  const handleViewDetails = (mod: any) => {
    setSelectedMod(mod);
  };

  const onSubmit = (data: ModificationFormData) => {
    installMutation.mutate(data);
  };

  return (
    <PageLayout
      title="Modifications"
      description="Manage OpenCart modifications and extensions"
      onAdd={() => setIsDialogOpen(true)}
      addButtonText="Install Modification"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-lg font-semibold">
                    {modifications.filter(m => m.status === 'enabled').length}
                  </div>
                  <div className="text-sm text-gray-600">Enabled</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Pause className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-lg font-semibold">
                    {modifications.filter(m => m.status === 'disabled').length}
                  </div>
                  <div className="text-sm text-gray-600">Disabled</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <div className="text-lg font-semibold">
                    {modifications.filter(m => m.status === 'error').length}
                  </div>
                  <div className="text-sm text-gray-600">Errors</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-lg font-semibold">
                    {modifications.reduce((sum, m) => sum + m.fileCount, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Files</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="installed" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="installed">Installed</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="installed">
            <DataTable
              data={filteredModifications}
              columns={columns}
              onView={handleViewDetails}
              isLoading={isLoading}
            />

            {/* Quick Actions */}
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredModifications.map((mod) => (
                  <Card key={mod.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{mod.name}</CardTitle>
                        {getStatusIcon(mod.status)}
                      </div>
                      <CardDescription className="text-sm">
                        {mod.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={mod.status === "enabled" ? "outline" : "default"}
                          onClick={() => handleToggle(mod)}
                          disabled={mod.status === "error"}
                        >
                          {mod.status === "enabled" ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUninstall(mod)}
                        >
                          Uninstall
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="text-center py-12">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Available Modifications</h3>
              <p className="text-gray-600 mb-4">Browse the OpenCart marketplace for new modifications</p>
              <Button>Browse Marketplace</Button>
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Modification Logs</CardTitle>
                <CardDescription>
                  Recent modification installation and error logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="text-sm font-medium">Enhanced Product Options</div>
                    <div className="text-xs text-gray-500">Installed successfully - 2024-01-15 10:30:00</div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="text-sm font-medium">Custom Checkout Process</div>
                    <div className="text-xs text-gray-500">Enabled - 2024-01-12 14:20:00</div>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-sm font-medium">Theme Customization Pack</div>
                    <div className="text-xs text-gray-500">Error: File conflict detected - 2024-01-04 09:15:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Installation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Install Modification
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modification Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter modification name" {...field} />
                    </FormControl>
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
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        <SelectItem value="ocmod">OCMOD</SelectItem>
                        <SelectItem value="vqmod">VQMOD</SelectItem>
                        <SelectItem value="file_replacement">File Replacement</SelectItem>
                        <SelectItem value="sql_patch">SQL Patch</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority (0-100)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        placeholder="50" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 50)}
                      />
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
                      <Textarea placeholder="Enter modification description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <label className="block text-sm font-medium mb-2">Modification File</label>
                <Input type="file" accept=".zip,.xml,.ocmod" />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={installMutation.isPending}>
                  Install Modification
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}