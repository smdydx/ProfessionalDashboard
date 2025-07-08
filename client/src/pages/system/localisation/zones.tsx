
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const zones = [
  { id: 1, name: "California", code: "CA", country: "United States", status: true },
  { id: 2, name: "New York", code: "NY", country: "United States", status: true },
  { id: 3, name: "Texas", code: "TX", country: "United States", status: true },
  { id: 4, name: "Ontario", code: "ON", country: "Canada", status: true },
  { id: 5, name: "Quebec", code: "QC", country: "Canada", status: true },
  { id: 6, name: "England", code: "ENG", country: "United Kingdom", status: true },
  { id: 7, name: "Scotland", code: "SCT", country: "United Kingdom", status: true },
];

const columns = [
  { key: "name", label: "Zone Name", sortable: true },
  { key: "code", label: "Zone Code", sortable: true },
  { key: "country", label: "Country", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function Zones() {
  return (
    <PageLayout
      title="Zones"
      subtitle="Manage geographical zones"
      actions={
        <Button>
          Add Zone
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Zone List</CardTitle>
          <CardDescription>
            Configure zones for states, provinces, and regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={zones}
            searchPlaceholder="Search zones..."
            addButtonText="Add Zone"
            onAdd={() => console.log("Add zone")}
            onEdit={(item) => console.log("Edit zone", item)}
            onDelete={(item) => console.log("Delete zone", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
