import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/common/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileText, CheckCircle, AlertCircle, RefreshCw, Calendar } from "lucide-react";

const importSchema = z.object({
  importType: z.enum(["csv", "xml", "json", "xlsx"]),
  mapping: z.string().optional(),
  overwrite: z.boolean().default(false),
  validateOnly: z.boolean().default(false),
});

type ImportFormData = z.infer<typeof importSchema>;

// Mock import history data
const mockImportHistory = [
  {
    id: 1,
    filename: "products_update_2024.csv",
    type: "csv",
    status: "completed",
    recordsTotal: 1250,
    recordsSuccess: 1245,
    recordsError: 5,
    startTime: "2024-01-15 10:30:00",
    endTime: "2024-01-15 10:45:00",
    duration: "15 minutes"
  },
  {
    id: 2,
    filename: "inventory_sync.xml",
    type: "xml",
    status: "failed",
    recordsTotal: 850,
    recordsSuccess: 0,
    recordsError: 850,
    startTime: "2024-01-14 16:20:00",
    endTime: "2024-01-14 16:22:00",
    duration: "2 minutes"
  },
  {
    id: 3,
    filename: "new_products.json",
    type: "json",
    status: "processing",
    recordsTotal: 500,
    recordsSuccess: 350,
    recordsError: 0,
    startTime: "2024-01-14 14:15:00",
    endTime: null,
    duration: "In progress"
  },
];

export default function ProductImport() {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: importHistory = mockImportHistory, isLoading = false } = useQuery({
    queryKey: ["/api/import/history"],
    queryFn: () => Promise.resolve(mockImportHistory),
  });

  const form = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      importType: "csv",
      mapping: "",
      overwrite: false,
      validateOnly: false,
    },
  });

  const importMutation = useMutation({
    mutationFn: (data: ImportFormData) => {
      return new Promise((resolve) => {
        setIsUploading(true);
        let progress = 0;
        
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            resolve({ success: true, recordsProcessed: 125 });
          }
        }, 200);
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/import/history"] });
      setIsImportDialogOpen(false);
      form.reset();
      setUploadProgress(0);
      toast({ title: `Import completed successfully. ${data.recordsProcessed} records processed.` });
    },
    onError: () => {
      setIsUploading(false);
      setUploadProgress(0);
      toast({ title: "Import failed", variant: "destructive" });
    },
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "processing": return "secondary";
      case "failed": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "processing": return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case "failed": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const onSubmit = (data: ImportFormData) => {
    importMutation.mutate(data);
  };

  return (
    <PageLayout
      title="Product Import"
      description="Import products from CSV, XML, JSON, or Excel files"
      onAdd={() => setIsImportDialogOpen(true)}
      addButtonText="Import Products"
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Import Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">1,245</div>
              <p className="text-sm text-gray-600">Products Imported Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <p className="text-sm text-gray-600">Active Import Jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <p className="text-sm text-gray-600">Failed Records</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">98.5%</div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Import History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {importHistory.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(record.status)}
                      <div>
                        <div className="font-medium">{record.filename}</div>
                        <div className="text-sm text-gray-500">
                          {record.recordsTotal} records • {record.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={getStatusVariant(record.status)}>
                        {record.status}
                      </Badge>
                      {record.status === "completed" && (
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">
                            {record.recordsSuccess} successful
                          </div>
                          {record.recordsError > 0 && (
                            <div className="text-sm text-red-600">
                              {record.recordsError} errors
                            </div>
                          )}
                        </div>
                      )}
                      {record.status === "processing" && (
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {record.recordsSuccess} / {record.recordsTotal}
                          </div>
                          <Progress value={(record.recordsSuccess / record.recordsTotal) * 100} className="w-20" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Product CSV Template
                  </CardTitle>
                  <CardDescription>
                    Standard CSV format for product import
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Inventory XML Template
                  </CardTitle>
                  <CardDescription>
                    XML format for inventory updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Category JSON Template
                  </CardTitle>
                  <CardDescription>
                    JSON format for category structure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Import Settings</CardTitle>
                <CardDescription>Configure default import behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Import Type</label>
                    <Select defaultValue="csv">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Batch Size</label>
                    <Input type="number" defaultValue="100" />
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import Products
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="importType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Import Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select import type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="xml">XML File</SelectItem>
                        <SelectItem value="json">JSON File</SelectItem>
                        <SelectItem value="xlsx">Excel File</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <label className="block text-sm font-medium mb-2">Select File</label>
                <Input type="file" accept=".csv,.xml,.json,.xlsx" />
              </div>

              <FormField
                control={form.control}
                name="mapping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Mapping (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Custom field mapping configuration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="overwrite"
                    {...form.register("overwrite")}
                  />
                  <label htmlFor="overwrite" className="text-sm">
                    Overwrite existing products
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="validateOnly"
                    {...form.register("validateOnly")}
                  />
                  <label htmlFor="validateOnly" className="text-sm">
                    Validate only (don't import)
                  </label>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Importing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsImportDialogOpen(false)}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Importing..." : "Start Import"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}