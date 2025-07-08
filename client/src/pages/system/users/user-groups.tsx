
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function UserGroups() {
  const mockGroups = [
    { id: 1, name: "Administrators", description: "Full system access", users: 2 },
    { id: 2, name: "Managers", description: "Management level access", users: 5 },
    { id: 3, name: "Staff", description: "Basic access level", users: 12 },
  ];

  const columns = [
    { key: "name", header: "Group Name" },
    { key: "description", header: "Description" },
    { key: "users", header: "Users" },
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
    <PageLayout title="User Groups">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Manage user groups and permissions
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>
      <DataTable data={mockGroups} columns={columns} />
    </PageLayout>
  );
}
