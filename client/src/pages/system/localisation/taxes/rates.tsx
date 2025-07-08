
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const taxRates = [
  { id: 1, name: "VAT (20%)", rate: "20.0000", type: "Percentage", geoZone: "UK VAT Zone", status: true },
  { id: 2, name: "Sales Tax (8.5%)", rate: "8.5000", type: "Percentage", geoZone: "US Sales Tax Zone", status: true },
  { id: 3, name: "GST (5%)", rate: "5.0000", type: "Percentage", geoZone: "Canada GST Zone", status: true },
  { id: 4, name: "PST (7%)", rate: "7.0000", type: "Percentage", geoZone: "Canada GST Zone", status: true },
];

const columns = [
  { key: "name", label: "Tax Rate Name", sortable: true },
  { key: "rate", label: "Tax Rate", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "geoZone", label: "Geo Zone", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function TaxRates() {
  return (
    <PageLayout
      title="Tax Rates"
      subtitle="Manage tax rate configurations"
      actions={
        <Button>
          Add Tax Rate
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Tax Rate List</CardTitle>
          <CardDescription>
            Configure tax rates for different geographical zones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={taxRates}
            searchPlaceholder="Search tax rates..."
            addButtonText="Add Tax Rate"
            onAdd={() => console.log("Add tax rate")}
            onEdit={(item) => console.log("Edit tax rate", item)}
            onDelete={(item) => console.log("Delete tax rate", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
