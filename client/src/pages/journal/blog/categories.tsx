
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function BlogCategories() {
  const columns = [
    { accessorKey: "name", header: "Category Name" },
    { accessorKey: "slug", header: "Slug" },
    { accessorKey: "posts", header: "Posts", cell: ({ row }: any) => <Badge variant="secondary">{row.original.posts}</Badge> },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
    { 
      id: "actions", 
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, name: "Technology", slug: "technology", posts: 15, status: "active" },
    { id: 2, name: "Business", slug: "business", posts: 8, status: "active" },
    { id: 3, name: "Lifestyle", slug: "lifestyle", posts: 12, status: "inactive" },
  ];

  return (
    <PageLayout title="Blog Categories" description="Manage your blog categories">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div></div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Manage blog categories and their settings
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
