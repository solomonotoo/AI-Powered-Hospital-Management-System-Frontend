import { TableHead, TableHeader, TableRow } from "@/components/ui/table";


export function StaffTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Employee Id</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
    )
}