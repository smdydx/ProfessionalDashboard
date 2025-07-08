
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const weightClasses = [
  { id: 1, title: "Kilogram", unit: "kg", value: "1.00000000", status: true },
  { id: 2, title: "Gram", unit: "g", value: "1000.00000000", status: true },
  { id: 3, title: "Pound", unit: "lb", value: "2.20460000", status: true },
  { id: 4, title: "Ounce", unit: "oz", value: "35.27400000", status: true },
];

const columns = [
  { key: "title", label: "Weight Class Title", sortable: true },
  { key: "unit", label: "Unit", sortable: true },
  { key: "value", label: "Value", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function WeightClasses() {
  return (
    <PageLayout
      title="Weight Classes"
      subtitle="Manage weight measurement units"
      actions={
        <Button>
          Add Weight Class
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Weight Class List</CardTitle>
          <CardDescription>
            Configure weight measurement units for products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={weightClasses}
            searchPlaceholder="Search weight classes..."
            addButtonText="Add Weight Class"
            onAdd={() => console.log("Add weight class")}
            onEdit={(item) => console.log("Edit weight class", item)}
            onDelete={(item) => console.log("Delete weight class", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
