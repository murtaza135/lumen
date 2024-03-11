import { api } from '@/api/api';
import { getUserId } from '@/api/api.util';

export const meQuery = () => ({
  queryFn: async () => {
    const userId = getUserId();
    return api.get(`get_user_info/${userId}`).json();
  },
  tag: 'auth',
});
