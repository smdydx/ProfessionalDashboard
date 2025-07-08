
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/common/page-layout";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";

const variableSchema = z.object({
  name: z.string().min(1, "Variable name is required"),
  value: z.string().min(1, "Variable value is required"),
  type: z.enum(["color", "font", "size", "text", "number"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

type VariableFormData = z.infer<typeof variableSchema>;

const mockVariables = [
  {
    id: 1,
    name: "primary_color",
    value: "#007bff",
    type: "color",
    category: "Colors",
    description: "Main brand color",
    status: "active"
  },
  {
    id: 2,
    name: "font_family",
    value: "Arial, sans-serif",
    type: "font",
    category: "Typography",
    description: "Default font family",
    status: "active"
  },
  {
    id: 3,
    name: "header_height",
    value: "60px",
    type: "size",
    category: "Layout",
    description: "Header height",
    status: "active"
  }
];

export default function Variables() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVariable, setEditingVariable] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: variables = mockVariables, isLoading = false } = useQuery({
    queryKey: ["/api/journal/variables"],
    queryFn: () => Promise.resolve(mockVariables),
  });

  const form = useForm<VariableFormData>({
    resolver: zodResolver(variableSchema),
    defaultValues: {
      name: "",
      value: "",
      type: "text",
      category: "",
      description: "",
      status: "active",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: VariableFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/variables"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Variable created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: VariableFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/variables"] });
      setIsDialogOpen(false);
      setEditingVariable(null);
      form.reset();
      toast({ title: "Variable updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/variables"] });
      toast({ title: "Variable deleted successfully" });
    },
  });

  const filteredVariables = variables?.filter((variable: any) =>
    variable.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    variable.category?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const columns = [
    {
      key: "name",
      header: "Variable Name",
      render: (value: string) => <span className="font-mono">{value}</span>,
    },
    {
      key: "value",
      header: "Value",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-2">
          {item.type === "color" && (
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: value }}
            />
          )}
          <span className="font-mono text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={value === "active" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
  ];

  const onSubmit = (data: VariableFormData) => {
    if (editingVariable) {
      updateMutation.mutate({ id: editingVariable.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (variable: any) => {
    setEditingVariable(variable);
    form.reset(variable);
    setIsDialogOpen(true);
  };

  const handleDelete = (variable: any) => {
    if (window.confirm("Are you sure you want to delete this variable?")) {
      deleteMutation.mutate(variable.id);
    }
  };

  const handleAdd = () => {
    setEditingVariable(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Variables"
      description="Manage CSS variables and custom properties"
      onAdd={handleAdd}
      addButtonText="Add Variable"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredVariables}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {editingVariable ? "Edit Variable" : "Add New Variable"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variable Name</FormLabel>
                    <FormControl>
                      <Input placeholder="primary_color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="color">Color</SelectItem>
                          <SelectItem value="font">Font</SelectItem>
                          <SelectItem value="size">Size</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Colors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input placeholder="#007bff" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description of the variable" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingVariable ? "Update" : "Create"} Variable
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
