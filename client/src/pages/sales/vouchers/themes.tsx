
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Palette } from "lucide-react";

export default function VoucherThemes() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Voucher Themes</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Theme
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Palette className="h-5 w-5 text-blue-500" />
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h4 className="font-medium">Classic Blue</h4>
              <p className="text-sm text-muted-foreground">Professional blue theme</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Palette className="h-5 w-5 text-green-500" />
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h4 className="font-medium">Holiday Green</h4>
              <p className="text-sm text-muted-foreground">Festive green theme</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Palette className="h-5 w-5 text-purple-500" />
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h4 className="font-medium">Elegant Purple</h4>
              <p className="text-sm text-muted-foreground">Luxurious purple theme</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
