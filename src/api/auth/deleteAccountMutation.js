import { api } from '@/api/api';
import { getUserId } from '@/api/api.util';

export const deleteAccountMutation = () => ({
  mutationFn: async () => {
    const userId = getUserId();
    return api.delete(`delete_user/${userId}`).json();
  },
  invalidateTags: ['auth'],
});
