
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bug, Info, AlertCircle, Trash2 } from "lucide-react";

const errorLogs = [
  { 
    id: 1, 
    level: "Error", 
    message: "Database connection failed", 
    file: "/system/database.php", 
    line: 45, 
    timestamp: "2024-01-15 14:30:25",
    count: 3 
  },
  { 
    id: 2, 
    level: "Warning", 
    message: "Deprecated function used", 
    file: "/catalog/controller/product.php", 
    line: 123, 
    timestamp: "2024-01-15 14:25:10",
    count: 1 
  },
  { 
    id: 3, 
    level: "Notice", 
    message: "Undefined variable", 
    file: "/admin/view/template/common/header.tpl", 
    line: 67, 
    timestamp: "2024-01-15 14:20:05",
    count: 5 
  },
  { 
    id: 4, 
    level: "Error", 
    message: "Payment gateway timeout", 
    file: "/system/library/payment/paypal.php", 
    line: 89, 
    timestamp: "2024-01-15 14:15:30",
    count: 2 
  },
];

const columns = [
  { 
    key: "level", 
    label: "Level", 
    sortable: true,
    render: (value: string) => {
      const variants = {
        Error: "destructive",
        Warning: "secondary", 
        Notice: "outline"
      };
      return <Badge variant={variants[value] || "default"}>{value}</Badge>;
    }
  },
  { key: "message", label: "Message", sortable: true },
  { key: "file", label: "File", sortable: true },
  { key: "line", label: "Line", sortable: true },
  { key: "count", label: "Count", sortable: true },
  { key: "timestamp", label: "Last Occurrence", sortable: true },
];

export default function ErrorLogs() {
  return (
    <PageLayout
      title="Error Logs"
      subtitle="View and manage system error logs"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            Download Logs
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Logs
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Errors</p>
                  <p className="text-2xl font-bold text-red-600">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Info className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Notices</p>
                  <p className="text-2xl font-bold text-blue-600">34</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bug className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Debug</p>
                  <p className="text-2xl font-bold text-purple-600">78</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Error Log Entries</CardTitle>
            <CardDescription>
              Recent error log entries from your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={errorLogs}
              searchPlaceholder="Search error logs..."
              onView={(item) => console.log("View error details", item)}
              onDelete={(item) => console.log("Delete error log", item)}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
