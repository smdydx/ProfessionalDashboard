
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function SystemUsers() {
  const mockUsers = [
    { id: 1, username: "admin", email: "admin@example.com", status: "Active", role: "Administrator" },
    { id: 2, username: "manager", email: "manager@example.com", status: "Active", role: "Manager" },
    { id: 3, username: "staff", email: "staff@example.com", status: "Inactive", role: "Staff" },
  ];

  const columns = [
    { key: "username", header: "Username" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
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
    <PageLayout title="Users">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Manage system users and their permissions
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      <DataTable data={mockUsers} columns={columns} />
    </PageLayout>
  );
}
