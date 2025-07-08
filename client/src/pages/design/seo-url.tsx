
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Link } from "lucide-react";

export default function SeoUrl() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SEO URLs</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add SEO URL
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>URL Aliases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Link className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <h4 className="font-medium">Product Category</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-muted-foreground">From:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">index.php?route=product/category&category_id=20</code>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-muted-foreground">To:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">electronics</code>
                  </div>
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
                <Link className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <h4 className="font-medium">Product Page</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-muted-foreground">From:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">index.php?route=product/product&product_id=42</code>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-muted-foreground">To:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">apple-iphone-15</code>
                  </div>
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
