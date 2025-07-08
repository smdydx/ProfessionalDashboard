
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Tag, Package, Eye } from "lucide-react";

export default function Filters() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filters = [
    { id: 1, name: "Brand", group: "Manufacturer", status: "active", products: 156 },
    { id: 2, name: "Color", group: "Appearance", status: "active", products: 89 },
    { id: 3, name: "Size", group: "Dimensions", status: "active", products: 234 },
    { id: 4, name: "Material", group: "Properties", status: "inactive", products: 45 },
  ];

  const columns = [
    { accessorKey: "name", header: "Filter Name" },
    { accessorKey: "group", header: "Filter Group" },
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
      title="Filters"
      description="Manage product filters and filter groups"
      onAdd={() => {}}
      addButtonText="Add Filter"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Filters</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filters.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Filters</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filters.filter(f => f.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filter Groups</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(filters.map(f => f.group)).size}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filtered Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filters.reduce((sum, f) => sum + f.products, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={filters}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        isLoading={isLoading}
      />
    </PageLayout>
  );
}

