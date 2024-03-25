import { api } from '@/api/api';

export const searchGroupsMutation = () => ({
  mutationFn: async (query) => {
    try {
      return await api.get('search_groups', { searchParams: { query } }).json();
    } catch {
      return [];
    }
  },
  invalidateTags: [''],
});
