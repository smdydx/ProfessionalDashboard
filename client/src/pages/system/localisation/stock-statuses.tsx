
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stockStatuses = [
  { id: 1, name: "In Stock", status: true, sortOrder: 1 },
  { id: 2, name: "Out of Stock", status: true, sortOrder: 2 },
  { id: 3, name: "Pre-Order", status: true, sortOrder: 3 },
  { id: 4, name: "2-3 Days", status: true, sortOrder: 4 },
  { id: 5, name: "Backorder", status: false, sortOrder: 5 },
];

const columns = [
  { key: "name", label: "Stock Status Name", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "sortOrder", label: "Sort Order", sortable: true },
];

export default function StockStatuses() {
  return (
    <PageLayout
      title="Stock Statuses"
      subtitle="Manage product stock status options"
      actions={
        <Button>
          Add Stock Status
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Stock Status List</CardTitle>
          <CardDescription>
            Configure stock status options for products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={stockStatuses}
            searchPlaceholder="Search stock statuses..."
            addButtonText="Add Stock Status"
            onAdd={() => console.log("Add stock status")}
            onEdit={(item) => console.log("Edit stock status", item)}
            onDelete={(item) => console.log("Delete stock status", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
