import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function UsersTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Staff</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>MFA</TableHead>
        <TableHead>Last Login</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}
