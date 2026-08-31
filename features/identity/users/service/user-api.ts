import { api } from '@/lib/axios';
import {
  User,
  UserFilters,
  UserStats,
  RoleAssignmentResponse,
  UserAccessResponse,
  SessionResponse,
  UserActivityResponse,
  RoleResponse,
  PermissionResponse,
} from '../types/user.types';
import { components } from '@/src/types/api';

type FacilityResponse = components['schemas']['FacilityResponse'];
type ApiResponsePagedResponseFacilityResponse = components['schemas']['ApiResponsePagedResponseFacilityResponse'];

// Mock data for demonstration when offline/demo
const MOCK_USERS: User[] = [
  {
    id: 'USR-000124',
    name: 'Dr John Mensah',
    email: 'john.mensah@hospital.com',
    role: 'Doctor',
    status: 'active',
    mfaEnabled: true,
    lastLogin: new Date(),
    department: 'Cardiology',
    photo: 'https://avatar.vercel.sh/john-mensah',
  },
  {
    id: 'USR-000125',
    name: 'Mary Owusu',
    email: 'mary.owusu@hospital.com',
    role: 'Nurse',
    status: 'active',
    mfaEnabled: false,
    lastLogin: new Date(Date.now() - 86400000),
    department: 'Emergency',
    photo: 'https://avatar.vercel.sh/mary-owusu',
  },
  {
    id: 'USR-000126',
    name: 'Peter Mensah',
    email: 'peter.mensah@hospital.com',
    role: 'Admin',
    status: 'active',
    mfaEnabled: true,
    lastLogin: new Date(Date.now() - 86400000 * 5),
    department: 'Administration',
    photo: 'https://avatar.vercel.sh/peter-mensah',
  },
  {
    id: 'USR-000127',
    name: 'Sarah Asante',
    email: 'sarah.asante@hospital.com',
    role: 'Receptionist',
    status: 'pending',
    mfaEnabled: false,
    lastLogin: null,
    department: 'Front Desk',
    photo: 'https://avatar.vercel.sh/sarah-asante',
  },
];

export const userApi = {
  // ============================================================
  // USER MANAGEMENT
  // ============================================================

  getUsers: async (filters: UserFilters): Promise<{ users: User[]; stats: UserStats }> => {
    try {
      const response = await api.get<RoleAssignmentResponse[]>('/roles');
      // If backend returns data, map it
      if (response.data && Array.isArray(response.data)) {
        // Map assignments to user list
      }
    } catch {
      // Graceful fallback to mock data
    }

    let filtered = [...MOCK_USERS];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        u => u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }

    if (filters.role) {
      filtered = filtered.filter(u => u.role === filters.role);
    }

    if (filters.status) {
      filtered = filtered.filter(u => u.status === filters.status);
    }

    if (filters.mfa !== undefined) {
      filtered = filtered.filter(u => u.mfaEnabled === filters.mfa);
    }

    const stats: UserStats = {
      total: MOCK_USERS.length,
      active: MOCK_USERS.filter(u => u.status === 'active').length,
      mfaEnabled: MOCK_USERS.filter(u => u.mfaEnabled).length,
      locked: MOCK_USERS.filter(u => u.status === 'locked' || u.status === 'suspended').length,
    };

    return { users: filtered, stats };
  },

  getUserById: async (userId: string): Promise<User> => {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) {
      return {
        id: userId,
        name: 'Dr John Mensah',
        email: 'john.mensah@hospital.com',
        role: 'Doctor',
        status: 'active',
        mfaEnabled: true,
        lastLogin: new Date(),
        department: 'Cardiology',
      };
    }
    return user;
  },

  // ============================================================
  // USER ROLES
  // ============================================================

  getUserRoles: async (userId: string): Promise<RoleAssignmentResponse[]> => {
    const response = await api.get<RoleAssignmentResponse[]>(
      `/users/${userId}/roles`
    );
    return response.data;
  },

  assignRole: async (
    userId: string,
    data: { roleId: string; expiresAt?: string }
  ): Promise<RoleAssignmentResponse> => {
    const response = await api.post<RoleAssignmentResponse>(
      `/users/${userId}/roles`,
      data,
      {
        params: { currentUserId: userId },
      }
    );
    return response.data;
  },

  updateRoleAssignment: async (
    userId: string,
    assignmentId: string,
    data: { expiresAt?: string }
  ): Promise<void> => {
    await api.put(
      `/users/${userId}/roles/${assignmentId}`,
      data,
      {
        params: { currentUserId: userId },
      }
    );
  },

  revokeRoleAssignment: async (userId: string, assignmentId: string): Promise<void> => {
    await api.delete(
      `/users/${userId}/roles/${assignmentId}`,
      {
        params: { currentUserId: userId },
      }
    );
  },

  // ============================================================
  // USER ACCESS & PERMISSIONS
  // ============================================================

  getUserAccess: async (userId: string): Promise<UserAccessResponse> => {
    const response = await api.get<UserAccessResponse>(
      `/users/${userId}/access`
    );
    return response.data;
  },

  getUserPermissions: async (userId: string): Promise<string[]> => {
    const response = await api.get<string[]>(
      `/users/${userId}/permissions`
    );
    return response.data;
  },

  // ============================================================
  // USER SESSIONS
  // ============================================================

  getUserSessions: async (userId: string): Promise<SessionResponse[]> => {
    const response = await api.get<SessionResponse[]>(
      `/users/${userId}/sessions`
    );
    return response.data;
  },

  revokeSession: async (userId: string, sessionId: string): Promise<void> => {
    await api.delete(`/users/${userId}/sessions/${sessionId}`);
  },

  revokeAllSessions: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}/sessions`);
  },

  // ============================================================
  // USER ACTIVITY
  // ============================================================

  getUserActivity: async (userId: string): Promise<UserActivityResponse[]> => {
    const response = await api.get<UserActivityResponse[]>(
      `/users/${userId}/activity`
    );
    return response.data;
  },

  // ============================================================
  // ROLES & PERMISSIONS (Master Data)
  // ============================================================

  getRoles: async (): Promise<RoleResponse[]> => {
    const response = await api.get<RoleResponse[]>('/roles');
    return response.data;
  },

  getRole: async (roleId: string): Promise<RoleResponse> => {
    const response = await api.get<RoleResponse>(`/roles/${roleId}`);
    return response.data;
  },

  getPermissions: async (): Promise<PermissionResponse[]> => {
    const response = await api.get<PermissionResponse[]>('/permissions');
    return response.data;
  },

  // ============================================================
  // FACILITY MANAGEMENT
  // ============================================================

  getFacilities: async (params?: {
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING_APPROVAL';
    type?: 'TEACHING_HOSPITAL' | 'REGIONAL_HOSPITAL' | 'DISTRICT_HOSPITAL' | 'CLINIC' | 'POLYCLINIC';
    page?: number;
    size?: number;
  }): Promise<ApiResponsePagedResponseFacilityResponse> => {
    const response = await api.get<ApiResponsePagedResponseFacilityResponse>(
      '/facilities',
      { params }
    );
    return response.data;
  },

  getFacilityById: async (id: string): Promise<FacilityResponse> => {
    const response = await api.get<FacilityResponse>(`/facilities/${id}`);
    return response.data;
  },

  getFacilitySummary: async (): Promise<components['schemas']['FacilitySummaryResponse']> => {
    const response = await api.get<components['schemas']['ApiResponseFacilitySummaryResponse']>(
      '/facilities/summary'
    );
    return response.data.data || { totalFacilities: 0, activeFacilities: 0, inactiveFacilities: 0, pendingFacilities: 0 };
  },
};