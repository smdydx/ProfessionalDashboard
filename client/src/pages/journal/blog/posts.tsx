
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

export default function BlogPosts() {
  const columns = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'published' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
    { accessorKey: "date", header: "Date" },
    { 
      id: "actions", 
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, title: "Getting Started with React", author: "John Doe", category: "Technology", status: "published", date: "2024-01-15" },
    { id: 2, title: "Business Growth Strategies", author: "Jane Smith", category: "Business", status: "draft", date: "2024-01-14" },
    { id: 3, title: "Modern Web Development", author: "Bob Johnson", category: "Technology", status: "published", date: "2024-01-13" },
  ];

  return (
    <PageLayout title="Blog Posts" description="Manage your blog posts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div></div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>
              Manage blog posts and their content
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
