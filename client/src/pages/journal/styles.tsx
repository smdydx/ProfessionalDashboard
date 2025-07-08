
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
import { Palette } from "lucide-react";

const styleSchema = z.object({
  name: z.string().min(1, "Style name is required"),
  selector: z.string().min(1, "CSS selector is required"),
  css: z.string().min(1, "CSS rules are required"),
  category: z.string().min(1, "Category is required"),
  priority: z.number().min(1).max(100),
  status: z.enum(["active", "inactive"]),
});

type StyleFormData = z.infer<typeof styleSchema>;

const mockStyles = [
  {
    id: 1,
    name: "Button Primary",
    selector: ".btn-primary",
    css: "background-color: #007bff; color: white; border: none; padding: 8px 16px;",
    category: "Buttons",
    priority: 10,
    status: "active"
  },
  {
    id: 2,
    name: "Header Style",
    selector: ".header",
    css: "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;",
    category: "Layout",
    priority: 5,
    status: "active"
  },
  {
    id: 3,
    name: "Card Shadow",
    selector: ".card",
    css: "box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px;",
    category: "Components",
    priority: 8,
    status: "active"
  }
];

export default function Styles() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStyle, setEditingStyle] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: styles = mockStyles, isLoading = false } = useQuery({
    queryKey: ["/api/journal/styles"],
    queryFn: () => Promise.resolve(mockStyles),
  });

  const form = useForm<StyleFormData>({
    resolver: zodResolver(styleSchema),
    defaultValues: {
      name: "",
      selector: "",
      css: "",
      category: "",
      priority: 10,
      status: "active",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: StyleFormData) => {
      return Promise.resolve({ id: Date.now(), ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/styles"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Style created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: StyleFormData }) => {
      return Promise.resolve({ id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/styles"] });
      setIsDialogOpen(false);
      setEditingStyle(null);
      form.reset();
      toast({ title: "Style updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/styles"] });
      toast({ title: "Style deleted successfully" });
    },
  });

  const filteredStyles = styles?.filter((style: any) =>
    style.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
    style.selector?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const columns = [
    {
      key: "name",
      header: "Style Name",
    },
    {
      key: "selector",
      header: "CSS Selector",
      render: (value: string) => <span className="font-mono text-sm">{value}</span>,
    },
    {
      key: "css",
      header: "CSS Rules",
      render: (value: string) => (
        <div className="max-w-xs truncate font-mono text-sm">{value}</div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (value: string) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "priority",
      header: "Priority",
      render: (value: number) => <Badge>{value}</Badge>,
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

  const onSubmit = (data: StyleFormData) => {
    if (editingStyle) {
      updateMutation.mutate({ id: editingStyle.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (style: any) => {
    setEditingStyle(style);
    form.reset(style);
    setIsDialogOpen(true);
  };

  const handleDelete = (style: any) => {
    if (window.confirm("Are you sure you want to delete this style?")) {
      deleteMutation.mutate(style.id);
    }
  };

  const handleAdd = () => {
    setEditingStyle(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Styles"
      description="Manage custom CSS styles and rules"
      onAdd={handleAdd}
      addButtonText="Add Style"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <DataTable
        data={filteredStyles}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              {editingStyle ? "Edit Style" : "Add New Style"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Button Primary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="selector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CSS Selector</FormLabel>
                    <FormControl>
                      <Input placeholder=".btn-primary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="css"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CSS Rules</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="background-color: #007bff; color: white;" 
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Buttons" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority (1-100)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="100" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  {editingStyle ? "Update" : "Create"} Style
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
