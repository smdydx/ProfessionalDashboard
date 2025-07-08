
import React, { useState } from "react";
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Plus, FolderTree, Eye, Move } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  status: "active" | "inactive";
  sortOrder: number;
  productCount: number;
  metaTitle: string;
  metaDescription: string;
  image: string;
  isDefault: boolean;
  dateAdded: string;
  lastModified: string;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and gadgets",
    parentId: null,
    status: "active",
    sortOrder: 1,
    productCount: 45,
    metaTitle: "Electronics - Best Electronic Devices",
    metaDescription: "Shop the latest electronic devices and gadgets",
    image: "/placeholder-category.jpg",
    isDefault: false,
    dateAdded: "2024-01-01",
    lastModified: "2024-01-15"
  },
  {
    id: "2",
    name: "Smartphones",
    slug: "smartphones",
    description: "Latest smartphone models",
    parentId: "1",
    status: "active",
    sortOrder: 1,
    productCount: 25,
    metaTitle: "Smartphones - Latest Mobile Phones",
    metaDescription: "Discover the latest smartphone models",
    image: "/placeholder-category.jpg",
    isDefault: false,
    dateAdded: "2024-01-02",
    lastModified: "2024-01-16"
  },
  {
    id: "3",
    name: "Laptops",
    slug: "laptops",
    description: "High-performance laptops and notebooks",
    parentId: "1",
    status: "active",
    sortOrder: 2,
    productCount: 20,
    metaTitle: "Laptops - High Performance Computing",
    metaDescription: "Find the perfect laptop for your needs",
    image: "/placeholder-category.jpg",
    isDefault: false,
    dateAdded: "2024-01-03",
    lastModified: "2024-01-17"
  },
  {
    id: "4",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Home improvement and garden supplies",
    parentId: null,
    status: "active",
    sortOrder: 2,
    productCount: 30,
    metaTitle: "Home & Garden - Improve Your Living Space",
    metaDescription: "Everything you need for home and garden",
    image: "/placeholder-category.jpg",
    isDefault: true,
    dateAdded: "2024-01-04",
    lastModified: "2024-01-18"
  }
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({});

  const getParentName = (parentId: string | null) => {
    if (!parentId) return "Root";
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.name : "Unknown";
  };

  const getCategoryLevel = (category: Category, level = 0): number => {
    if (!category.parentId) return level;
    const parent = categories.find(c => c.id === category.parentId);
    if (!parent) return level;
    return getCategoryLevel(parent, level + 1);
  };

  const columns = [
    {
      key: "name",
      header: "Category Name",
      render: (value: any, category: Category) => {
        const level = getCategoryLevel(category);
        const indent = "  ".repeat(level);
        return (
          <div className="flex items-center">
            <span style={{ marginLeft: `${level * 20}px` }}>
              {level > 0 && "└─ "}
              <span className="font-medium">{category.name}</span>
            </span>
            {category.isDefault && (
              <Badge variant="secondary" className="ml-2 text-xs">Default</Badge>
            )}
          </div>
        );
      },
    },
    {
      key: "slug",
      header: "Slug",
      render: (value: any, category: Category) => (
        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
          {category.slug}
        </code>
      ),
    },
    {
      key: "parent",
      header: "Parent Category",
      render: (value: any, category: Category) => (
        <span className="text-sm text-gray-600">
          {getParentName(category.parentId)}
        </span>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      render: (value: any, category: Category) => (
        <div className="text-center">
          <Badge variant="outline">{category.productCount}</Badge>
        </div>
      ),
    },
    {
      key: "sortOrder",
      header: "Sort Order",
      render: (value: any, category: Category) => (
        <div className="text-center">{category.sortOrder}</div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: any, category: Category) => (
        <Badge variant={category.status === "active" ? "default" : "secondary"}>
          {category.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (value: any, category: Category) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleView(category)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(category)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAddSubcategory(category)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          {!category.isDefault && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(category.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setFormData({});
    setSelectedCategory(null);
    setIsAddDialogOpen(true);
  };

  const handleAddSubcategory = (parentCategory: Category) => {
    setFormData({ parentId: parentCategory.id });
    setSelectedCategory(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData(category);
    setIsEditDialogOpen(true);
  };

  const handleView = (category: Category) => {
    toast({
      title: "Category Details",
      description: `Viewing details for ${category.name}`,
    });
  };

  const handleDelete = (id: string) => {
    const hasChildren = categories.some(c => c.parentId === id);
    if (hasChildren) {
      toast({
        title: "Cannot Delete Category",
        description: "This category has subcategories. Please delete subcategories first.",
        variant: "destructive"
      });
      return;
    }

    setCategories(categories.filter(c => c.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been deleted successfully.",
    });
  };

  const handleSave = () => {
    if (selectedCategory) {
      // Edit existing category
      setCategories(categories.map(c => 
        c.id === selectedCategory.id 
          ? { ...selectedCategory, ...formData, lastModified: new Date().toISOString().split('T')[0] }
          : c
      ));
      setIsEditDialogOpen(false);
      toast({
        title: "Category Updated",
        description: "Category has been updated successfully.",
      });
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name || "",
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || "",
        description: formData.description || "",
        parentId: formData.parentId || null,
        status: formData.status || "active",
        sortOrder: formData.sortOrder || 1,
        productCount: 0,
        metaTitle: formData.metaTitle || "",
        metaDescription: formData.metaDescription || "",
        image: "/placeholder-category.jpg",
        isDefault: false,
        dateAdded: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
      setIsAddDialogOpen(false);
      toast({
        title: "Category Added",
        description: "New category has been added successfully.",
      });
    }
    setFormData({});
    setSelectedCategory(null);
  };

  const stats = [
    { label: "Total Categories", value: categories.length, variant: "default" as const },
    { label: "Active Categories", value: categories.filter(c => c.status === "active").length, variant: "default" as const },
    { label: "Root Categories", value: categories.filter(c => !c.parentId).length, variant: "secondary" as const },
    { label: "Total Products", value: categories.reduce((sum, c) => sum + c.productCount, 0), variant: "default" as const },
  ];

  const getAvailableParents = () => {
    if (selectedCategory) {
      // When editing, exclude self and descendants to prevent circular references
      return categories.filter(c => c.id !== selectedCategory.id && c.parentId !== selectedCategory.id);
    }
    return categories;
  };

  return (
    <PageLayout
      title="Categories"
      description="Organize your products with hierarchical categories"
      breadcrumb={[
        { label: "Catalog", href: "/catalog" },
        { label: "Categories" }
      ]}
      onAdd={handleAdd}
      addButtonText="Add Category"
      stats={stats}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5" />
            Category Management
          </CardTitle>
          <CardDescription>
            Hierarchical category structure with drag-and-drop organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={categories}
            columns={columns}
            searchPlaceholder="Search categories by name or description..."
            exportFilename="categories"
            filterOptions={[
              {
                key: "status",
                label: "Status",
                options: ["active", "inactive"]
              },
              {
                key: "parentId",
                label: "Type",
                options: [
                  { value: "null", label: "Root Categories" },
                  { value: "hasParent", label: "Subcategories" }
                ]
              }
            ]}
          />
        </CardContent>
      </Card>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category to organize your products
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="category-slug"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="parent">Parent Category</Label>
                <Select
                  value={formData.parentId || ""}
                  onValueChange={(value) => setFormData({...formData, parentId: value || null})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Root Category</SelectItem>
                    {getAvailableParents().map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status || "active"}
                  onValueChange={(value) => setFormData({...formData, status: value as Category["status"]})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder || ""}
                  onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                  placeholder="1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle || ""}
                  onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                  placeholder="SEO title"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Input
                  id="metaDescription"
                  value={formData.metaDescription || ""}
                  onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                  placeholder="SEO description"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update category information and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="category-slug"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description || ""}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-parent">Parent Category</Label>
                <Select
                  value={formData.parentId || ""}
                  onValueChange={(value) => setFormData({...formData, parentId: value || null})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Root Category</SelectItem>
                    {getAvailableParents().map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={formData.status || "active"}
                  onValueChange={(value) => setFormData({...formData, status: value as Category["status"]})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-sortOrder">Sort Order</Label>
                <Input
                  id="edit-sortOrder"
                  type="number"
                  value={formData.sortOrder || ""}
                  onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                  placeholder="1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-metaTitle">Meta Title</Label>
                <Input
                  id="edit-metaTitle"
                  value={formData.metaTitle || ""}
                  onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                  placeholder="SEO title"
                />
              </div>
              <div>
                <Label htmlFor="edit-metaDescription">Meta Description</Label>
                <Input
                  id="edit-metaDescription"
                  value={formData.metaDescription || ""}
                  onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                  placeholder="SEO description"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
