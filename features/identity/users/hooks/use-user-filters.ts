"use client";

import { useState, useCallback } from 'react';
import { UserFilters } from '../types/user-filters.types';

const defaultFilters: UserFilters = {
    page: 0,
    size: 10,
    search: '',
    role: undefined,
    status: undefined,
    mfa: undefined,
    sortBy: 'name',
    sortDirection: 'asc',
};

export function useUserFilters(initialFilters: Partial<UserFilters> = {}) {
    const [filters, setFilters] = useState<UserFilters>({
        ...defaultFilters,
        ...initialFilters,
    });

    const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(defaultFilters);
    }, []);

    return {
        filters,
        updateFilters,
        resetFilters,
        setFilters,
    };
}
