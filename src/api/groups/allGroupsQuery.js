import { api } from '@/api/api';

export const allGroupsQuery = () => ({
  queryFn: () => api.get('list_groups').json(),
  tag: 'groups',
});
