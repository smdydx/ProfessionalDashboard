import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Factory, Plus, Edit, Trash2, Eye, Building } from "lucide-react";

export default function Manufacturers() {
  const [isLoading, setIsLoading] = useState(false);

  const manufacturers = [
    { 
      id: 1, 
      name: "Apple Inc.", 
      description: "Technology company specializing in consumer electronics",
      status: "Active",
      products: 45,
      website: "https://apple.com"
    },
    { 
      id: 2, 
      name: "Samsung Electronics", 
      description: "South Korean multinational electronics corporation",
      status: "Active",
      products: 38,
      website: "https://samsung.com"
    },
    { 
      id: 3, 
      name: "Sony Corporation", 
      description: "Japanese multinational conglomerate corporation",
      status: "Active",
      products: 22,
      website: "https://sony.com"
    },
    { 
      id: 4, 
      name: "LG Electronics", 
      description: "South Korean multinational electronics company",
      status: "Inactive",
      products: 15,
      website: "https://lg.com"
    },
  ];

  return (
    <PageLayout
      title="Manufacturers"
      description="Manage product manufacturers and brands"
      isLoading={isLoading}
    >
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Manufacturers List</TabsTrigger>
          <TabsTrigger value="add">Add Manufacturer</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Factory className="h-5 w-5" />
              <span className="font-medium">Total Manufacturers: {manufacturers.length}</span>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Manufacturer
            </Button>
          </div>

          <div className="grid gap-4">
            {manufacturers.map((manufacturer) => (
              <Card key={manufacturer.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{manufacturer.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {manufacturer.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={manufacturer.status === 'Active' ? 'default' : 'secondary'}>
                      {manufacturer.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">{manufacturer.products}</span>
                        <span className="ml-1">Products</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Website:</span>
                        <span className="ml-1">{manufacturer.website}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Manufacturer</CardTitle>
              <CardDescription>Create a new manufacturer entry for your catalog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="manufacturer-name">Manufacturer Name</Label>
                <Input id="manufacturer-name" placeholder="Enter manufacturer name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter manufacturer description" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="contact@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Enter country" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" rows={2} />
              </div>
              <Button>Add Manufacturer</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}