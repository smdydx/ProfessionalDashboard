
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Mail } from "lucide-react";

export default function JournalFormEmails() {
  const columns = [
    { accessorKey: "name", header: "Template Name" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
    { 
      id: "actions", 
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><Mail className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, name: "Welcome Email", subject: "Welcome to our platform!", type: "Welcome", status: "active" },
    { id: 2, name: "Order Confirmation", subject: "Your order has been confirmed", type: "Order", status: "active" },
    { id: 3, name: "Password Reset", subject: "Reset your password", type: "Security", status: "active" },
  ];

  return (
    <PageLayout title="Journal Form Emails" description="Manage form email templates">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div></div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Template
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>
              Manage form email templates and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
