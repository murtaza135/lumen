import { api } from '@/api/api';

export const joinedGroupsQuery = () => ({
  queryFn: () => api.get('get_user_groups').json(),
  tag: 'groups/joined',
});
