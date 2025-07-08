
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

export default function Information() {
  const columns = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "slug", header: "Slug" },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'enabled' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
    { accessorKey: "sort_order", header: "Sort Order" },
    { accessorKey: "date_modified", header: "Date Modified" },
    { 
      id: "actions", 
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><FileText className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, title: "About Us", slug: "about-us", status: "enabled", sort_order: 1, date_modified: "2024-01-15" },
    { id: 2, title: "Privacy Policy", slug: "privacy-policy", status: "enabled", sort_order: 2, date_modified: "2024-01-14" },
    { id: 3, title: "Terms & Conditions", slug: "terms-conditions", status: "enabled", sort_order: 3, date_modified: "2024-01-13" },
    { id: 4, title: "Shipping Info", slug: "shipping-info", status: "disabled", sort_order: 4, date_modified: "2024-01-12" },
  ];

  return (
    <PageLayout title="Information" description="Manage information pages">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div></div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Information
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Information Pages</CardTitle>
            <CardDescription>
              Manage static information pages
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
