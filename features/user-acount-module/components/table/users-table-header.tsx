import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function UsersTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Users</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Change Password</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>MFA</TableHead>
        <TableHead>Last Login</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}
