import { LucideIcon } from "lucide-react";

/**
 * Child item inside a collapsible sidebar menu.
 */
export type SidebarChild = {
    title: string;
    url: string;
    // [FEATURE REFERENCE]: Granular permission codes (e.g., ["PATIENT_READ", "PATIENT_WRITE"])
    // If set, user must have at least one matching permission to view this child link.
    requiredPermissions?: string[];
};

/**
 * Top-level sidebar menu item: either a direct link or a collapsible item with sub-items.
 */
export type SidebarMenuItem =
    | {
        title: string;
        icon: LucideIcon;
        url: string;
        // [FEATURE REFERENCE]: Required permission codes for direct-link menu items
        requiredPermissions?: string[];
    }
    | {
        title: string;
        icon: LucideIcon;
        items: SidebarChild[];
        // [FEATURE REFERENCE]: Required permission codes for parent menu headers
        requiredPermissions?: string[];
    };

/**
 * A sidebar group/section containing a set of related menu items.
 */
export type SidebarSection = {
    group?: string;
    menus: SidebarMenuItem[];
};