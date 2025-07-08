import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  isLoading?: boolean;
  onAdd?: () => void;
  addButtonText?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function PageLayout({
  title,
  description,
  children,
  isLoading = false,
  onAdd,
  addButtonText = "Add New",
  searchValue = "",
  onSearchChange
}: PageLayoutProps) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">{title}</h1>
          {description && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        {onAdd && (
          <Button onClick={onAdd} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span className="sm:inline">{addButtonText}</span>
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      {onSearchChange && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 justify-center sm:justify-start">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}