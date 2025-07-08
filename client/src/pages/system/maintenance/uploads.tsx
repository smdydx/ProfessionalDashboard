
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, File, Image, Video } from "lucide-react";

const uploads = [
  { id: 1, name: "product-image-1.jpg", type: "Image", size: "256 KB", uploaded: "2024-01-15", status: "Complete" },
  { id: 2, name: "product-manual.pdf", type: "Document", size: "1.2 MB", uploaded: "2024-01-15", status: "Complete" },
  { id: 3, name: "banner-video.mp4", type: "Video", size: "15.3 MB", uploaded: "2024-01-14", status: "Complete" },
  { id: 4, name: "product-catalog.zip", type: "Archive", size: "5.7 MB", uploaded: "2024-01-14", status: "Complete" },
  { id: 5, name: "logo-new.png", type: "Image", size: "45 KB", uploaded: "2024-01-13", status: "Complete" },
];

const columns = [
  { key: "name", label: "File Name", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "size", label: "Size", sortable: true },
  { key: "uploaded", label: "Uploaded Date", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function Uploads() {
  return (
    <PageLayout
      title="Uploads"
      subtitle="Manage file uploads and storage"
      actions={
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Image className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Images</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Video className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Videos</p>
                  <p className="text-2xl font-bold">56</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Documents</p>
                  <p className="text-2xl font-bold">789</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Upload className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Total Size</p>
                  <p className="text-2xl font-bold">2.3 GB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>
              Current storage usage and limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Used Space</span>
                <span>2.3 GB / 10 GB</span>
              </div>
              <Progress value={23} className="h-2" />
              <p className="text-xs text-muted-foreground">
                7.7 GB remaining space available
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>
              View and manage your recently uploaded files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={uploads}
              searchPlaceholder="Search uploads..."
              addButtonText="Upload Files"
              onAdd={() => console.log("Upload files")}
              onView={(item) => console.log("View file", item)}
              onDelete={(item) => console.log("Delete file", item)}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
