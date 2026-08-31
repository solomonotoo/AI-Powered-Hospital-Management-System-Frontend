import { userApi } from './user-api';
//import { User, UserFilters, UserStats } from ../types/user-filters.types';
import { mapToUser, User } from '../types/user.types';
import { UserFilters, UserStats } from '../types/user-filters.types';

export const userService = {
    async getUsers(filters: UserFilters): Promise<{ users: User[]; stats: UserStats }> {
        // Get role assignments (users with roles)
        const roleAssignments = await userApi.getUserRoles(''); // This would need a proper endpoint

        // Get additional user details
        const users = await Promise.all(
            roleAssignments.map(async (assignment) => {
                const access = await userApi.getUserAccess(assignment.staffId || '');
                return {
                    ...mapToUser(assignment),
                    permissions: access.permissions || [],
                };
            })
        );

        // Apply client-side filtering (since we don't have a proper user list endpoint)
        let filtered = users;
        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(
                (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
            );
        }
        if (filters.role) {
            filtered = filtered.filter((u) => u.role === filters.role);
        }
        if (filters.status) {
            filtered = filtered.filter((u) => u.status === filters.status);
        }
        if (filters.mfa !== undefined) {
            filtered = filtered.filter((u) => u.mfaEnabled === filters.mfa);
        }

        const stats: UserStats = {
            total: users.length,
            active: users.filter((u) => u.status === 'active').length,
            mfaEnabled: users.filter((u) => u.mfaEnabled).length,
            locked: users.filter((u) => u.status === 'locked' || u.status === 'suspended').length,
        };

        return { users: filtered, stats };
    },

    async getUser(userId: string): Promise<User> {
        const [access, permissions, activity, sessions] = await Promise.all([
            userApi.getUserAccess(userId),
            userApi.getUserPermissions(userId),
            userApi.getUserActivity(userId),
            userApi.getUserSessions(userId),
        ]);

        // Map to your User type (would need additional data from staff endpoint)
        return {
            id: userId,
            name: '', // Would come from staff details
            email: '', // Would come from staff details
            role: access.roles?.[0]?.roleId || '',
            status: 'active',
            mfaEnabled: false,
            lastLogin: null,
            permissions: access.permissions || [],
            sessions,
            activity,
        };
    },

    async getRoles() {
        return userApi.getRoles();
    },

    async getPermissions() {
        return userApi.getPermissions();
    },

    async assignRole(userId: string, roleId: string, expiresAt?: string) {
        return userApi.assignRole(userId, { roleId, expiresAt });
    },

    async revokeRole(userId: string, assignmentId: string) {
        return userApi.revokeRoleAssignment(userId, assignmentId);
    },

    async revokeSession(userId: string, sessionId: string) {
        return userApi.revokeSession(userId, sessionId);
    },
};