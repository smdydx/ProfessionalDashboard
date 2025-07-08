
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";

export default function OrdersProcessing() {
  const mockOrders = [
    { id: "ORD-004", customer: "Alice Brown", total: "$199.99", date: "2024-01-16", items: 2 },
    { id: "ORD-005", customer: "Charlie Wilson", total: "$349.50", date: "2024-01-16", items: 4 },
  ];

  const columns = [
    { key: "id", header: "Order ID" },
    { key: "customer", header: "Customer" },
    { key: "items", header: "Items" },
    { key: "total", header: "Total" },
    { key: "date", header: "Date" },
    {
      key: "status",
      header: "Status",
      render: () => <Badge variant="secondary">Processing</Badge>,
    },
  ];

  return (
    <PageLayout title="Orders Processing">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          View and manage orders currently being processed
        </p>
        <DataTable data={mockOrders} columns={columns} />
      </div>
    </PageLayout>
  );
}
