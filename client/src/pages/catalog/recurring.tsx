
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Repeat, Calendar, DollarSign, Users } from "lucide-react";

export default function RecurringProfiles() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const profiles = [
    { id: 1, name: "Monthly Subscription", frequency: "Monthly", price: 29.99, status: "active", customers: 156 },
    { id: 2, name: "Annual Plan", frequency: "Yearly", price: 299.99, status: "active", customers: 89 },
    { id: 3, name: "Weekly Service", frequency: "Weekly", price: 9.99, status: "inactive", customers: 23 },
  ];

  const columns = [
    { accessorKey: "name", header: "Profile Name" },
    { accessorKey: "frequency", header: "Frequency" },
    { 
      accessorKey: "price", 
      header: "Price",
      cell: ({ row }: any) => `$${row.getValue("price")}`
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
    { accessorKey: "customers", header: "Customers" },
  ];

  return (
    <PageLayout
      title="Recurring Profiles"
      description="Manage subscription and recurring payment profiles"
      onAdd={() => {}}
      addButtonText="Add Profile"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profiles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Profiles</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profiles.filter(p => p.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,456</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profiles.reduce((sum, p) => sum + p.customers, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={profiles}
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
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react";

export default function Recurring() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Recurring Products</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Recurring Product
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recurring Products List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Monthly Subscription Box</h4>
                  <p className="text-sm text-muted-foreground">Recurring monthly - $29.99</p>
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
                <RefreshCw className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">Weekly Delivery</h4>
                  <p className="text-sm text-muted-foreground">Recurring weekly - $15.99</p>
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
