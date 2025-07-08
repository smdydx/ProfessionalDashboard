
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
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Package, Star, DollarSign, Eye, TrendingUp, AlertCircle } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  model: z.string().min(1, "Model is required"),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().min(0, "Quantity must be positive"),
  status: z.enum(["enabled", "disabled"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

const mockProducts = [
  {
    id: 1,
    name: "MacBook Pro M2",
    model: "MBP-M2-13",
    price: 129999,
    quantity: 25,
    status: "enabled",
    category: "Electronics",
    sku: "MBP-001",
    description: "Latest MacBook Pro with M2 chip",
    rating: 4.8,
    sales: 156
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    model: "IP14-PRO-128",
    price: 99999,
    quantity: 45,
    status: "enabled",
    category: "Electronics",
    sku: "IP14-001",
    description: "iPhone 14 Pro with 128GB storage",
    rating: 4.9,
    sales: 234
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    model: "SGS23-256",
    price: 79999,
    quantity: 30,
    status: "enabled",
    category: "Electronics",
    sku: "SGS23-001",
    description: "Samsung Galaxy S23 with 256GB storage",
    rating: 4.7,
    sales: 178
  },
  {
    id: 4,
    name: "Dell XPS 13",
    model: "XPS13-I7-16GB",
    price: 89999,
    quantity: 15,
    status: "disabled",
    category: "Electronics",
    sku: "XPS13-001",
    description: "Dell XPS 13 with Intel i7 and 16GB RAM",
    rating: 4.6,
    sales: 89
  },
  {
    id: 5,
    name: "AirPods Pro",
    model: "APP-GEN2",
    price: 24999,
    quantity: 60,
    status: "enabled",
    category: "Electronics",
    sku: "APP-001",
    description: "AirPods Pro 2nd Generation",
    rating: 4.8,
    sales: 312
  },
];

export default function Products() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock query for products
  const { data: products = mockProducts, isLoading } = useQuery({
    queryKey: ["/api/products"],
    queryFn: () => Promise.resolve(mockProducts),
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      model: "",
      price: 0,
      quantity: 0,
      status: "enabled",
      category: "",
      description: "",
      sku: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) => {
      // Mock API call
      return Promise.resolve({ ...data, id: Date.now() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Product created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create product", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProductFormData> }) => {
      // Mock API call
      return Promise.resolve({ ...data, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setIsDialogOpen(false);
      setEditingProduct(null);
      form.reset();
      toast({ title: "Product updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      // Mock API call
      return Promise.resolve(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    },
  });

  const columns = [
    {
      key: "name",
      header: "Product Name",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{item.model}</p>
          </div>
        </div>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      render: (value: string) => (
        <code className="px-2 py-1 bg-gray-100 rounded text-sm">{value}</code>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold">₹{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "quantity",
      header: "Stock",
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <span className={`font-medium ${value > 20 ? 'text-green-600' : value > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
            {value}
          </span>
          {value <= 5 && <AlertCircle className="w-4 h-4 text-red-500" />}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={value === "enabled" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
  ];

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      model: product.model,
      price: product.price,
      quantity: product.quantity,
      status: product.status,
      category: product.category,
      description: product.description || "",
      sku: product.sku,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (product: any) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(product.id);
    }
  };

  const handleView = (product: any) => {
    setSelectedProduct(product);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const stats = [
    { label: "Total Products", value: products.length, variant: "default" as const },
    { label: "Active Products", value: products.filter(p => p.status === "enabled").length, variant: "default" as const },
    { label: "Low Stock", value: products.filter(p => p.quantity <= 5).length, variant: "destructive" as const },
    { label: "Total Revenue", value: `₹${products.reduce((sum, p) => sum + (p.price * p.sales), 0).toLocaleString()}`, variant: "default" as const },
  ];

  return (
    <PageLayout
      title="Products"
      description="Manage your product catalog and inventory"
      onAdd={handleAdd}
      addButtonText="Add Product"
      breadcrumb={[
        { label: "Catalog", href: "/catalog" },
        { label: "Products" },
      ]}
      stats={stats}
    >
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Product Management
          </CardTitle>
          <CardDescription>
            Manage your products, inventory, and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={products}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            isLoading={isLoading}
            searchKey="name"
            title="Products"
          />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {editingProduct ? "Edit Product" : "Add New Product"}
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
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter model" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter SKU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                          <SelectItem value="Home">Home</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₹)</FormLabel>
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
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
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
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                        rows={3}
                      />
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
                  {editingProduct ? "Update" : "Create"} Product
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Product Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Product Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                  <p className="text-gray-600">{selectedProduct.model}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">SKU</p>
                  <p className="font-medium">{selectedProduct.sku}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <Badge variant="secondary">{selectedProduct.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold text-green-600">₹{selectedProduct.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="font-medium">{selectedProduct.quantity} units</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge variant={selectedProduct.status === "enabled" ? "default" : "secondary"}>
                    {selectedProduct.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sales</p>
                  <p className="font-medium">{selectedProduct.sales} sold</p>
                </div>
              </div>

              {selectedProduct.description && (
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{selectedProduct.description}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setSelectedProduct(null);
                  handleEdit(selectedProduct);
                }}>
                  Edit Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}
