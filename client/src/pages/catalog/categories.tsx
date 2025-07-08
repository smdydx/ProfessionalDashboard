
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, Package, TrendingUp, Users } from "lucide-react";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  sortOrder: z.number().min(0, "Sort order must be positive"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and gadgets",
    parentId: null,
    status: "active",
    sortOrder: 1,
    products: 156,
    subcategories: 8,
    metaTitle: "Electronics - Best Deals",
    metaDescription: "Find the latest electronics and gadgets at best prices",
  },
  {
    id: 2,
    name: "Smartphones",
    description: "Mobile phones and accessories",
    parentId: 1,
    status: "active",
    sortOrder: 1,
    products: 45,
    subcategories: 3,
    metaTitle: "Smartphones - Latest Models",
    metaDescription: "Shop latest smartphones from top brands",
  },
  {
    id: 3,
    name: "Laptops",
    description: "Laptops and computers",
    parentId: 1,
    status: "active",
    sortOrder: 2,
    products: 32,
    subcategories: 2,
    metaTitle: "Laptops - High Performance",
    metaDescription: "Browse high-performance laptops for work and gaming",
  },
  {
    id: 4,
    name: "Clothing",
    description: "Fashion and apparel",
    parentId: null,
    status: "active",
    sortOrder: 2,
    products: 234,
    subcategories: 12,
    metaTitle: "Clothing - Fashion Store",
    metaDescription: "Latest fashion trends and clothing collections",
  },
  {
    id: 5,
    name: "Books",
    description: "Books and literature",
    parentId: null,
    status: "inactive",
    sortOrder: 3,
    products: 89,
    subcategories: 5,
    metaTitle: "Books - Online Library",
    metaDescription: "Explore vast collection of books and literature",
  },
];

export default function Categories() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = mockCategories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: () => Promise.resolve(mockCategories),
  });

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      parentId: "",
      status: "active",
      sortOrder: 1,
      metaTitle: "",
      metaDescription: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormData) => {
      return Promise.resolve({ ...data, id: Date.now() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Category created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create category", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CategoryFormData> }) => {
      return Promise.resolve({ ...data, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      setIsDialogOpen(false);
      setEditingCategory(null);
      form.reset();
      toast({ title: "Category updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update category", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete category", variant: "destructive" });
    },
  });

  const columns = [
    {
      key: "name",
      header: "Category Name",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            {item.parentId && (
              <p className="text-sm text-gray-500">
                Parent: {categories.find(c => c.id === item.parentId)?.name || "Unknown"}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (value: string) => (
        <p className="text-gray-600 max-w-xs truncate">{value || "No description"}</p>
      ),
    },
    {
      key: "products",
      header: "Products",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Package className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "subcategories",
      header: "Subcategories",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-purple-500" />
          <span className="font-medium">{value}</span>
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
    {
      key: "sortOrder",
      header: "Sort Order",
      render: (value: number) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{value}</span>
      ),
    },
  ];

  const onSubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    form.reset({
      name: category.name,
      description: category.description || "",
      parentId: category.parentId?.toString() || "",
      status: category.status,
      sortOrder: category.sortOrder,
      metaTitle: category.metaTitle || "",
      metaDescription: category.metaDescription || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (category: any) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(category.id);
    }
  };

  const handleView = (category: any) => {
    setSelectedCategory(category);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const stats = [
    { label: "Total Categories", value: categories.length },
    { label: "Active Categories", value: categories.filter(c => c.status === "active").length },
    { label: "Total Products", value: categories.reduce((sum, c) => sum + c.products, 0) },
    { label: "Subcategories", value: categories.filter(c => c.parentId).length },
  ];

  const parentCategories = categories.filter(c => !c.parentId);

  return (
    <PageLayout
      title="Categories"
      description="Manage your product categories and hierarchy"
      onAdd={handleAdd}
      addButtonText="Add Category"
      breadcrumb={[
        { label: "Catalog", href: "/catalog" },
        { label: "Categories" },
      ]}
      stats={stats}
    >
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Category Management
          </CardTitle>
          <CardDescription>
            Organize your products into categories and subcategories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={categories}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            isLoading={isLoading}
            searchKey="name"
            title="Categories"
          />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select parent category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">No Parent (Root Category)</SelectItem>
                          {parentCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
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

                <FormField
                  control={form.control}
                  name="sortOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
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
                      <Textarea
                        placeholder="Enter category description"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">SEO Settings</h3>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter meta title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter meta description"
                            {...field}
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingCategory ? "Update" : "Create"} Category
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
