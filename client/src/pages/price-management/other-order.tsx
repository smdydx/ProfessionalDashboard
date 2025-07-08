
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";

export default function OtherOrder() {
  const mockOrders = [
    { id: "ORD-006", customer: "David Lee", total: "$75.00", date: "2024-01-17", items: 1, status: "Pending" },
    { id: "ORD-007", customer: "Eva Martinez", total: "$425.99", date: "2024-01-17", items: 5, status: "Cancelled" },
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
      render: (row: any) => (
        <Badge variant={row.status === "Cancelled" ? "destructive" : "outline"}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <PageLayout title="Other Orders">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          View and manage other order statuses
        </p>
        <DataTable data={mockOrders} columns={columns} />
      </div>
    </PageLayout>
  );
}
