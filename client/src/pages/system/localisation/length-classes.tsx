
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const lengthClasses = [
  { id: 1, title: "Centimeter", unit: "cm", value: "1.00000000", status: true },
  { id: 2, title: "Millimeter", unit: "mm", value: "10.00000000", status: true },
  { id: 3, title: "Inch", unit: "in", value: "0.39370000", status: true },
  { id: 4, title: "Meter", unit: "m", value: "0.01000000", status: true },
];

const columns = [
  { key: "title", label: "Length Class Title", sortable: true },
  { key: "unit", label: "Unit", sortable: true },
  { key: "value", label: "Value", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function LengthClasses() {
  return (
    <PageLayout
      title="Length Classes"
      subtitle="Manage length measurement units"
      actions={
        <Button>
          Add Length Class
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Length Class List</CardTitle>
          <CardDescription>
            Configure length measurement units for products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={lengthClasses}
            searchPlaceholder="Search length classes..."
            addButtonText="Add Length Class"
            onAdd={() => console.log("Add length class")}
            onEdit={(item) => console.log("Edit length class", item)}
            onDelete={(item) => console.log("Delete length class", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
