import { api } from '@/api/api';

export const searchUsersMutation = () => ({
  mutationFn: (query) => api.get('search_users', { searchParams: { query } }).json(),
  invalidateTags: [''],
});
