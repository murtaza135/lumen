import { api } from '@/api/api';

export const registerMutation = () => ({
  mutationFn: async (data) => {
    const { email, password } = data;
    await api.post('add_user', { json: data }).json();
    return api.post('login', { json: { email, password } }).json();
  },
  invalidateTags: ['auth'],
});
