import { api } from '@/api/api';

export const friendRequestsQuery = () => ({
  queryFn: async () => {
    try {
      const data = await api.get('view_friend_requests').json();
      return data.requests;
    } catch {
      return [];
    }
  },
  tag: 'friends/requests',
});
