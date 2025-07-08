
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Gift } from "lucide-react";

export default function Vouchers() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gift Vouchers</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Voucher
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gift Vouchers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Gift className="h-5 w-5 text-purple-500" />
                <div>
                  <h4 className="font-medium">GIFT50</h4>
                  <p className="text-sm text-muted-foreground">$50 Gift Voucher - Active</p>
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
                <Gift className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">HOLIDAY100</h4>
                  <p className="text-sm text-muted-foreground">$100 Holiday Voucher - Active</p>
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
