
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Key, Copy } from "lucide-react";

export default function API() {
  const mockApiKeys = [
    { id: 1, name: "Frontend App", key: "sk-123...xyz", status: "Active", created: "2024-01-15" },
    { id: 2, name: "Mobile App", key: "sk-456...abc", status: "Active", created: "2024-02-10" },
  ];

  const columns = [
    { key: "name", header: "API Key Name" },
    { key: "key", header: "Key" },
    { key: "status", header: "Status" },
    { key: "created", header: "Created" },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout title="API">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage API keys and access tokens for external integrations
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate New API Key
            </Button>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-4">Active API Keys</h3>
          <DataTable data={mockApiKeys} columns={columns} />
        </div>
      </div>
    </PageLayout>
  );
}
