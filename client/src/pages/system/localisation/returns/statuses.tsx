
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const returnStatuses = [
  { id: 1, name: "Pending", status: true, sortOrder: 1 },
  { id: 2, name: "Awaiting Products", status: true, sortOrder: 2 },
  { id: 3, name: "Complete", status: true, sortOrder: 3 },
];

const columns = [
  { key: "name", label: "Return Status Name", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "sortOrder", label: "Sort Order", sortable: true },
];

export default function ReturnStatuses() {
  return (
    <PageLayout
      title="Return Statuses"
      subtitle="Manage return status options"
      actions={
        <Button>
          Add Return Status
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Return Status List</CardTitle>
          <CardDescription>
            Configure return status options for return management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={returnStatuses}
            searchPlaceholder="Search return statuses..."
            addButtonText="Add Return Status"
            onAdd={() => console.log("Add return status")}
            onEdit={(item) => console.log("Edit return status", item)}
            onDelete={(item) => console.log("Delete return status", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
