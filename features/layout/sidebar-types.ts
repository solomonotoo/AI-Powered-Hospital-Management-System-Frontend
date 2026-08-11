import { LucideIcon } from "lucide-react";
import { UserRole } from "./types";

export type SidebarChild = {
    title: string;
    url: string;
    allowedRoles?: UserRole[]; //for controlling the child items access based on roles
    disabledRoles?: UserRole[]; //for controlling the child items disable based on roles
};

export type SidebarMenuItem =
    | {
        title: string;
        icon: LucideIcon;
        url: string;
        allowedRoles?: UserRole[]; //for controlling the child items access based on roles
        disabledRoles?: UserRole[]; //for controlling the child items disable based on roles
    }
    | {
        title: string;
        icon: LucideIcon;
        items: SidebarChild[];
        allowedRoles?: UserRole[]; //for controlling the child items access based on roles
        disabledRoles?: UserRole[]; //for controlling the child items disable based on roles
    };

export type SidebarSection = {
    group?: string;
    menus: SidebarMenuItem[];
};