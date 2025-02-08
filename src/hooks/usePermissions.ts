import { useAuth } from '@/providers/AuthProvider';

export default function usePermissions() {
  const { profile } = useAuth();
  const permissions = profile?.custom_permissions || [];

  const hasPermission = (expected) => {
    const e = (typeof expected === 'string') ? [expected] : expected;
    if (!permissions || !Array.isArray(permissions)) return false;
    return permissions.some(x => e.includes(x));
  }

  return { permissions, hasPermission }
}