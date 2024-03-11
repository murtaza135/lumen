import { api } from '@/api/api';

export const loginMutation = () => ({
  mutationFn: (data) => api.post('login', { json: data }).json(),
  invalidateTags: ['auth'],
});
