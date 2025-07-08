import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Layout, Eye, Edit2, Trash2 } from "lucide-react";

const layoutSchema = z.object({
  name: z.string().min(1, "Layout name is required"),
  description: z.string().optional(),
  type: z.enum(["header", "footer", "sidebar", "content", "full"]),
  status: z.enum(["active", "inactive"]),
  position: z.string().min(1, "Position is required"),
});

type LayoutFormData = z.infer<typeof layoutSchema>;

// Mock layouts data
const mockLayouts = [
  {
    id: 1,
    name: "Default Header Layout",
    description: "Standard header with logo and navigation",
    type: "header",
    status: "active",
    position: "top",
    lastModified: "2024-01-15"
  },
  {
    id: 2,
    name: "Product Grid Layout",
    description: "Grid layout for product listings",
    type: "content",
    status: "active",
    position: "center",
    lastModified: "2024-01-10"
  },
  {
    id: 3,
    name: "Footer Contact Layout",
    description: "Footer with contact information and links",
    type: "footer",
    status: "active",
    position: "bottom",
    lastModified: "2024-01-08"
  },
  {
    id: 4,
    name: "Sidebar Navigation",
    description: "Left sidebar with category navigation",
    type: "sidebar",
    status: "inactive",
    position: "left",
    lastModified: "2024-01-05"
  },
];

export default function Layouts() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLayout, setEditingLayout] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: layouts = mockLayouts, isLoading = false } = useQuery({
    queryKey: ["/api/layouts"],
    queryFn: () => Promise.resolve(mockLayouts),
  });

  const form = useForm<LayoutFormData>({
    resolver: zodResolver(layoutSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "content",
      status: "active",
      position: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: LayoutFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/layouts"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Layout created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create layout", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: LayoutFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/layouts"] });
      setIsDialogOpen(false);
      setEditingLayout(null);
      form.reset();
      toast({ title: "Layout updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update layout", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/layouts"] });
      toast({ title: "Layout deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete layout", variant: "destructive" });
    },
  });

  const filteredLayouts = layouts?.filter((layout: any) =>
    layout.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    layout.type?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getStatusVariant = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "header": return "default";
      case "footer": return "secondary";
      case "sidebar": return "outline";
      case "content": return "default";
      default: return "outline";
    }
  };

  const columns = [
    {
      key: "name",
      header: "Layout Name",
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
        <Badge variant={getTypeVariant(value)}>{value}</Badge>
      ),
    },
    {
      key: "position",
      header: "Position",
      render: (value: string) => (
        <span className="capitalize">{value}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>{value}</Badge>
      ),
    },
    {
      key: "lastModified",
      header: "Last Modified",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
  ];

  const onSubmit = (data: LayoutFormData) => {
    if (editingLayout) {
      updateMutation.mutate({ id: editingLayout.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (layout: any) => {
    setEditingLayout(layout);
    form.reset({
      name: layout.name || "",
      description: layout.description || "",
      type: layout.type || "content",
      status: layout.status || "active",
      position: layout.position || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (layout: any) => {
    if (window.confirm("Are you sure you want to delete this layout?")) {
      deleteMutation.mutate(layout.id);
    }
  };

  const handleAdd = () => {
    setEditingLayout(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Layouts"
      description="Manage store layouts and templates"
      onAdd={handleAdd}
      addButtonText="Add Layout"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredLayouts}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              {editingLayout ? "Edit Layout" : "Add New Layout"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Layout Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter layout name" {...field} />
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
                          <SelectItem value="header">Header</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
                          <SelectItem value="sidebar">Sidebar</SelectItem>
                          <SelectItem value="content">Content</SelectItem>
                          <SelectItem value="full">Full Page</SelectItem>
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., top, bottom, left, right" {...field} />
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
                      <Textarea placeholder="Enter layout description" {...field} />
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
                  {editingLayout ? "Update" : "Create"} Layout
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}