
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function Currencies() {
  const mockCurrencies = [
    { id: 1, title: "US Dollar", code: "USD", symbol: "$", value: 1.0000, status: "Enabled" },
    { id: 2, title: "Euro", code: "EUR", symbol: "€", value: 0.8500, status: "Enabled" },
    { id: 3, title: "British Pound", code: "GBP", symbol: "£", value: 0.7500, status: "Disabled" },
  ];

  const columns = [
    { key: "title", header: "Currency" },
    { key: "code", header: "Code" },
    { key: "symbol", header: "Symbol" },
    { key: "value", header: "Value" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout title="Currencies">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Manage store currencies and exchange rates
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Currency
        </Button>
      </div>
      <DataTable data={mockCurrencies} columns={columns} />
    </PageLayout>
  );
}
