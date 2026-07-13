
//this types is for patient workspace navigation tabs
//we didn't use shadcn ui tabs because we want more control that will be permission aware (RBAC)

import { LucideIcon } from "lucide-react";

export interface PatientWorkspaceTab{
    id:string;
    label:string;
    icon: LucideIcon;
    badge?: number;
    disabled?: boolean;
    permission?: string;
}



// Every navigation item will follow the same structure.

// Example:

// {
//     id: "laboratory",
//     label: "Laboratory",
//     icon: FlaskConical,
//     badge: 4,
//     permission: "laboratory.read"
// }

// Later, your RBAC system can simply filter the array.