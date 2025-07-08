import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/common/page-layout";
import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Users as UsersIcon, UserPlus, Shield, Mail, Phone, Calendar, Eye, Edit2, Trash2 } from "lucide-react";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.enum(["admin", "manager", "editor", "viewer"]),
  status: z.enum(["active", "inactive", "suspended"]),
  permissions: z.array(z.string()).optional(),
});

type UserFormData = z.infer<typeof userSchema>;

// Mock users data
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@opencart.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    avatar: "/avatars/john.jpg",
    lastLogin: "2024-01-15 10:30:00",
    createdAt: "2023-01-01",
    permissions: ["all"]
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@opencart.com",
    phone: "+1 (555) 987-6543",
    role: "manager",
    status: "active",
    avatar: "/avatars/jane.jpg",
    lastLogin: "2024-01-14 16:45:00",
    createdAt: "2023-03-15",
    permissions: ["orders", "customers", "products"]
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@opencart.com",
    phone: "+1 (555) 456-7890",
    role: "editor",
    status: "inactive",
    avatar: "/avatars/bob.jpg",
    lastLogin: "2024-01-10 09:20:00",
    createdAt: "2023-06-20",
    permissions: ["products", "categories"]
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Williams",
    email: "alice.williams@opencart.com",
    phone: "+1 (555) 321-0987",
    role: "viewer",
    status: "active",
    avatar: "/avatars/alice.jpg",
    lastLogin: "2024-01-13 14:15:00",
    createdAt: "2023-09-10",
    permissions: ["reports"]
  },
];

const rolePermissions = {
  admin: ["all"],
  manager: ["orders", "customers", "products", "reports"],
  editor: ["products", "categories", "content"],
  viewer: ["reports"]
};

export default function Users() {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = mockUsers, isLoading = false } = useQuery({
    queryKey: ["/api/users"],
    queryFn: () => Promise.resolve(mockUsers),
  });

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "viewer",
      status: "active",
      permissions: [],
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: UserFormData) => {
      return Promise.resolve({ 
        id: Date.now(), 
        ...data,
        permissions: rolePermissions[data.role],
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: "Never"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "User created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create user", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserFormData }) => {
      return Promise.resolve({ 
        id, 
        ...data,
        permissions: rolePermissions[data.role]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsDialogOpen(false);
      setEditingUser(null);
      form.reset();
      toast({ title: "User updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update user", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({ title: "User deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete user", variant: "destructive" });
    },
  });

  const filteredUsers = users?.filter((user: any) =>
    user.firstName?.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "suspended": return "destructive";
      default: return "outline";
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "admin": return "default";
      case "manager": return "secondary";
      case "editor": return "outline";
      case "viewer": return "outline";
      default: return "outline";
    }
  };

  const columns = [
    {
      key: "avatar",
      header: "User",
      render: (value: string, item: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={item.avatar} alt={`${item.firstName} ${item.lastName}`} />
            <AvatarFallback>
              {item.firstName?.[0]}{item.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{item.firstName} {item.lastName}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (value: string) => (
        <span className="text-sm">{value || "Not provided"}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (value: string) => (
        <Badge variant={getRoleVariant(value)}>{value}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>{value}</Badge>
      ),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (value: string) => (
        <span className="text-sm text-gray-500">{value}</span>
      ),
    },
  ];

  const onSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    form.reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "viewer",
      status: user.status || "active",
      permissions: user.permissions || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (user: any) => {
    if (user.role === "admin") {
      toast({ title: "Cannot delete admin user", variant: "destructive" });
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(user.id);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <PageLayout
      title="Users"
      description="Manage system users and their permissions"
      onAdd={handleAdd}
      addButtonText="Add User"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isLoading={isLoading}
    >
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <DataTable
            data={filteredUsers}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role} className="border rounded-lg p-4">
                <h3 className="font-semibold capitalize mb-2">{role}</h3>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["all", "orders", "customers", "products", "categories", "reports", "content"].map((permission) => (
              <div key={permission} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{permission}</span>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {permission === "all" ? "Full system access" : `Access to ${permission} management`}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
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
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingUser ? "Update" : "Create"} User
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}