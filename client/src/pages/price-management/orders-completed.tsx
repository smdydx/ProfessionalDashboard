
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";

export default function OrdersCompleted() {
  const mockOrders = [
    { id: "ORD-001", customer: "John Doe", total: "$299.99", date: "2024-01-15", items: 3 },
    { id: "ORD-002", customer: "Jane Smith", total: "$149.50", date: "2024-01-14", items: 2 },
    { id: "ORD-003", customer: "Bob Johnson", total: "$89.99", date: "2024-01-13", items: 1 },
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
      render: () => <Badge variant="default">Completed</Badge>,
    },
  ];

  return (
    <PageLayout title="Orders Completed">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          View and manage completed orders
        </p>
        <DataTable data={mockOrders} columns={columns} />
      </div>
    </PageLayout>
  );
}
