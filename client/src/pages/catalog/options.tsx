
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, List, Package, CheckSquare } from "lucide-react";

export default function Options() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const options = [
    { id: 1, name: "Size", type: "select", required: true, status: "active", products: 156 },
    { id: 2, name: "Color", type: "radio", required: true, status: "active", products: 89 },
    { id: 3, name: "Custom Text", type: "text", required: false, status: "active", products: 234 },
    { id: 4, name: "Gift Wrap", type: "checkbox", required: false, status: "inactive", products: 45 },
  ];

  const columns = [
    { accessorKey: "name", header: "Option Name" },
    { accessorKey: "type", header: "Type" },
    { 
      accessorKey: "required", 
      header: "Required",
      cell: ({ row }: any) => (
        <Badge variant={row.getValue("required") ? "default" : "secondary"}>
          {row.getValue("required") ? "Yes" : "No"}
        </Badge>
      )
    },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }: any) => (
        <Badge variant={row.getValue("status") === "active" ? "default" : "secondary"}>
          {row.getValue("status")}
        </Badge>
      )
    },
    { accessorKey: "products", header: "Products" },
  ];

  return (
    <PageLayout
      title="Options"
      description="Manage product options and option values"
      onAdd={() => {}}
      addButtonText="Add Option"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Options</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{options.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Options</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{options.filter(o => o.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Required Options</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{options.filter(o => o.required).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products with Options</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{options.reduce((sum, o) => sum + o.products, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={options}
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
import { Plus, Edit, Trash2 } from "lucide-react";

export default function Options() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Options</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Option
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Checkbox Option</h4>
                <p className="text-sm text-muted-foreground">Yes/No type options</p>
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
              <div>
                <h4 className="font-medium">Select Option</h4>
                <p className="text-sm text-muted-foreground">Dropdown selection options</p>
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
