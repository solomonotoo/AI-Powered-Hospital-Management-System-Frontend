import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface SectionCardProps{
    title:string;
    children:ReactNode;
}

export function SectionCard({
    title,children
}:SectionCardProps){
    return(
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">{children}</CardContent>
        </Card>
    )
}