
import PageLayout from "@/components/common/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Upload } from "lucide-react";

export default function InventoryUpdate() {
  return (
    <PageLayout title="Inventory Qty or Price Update">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Quantity Update
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Update inventory quantities for multiple products
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Quantity File
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bulk Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Perform bulk inventory operations
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Zero All Quantities
              </Button>
              <Button variant="outline" className="w-full">
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
