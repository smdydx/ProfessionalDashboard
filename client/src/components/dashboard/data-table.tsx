import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@shared/schema";

export default function DataTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: orders, isLoading } = useQuery({
    queryKey: ["/api/orders"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders?.filter((order: Order) =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="glass-card hover:glow-effect transition-all duration-300">
      <CardHeader className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Latest Orders</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
              <Input
                type="search"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 active:scale-95">
              <Plus className="w-4 h-4 mr-2" />
              Add Order
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full table-fixed">
              <thead className="bg-white/5">
                <tr>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="w-32 px-3 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="w-32 px-3 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-28 px-3 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
            <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="px-3 py-3">
                        <Skeleton className="h-4 w-16 bg-white/20" />
                      </td>
                      <td className="px-3 py-3">
                        <Skeleton className="h-4 w-20 bg-white/20" />
                      </td>
                      <td className="px-3 py-3">
                        <Skeleton className="h-4 w-18 bg-white/20" />
                      </td>
                      <td className="px-3 py-3">
                        <Skeleton className="h-4 w-16 bg-white/20" />
                      </td>
                      <td className="px-3 py-3">
                        <Skeleton className="h-6 w-18 bg-white/20" />
                      </td>
                      <td className="px-3 py-3">
                        <Skeleton className="h-4 w-20 bg-white/20" />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center space-x-1">
                          <Skeleton className="h-6 w-6 bg-white/20" />
                          <Skeleton className="h-6 w-6 bg-white/20" />
                          <Skeleton className="h-6 w-6 bg-white/20" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : filteredOrders && filteredOrders.length > 0 ? (
                  filteredOrders.map((order: Order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-3 py-3 text-xs font-medium text-white truncate">
                        {order.orderId}
                      </td>
                      <td className="px-3 py-3 text-xs text-white/80 truncate" title={order.customerName}>
                        {order.customerName}
                      </td>
                      <td className="px-3 py-3 text-xs text-white/80 truncate" title={order.productName}>
                        {order.productName}
                      </td>
                      <td className="px-3 py-3 text-xs text-white font-medium">
                        Rs.{order.amount}
                      </td>
                      <td className="px-3 py-3">
                        <Badge className={`${getStatusColor(order.status)} text-xs px-2 py-1`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-xs text-white/60">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: '2-digit',
                          year: '2-digit'
                        }) : 'N/A'}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center space-x-1">
                          <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 hover:bg-white/10 h-7 w-7 p-0 transition-all duration-150 active:scale-95">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-white/10 h-7 w-7 p-0 transition-all duration-150 active:scale-95">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-white/10 h-7 w-7 p-0 transition-all duration-150 active:scale-95">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-white/60">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                          <Search className="w-6 h-6 text-white/40" />
                        </div>
                        <p className="text-sm">No orders found</p>
                        <p className="text-xs text-white/40">Try adjusting your search terms</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white/60">
            Showing {filteredOrders?.length || 0} results
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" disabled className="bg-white/10 border-white/20 text-white/60 text-xs px-3 py-1 h-7">
              Previous
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 h-7 active:scale-95 transition-all duration-150">
              1
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs px-3 py-1 h-7">
              2
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs px-3 py-1 h-7">
              3
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs px-3 py-1 h-7">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}