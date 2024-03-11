import { api } from '@/api/api';

export const deleteUserMutation = () => ({
  mutationFn: (id) => api.post(`delete_user/${id}`).json(),
  invalidateTags: ['users', 'friends'],
});
