
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const returnReasons = [
  { id: 1, name: "Dead On Arrival", status: true, sortOrder: 1 },
  { id: 2, name: "Received Wrong Item", status: true, sortOrder: 2 },
  { id: 3, name: "Order Error", status: true, sortOrder: 3 },
  { id: 4, name: "Defective", status: true, sortOrder: 4 },
  { id: 5, name: "Other", status: true, sortOrder: 5 },
];

const columns = [
  { key: "name", label: "Return Reason Name", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "sortOrder", label: "Sort Order", sortable: true },
];

export default function ReturnReasons() {
  return (
    <PageLayout
      title="Return Reasons"
      subtitle="Manage return reason options"
      actions={
        <Button>
          Add Return Reason
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Return Reason List</CardTitle>
          <CardDescription>
            Configure return reason options for customer returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={returnReasons}
            searchPlaceholder="Search return reasons..."
            addButtonText="Add Return Reason"
            onAdd={() => console.log("Add return reason")}
            onEdit={(item) => console.log("Edit return reason", item)}
            onDelete={(item) => console.log("Delete return reason", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
