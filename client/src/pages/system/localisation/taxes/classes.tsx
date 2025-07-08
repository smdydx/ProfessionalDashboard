
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const taxClasses = [
  { id: 1, title: "Taxable Goods", description: "Taxable goods", dateAdded: "2024-01-15", dateModified: "2024-01-15" },
  { id: 2, title: "Downloadable Products", description: "Downloadable products", dateAdded: "2024-01-15", dateModified: "2024-01-15" },
  { id: 3, title: "Shipping", description: "Shipping charges", dateAdded: "2024-01-15", dateModified: "2024-01-15" },
];

const columns = [
  { key: "title", label: "Tax Class Title", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "dateAdded", label: "Date Added", sortable: true },
  { key: "dateModified", label: "Date Modified", sortable: true },
];

export default function TaxClasses() {
  return (
    <PageLayout
      title="Tax Classes"
      subtitle="Manage tax class configurations"
      actions={
        <Button>
          Add Tax Class
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Tax Class List</CardTitle>
          <CardDescription>
            Configure tax classes for different product types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={taxClasses}
            searchPlaceholder="Search tax classes..."
            addButtonText="Add Tax Class"
            onAdd={() => console.log("Add tax class")}
            onEdit={(item) => console.log("Edit tax class", item)}
            onDelete={(item) => console.log("Delete tax class", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
