
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Star, Eye } from "lucide-react";

export default function Reviews() {
  const columns = [
    { accessorKey: "product", header: "Product" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "rating", header: "Rating", cell: ({ row }: any) => (
      <div className="flex items-center">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
        <span>{row.original.rating}</span>
      </div>
    )},
    { accessorKey: "text", header: "Review" },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.original.status === 'approved' ? 'default' : 'secondary'}>{row.original.status}</Badge> },
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
    { id: 1, product: "Wireless Headphones", author: "John Smith", rating: 5, text: "Excellent quality and sound...", status: "approved", date: "2024-01-15" },
    { id: 2, product: "Smart Watch", author: "Jane Doe", rating: 4, text: "Good product but battery could be better...", status: "pending", date: "2024-01-14" },
    { id: 3, product: "Bluetooth Speaker", author: "Mike Johnson", rating: 3, text: "Average quality, works fine...", status: "approved", date: "2024-01-13" },
  ];

  return (
    <PageLayout title="Reviews" description="Manage product reviews">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Reviews</CardTitle>
            <CardDescription>
              Manage and moderate product reviews
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
