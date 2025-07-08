
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Download } from "lucide-react";

export default function Downloads() {
  const columns = [
    { accessorKey: "name", header: "Download Name" },
    { accessorKey: "filename", header: "Filename" },
    { accessorKey: "size", header: "Size" },
    { accessorKey: "downloads", header: "Downloads" },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'enabled' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
    { 
      id: "actions", 
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, name: "Product Manual", filename: "manual.pdf", size: "2.5 MB", downloads: 156, status: "enabled" },
    { id: 2, name: "Software License", filename: "license.txt", size: "12 KB", downloads: 89, status: "enabled" },
    { id: 3, name: "Installation Guide", filename: "install.pdf", size: "1.8 MB", downloads: 234, status: "disabled" },
  ];

  return (
    <PageLayout title="Downloads" description="Manage downloadable files">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div></div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Download
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Downloads</CardTitle>
            <CardDescription>
              Manage downloadable files and their access
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
