
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function Events() {
  const mockEvents = [
    { id: 1, name: "User Registration", description: "Triggered when a user registers", status: "Active" },
    { id: 2, name: "Order Complete", description: "Triggered when an order is completed", status: "Active" },
    { id: 3, name: "Product View", description: "Triggered when a product is viewed", status: "Inactive" },
  ];

  const columns = [
    { key: "name", header: "Event Name" },
    { key: "description", header: "Description" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout title="Events">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Manage system events and triggers
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
      <DataTable data={mockEvents} columns={columns} />
    </PageLayout>
  );
}
