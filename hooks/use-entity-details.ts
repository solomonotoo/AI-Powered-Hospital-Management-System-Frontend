import { useState } from "react";

export function useEntityDetails<T>(){
    const [selectedEntity,setSelectedEntity] = useState<T | null>(null);
    const [open,setOpen] = useState(false);

    const showDetails = (entity:T) => {
        setSelectedEntity(entity);
        setOpen(true);
    }

    const hideDetails = () => {
        setOpen(false);
        setSelectedEntity(null);
    }

    return {
        open,
        selectedEntity,
        showDetails,
        hideDetails,
        setOpen,
    }
}