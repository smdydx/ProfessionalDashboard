
import { PageLayout } from "@/components/common/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, DollarSign } from "lucide-react";

export default function PriceManagement() {
  return (
    <PageLayout title="Price Management">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Bulk Price Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update prices for multiple products at once
            </p>
            <Button className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Price File
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Export current product prices
            </p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage pricing rules and calculations
            </p>
            <Button variant="outline" className="w-full">
              Manage Rules
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
