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
      <SidebarContent className="gap-0">
        {sidebarItems.map((section, idx) => (
          <SidebarGroup key={section.group || `section-${idx}`}>
            {section.group && (
              <SidebarGroupLabel>{section.group}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.menus.map((menu) => {
                  const Icon = menu.icon;

                  const hasChildren = "items" in menu;

                  if (!hasChildren) {
                    const isDirectActive = pathname === menu.url;

                    return (
                      <SidebarMenuItem key={menu.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isDirectActive}
                        >
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
                                  <Link href={item.url}>
                                    {item.title}
                                  </Link>
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
