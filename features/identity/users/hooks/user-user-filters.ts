import { useState, useCallback } from 'react';
import { UserFilters } from '../types/user-filters.types';

const defaultFilters: UserFilters = {
    search: '',
    page: 0,
    size: 10,
    sortBy: 'name',
    sortDirection: 'asc',
};

export function useUserFilters() {
    const [filters, setFilters] = useState<UserFilters>(defaultFilters);

    const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
            // Reset page when filters change
            page: newFilters.search !== undefined ||
                newFilters.role !== undefined ||
                newFilters.status !== undefined ||
                newFilters.mfa !== undefined
                ? 0
                : prev.page,
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(defaultFilters);
    }, []);

    return {
        filters,
        updateFilters,
        resetFilters,
    };
}