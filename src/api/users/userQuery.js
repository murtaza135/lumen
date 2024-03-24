import { api } from '@/api/api';

export const userQuery = (userId) => ({
  queryFn: async () => api.get(`get_user_info/${userId}`).json(),
  tag: `auth/${userId}`,
});
