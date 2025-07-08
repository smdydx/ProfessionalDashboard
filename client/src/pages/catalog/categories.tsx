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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Folder, Image } from "lucide-react";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  sortOrder: z.number().min(0, "Sort order must be positive"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function Categories() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock data for categories
  const mockCategories = [
    { id: 1, name: "Electronics", description: "Electronic items", parentId: null, status: "active", sortOrder: 1, productsCount: 45 },
    { id: 2, name: "Smartphones", description: "Mobile phones", parentId: 1, status: "active", sortOrder: 1, productsCount: 23 },
    { id: 3, name: "Laptops", description: "Laptop computers", parentId: 1, status: "active", sortOrder: 2, productsCount: 12 },
    { id: 4, name: "Clothing", description: "Fashion items", parentId: null, status: "active", sortOrder: 2, productsCount: 67 },
    { id: 5, name: "Men's Wear", description: "Men's clothing", parentId: 4, status: "active", sortOrder: 1, productsCount: 34 },
    { id: 6, name: "Women's Wear", description: "Women's clothing", parentId: 4, status: "active", sortOrder: 2, productsCount: 33 },
  ];

  const { data: categories = mockCategories, isLoading = false } = useQuery({
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
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormData) => {
      // Mock API call
      return Promise.resolve({ id: Date.now(), ...data });
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
    mutationFn: ({ id, data }: { id: number; data: CategoryFormData }) => {
      // Mock API call
      return Promise.resolve({ id, ...data });
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
      // Mock API call
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete category", variant: "destructive" });
    },
  });

  const filteredCategories = categories?.filter((category: any) =>
    category.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getParentCategoryName = (parentId: number | null) => {
    if (!parentId) return "-";
    const parent = categories.find(cat => cat.id === parentId);
    return parent?.name || "-";
  };

  const columns = [
    {
      key: "image",
      header: "Image",
      render: () => (
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <Image className="w-6 h-6 text-gray-400" />
        </div>
      ),
    },
    { key: "name", header: "Category Name" },
    { key: "description", header: "Description" },
    {
      key: "parentId",
      header: "Parent Category",
      render: (value: number | null) => getParentCategoryName(value),
    },
    {
      key: "productsCount",
      header: "Products",
      render: (value: number) => <Badge variant="outline">{value}</Badge>,
    },
    { key: "sortOrder", header: "Sort Order" },
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
      name: category.name || "",
      description: category.description || "",
      parentId: category.parentId?.toString() || "",
      status: category.status || "active",
      sortOrder: category.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (category: any) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(category.id);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Categories"
      description="Manage product categories"
      onAdd={handleAdd}
      addButtonText="Add Category"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredCategories}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5" />
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <SelectItem value="">None (Root Category)</SelectItem>
                        {categories?.filter(cat => cat.parentId === null).map((category: any) => (
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sortOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
                      <Textarea placeholder="Enter category description" {...field} />
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