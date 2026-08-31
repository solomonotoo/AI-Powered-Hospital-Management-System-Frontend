export interface UserFilters {
    search?: string;
    role?: string;
    status?: 'active' | 'pending' | 'locked' | 'suspended';
    mfa?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

export interface UserStats {
    total: number;
    active: number;
    mfaEnabled: number;
    locked: number;
}

export interface PaginatedResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}