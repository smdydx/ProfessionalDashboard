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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Tag, Calendar as CalendarIcon, Percent, DollarSign, Users, Copy } from "lucide-react";
import { format } from "date-fns";

const couponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  name: z.string().min(1, "Coupon name is required"),
  type: z.enum(["percentage", "fixed", "free_shipping"]),
  value: z.number().min(0, "Value must be positive"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  usageLimit: z.number().min(0).optional(),
  minAmount: z.number().min(0).optional(),
  maxDiscount: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
  applyToProducts: z.array(z.string()).optional(),
  applyToCategories: z.array(z.string()).optional(),
});

type CouponFormData = z.infer<typeof couponSchema>;

// Mock coupons data
const mockCoupons = [
  {
    id: 1,
    code: "SAVE20",
    name: "20% Off Summer Sale",
    type: "percentage",
    value: 20,
    description: "Get 20% off on all summer products",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 1000,
    usageCount: 245,
    minAmount: 50,
    maxDiscount: 100,
    isActive: true,
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    code: "FREESHIP",
    name: "Free Shipping",
    type: "free_shipping",
    value: 0,
    description: "Free shipping on orders over $75",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    usageLimit: 500,
    usageCount: 89,
    minAmount: 75,
    maxDiscount: null,
    isActive: true,
    createdAt: "2024-01-01"
  },
  {
    id: 3,
    code: "WELCOME10",
    name: "Welcome Discount",
    type: "fixed",
    value: 10,
    description: "Welcome discount for new customers",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 1,
    usageCount: 156,
    minAmount: 25,
    maxDiscount: null,
    isActive: false,
    createdAt: "2024-01-01"
  },
];

export default function Coupons() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: coupons = mockCoupons, isLoading = false } = useQuery({
    queryKey: ["/api/coupons"],
    queryFn: () => Promise.resolve(mockCoupons),
  });

  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      name: "",
      type: "percentage",
      value: 0,
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      usageLimit: undefined,
      minAmount: undefined,
      maxDiscount: undefined,
      isActive: true,
      applyToProducts: [],
      applyToCategories: [],
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CouponFormData) => {
      return Promise.resolve({ 
        id: Date.now(), 
        ...data,
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coupons"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Coupon created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create coupon", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CouponFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coupons"] });
      setIsDialogOpen(false);
      setEditingCoupon(null);
      form.reset();
      toast({ title: "Coupon updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update coupon", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coupons"] });
      toast({ title: "Coupon deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete coupon", variant: "destructive" });
    },
  });

  const filteredCoupons = coupons?.filter((coupon: any) =>
    coupon.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
    coupon.name?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage": return <Percent className="w-4 h-4" />;
      case "fixed": return <DollarSign className="w-4 h-4" />;
      case "free_shipping": return <Tag className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "percentage": return "default";
      case "fixed": return "secondary";
      case "free_shipping": return "outline";
      default: return "outline";
    }
  };

  const generateCouponCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    form.setValue("code", code);
  };

  const columns = [
    {
      key: "code",
      header: "Coupon Code",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-medium">{value}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(value);
              toast({ title: "Coupon code copied!" });
            }}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
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
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(value)}
          <Badge variant={getTypeVariant(value)}>
            {value === "percentage" ? `${item.value}%` : 
             value === "fixed" ? `$${item.value}` : 
             "Free Ship"}
          </Badge>
        </div>
      ),
    },
    {
      key: "usage",
      header: "Usage",
      render: (value: any, item: any) => (
        <div className="text-sm">
          <div>{item.usageCount} / {item.usageLimit || "∞"}</div>
          <div className="text-gray-500">
            {item.usageLimit ? `${Math.round((item.usageCount / item.usageLimit) * 100)}%` : "Unlimited"}
          </div>
        </div>
      ),
    },
    {
      key: "validPeriod",
      header: "Valid Period",
      render: (value: any, item: any) => (
        <div className="text-sm">
          <div>{item.startDate}</div>
          <div className="text-gray-500">to {item.endDate}</div>
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

  const onSubmit = (data: CouponFormData) => {
    if (editingCoupon) {
      updateMutation.mutate({ id: editingCoupon.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon);
    form.reset({
      code: coupon.code || "",
      name: coupon.name || "",
      type: coupon.type || "percentage",
      value: coupon.value || 0,
      description: coupon.description || "",
      startDate: new Date(coupon.startDate),
      endDate: new Date(coupon.endDate),
      usageLimit: coupon.usageLimit,
      minAmount: coupon.minAmount,
      maxDiscount: coupon.maxDiscount,
      isActive: coupon.isActive,
      applyToProducts: coupon.applyToProducts || [],
      applyToCategories: coupon.applyToCategories || [],
    });
    setStartDate(new Date(coupon.startDate));
    setEndDate(new Date(coupon.endDate));
    setIsDialogOpen(true);
  };

  const handleDelete = (coupon: any) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      deleteMutation.mutate(coupon.id);
    }
  };

  const handleAdd = () => {
    setEditingCoupon(null);
    form.reset();
    setStartDate(new Date());
    setEndDate(new Date());
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Coupons"
      description="Manage discount coupons and promotional codes"
      onAdd={handleAdd}
      addButtonText="Create Coupon"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredCoupons}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Enter coupon code" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" onClick={generateCouponCode}>
                          Generate
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter coupon name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                          <SelectItem value="free_shipping">Free Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter value" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                      <Textarea placeholder="Enter coupon description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="justify-start text-left font-normal"
                            >
                              {startDate ? (
                                format(startDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => {
                              setStartDate(date);
                              field.onChange(date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="justify-start text-left font-normal"
                            >
                              {endDate ? (
                                format(endDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(date) => {
                              setEndDate(date);
                              field.onChange(date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Limit</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Unlimited" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Discount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="No limit" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <div className="text-sm text-gray-500">
                        Enable this coupon for customers to use
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
                  {editingCoupon ? "Update" : "Create"} Coupon
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}