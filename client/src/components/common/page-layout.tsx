import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Settings, Plus } from "lucide-react";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  headerActions?: React.ReactNode;
}

export function PageLayout({
  title,
  description,
  children,
  showBackButton = false,
  onBack,
  actions,
  headerActions
}: PageLayoutProps) {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
          {showBackButton && (
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1 text-sm">{description}</p>
            )}
          </div>
        </div>
        {headerActions && (
          <div className="flex items-center space-x-2">
            {headerActions}
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-4 sm:space-y-6">
        {children}
      </div>

      {actions && (
        <>
          <Separator />
          <div className="flex items-center justify-end space-x-2">
            {actions}
          </div>
        </>
      )}
    </div>
  );
}

export default PageLayout;