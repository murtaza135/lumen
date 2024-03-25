import { api } from '@/api/api';

export const allUsersQuery = () => ({
  queryFn: () => api.get('get_all_users_info').json(),
  tag: 'users',
});
