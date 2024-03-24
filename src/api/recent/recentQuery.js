import { api } from '@/api/api';

export const recentQuery = () => ({
  queryFn: () => api.get('get_recent_messages', { searchParams: { group_id: 'all', n: 10 } }).json(),
  tag: 'recent',
});
