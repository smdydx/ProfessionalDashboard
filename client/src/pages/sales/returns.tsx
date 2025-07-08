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
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, Package, User, DollarSign, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

const returnSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  productId: z.string().min(1, "Product ID is required"),
  reason: z.enum(["defective", "wrong_item", "not_as_described", "changed_mind", "other"]),
  status: z.enum(["pending", "approved", "rejected", "refunded", "exchanged"]),
  refundAmount: z.number().min(0, "Refund amount must be positive"),
  notes: z.string().optional(),
});

type ReturnFormData = z.infer<typeof returnSchema>;

// Mock returns data
const mockReturns = [
  {
    id: 1,
    returnId: "RET-001",
    orderId: "ORD-256",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    productName: "Wireless Headphones",
    productSku: "WH-001",
    quantity: 1,
    reason: "defective",
    status: "pending",
    refundAmount: 89.99,
    requestDate: "2024-01-15",
    processedDate: null,
    notes: "Product stopped working after 2 days",
    images: ["return1.jpg", "return2.jpg"]
  },
  {
    id: 2,
    returnId: "RET-002", 
    orderId: "ORD-255",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    productName: "Smart Watch",
    productSku: "SW-002",
    quantity: 1,
    reason: "wrong_item",
    status: "approved",
    refundAmount: 199.99,
    requestDate: "2024-01-14",
    processedDate: "2024-01-15",
    notes: "Received wrong color",
    images: ["return3.jpg"]
  },
  {
    id: 3,
    returnId: "RET-003",
    orderId: "ORD-254",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    productName: "Bluetooth Speaker",
    productSku: "BS-003",
    quantity: 2,
    reason: "not_as_described",
    status: "refunded",
    refundAmount: 149.98,
    requestDate: "2024-01-13",
    processedDate: "2024-01-14",
    notes: "Sound quality not as advertised",
    images: []
  },
];

export default function Returns() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: returns = mockReturns, isLoading = false } = useQuery({
    queryKey: ["/api/returns"],
    queryFn: () => Promise.resolve(mockReturns),
  });

  const form = useForm<ReturnFormData>({
    resolver: zodResolver(returnSchema),
    defaultValues: {
      orderId: "",
      productId: "",
      reason: "defective",
      status: "pending",
      refundAmount: 0,
      notes: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ReturnFormData) => {
      return Promise.resolve({ 
        id: Date.now(),
        returnId: `RET-${String(Date.now()).slice(-3)}`,
        ...data,
        requestDate: new Date().toISOString().split('T')[0],
        processedDate: null
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/returns"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Return created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create return", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReturnFormData }) => {
      return Promise.resolve({ 
        id, 
        ...data,
        processedDate: new Date().toISOString().split('T')[0]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/returns"] });
      setIsDialogOpen(false);
      setEditingReturn(null);
      form.reset();
      toast({ title: "Return updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update return", variant: "destructive" });
    },
  });

  const filteredReturns = returns?.filter((returnItem: any) =>
    returnItem.returnId?.toLowerCase().includes(searchValue.toLowerCase()) ||
    returnItem.customerName?.toLowerCase().includes(searchValue.toLowerCase()) ||
    returnItem.productName?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      case "refunded": return "default";
      case "exchanged": return "outline";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "rejected": return <XCircle className="w-4 h-4 text-red-500" />;
      case "refunded": return <DollarSign className="w-4 h-4 text-green-500" />;
      case "exchanged": return <RotateCcw className="w-4 h-4 text-blue-500" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case "defective": return "Defective Item";
      case "wrong_item": return "Wrong Item";
      case "not_as_described": return "Not as Described";
      case "changed_mind": return "Changed Mind";
      case "other": return "Other";
      default: return reason;
    }
  };

  const columns = [
    {
      key: "returnId",
      header: "Return ID",
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">Order: {item.orderId}</div>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (value: any, item: any) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <div className="font-medium">{item.customerName}</div>
            <div className="text-sm text-gray-500">{item.customerEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: "product",
      header: "Product",
      render: (value: any, item: any) => (
        <div>
          <div className="font-medium">{item.productName}</div>
          <div className="text-sm text-gray-500">SKU: {item.productSku}</div>
        </div>
      ),
    },
    {
      key: "reason",
      header: "Reason",
      render: (value: string) => (
        <span className="text-sm">{getReasonText(value)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          <Badge variant={getStatusVariant(value)}>{value}</Badge>
        </div>
      ),
    },
    {
      key: "refundAmount",
      header: "Refund Amount",
      render: (value: number) => (
        <span className="font-medium">${value.toFixed(2)}</span>
      ),
    },
    {
      key: "requestDate",
      header: "Request Date",
      render: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
  ];

  const onSubmit = (data: ReturnFormData) => {
    if (editingReturn) {
      updateMutation.mutate({ id: editingReturn.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (returnItem: any) => {
    setEditingReturn(returnItem);
    form.reset({
      orderId: returnItem.orderId || "",
      productId: returnItem.productSku || "",
      reason: returnItem.reason || "defective",
      status: returnItem.status || "pending",
      refundAmount: returnItem.refundAmount || 0,
      notes: returnItem.notes || "",
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingReturn(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleApprove = (returnItem: any) => {
    updateMutation.mutate({ 
      id: returnItem.id, 
      data: { ...returnItem, status: "approved" }
    });
  };

  const handleReject = (returnItem: any) => {
    updateMutation.mutate({ 
      id: returnItem.id, 
      data: { ...returnItem, status: "rejected" }
    });
  };

  return (
    <PageLayout
      title="Returns"
      description="Manage product returns and refunds"
      onAdd={handleAdd}
      addButtonText="Create Return"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-lg font-semibold text-yellow-800">
                  {returns.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-yellow-600">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-lg font-semibold text-green-800">
                  {returns.filter(r => r.status === 'approved').length}
                </div>
                <div className="text-sm text-green-600">Approved</div>
              </div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-lg font-semibold text-red-800">
                  {returns.filter(r => r.status === 'rejected').length}
                </div>
                <div className="text-sm text-red-600">Rejected</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-lg font-semibold text-blue-800">
                  ${returns.reduce((sum, r) => sum + (r.status === 'refunded' ? r.refundAmount : 0), 0).toFixed(2)}
                </div>
                <div className="text-sm text-blue-600">Refunded</div>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          data={filteredReturns}
          columns={columns}
          onEdit={handleEdit}
          isLoading={isLoading}
        />

        {/* Quick Actions for Pending Returns */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pending Returns</h3>
          {filteredReturns.filter(r => r.status === 'pending').map((returnItem) => (
            <div key={returnItem.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{returnItem.returnId}</div>
                    <div className="text-sm text-gray-500">
                      {returnItem.customerName} - {returnItem.productName}
                    </div>
                  </div>
                  <Badge variant="secondary">{getReasonText(returnItem.reason)}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleApprove(returnItem)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleReject(returnItem)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              {editingReturn ? "Edit Return" : "Create New Return"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter order ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product SKU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Return Reason</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="defective">Defective Item</SelectItem>
                          <SelectItem value="wrong_item">Wrong Item</SelectItem>
                          <SelectItem value="not_as_described">Not as Described</SelectItem>
                          <SelectItem value="changed_mind">Changed Mind</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                          <SelectItem value="exchanged">Exchanged</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="refundAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refund Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="Enter refund amount" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter return notes" {...field} />
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
                  {editingReturn ? "Update" : "Create"} Return
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}