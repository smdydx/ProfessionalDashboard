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
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Building2, Globe, Package, Star, TrendingUp } from "lucide-react";

const manufacturerSchema = z.object({
  name: z.string().min(1, "Manufacturer name is required"),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  logoUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().min(0).default(0),
});

type ManufacturerFormData = z.infer<typeof manufacturerSchema>;

// Mock manufacturers data
const mockManufacturers = [
  {
    id: 1,
    name: "Apple Inc.",
    description: "American multinational technology company",
    website: "https://www.apple.com",
    email: "contact@apple.com",
    phone: "+1 (408) 996-1010",
    address: "One Apple Park Way",
    city: "Cupertino",
    country: "USA",
    logoUrl: "/logos/apple.png",
    isActive: true,
    sortOrder: 1,
    productCount: 25,
    totalSales: 150000,
    rating: 4.8,
    createdAt: "2023-01-01"
  },
  {
    id: 2,
    name: "Samsung Electronics",
    description: "South Korean multinational electronics company",
    website: "https://www.samsung.com",
    email: "info@samsung.com",
    phone: "+82 2-2255-0114",
    address: "129 Samsung-ro",
    city: "Seoul",
    country: "South Korea",
    logoUrl: "/logos/samsung.png",
    isActive: true,
    sortOrder: 2,
    productCount: 42,
    totalSales: 120000,
    rating: 4.6,
    createdAt: "2023-01-15"
  },
  {
    id: 3,
    name: "Sony Corporation",
    description: "Japanese multinational conglomerate corporation",
    website: "https://www.sony.com",
    email: "support@sony.com",
    phone: "+81 3-6748-2111",
    address: "1-7-1 Konan",
    city: "Tokyo",
    country: "Japan",
    logoUrl: "/logos/sony.png",
    isActive: true,
    sortOrder: 3,
    productCount: 18,
    totalSales: 85000,
    rating: 4.4,
    createdAt: "2023-02-01"
  },
  {
    id: 4,
    name: "Microsoft Corporation",
    description: "American multinational technology corporation",
    website: "https://www.microsoft.com",
    email: "info@microsoft.com",
    phone: "+1 (425) 882-8080",
    address: "One Microsoft Way",
    city: "Redmond",
    country: "USA",
    logoUrl: "/logos/microsoft.png",
    isActive: false,
    sortOrder: 4,
    productCount: 8,
    totalSales: 45000,
    rating: 4.2,
    createdAt: "2023-02-15"
  },
];

export default function Manufacturers() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: manufacturers = mockManufacturers, isLoading = false } = useQuery({
    queryKey: ["/api/manufacturers"],
    queryFn: () => Promise.resolve(mockManufacturers),
  });

  const form = useForm<ManufacturerFormData>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      logoUrl: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ManufacturerFormData) => {
      return Promise.resolve({ 
        id: Date.now(), 
        ...data,
        productCount: 0,
        totalSales: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/manufacturers"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Manufacturer created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create manufacturer", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ManufacturerFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/manufacturers"] });
      setIsDialogOpen(false);
      setEditingManufacturer(null);
      form.reset();
      toast({ title: "Manufacturer updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update manufacturer", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/manufacturers"] });
      toast({ title: "Manufacturer deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete manufacturer", variant: "destructive" });
    },
  });

  const filteredManufacturers = manufacturers?.filter((manufacturer: any) =>
    manufacturer.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    manufacturer.country?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const columns = [
    {
      key: "logo",
      header: "Logo",
      render: (value: any, item: any) => (
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-gray-500" />
        </div>
      ),
    },
    {
      key: "name",
      header: "Manufacturer",
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{item.description}</div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (value: any, item: any) => (
        <div className="text-sm">
          {item.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Website
              </a>
            </div>
          )}
          {item.email && (
            <div className="text-gray-600">{item.email}</div>
          )}
          {item.phone && (
            <div className="text-gray-600">{item.phone}</div>
          )}
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (value: any, item: any) => (
        <div className="text-sm">
          {item.city && <div>{item.city}</div>}
          {item.country && <div className="text-gray-600">{item.country}</div>}
        </div>
      ),
    },
    {
      key: "products",
      header: "Products",
      render: (value: any, item: any) => (
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{item.productCount}</span>
        </div>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      render: (value: any, item: any) => (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="font-medium">${item.totalSales.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  const onSubmit = (data: ManufacturerFormData) => {
    if (editingManufacturer) {
      updateMutation.mutate({ id: editingManufacturer.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (manufacturer: any) => {
    setEditingManufacturer(manufacturer);
    form.reset({
      name: manufacturer.name || "",
      description: manufacturer.description || "",
      website: manufacturer.website || "",
      email: manufacturer.email || "",
      phone: manufacturer.phone || "",
      address: manufacturer.address || "",
      city: manufacturer.city || "",
      country: manufacturer.country || "",
      logoUrl: manufacturer.logoUrl || "",
      isActive: manufacturer.isActive,
      sortOrder: manufacturer.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (manufacturer: any) => {
    if (manufacturer.productCount > 0) {
      toast({ 
        title: "Cannot delete manufacturer", 
        description: "This manufacturer has products assigned to it.",
        variant: "destructive" 
      });
      return;
    }
    if (window.confirm("Are you sure you want to delete this manufacturer?")) {
      deleteMutation.mutate(manufacturer.id);
    }
  };

  const handleAdd = () => {
    setEditingManufacturer(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Manufacturers"
      description="Manage product manufacturers and brands"
      onAdd={handleAdd}
      addButtonText="Add Manufacturer"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-lg font-semibold text-blue-800">
                  {manufacturers.length}
                </div>
                <div className="text-sm text-blue-600">Total Manufacturers</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-lg font-semibold text-green-800">
                  {manufacturers.reduce((sum, m) => sum + m.productCount, 0)}
                </div>
                <div className="text-sm text-green-600">Total Products</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-lg font-semibold text-purple-800">
                  ${manufacturers.reduce((sum, m) => sum + m.totalSales, 0).toLocaleString()}
                </div>
                <div className="text-sm text-purple-600">Total Sales</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-lg font-semibold text-yellow-800">
                  {(manufacturers.reduce((sum, m) => sum + m.rating, 0) / manufacturers.length).toFixed(1)}
                </div>
                <div className="text-sm text-yellow-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          data={filteredManufacturers}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {editingManufacturer ? "Edit Manufacturer" : "Add New Manufacturer"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter manufacturer name" {...field} />
                      </FormControl>
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
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                      <Textarea placeholder="Enter manufacturer description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter logo URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <div className="text-sm text-gray-500">
                        Make this manufacturer visible to customers
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

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingManufacturer ? "Update" : "Create"} Manufacturer
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}