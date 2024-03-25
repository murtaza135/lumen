import { api } from '@/api/api';

export const searchUsersMutation = () => ({
  mutationFn: async (query) => {
    try {
      return await api.get('search_users', { searchParams: { query } }).json();
    } catch {
      return [];
    }
  },
  invalidateTags: [''],
});
