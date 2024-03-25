import { api } from '@/api/api';
import { getUserId } from '../api.util';

export const recentQuery = () => ({
  queryFn: async () => {
    const messages = await api.get('get_recent_messages', { searchParams: { group_id: 'all', n: 20 } }).json();
    return messages.filter((message) => message.userId !== getUserId());
  },
  tag: 'recent',
});
