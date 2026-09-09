"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Hospital } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { sidebarItems } from "@/app/sidebar-data";
import { useUserPermissions } from "@/features/user-acount-module/hook/use-user-permissions";

/**
 * Sidebar rail + scrolling, the two structural things this rewrite adds:
 *
 * 1. RAIL: `collapsible="icon"` on <Sidebar> plus <SidebarRail /> at the
 *    bottom gives two things — a thin drag handle on the sidebar's edge
 *    (click to toggle, drag to resize on desktop), and a collapsed "icon
 *    rail" state where labels hide and only icons + tooltips remain. This
 *    is the tablet-friendly state: full nav reachable in roughly a third
 *    of the width. The original version had no collapse/rail at all.
 *
 * 2. SCROLLING: SidebarHeader stays fixed (it's a flex sibling, not part
 *    of the scroll container). SidebarContent already ships with
 *    `flex-1 overflow-auto` built into the primitive itself — we don't
 *    add any scroll classes here, we just avoid wrapping it in another
 *    div (the original version did) that would compete with that. This
 *    is why header/footer stay pinned and only the menu scrolls, even
 *    with 5 groups of content.
 */
export function AppSidebar() {
  const pathname = usePathname();

  // [FEATURE REFERENCE]: Granular user permissions and role verification hook
  const { hasPermission, hasRole, isSuperAdmin } = useUserPermissions();

  // [FEATURE REFERENCE]: Filter sidebar navigation sections and menus based on active user permissions and roles
  const filteredSections = React.useMemo(() => {
    // Super admins bypass all granular restrictions and see the full navigation hierarchy
    if (isSuperAdmin) {
      return sidebarItems;
    }

    return sidebarItems
      .map((section) => {
        const filteredMenus = section.menus
          .map((menu) => {
            // Check collapsible menu with nested child items
            if ("items" in menu) {
              const visibleChildren = menu.items.filter((child) => {
                // [FEATURE REFERENCE]: Verify granular permissions if configured for the child route
                const meetsPermission =
                  child.requiredPermissions && child.requiredPermissions.length > 0
                    ? hasPermission(child.requiredPermissions)
                    : true;

                // [FEATURE REFERENCE]: Verify role eligibility as secondary / fallback guard
                const meetsRole = hasRole(child.allowedRoles);

                return meetsPermission && meetsRole;
              });

              // If user cannot access any child in this group, hide the parent item completely
              if (visibleChildren.length === 0) {
                return null;
              }

              return {
                ...menu,
                items: visibleChildren,
              };
            }

            // Direct single menu item
            const meetsPermission =
              menu.requiredPermissions && menu.requiredPermissions.length > 0
                ? hasPermission(menu.requiredPermissions)
                : true;

            const meetsRole = hasRole(menu.allowedRoles);

            return meetsPermission && meetsRole ? menu : null;
          })
          .filter((menu): menu is NonNullable<typeof menu> => menu !== null);

        // Omit section header completely if there are no visible menus inside it
        if (filteredMenus.length === 0) {
          return null;
        }

        return {
          ...section,
          menus: filteredMenus,
        };
      })
      .filter((section): section is NonNullable<typeof section> => section !== null);
  }, [hasPermission, hasRole, isSuperAdmin]);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      {/* Header: fixed, never scrolls. Shrinks to just the icon mark when collapsed. */}
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Hospital className="size-5" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold">
                    HMS Dashboard
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/60">
                    Hospital Management
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content: the ONLY scrolling region in the sidebar. */}
      <SidebarContent>
        {filteredSections.map((section, idx) => (
          <SidebarGroup key={section.group || `section-${idx}`}>
            {section.group && (
              <SidebarGroupLabel>{section.group}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2.5">
                {section.menus.map((menu) => {
                  const Icon = menu.icon;

                  const hasChildren = "items" in menu;

                  if (!hasChildren) {
                    const isDirectActive = pathname === menu.url;

                    return (
                      <SidebarMenuItem key={menu.title} >
                        <SidebarMenuButton asChild isActive={isDirectActive} >
                          <Link href={menu.url}>
                            <Icon />
                            <span>{menu.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  const isChildActive = menu.items.some(
                    (item) => pathname === item.url
                  );

                  return (
                    <Collapsible
                      key={menu.title}
                      defaultOpen={isChildActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={isChildActive}>
                            <Icon />
                            <span>{menu.title}</span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {menu.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === item.url}
                                >
                                  <Link href={item.url}>{item.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Drag-to-resize / click-to-toggle handle, hidden on touch automatically. */}
      <SidebarRail />
    </Sidebar>
  );
}
