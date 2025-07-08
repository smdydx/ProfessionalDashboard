
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const countries = [
  { id: 1, name: "United States", isoCode2: "US", isoCode3: "USA", status: true },
  { id: 2, name: "United Kingdom", isoCode2: "GB", isoCode3: "GBR", status: true },
  { id: 3, name: "Canada", isoCode2: "CA", isoCode3: "CAN", status: true },
  { id: 4, name: "Australia", isoCode2: "AU", isoCode3: "AUS", status: true },
  { id: 5, name: "Germany", isoCode2: "DE", isoCode3: "DEU", status: true },
  { id: 6, name: "France", isoCode2: "FR", isoCode3: "FRA", status: true },
  { id: 7, name: "India", isoCode2: "IN", isoCode3: "IND", status: true },
  { id: 8, name: "Japan", isoCode2: "JP", isoCode3: "JPN", status: true },
];

const columns = [
  { key: "name", label: "Country Name", sortable: true },
  { key: "isoCode2", label: "ISO Code (2)", sortable: true },
  { key: "isoCode3", label: "ISO Code (3)", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function Countries() {
  return (
    <PageLayout
      title="Countries"
      subtitle="Manage country configurations"
      actions={
        <Button>
          Add Country
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Country List</CardTitle>
          <CardDescription>
            Configure countries for shipping and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={countries}
            searchPlaceholder="Search countries..."
            addButtonText="Add Country"
            onAdd={() => console.log("Add country")}
            onEdit={(item) => console.log("Edit country", item)}
            onDelete={(item) => console.log("Delete country", item)}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
