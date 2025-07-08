
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function Languages() {
  const mockLanguages = [
    { id: 1, name: "English", code: "en-gb", locale: "en_GB.UTF-8", status: "Enabled" },
    { id: 2, name: "Spanish", code: "es", locale: "es_ES.UTF-8", status: "Enabled" },
    { id: 3, name: "French", code: "fr", locale: "fr_FR.UTF-8", status: "Disabled" },
  ];

  const columns = [
    { key: "name", header: "Language" },
    { key: "code", header: "Code" },
    { key: "locale", header: "Locale" },
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
    <PageLayout title="Languages">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Manage store languages and localization
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </Button>
      </div>
      <DataTable data={mockLanguages} columns={columns} />
    </PageLayout>
  );
}
