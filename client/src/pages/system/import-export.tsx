
import { useState } from "react";
import { PageLayout } from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, FileText, Package, Users, ShoppingCart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ImportExport() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const exportOptions = [
    { 
      id: 1, 
      name: "Products", 
      description: "Export all product data including inventory", 
      icon: Package,
      count: 1250 
    },
    { 
      id: 2, 
      name: "Customers", 
      description: "Export customer information and profiles", 
      icon: Users,
      count: 850 
    },
    { 
      id: 3, 
      name: "Orders", 
      description: "Export order history and transaction data", 
      icon: ShoppingCart,
      count: 2300 
    },
    { 
      id: 4, 
      name: "Categories", 
      description: "Export product categories and structure", 
      icon: FileText,
      count: 45 
    },
  ];

  return (
    <PageLayout
      title="Import / Export"
      description="Import and export store data in various formats"
      isLoading={isLoading}
    >
      <Tabs defaultValue="export" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="import">Import Data</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-lg">{option.name}</CardTitle>
                    </div>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{option.count} records</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Export</CardTitle>
              <CardDescription>Export all store data in a single archive</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Complete Store Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-dashed border-gray-300">
              <CardHeader className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <CardTitle>Import Products</CardTitle>
                <CardDescription>Upload CSV or Excel file with product data</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-gray-300">
              <CardHeader className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <CardTitle>Import Customers</CardTitle>
                <CardDescription>Upload customer data in CSV format</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-gray-300">
              <CardHeader className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <CardTitle>Import Categories</CardTitle>
                <CardDescription>Upload category structure data</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-gray-300">
              <CardHeader className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <CardTitle>Bulk Import</CardTitle>
                <CardDescription>Import complete store backup</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Archive
                </Button>
              </CardContent>
            </Card>
          </div>

          {uploadProgress > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Import Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-500 mt-2">{uploadProgress}% completed</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
