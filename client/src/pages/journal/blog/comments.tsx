
import { PageLayout } from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";

export default function BlogComments() {
  const columns = [
    { accessorKey: "author", header: "Author" },
    { accessorKey: "post", header: "Post" },
    { accessorKey: "comment", header: "Comment" },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'approved' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
    { accessorKey: "date", header: "Date" },
    { 
      id: "actions", 
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Check className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><X className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, author: "User123", post: "Getting Started with React", comment: "Great article! Very helpful.", status: "approved", date: "2024-01-15" },
    { id: 2, author: "WebDev", post: "Business Growth Strategies", comment: "Need more examples please.", status: "pending", date: "2024-01-14" },
    { id: 3, author: "CodeMaster", post: "Modern Web Development", comment: "Excellent content!", status: "approved", date: "2024-01-13" },
  ];

  return (
    <PageLayout title="Blog Comments" description="Manage blog comments and moderation">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
            <CardDescription>
              Moderate and manage blog comments
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
