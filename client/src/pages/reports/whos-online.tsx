
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, Clock, Globe } from "lucide-react";

export default function WhosOnline() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onlineUsers = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      type: "customer", 
      ip: "192.168.1.100", 
      location: "New York, US",
      page: "/products/electronics",
      lastActivity: "2 minutes ago",
      sessionTime: "15 minutes"
    },
    { 
      id: 2, 
      name: "Admin User", 
      email: "admin@store.com", 
      type: "admin", 
      ip: "192.168.1.50", 
      location: "California, US",
      page: "/admin/dashboard",
      lastActivity: "1 minute ago",
      sessionTime: "45 minutes"
    },
    { 
      id: 3, 
      name: "Guest User", 
      email: "guest", 
      type: "guest", 
      ip: "203.0.113.5", 
      location: "London, UK",
      page: "/checkout",
      lastActivity: "30 seconds ago",
      sessionTime: "8 minutes"
    },
  ];

  const columns = [
    { 
      accessorKey: "name", 
      header: "User",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-gray-500">{row.original.email}</div>
        </div>
      )
    },
    { 
      accessorKey: "type", 
      header: "Type",
      cell: ({ row }: any) => (
        <Badge variant={
          row.getValue("type") === "admin" ? "default" : 
          row.getValue("type") === "customer" ? "secondary" : 
          "outline"
        }>
          {row.getValue("type")}
        </Badge>
      )
    },
    { 
      accessorKey: "location", 
      header: "Location",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <span>{row.getValue("location")}</span>
        </div>
      )
    },
    { accessorKey: "page", header: "Current Page" },
    { 
      accessorKey: "lastActivity", 
      header: "Last Activity",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{row.getValue("lastActivity")}</span>
        </div>
      )
    },
    { accessorKey: "sessionTime", header: "Session Time" },
  ];

  const stats = {
    totalOnline: onlineUsers.length,
    customers: onlineUsers.filter(u => u.type === 'customer').length,
    guests: onlineUsers.filter(u => u.type === 'guest').length,
    admins: onlineUsers.filter(u => u.type === 'admin').length,
  };

  return (
    <PageLayout
      title="Who's Online"
      description="Monitor real-time user activity on your store"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Online</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOnline}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <p className="text-xs text-muted-foreground">Logged in customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guests</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.guests}</div>
            <p className="text-xs text-muted-foreground">Guest visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admins}</div>
            <p className="text-xs text-muted-foreground">Admin users</p>
          </CardContent>
        </Card>
      </div>

      {/* Online Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Currently Online Users</CardTitle>
          <CardDescription>Real-time view of active users on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={onlineUsers}
            columns={columns}
            onEdit={() => {}}
            onDelete={() => {}}
            isLoading={isLoading}
            hideActions={true}
          />
        </CardContent>
      </Card>

      {/* Page Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Pages</CardTitle>
          <CardDescription>Most visited pages by current online users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>/products/electronics</span>
              <Badge>1 user</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>/admin/dashboard</span>
              <Badge>1 user</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>/checkout</span>
              <Badge>1 user</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
