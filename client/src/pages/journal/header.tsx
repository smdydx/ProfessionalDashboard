
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/common/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Layout, Image, Menu, Search } from "lucide-react";

const headerSchema = z.object({
  logoText: z.string().min(1, "Logo text is required"),
  logoImage: z.string().optional(),
  height: z.string().min(1, "Header height is required"),
  backgroundColor: z.string().min(1, "Background color is required"),
  textColor: z.string().min(1, "Text color is required"),
  showSearch: z.boolean(),
  showCart: z.boolean(),
  showWishlist: z.boolean(),
  showAccount: z.boolean(),
  showCurrency: z.boolean(),
  showLanguage: z.boolean(),
  stickyHeader: z.boolean(),
  customCSS: z.string().optional(),
});

type HeaderFormData = z.infer<typeof headerSchema>;

export default function Header() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mockSettings = {
    logoText: "OpenCart Store",
    logoImage: "/logo.png",
    height: "80px",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    showSearch: true,
    showCart: true,
    showWishlist: true,
    showAccount: true,
    showCurrency: true,
    showLanguage: true,
    stickyHeader: false,
    customCSS: "",
  };

  const { data: settings = mockSettings, isLoading } = useQuery({
    queryKey: ["/api/journal/header"],
    queryFn: () => Promise.resolve(mockSettings),
  });

  const form = useForm<HeaderFormData>({
    resolver: zodResolver(headerSchema),
    defaultValues: settings,
  });

  const updateMutation = useMutation({
    mutationFn: (data: HeaderFormData) => {
      return Promise.resolve(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/header"] });
      toast({ title: "Header settings updated successfully" });
    },
  });

  const onSubmit = (data: HeaderFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <PageLayout
      title="Header Configuration"
      description="Customize the website header appearance and functionality"
      isLoading={isLoading}
    >
      <div className="max-w-4xl">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="w-5 h-5" />
                      Logo & Branding
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="logoText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo Text</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Store Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="logoImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="/logo.png" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Header Height</FormLabel>
                          <FormControl>
                            <Input placeholder="80px" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="backgroundColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Background Color</FormLabel>
                            <FormControl>
                              <Input type="color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="textColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Text Color</FormLabel>
                            <FormControl>
                              <Input type="color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="stickyHeader"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Sticky Header</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Keep header visible when scrolling
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="elements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Menu className="w-5 h-5" />
                      Header Elements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="showSearch"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Search Bar</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Show product search functionality
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="showCart"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Shopping Cart</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Display shopping cart icon and counter
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="showWishlist"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Wishlist</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Show wishlist functionality
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="showAccount"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Account Menu</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Display user account options
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="showCurrency"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Currency Selector</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Allow users to change currency
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="showLanguage"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Language Selector</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Allow users to change language
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom CSS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="customCSS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional CSS</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="/* Custom header styles */"
                              rows={8}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end">
                <Button type="submit" disabled={updateMutation.isPending}>
                  Save Header Settings
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </PageLayout>
  );
}
