import { components } from "@/src/types/api";

// Re-export API types for convenience
export type RoleAssignmentResponse = components['schemas']['RoleAssignmentResponse'];
export type UserActivityResponse = components['schemas']['UserActivityResponse'];
export type SessionResponse = components['schemas']['SessionResponse'];
export type UserAccessResponse = components['schemas']['UserAccessResponse'];
export type RoleResponse = components['schemas']['RoleResponse'];
export type PermissionResponse = components['schemas']['PermissionResponse'];
export type FacilityResponse = components['schemas']['FacilityResponse'];

// User status enum
export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INVITED = 'INVITED',
    LOCKED = 'LOCKED',
    SUSPENDED = 'SUSPENDED',
}

// UI Extended Types
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'pending' | 'locked' | 'suspended' | UserStatus;
    mfaEnabled: boolean;
    lastLogin: Date | null;
    photo?: string;
    department?: string;
    createdAt?: string;
    updatedAt?: string;
    permissions?: string[];
    sessions?: SessionResponse[];
    activity?: UserActivityResponse[];
    roles?: RoleAssignmentResponse[];
    assignedAt?: string;
    expiresAt?: string;
}

export interface UserStats {
    total: number;
    active: number;
    mfaEnabled: number;
    locked: number;
}

export interface UserFilters {
    search?: string;
    role?: string;
    status?: 'active' | 'pending' | 'locked' | 'suspended' | string;
    mfa?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

// Mapping functions
export function mapStatus(apiStatus: string): User['status'] {
    switch (apiStatus) {
        case 'ACTIVE':
            return 'active';
        case 'EXPIRED':
            return 'suspended';
        case 'REVOKED':
            return 'locked';
        default:
            return 'pending';
    }
}

export function mapToUser(
    assignment: RoleAssignmentResponse,
    access?: UserAccessResponse
): User {
    return {
        id: assignment.staffId || '',
        name: '', // Would come from staff details endpoint
        email: '', // Would come from staff details endpoint
        role: assignment.roleId || '',
        status: mapStatus(assignment.status || 'ACTIVE'),
        mfaEnabled: false, // Would come from MFA settings endpoint
        lastLogin: null,
        permissions: access?.permissions || [],
        roles: access?.roles || [],
        assignedAt: assignment.assignedAt,
        expiresAt: assignment.expiresAt,
    };
}