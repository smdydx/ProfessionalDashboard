
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Layout, Monitor, Smartphone, Tablet } from "lucide-react";

const layoutSchema = z.object({
  name: z.string().min(1, "Layout name is required"),
  description: z.string().optional(),
  type: z.enum(["product", "category", "page", "blog", "homepage"]),
  columns: z.enum(["1", "2", "3", "4"]),
  sidebar: z.enum(["none", "left", "right", "both"]),
  containerWidth: z.string().min(1, "Container width is required"),
  responsive: z.boolean(),
  mobileColumns: z.enum(["1", "2"]),
  tabletColumns: z.enum(["1", "2", "3"]),
  customCSS: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

type LayoutFormData = z.infer<typeof layoutSchema>;

const mockLayouts = [
  {
    id: 1,
    name: "Homepage Layout",
    description: "Main homepage layout with hero section",
    type: "homepage",
    columns: "3",
    sidebar: "none",
    containerWidth: "1200px",
    responsive: true,
    mobileColumns: "1",
    tabletColumns: "2",
    customCSS: "",
    status: "active"
  },
  {
    id: 2,
    name: "Product Grid",
    description: "Product listing with sidebar",
    type: "category",
    columns: "3",
    sidebar: "left",
    containerWidth: "1140px",
    responsive: true,
    mobileColumns: "1",
    tabletColumns: "2",
    customCSS: "",
    status: "active"
  },
  {
    id: 3,
    name: "Single Product",
    description: "Individual product page layout",
    type: "product",
    columns: "2",
    sidebar: "right",
    containerWidth: "1140px",
    responsive: true,
    mobileColumns: "1",
    tabletColumns: "1",
    customCSS: "",
    status: "active"
  }
];

export default function Layouts() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLayout, setEditingLayout] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: layouts = mockLayouts, isLoading = false } = useQuery({
    queryKey: ["/api/journal/layouts"],
    queryFn: () => Promise.resolve(mockLayouts),
  });

  const form = useForm<LayoutFormData>({
    resolver: zodResolver(layoutSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "page",
      columns: "2",
      sidebar: "none",
      containerWidth: "1140px",
      responsive: true,
      mobileColumns: "1",
      tabletColumns: "2",
      customCSS: "",
      status: "active",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: LayoutFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/layouts"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Layout created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: LayoutFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/layouts"] });
      setIsDialogOpen(false);
      setEditingLayout(null);
      form.reset();
      toast({ title: "Layout updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/layouts"] });
      toast({ title: "Layout deleted successfully" });
    },
  });

  const filteredLayouts = layouts?.filter((layout: any) =>
    layout.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    layout.type?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

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
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: "columns",
      header: "Layout",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4" />
          <span>{value} columns</span>
          {item.sidebar !== "none" && (
            <Badge variant="secondary" className="text-xs">
              {item.sidebar} sidebar
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "responsive",
      header: "Responsive",
      render: (value: boolean, item: any) => (
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <Monitor className="w-4 h-4" />
              <Tablet className="w-4 h-4" />
              <Smartphone className="w-4 h-4" />
            </>
          ) : (
            <Monitor className="w-4 h-4" />
          )}
        </div>
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

  const onSubmit = (data: LayoutFormData) => {
    if (editingLayout) {
      updateMutation.mutate({ id: editingLayout.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (layout: any) => {
    setEditingLayout(layout);
    form.reset(layout);
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
      description="Manage page layouts and responsive designs"
      onAdd={handleAdd}
      addButtonText="Create Layout"
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              {editingLayout ? "Edit Layout" : "Create New Layout"}
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
                      <Input placeholder="Homepage Layout" {...field} />
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
                      <Textarea placeholder="Layout description" {...field} />
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
                      <FormLabel>Layout Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="homepage">Homepage</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="category">Category</SelectItem>
                          <SelectItem value="page">Page</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="columns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Columns</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Column</SelectItem>
                          <SelectItem value="2">2 Columns</SelectItem>
                          <SelectItem value="3">3 Columns</SelectItem>
                          <SelectItem value="4">4 Columns</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sidebar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sidebar</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No Sidebar</SelectItem>
                          <SelectItem value="left">Left Sidebar</SelectItem>
                          <SelectItem value="right">Right Sidebar</SelectItem>
                          <SelectItem value="both">Both Sidebars</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="containerWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Container Width</FormLabel>
                      <FormControl>
                        <Input placeholder="1140px" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="mobileColumns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Columns</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Column</SelectItem>
                          <SelectItem value="2">2 Columns</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tabletColumns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tablet Columns</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Column</SelectItem>
                          <SelectItem value="2">2 Columns</SelectItem>
                          <SelectItem value="3">3 Columns</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="customCSS"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom CSS</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="/* Custom layout styles */"
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
