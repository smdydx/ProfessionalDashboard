
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
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, Star, Heart, Share } from "lucide-react";

const extraSchema = z.object({
  name: z.string().min(1, "Extra name is required"),
  description: z.string().optional(),
  type: z.enum(["addon", "warranty", "service", "customization", "bundle"]),
  price: z.number().min(0, "Price must be positive"),
  priceType: z.enum(["fixed", "percentage"]),
  category: z.string().min(1, "Category is required"),
  required: z.boolean(),
  multipleSelection: z.boolean(),
  displayOrder: z.number().min(1, "Display order must be positive"),
  applicableProducts: z.string().optional(),
  maxQuantity: z.number().optional(),
  status: z.enum(["active", "inactive"]),
});

type ExtraFormData = z.infer<typeof extraSchema>;

const mockExtras = [
  {
    id: 1,
    name: "Extended Warranty",
    description: "2-year extended warranty coverage",
    type: "warranty",
    price: 49.99,
    priceType: "fixed",
    category: "Protection",
    required: false,
    multipleSelection: false,
    displayOrder: 1,
    applicableProducts: "Electronics",
    maxQuantity: 1,
    status: "active"
  },
  {
    id: 2,
    name: "Gift Wrapping",
    description: "Professional gift wrapping service",
    type: "service",
    price: 5.99,
    priceType: "fixed",
    category: "Services",
    required: false,
    multipleSelection: false,
    displayOrder: 2,
    applicableProducts: "All",
    maxQuantity: 1,
    status: "active"
  },
  {
    id: 3,
    name: "Express Shipping",
    description: "Next day delivery service",
    type: "service",
    price: 15.00,
    priceType: "fixed",
    category: "Shipping",
    required: false,
    multipleSelection: false,
    displayOrder: 3,
    applicableProducts: "All",
    maxQuantity: 1,
    status: "active"
  },
  {
    id: 4,
    name: "Custom Engraving",
    description: "Personalized engraving service",
    type: "customization",
    price: 10.00,
    priceType: "fixed",
    category: "Personalization",
    required: false,
    multipleSelection: false,
    displayOrder: 4,
    applicableProducts: "Jewelry, Watches",
    maxQuantity: 1,
    status: "active"
  }
];

export default function ProductExtras() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExtra, setEditingExtra] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: extras = mockExtras, isLoading = false } = useQuery({
    queryKey: ["/api/journal/product-extras"],
    queryFn: () => Promise.resolve(mockExtras),
  });

  const form = useForm<ExtraFormData>({
    resolver: zodResolver(extraSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "addon",
      price: 0,
      priceType: "fixed",
      category: "",
      required: false,
      multipleSelection: false,
      displayOrder: 1,
      applicableProducts: "",
      maxQuantity: 1,
      status: "active",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ExtraFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/product-extras"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Product extra created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ExtraFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/product-extras"] });
      setIsDialogOpen(false);
      setEditingExtra(null);
      form.reset();
      toast({ title: "Product extra updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/product-extras"] });
      toast({ title: "Product extra deleted successfully" });
    },
  });

  const filteredExtras = extras?.filter((extra: any) =>
    extra.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    extra.category?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warranty": return <Star className="w-4 h-4" />;
      case "service": return <Heart className="w-4 h-4" />;
      case "customization": return <Share className="w-4 h-4" />;
      default: return <Plus className="w-4 h-4" />;
    }
  };

  const columns = [
    {
      key: "name",
      header: "Extra Name",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(item.type)}
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">{item.description}</div>
          </div>
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
      key: "price",
      header: "Price",
      render: (value: number, item: any) => (
        <div className="text-right">
          {item.priceType === "fixed" ? (
            <span className="font-medium">${value.toFixed(2)}</span>
          ) : (
            <span className="font-medium">{value}%</span>
          )}
        </div>
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
      key: "required",
      header: "Required",
      render: (value: boolean) => (
        <Badge variant={value ? "destructive" : "outline"}>
          {value ? "Required" : "Optional"}
        </Badge>
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

  const onSubmit = (data: ExtraFormData) => {
    if (editingExtra) {
      updateMutation.mutate({ id: editingExtra.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (extra: any) => {
    setEditingExtra(extra);
    form.reset(extra);
    setIsDialogOpen(true);
  };

  const handleDelete = (extra: any) => {
    if (window.confirm("Are you sure you want to delete this product extra?")) {
      deleteMutation.mutate(extra.id);
    }
  };

  const handleAdd = () => {
    setEditingExtra(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Product Extras"
      description="Manage additional product options and services"
      onAdd={handleAdd}
      addButtonText="Add Product Extra"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredExtras}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {editingExtra ? "Edit Product Extra" : "Add New Product Extra"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extra Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Extended Warranty" {...field} />
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
                      <Textarea placeholder="Description of the extra service or option" {...field} />
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
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="addon">Add-on</SelectItem>
                          <SelectItem value="warranty">Warranty</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="customization">Customization</SelectItem>
                          <SelectItem value="bundle">Bundle</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <FormControl>
                        <Input placeholder="Protection" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          min="0"
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
                  name="priceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
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
                name="applicableProducts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicable Products</FormLabel>
                    <FormControl>
                      <Input placeholder="Electronics, Jewelry (comma separated or 'All')" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="required"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Required</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          This extra is mandatory for applicable products
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

                <FormField
                  control={form.control}
                  name="multipleSelection"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Multiple Selection</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Allow customers to select multiple quantities
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
                  {editingExtra ? "Update" : "Create"} Product Extra
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
