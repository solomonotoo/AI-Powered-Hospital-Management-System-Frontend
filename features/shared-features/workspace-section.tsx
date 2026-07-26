//this file is for the visit tab workspace. it will be used by all tabs in the visit tab

import { ReactNode } from "react";

interface WorkspaceSectionProps{
    summary?: ReactNode; //optional 
    toolbar?: ReactNode; //optional
    children: ReactNode; //required
    footer?: ReactNode; //optional
}


export function WorkspaceSection({
    summary, toolbar, children, footer,
}:WorkspaceSectionProps){
    return(
        <div className="space-y-6">
            {summary}
            {toolbar}
            {children}
            {footer}
        </div>
    )
}