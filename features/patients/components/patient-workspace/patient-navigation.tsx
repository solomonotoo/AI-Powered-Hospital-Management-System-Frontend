
"use client";

import { useState } from "react";
import { PatientWorkspaceTab } from "../../types/patient-workspace-tab";
import { Activity, ClipboardList, CreditCard, FileText, FlaskConical, LayoutDashboard, Pill, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


// Right now, PatientNavigation manages its own state:
// For a production application, I wouldn't keep the active tab state inside this component.
// Instead, I'd move it up to patient-workspace.tsx, making PatientNavigation a controlled component.
//check patient-navigation-old.tsx for the previous code


interface PatientNavigationProps{
    activeTab:string;
    onTabChange:(tab:string) => void;
}

export function PatientNaviation({activeTab,onTabChange}:PatientNavigationProps){

    // const [activeTab,setActiveTab] = useState("overview"); //moved to patient-workspace.tsx

    const tabs: PatientWorkspaceTab[] =[
        {id:"overview",label:"Overview",icon:LayoutDashboard},
        {id:"visits",label:"Visits",icon:Activity},
        {id:"medical-record",label:"Medical Record",icon:ClipboardList},
        {id:"medications",label:"Medications",icon:Pill},
        {id:"laboratory",label:"Laboratory",icon:FlaskConical, badge: 2},
        {id:"billing",label:"Billing",icon:CreditCard},
        {id:"documents",label:"Documents",icon:FileText},
        {id:"problems",label:"Problems",icon:Stethoscope},
    ];

    return(
        <div className="overflow-x-auto">
            <div className="flex gap-2 border-b pb-3">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return(
                        <Button key={tab.id}
                            variant={activeTab === tab.id ? "default" : "ghost"}
                            onClick={()=> onTabChange(tab.id)}
                            className="gap-2 whitespace-nowrap"
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                            {tab.badge !== undefined && (
                                <Badge variant="secondary"   >
                                    {tab.badge}
                                </Badge>
                            )}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}