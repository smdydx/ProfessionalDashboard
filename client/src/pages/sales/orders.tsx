import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Calendar, User, Package } from "lucide-react";
import { format } from "date-fns";

const orderSchema = z.object({
  customerId: z.number().min(1, "Customer is required"),
  customerName: z.string().min(1, "Customer name is required"),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  total: z.number().min(0, "Total must be positive"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function Orders() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["/api/orders"],
  });

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerId: 0,
      customerName: "",
      status: "pending",
      total: 0,
      shippingAddress: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: OrderFormData) => apiRequest("/api/orders", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Order created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create order", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<OrderFormData> }) =>
      apiRequest(`/api/orders/${id}`, "PATCH", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      setIsDialogOpen(false);
      setEditingOrder(null);
      form.reset();
      toast({ title: "Order updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update order", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/orders/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({ title: "Order deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete order", variant: "destructive" });
    },
  });

  const filteredOrders = orders?.filter((order: any) =>
    order.orderId?.toLowerCase().includes(searchValue.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchValue.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered": return "default";
      case "shipped": return "secondary";
      case "processing": return "outline";
      case "pending": return "outline";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const columns = [
    { key: "orderId", header: "Order ID" },
    {
      key: "customerName",
      header: "Customer",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (value: string) => value ? format(new Date(value), "MMM dd, yyyy") : "-",
    },
    {
      key: "total",
      header: "Total",
      render: (value: number) => <span className="font-semibold">Rs.{value?.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>
          {value}
        </Badge>
      ),
    },
    {
      key: "shippingAddress",
      header: "Shipping Address",
      render: (value: string) => (
        <span className="text-sm text-gray-600 dark:text-gray-400 truncate block max-w-40">
          {value}
        </span>
      ),
    },
  ];

  const onSubmit = (data: OrderFormData) => {
    if (editingOrder) {
      updateMutation.mutate({ id: editingOrder.orderId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    form.reset({
      customerId: order.customerId || 0,
      customerName: order.customerName || "",
      status: order.status || "pending",
      total: order.total || 0,
      shippingAddress: order.shippingAddress || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (order: any) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteMutation.mutate(order.orderId);
    }
  };

  const handleAdd = () => {
    setEditingOrder(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Orders"
      description="Manage customer orders"
      onAdd={handleAdd}
      addButtonText="Add Order"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredOrders}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {editingOrder ? "Edit Order" : "Add New Order"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter customer ID"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
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
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter shipping address" {...field} />
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
                  {editingOrder ? "Update" : "Create"} Order
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}