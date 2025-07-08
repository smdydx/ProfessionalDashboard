
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Eye, MousePointer, Calendar } from "lucide-react";

export default function Banners() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const banners = [
    { id: 1, name: "Summer Sale Banner", type: "image", status: "active", clicks: 156, views: 2340 },
    { id: 2, name: "New Arrivals", type: "slideshow", status: "active", clicks: 89, views: 1560 },
    { id: 3, name: "Footer Promotion", type: "text", status: "inactive", clicks: 234, views: 890 },
    { id: 4, name: "Header Announcement", type: "html", status: "active", clicks: 45, views: 1200 },
  ];

  const columns = [
    { accessorKey: "name", header: "Banner Name" },
    { accessorKey: "type", header: "Type" },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }: any) => (
        <Badge variant={row.getValue("status") === "active" ? "default" : "secondary"}>
          {row.getValue("status")}
        </Badge>
      )
    },
    { accessorKey: "views", header: "Views" },
    { accessorKey: "clicks", header: "Clicks" },
  ];

  return (
    <PageLayout
      title="Banners"
      description="Manage promotional banners and advertisements"
      onAdd={() => {}}
      addButtonText="Add Banner"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Banners</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.filter(b => b.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.reduce((sum, b) => sum + b.views, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.reduce((sum, b) => sum + b.clicks, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={banners}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        isLoading={isLoading}
      />
    </PageLayout>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Image } from "lucide-react";

export default function Banners() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Banners</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Website Banners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Image className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Homepage Banner</h4>
                  <p className="text-sm text-muted-foreground">Main promotional banner - Active</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Image className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">Sale Banner</h4>
                  <p className="text-sm text-muted-foreground">Seasonal sale promotion - Active</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
