
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Send } from "lucide-react";

export default function JournalNewsletter() {
  const columns = [
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "recipients", header: "Recipients" },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'sent' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
    { accessorKey: "date", header: "Date" },
    { 
      id: "actions", 
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><Send className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, subject: "Monthly Newsletter", recipients: 1500, status: "sent", date: "2024-01-15" },
    { id: 2, subject: "Product Updates", recipients: 800, status: "draft", date: "2024-01-14" },
    { id: 3, subject: "Special Offers", recipients: 2000, status: "scheduled", date: "2024-01-13" },
  ];

  return (
    <PageLayout title="Journal Newsletter" description="Manage newsletter campaigns">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div></div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Newsletter
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Campaigns</CardTitle>
            <CardDescription>
              Manage newsletter campaigns and subscribers
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
