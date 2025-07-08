import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/common/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { User, Edit2, Shield, Bell, Key, Activity, Settings, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

// Mock admin profile data
const mockProfile = {
  id: 1,
  firstName: "Admin",
  lastName: "User",
  email: "admin@opencart.com",
  phone: "+1 (555) 123-4567",
  address: "123 Admin Street",
  city: "Admin City",
  country: "United States",
  bio: "Store administrator with full access privileges",
  role: "Super Admin",
  avatar: "/avatars/admin.jpg",
  lastLogin: "2024-01-15 10:30:00",
  createdAt: "2023-01-01",
  status: "active",
  permissions: ["all"],
  twoFactorEnabled: false,
  emailNotifications: true,
  smsNotifications: false,
};

// Mock activity data
const mockActivity = [
  {
    id: 1,
    action: "Updated product catalog",
    timestamp: "2024-01-15 10:30:00",
    ip: "192.168.1.1",
    userAgent: "Chrome 120.0.0.0"
  },
  {
    id: 2,
    action: "Modified system settings",
    timestamp: "2024-01-15 09:15:00",
    ip: "192.168.1.1",
    userAgent: "Chrome 120.0.0.0"
  },
  {
    id: 3,
    action: "Added new user",
    timestamp: "2024-01-14 16:45:00",
    ip: "192.168.1.1",
    userAgent: "Chrome 120.0.0.0"
  },
];

export default function AdminProfile() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile = mockProfile, isLoading = false } = useQuery({
    queryKey: ["/api/admin/profile"],
    queryFn: () => Promise.resolve(mockProfile),
  });

  const { data: activity = mockActivity } = useQuery({
    queryKey: ["/api/admin/activity"],
    queryFn: () => Promise.resolve(mockActivity),
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      country: profile.country || "",
      bio: profile.bio || "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormData) => {
      return Promise.resolve({ ...profile, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/profile"] });
      setIsEditDialogOpen(false);
      toast({ title: "Profile updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update profile", variant: "destructive" });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: PasswordFormData) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      setIsPasswordDialogOpen(false);
      passwordForm.reset();
      toast({ title: "Password updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update password", variant: "destructive" });
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    updatePasswordMutation.mutate(data);
  };

  const handleEditProfile = () => {
    profileForm.reset({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      country: profile.country || "",
      bio: profile.bio || "",
    });
    setIsEditDialogOpen(true);
  };

  return (
    <PageLayout
      title="Admin Profile"
      description="Manage your administrator profile and account settings"
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                <AvatarFallback className="text-lg">
                  {profile.firstName?.[0]}{profile.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="default">{profile.role}</Badge>
                  <Badge variant={profile.status === "active" ? "default" : "secondary"}>
                    {profile.status}
                  </Badge>
                </div>
              </div>
              <Button onClick={handleEditProfile} className="flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{profile.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{profile.address ? `${profile.address}, ${profile.city}, ${profile.country}` : "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Member since {profile.createdAt}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Last Login</label>
                    <p className="text-sm text-gray-600">{profile.lastLogin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Account Status</label>
                    <p className="text-sm text-green-600 capitalize">{profile.status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <p className="text-sm text-blue-600">{profile.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    <p className="text-sm text-gray-600">{profile.bio || "No bio provided"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Password Security
                  </CardTitle>
                  <CardDescription>
                    Keep your account secure with a strong password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => setIsPasswordDialogOpen(true)}
                    className="w-full"
                  >
                    Change Password
                  </Button>
                  <div className="text-sm text-gray-600">
                    Last password change: January 1, 2024
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Enable 2FA</span>
                    <Switch checked={profile.twoFactorEnabled} />
                  </div>
                  <Button variant="outline" className="w-full">
                    Configure 2FA
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Email Notifications</label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch checked={profile.emailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">SMS Notifications</label>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <Switch checked={profile.smsNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Push Notifications</label>
                    <p className="text-sm text-gray-600">Receive browser push notifications</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your recent account activity and login history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.action}</div>
                        <div className="text-sm text-gray-600">
                          {item.timestamp} • {item.ip}
                        </div>
                      </div>
                      <Badge variant="outline">{item.userAgent.split(' ')[0]}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={profileForm.control}
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
                  control={profileForm.control}
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
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={profileForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={profileForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter bio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateProfileMutation.isPending}>
                  Update Profile
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Change Password
            </DialogTitle>
          </DialogHeader>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updatePasswordMutation.isPending}>
                  Update Password
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}