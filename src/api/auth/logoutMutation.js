import { api } from '@/api/api';

export const logoutMutation = () => ({
  mutationFn: () => api.post('logout').json(),
  invalidateTags: ['auth'],
});
