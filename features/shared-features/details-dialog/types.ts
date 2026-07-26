import { ReactNode } from "react";


export interface DetailItem{
    label: string;
    value: React.ReactNode;
}

export interface DetailSection{
    title:string;
    icon?:ReactNode;
    items:DetailItem[];

}

