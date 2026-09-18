"use client";

import * as React from "react";
import { Building2, Check, ChevronsUpDown, Globe2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFacilities } from "../hook/use-facilities";
import { useSelectFacility } from "@/features/auth/hook/use-auth";
import { cn } from "@/lib/utils";

interface FacilitySwitcherProps {
  currentFacilityId?: string;
  currentFacilityName?: string;
  currentFacilityCode?: string;
  canSelectFacility?: boolean;
}

export function FacilitySwitcher({
  currentFacilityId,
  currentFacilityName,
  currentFacilityCode,
  canSelectFacility,
}: FacilitySwitcherProps) {
  const { data: facilitiesData, isLoading } = useFacilities({ page: 0, size: 50 });
  const { mutate: selectFacility, isPending } = useSelectFacility();

  const facilities = facilitiesData?.content || [];
  const displayName = currentFacilityName || "Korle Bu Teaching Hospital";
  const displayCode = currentFacilityCode || "KBTH001";

  // Non-global users: display fixed facility badge
  if (!canSelectFacility) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/90 bg-muted/60 px-2.5 py-1 rounded-md border border-border/80">
        <Building2 className="size-3.5 text-primary shrink-0" />
        <span className="truncate max-w-[170px]">{displayName}</span>
        {displayCode && (
          <span className="text-[10px] text-muted-foreground font-mono bg-background/80 px-1 py-0.2 rounded border">
            {displayCode}
          </span>
        )}
      </div>
    );
  }

  // Super Admin: interactive facility switcher
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          className={cn(
            "h-8 flex items-center gap-2 px-2.5 text-xs font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground transition-colors",
            isPending && "opacity-70 pointer-events-none"
          )}
        >
          <Building2 className="size-3.5 text-primary shrink-0" />
          <span className="truncate max-w-[150px] font-semibold">{displayName}</span>
          {displayCode && (
            <span className="text-[10px] font-mono text-primary bg-primary/10 px-1 py-0.2 rounded border border-primary/20">
              {displayCode}
            </span>
          )}
          <ChevronsUpDown className="size-3 text-muted-foreground ml-0.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-1">
        <DropdownMenuLabel className="text-xs font-semibold flex items-center justify-between text-muted-foreground">
          <span>Switch Active Facility</span>
          <Badge variant="outline" className="text-[10px] text-primary border-primary/30 flex items-center gap-1">
            <Globe2 className="size-2.5" />
            Global Access
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isLoading ? (
          <div className="py-2 text-center text-xs text-muted-foreground">Loading facilities...</div>
        ) : facilities.length === 0 ? (
          <DropdownMenuItem
            className="flex items-center justify-between py-2 text-xs cursor-pointer"
            onClick={() => selectFacility({ facilityId: "3fafffbb-05ac-4999-9403-914062d4d540" })}
          >
            <div className="flex flex-col">
              <span className="font-medium">Korle Bu Teaching Hospital</span>
              <span className="text-[10px] text-muted-foreground font-mono">KBTH001</span>
            </div>
            <Check className="size-3.5 text-primary" />
          </DropdownMenuItem>
        ) : (
          facilities.map((fac) => {
            const isSelected = fac.facilityId === currentFacilityId;
            return (
              <DropdownMenuItem
                key={fac.facilityId}
                onClick={() => {
                  if (!isSelected) {
                    selectFacility({ facilityId: fac.facilityId });
                  }
                }}
                className={cn(
                  "flex items-center justify-between py-2 text-xs cursor-pointer",
                  isSelected && "bg-accent/60 font-semibold"
                )}
              >
                <div className="flex flex-col">
                  <span className="truncate max-w-[180px]">{fac.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{fac.code}</span>
                </div>
                {isSelected && <Check className="size-3.5 text-primary shrink-0 ml-2" />}
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
