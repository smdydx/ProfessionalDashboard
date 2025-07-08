
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const geoZones = [
  { id: 1, name: "UK VAT Zone", description: "UK VAT Zone", status: true },
  { id: 2, name: "US Sales Tax Zone", description: "US Sales Tax Zone", status: true },
  { id: 3, name: "EU VAT Zone", description: "European Union VAT Zone", status: true },
  { id: 4, name: "Canada GST Zone", description: "Canada GST Zone", status: true },
  { id: 5, name: "Australia GST Zone", description: "Australia GST Zone", status: true },
];

const columns = [
  { key: "name", label: "Geo Zone Name", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function GeoZones() {
  return (
    <PageLayout
      title="Geo Zones"
      subtitle="Manage geographical zones for taxes and shipping"
      actions={
        <Button>
          Add Geo Zone
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Geo Zone List</CardTitle>
          <CardDescription>
            Configure geographical zones for tax and shipping calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={geoZones}
            searchPlaceholder="Search geo zones..."
            addButtonText="Add Geo Zone"
            onAdd={() => console.log("Add geo zone")}
            onEdit={(item) => console.log("Edit geo zone", item)}
            onDelete={(item) => console.log("Delete geo zone", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
