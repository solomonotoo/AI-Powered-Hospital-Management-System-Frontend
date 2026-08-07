import { LucideIcon } from "lucide-react";

export type SidebarChild = {
    title: string;
    url: string;
};

export type SidebarMenuItem =
    | {
        title: string;
        icon: LucideIcon;
        url: string;
    }
    | {
        title: string;
        icon: LucideIcon;
        items: SidebarChild[];
    };

export type SidebarSection = {
    group?: string;
    menus: SidebarMenuItem[];
};