import { api } from '@/api/api';

// TODO server - list_groups is wrong, needs to be a list of groups that the user himself has created

export const createdGroupsQuery = () => ({
  queryFn: () => api.get('list_groups').json(),
  tag: 'groups/created',
});
