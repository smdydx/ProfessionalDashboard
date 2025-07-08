
import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Percent, DollarSign } from "lucide-react";
import { format } from "date-fns";

export default function MarketingCoupons() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const coupons = [
    { 
      id: 1, 
      code: "SAVE20", 
      name: "20% Off All Items", 
      type: "percentage", 
      value: 20, 
      status: "active",
      uses: 45,
      limit: 100,
      startDate: "2024-01-01",
      endDate: "2024-12-31"
    },
    { 
      id: 2, 
      code: "FREESHIP", 
      name: "Free Shipping", 
      type: "shipping", 
      value: 0, 
      status: "active",
      uses: 123,
      limit: 500,
      startDate: "2024-01-01",
      endDate: "2024-12-31"
    },
    { 
      id: 3, 
      code: "NEWUSER", 
      name: "$10 Off First Order", 
      type: "fixed", 
      value: 10, 
      status: "active",
      uses: 78,
      limit: 200,
      startDate: "2024-01-01",
      endDate: "2024-12-31"
    },
  ];

  const columns = [
    { 
      accessorKey: "code", 
      header: "Coupon Code",
      cell: ({ row }: any) => (
        <div className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
          {row.getValue("code")}
        </div>
      )
    },
    { accessorKey: "name", header: "Name" },
    { 
      accessorKey: "type", 
      header: "Type",
      cell: ({ row }: any) => {
        const type = row.getValue("type");
        const icons = {
          percentage: <Percent className="w-4 h-4" />,
          fixed: <DollarSign className="w-4 h-4" />,
          shipping: <DollarSign className="w-4 h-4" />
        };
        return (
          <div className="flex items-center gap-2">
            {icons[type as keyof typeof icons]}
            <span className="capitalize">{type}</span>
          </div>
        );
      }
    },
    { 
      accessorKey: "value", 
      header: "Value",
      cell: ({ row }: any) => {
        const type = row.original.type;
        const value = row.getValue("value");
        if (type === "percentage") return `${value}%`;
        if (type === "fixed") return `$${value}`;
        return "Free";
      }
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
    { 
      accessorKey: "uses", 
      header: "Usage",
      cell: ({ row }: any) => (
        <span>{row.getValue("uses")} / {row.original.limit}</span>
      )
    },
  ];

  return (
    <PageLayout
      title="Coupons"
      description="Manage promotional coupons and discount codes"
      onAdd={() => {}}
      addButtonText="Create Coupon"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Coupon List</TabsTrigger>
          <TabsTrigger value="create">Create Coupon</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coupons.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coupons.filter(c => c.status === 'active').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Uses</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coupons.reduce((sum, c) => sum + c.uses, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15%</div>
              </CardContent>
            </Card>
          </div>

          <DataTable
            data={coupons}
            columns={columns}
            onEdit={() => {}}
            onDelete={() => {}}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Coupon</CardTitle>
              <CardDescription>Set up a new promotional coupon code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coupon-code">Coupon Code</Label>
                  <Input id="coupon-code" placeholder="Enter coupon code" />
                </div>
                <div>
                  <Label htmlFor="coupon-name">Coupon Name</Label>
                  <Input id="coupon-name" placeholder="Enter coupon name" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discount-type">Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="discount-value">Discount Value</Label>
                  <Input id="discount-value" placeholder="Enter discount value" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="usage-limit">Usage Limit</Label>
                  <Input id="usage-limit" placeholder="Enter usage limit" />
                </div>
                <div>
                  <Label htmlFor="min-amount">Minimum Amount</Label>
                  <Input id="min-amount" placeholder="Enter minimum order amount" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button className="w-full">Create Coupon</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
