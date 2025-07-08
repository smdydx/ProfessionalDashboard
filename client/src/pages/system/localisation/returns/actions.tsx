
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const returnActions = [
  { id: 1, name: "Returned", status: true, sortOrder: 1 },
  { id: 2, name: "Credit Issued", status: true, sortOrder: 2 },
  { id: 3, name: "Replacement Sent", status: true, sortOrder: 3 },
];

const columns = [
  { key: "name", label: "Return Action Name", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "sortOrder", label: "Sort Order", sortable: true },
];

export default function ReturnActions() {
  return (
    <PageLayout
      title="Return Actions"
      subtitle="Manage return action options"
      actions={
        <Button>
          Add Return Action
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Return Action List</CardTitle>
          <CardDescription>
            Configure return action options for return processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={returnActions}
            searchPlaceholder="Search return actions..."
            addButtonText="Add Return Action"
            onAdd={() => console.log("Add return action")}
            onEdit={(item) => console.log("Edit return action", item)}
            onDelete={(item) => console.log("Delete return action", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
