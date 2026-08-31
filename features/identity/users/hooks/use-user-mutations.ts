import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './use-users';
import { userApi } from '../service';
import { toast } from 'sonner';

export function useUserMutations() {
    const queryClient = useQueryClient();

    const assignRole = useMutation({
        mutationFn: ({ userId, roleId, expiresAt }: {
            userId: string;
            roleId: string;
            expiresAt?: string;
        }) => userApi.assignRole(userId, { roleId, expiresAt }),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
            queryClient.invalidateQueries({ queryKey: userKeys.roles() });
            toast.success('Role assigned', {
                description: 'The role has been successfully assigned.',
            });
        },
        onError: (error: Error) => {
            toast.error('Failed to assign role', {
                description: error.message || 'Failed to assign role.',
            });
        },
    });

    const revokeRole = useMutation({
        mutationFn: ({ userId, assignmentId }: { userId: string; assignmentId: string }) =>
            userApi.revokeRoleAssignment(userId, assignmentId),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
            queryClient.invalidateQueries({ queryKey: userKeys.roles() });
            toast.success('Role revoked', {
                description: 'The role has been successfully revoked.',
            });
        },
        onError: (error: Error) => {
            toast.error('Failed to revoke role', {
                description: error.message || 'Failed to revoke role.',
            });
        },
    });

    const revokeSession = useMutation({
        mutationFn: ({ userId, sessionId }: { userId: string; sessionId: string }) =>
            userApi.revokeSession(userId, sessionId),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: userKeys.sessions(userId) });
            toast.success('Session revoked', {
                description: 'The session has been successfully terminated.',
            });
        },
        onError: (error: Error) => {
            toast.error('Failed to revoke session', {
                description: error.message || 'Failed to revoke session.',
            });
        },
    });

    const revokeAllSessions = useMutation({
        mutationFn: ({ userId }: { userId: string }) =>
            userApi.revokeAllSessions(userId),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: userKeys.sessions(userId) });
            toast.success('All sessions revoked', {
                description: 'All user sessions have been terminated.',
            });
        },
        onError: (error: Error) => {
            toast.error('Failed to revoke all sessions', {
                description: error.message || 'Failed to revoke all sessions.',
            });
        },
    });

    return {
        assignRole,
        revokeRole,
        revokeSession,
        revokeAllSessions,
    };
}