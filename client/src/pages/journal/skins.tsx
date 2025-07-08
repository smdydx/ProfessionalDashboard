
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Palette, Download, Upload } from "lucide-react";

const skinSchema = z.object({
  name: z.string().min(1, "Skin name is required"),
  description: z.string().optional(),
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
  accentColor: z.string().min(1, "Accent color is required"),
  textColor: z.string().min(1, "Text color is required"),
  backgroundColor: z.string().min(1, "Background color is required"),
  version: z.string().min(1, "Version is required"),
  author: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

type SkinFormData = z.infer<typeof skinSchema>;

const mockSkins = [
  {
    id: 1,
    name: "Default Blue",
    description: "Default blue color scheme",
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    accentColor: "#17a2b8",
    textColor: "#333333",
    backgroundColor: "#ffffff",
    version: "1.0.0",
    author: "OpenCart Team",
    status: "active"
  },
  {
    id: 2,
    name: "Dark Mode",
    description: "Dark theme for better visibility",
    primaryColor: "#bb86fc",
    secondaryColor: "#03dac6",
    accentColor: "#cf6679",
    textColor: "#ffffff",
    backgroundColor: "#121212",
    version: "1.2.0",
    author: "Theme Developer",
    status: "inactive"
  },
  {
    id: 3,
    name: "Green Nature",
    description: "Nature-inspired green theme",
    primaryColor: "#28a745",
    secondaryColor: "#20c997",
    accentColor: "#6f42c1",
    textColor: "#212529",
    backgroundColor: "#f8f9fa",
    version: "2.0.0",
    author: "Nature Themes",
    status: "inactive"
  }
];

export default function Skins() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkin, setEditingSkin] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: skins = mockSkins, isLoading = false } = useQuery({
    queryKey: ["/api/journal/skins"],
    queryFn: () => Promise.resolve(mockSkins),
  });

  const form = useForm<SkinFormData>({
    resolver: zodResolver(skinSchema),
    defaultValues: {
      name: "",
      description: "",
      primaryColor: "#007bff",
      secondaryColor: "#6c757d",
      accentColor: "#17a2b8",
      textColor: "#333333",
      backgroundColor: "#ffffff",
      version: "1.0.0",
      author: "",
      status: "inactive",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: SkinFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/skins"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Skin created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SkinFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/skins"] });
      setIsDialogOpen(false);
      setEditingSkin(null);
      form.reset();
      toast({ title: "Skin updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/skins"] });
      toast({ title: "Skin deleted successfully" });
    },
  });

  const activateMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/skins"] });
      toast({ title: "Skin activated successfully" });
    },
  });

  const filteredSkins = skins?.filter((skin: any) =>
    skin.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    skin.description?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const columns = [
    {
      key: "preview",
      header: "Preview",
      render: (value: string, item: any) => (
        <div className="flex gap-1">
          <div 
            className="w-3 h-3 rounded-full border"
            style={{ backgroundColor: item.primaryColor }}
          />
          <div 
            className="w-3 h-3 rounded-full border"
            style={{ backgroundColor: item.secondaryColor }}
          />
          <div 
            className="w-3 h-3 rounded-full border"
            style={{ backgroundColor: item.accentColor }}
          />
        </div>
      ),
    },
    {
      key: "name",
      header: "Skin Name",
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
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={value === "active" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
  ];

  const onSubmit = (data: SkinFormData) => {
    if (editingSkin) {
      updateMutation.mutate({ id: editingSkin.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (skin: any) => {
    setEditingSkin(skin);
    form.reset(skin);
    setIsDialogOpen(true);
  };

  const handleDelete = (skin: any) => {
    if (skin.status === "active") {
      toast({ title: "Cannot delete active skin", variant: "destructive" });
      return;
    }
    if (window.confirm("Are you sure you want to delete this skin?")) {
      deleteMutation.mutate(skin.id);
    }
  };

  const handleActivate = (skin: any) => {
    if (window.confirm(`Are you sure you want to activate "${skin.name}"?`)) {
      activateMutation.mutate(skin.id);
    }
  };

  const handleAdd = () => {
    setEditingSkin(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Skins"
      description="Manage color schemes and visual themes"
      onAdd={handleAdd}
      addButtonText="Create Skin"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredSkins}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSkins.filter((skin: any) => skin.status === "inactive").map((skin: any) => (
          <Card key={skin.id} className="relative">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="flex gap-1">
                  <div 
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: skin.primaryColor }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: skin.secondaryColor }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: skin.accentColor }}
                  />
                </div>
                {skin.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{skin.description}</p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleActivate(skin)}
                  className="flex-1"
                >
                  Activate
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEdit(skin)}
                >
                  Edit
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
              <Palette className="w-5 h-5" />
              {editingSkin ? "Edit Skin" : "Create New Skin"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skin Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dark Modern" {...field} />
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
                      <Textarea placeholder="Description of the skin" {...field} />
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

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="accentColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accent Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="textColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        <Input placeholder="Theme Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
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

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSkin ? "Update" : "Create"} Skin
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
