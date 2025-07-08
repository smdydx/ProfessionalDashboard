
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const orderStatuses = [
  { id: 1, name: "Pending", status: true, sortOrder: 1 },
  { id: 2, name: "Processing", status: true, sortOrder: 2 },
  { id: 3, name: "Shipped", status: true, sortOrder: 3 },
  { id: 4, name: "Complete", status: true, sortOrder: 4 },
  { id: 5, name: "Canceled", status: true, sortOrder: 5 },
  { id: 6, name: "Denied", status: true, sortOrder: 6 },
  { id: 7, name: "Canceled Reversal", status: true, sortOrder: 7 },
  { id: 8, name: "Failed", status: true, sortOrder: 8 },
  { id: 9, name: "Refunded", status: true, sortOrder: 9 },
  { id: 10, name: "Reversed", status: true, sortOrder: 10 },
];

const columns = [
  { key: "name", label: "Order Status Name", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "sortOrder", label: "Sort Order", sortable: true },
];

export default function OrderStatuses() {
  return (
    <PageLayout
      title="Order Statuses"
      subtitle="Manage order status options"
      actions={
        <Button>
          Add Order Status
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Order Status List</CardTitle>
          <CardDescription>
            Configure order status options for order management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={orderStatuses}
            searchPlaceholder="Search order statuses..."
            addButtonText="Add Order Status"
            onAdd={() => console.log("Add order status")}
            onEdit={(item) => console.log("Edit order status", item)}
            onDelete={(item) => console.log("Delete order status", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
