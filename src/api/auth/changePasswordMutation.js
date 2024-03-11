import { api } from '@/api/api';

export const changePasswordMutation = () => ({
  mutationFn: (data) => api.post('change_password', { json: data }).json(),
  invalidateTags: ['auth'],
});
