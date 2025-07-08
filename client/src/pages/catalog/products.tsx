
import React, { useState } from "react";
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Eye, Copy, Package, DollarSign, Archive, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  rating: number;
  description: string;
  image: string;
  weight: number;
  dimensions: string;
  tags: string[];
  discount: number;
  featured: boolean;
  dateAdded: string;
  lastModified: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Smartphone",
    sku: "PSM-001",
    category: "Electronics",
    price: 899.99,
    stock: 25,
    status: "active",
    rating: 4.5,
    description: "Latest flagship smartphone with advanced features",
    image: "/placeholder-product.jpg",
    weight: 0.2,
    dimensions: "6.1 x 3.0 x 0.3 inches",
    tags: ["smartphone", "electronics", "mobile"],
    discount: 10,
    featured: true,
    dateAdded: "2024-01-15",
    lastModified: "2024-01-20"
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    sku: "WE-002",
    category: "Audio",
    price: 199.99,
    stock: 50,
    status: "active",
    rating: 4.2,
    description: "High-quality wireless earbuds with noise cancellation",
    image: "/placeholder-product.jpg",
    weight: 0.05,
    dimensions: "2.4 x 1.8 x 1.2 inches",
    tags: ["earbuds", "wireless", "audio"],
    discount: 0,
    featured: false,
    dateAdded: "2024-01-10",
    lastModified: "2024-01-18"
  },
  {
    id: "3",
    name: "Smart Watch",
    sku: "SW-003",
    category: "Wearables",
    price: 299.99,
    stock: 0,
    status: "out_of_stock",
    rating: 4.0,
    description: "Feature-rich smartwatch with health monitoring",
    image: "/placeholder-product.jpg",
    weight: 0.08,
    dimensions: "1.7 x 1.5 x 0.4 inches",
    tags: ["smartwatch", "wearable", "fitness"],
    discount: 15,
    featured: true,
    dateAdded: "2024-01-05",
    lastModified: "2024-01-22"
  }
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const columns = [
    {
      key: "image",
      header: "Image",
      render: (product: Product) => (
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Package className="h-6 w-6 text-gray-400" />
        </div>
      ),
    },
    {
      key: "name",
      header: "Product Name",
      render: (product: Product) => (
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-gray-500">SKU: {product.sku}</div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "price",
      header: "Price",
      render: (product: Product) => (
        <div className="text-right">
          <div className="font-medium">${product.price}</div>
          {product.discount > 0 && (
            <div className="text-sm text-green-600">-{product.discount}%</div>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (product: Product) => (
        <div className="text-center">
          <div className={`font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
            {product.stock}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (product: Product) => (
        <Badge
          variant={
            product.status === "active"
              ? "default"
              : product.status === "inactive"
              ? "secondary"
              : "destructive"
          }
        >
          {product.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (product: Product) => (
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
          <span>{product.rating}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (product: Product) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleView(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(product)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDuplicate(product)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setFormData({});
    setIsAddDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsEditDialogOpen(true);
  };

  const handleView = (product: Product) => {
    toast({
      title: "Product Details",
      description: `Viewing details for ${product.name}`,
    });
  };

  const handleDuplicate = (product: Product) => {
    const duplicated = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
    };
    setProducts([...products, duplicated]);
    toast({
      title: "Product Duplicated",
      description: `${product.name} has been duplicated successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been deleted successfully.",
    });
  };

  const handleSave = () => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...selectedProduct, ...formData, lastModified: new Date().toISOString().split('T')[0] }
          : p
      ));
      setIsEditDialogOpen(false);
      toast({
        title: "Product Updated",
        description: "Product has been updated successfully.",
      });
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || "",
        sku: formData.sku || "",
        category: formData.category || "",
        price: formData.price || 0,
        stock: formData.stock || 0,
        status: formData.status || "active",
        rating: 0,
        description: formData.description || "",
        image: "/placeholder-product.jpg",
        weight: formData.weight || 0,
        dimensions: formData.dimensions || "",
        tags: formData.tags || [],
        discount: formData.discount || 0,
        featured: formData.featured || false,
        dateAdded: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
      setIsAddDialogOpen(false);
      toast({
        title: "Product Added",
        description: "New product has been added successfully.",
      });
    }
    setFormData({});
    setSelectedProduct(null);
  };

  const stats = [
    { label: "Total Products", value: products.length, variant: "default" as const },
    { label: "Active Products", value: products.filter(p => p.status === "active").length, variant: "default" as const },
    { label: "Out of Stock", value: products.filter(p => p.status === "out_of_stock").length, variant: "destructive" as const },
    { label: "Featured Products", value: products.filter(p => p.featured).length, variant: "secondary" as const },
  ];

  const ProductForm = () => (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku || ""}
              onChange={(e) => setFormData({...formData, sku: e.target.value})}
              placeholder="Enter SKU"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Enter product description"
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category || ""}
              onValueChange={(value) => setFormData({...formData, category: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Wearables">Wearables</SelectItem>
                <SelectItem value="Computers">Computers</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || "active"}
              onValueChange={(value) => setFormData({...formData, status: value as Product["status"]})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="pricing" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price || ""}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              value={formData.discount || ""}
              onChange={(e) => setFormData({...formData, discount: parseInt(e.target.value) || 0})}
              placeholder="0"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured || false}
            onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
          />
          <Label htmlFor="featured">Featured Product</Label>
        </div>
      </TabsContent>
      
      <TabsContent value="inventory" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock || ""}
              onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              value={formData.weight || ""}
              onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value) || 0})}
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="dimensions">Dimensions</Label>
          <Input
            id="dimensions"
            value={formData.dimensions || ""}
            onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
            placeholder="L x W x H"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="seo" className="space-y-4">
        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={formData.tags?.join(", ") || ""}
            onChange={(e) => setFormData({...formData, tags: e.target.value.split(", ").filter(tag => tag.trim())})}
            placeholder="tag1, tag2, tag3"
          />
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <PageLayout
      title="Products"
      description="Manage your product catalog, inventory, and pricing"
      breadcrumb={[
        { label: "Catalog", href: "/catalog" },
        { label: "Products" }
      ]}
      onAdd={handleAdd}
      addButtonText="Add Product"
      stats={stats}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Management
          </CardTitle>
          <CardDescription>
            Comprehensive product management with advanced filtering and bulk operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={products}
            columns={columns}
            searchPlaceholder="Search products by name, SKU, or category..."
            exportFilename="products"
            filterOptions={[
              {
                key: "category",
                label: "Category",
                options: ["Electronics", "Audio", "Wearables", "Computers", "Accessories"]
              },
              {
                key: "status",
                label: "Status", 
                options: ["active", "inactive", "out_of_stock"]
              }
            ]}
          />
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product with detailed information and specifications
            </DialogDescription>
          </DialogHeader>
          <ProductForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information and specifications
            </DialogDescription>
          </DialogHeader>
          <ProductForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
