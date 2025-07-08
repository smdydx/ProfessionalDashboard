import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DataTableProps {
  data: any[];
  columns: any[];
  searchable?: boolean;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  isLoading?: boolean;
}

export default function DataTable({ data, columns, searchable = true, onEdit, onDelete, isLoading }: DataTableProps) {
  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4" />
          <Input placeholder="Search..." className="max-w-sm" />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey || column.header}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.accessorKey || column.header}>
                    {column.cell ? column.cell({ row: { getValue: (key: string) => row[key] } }) : row[column.accessorKey] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}