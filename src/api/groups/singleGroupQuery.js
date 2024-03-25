import { api } from '@/api/api';

export const singleGroupQuery = (groupId) => ({
  queryFn: () => api.get(`group_info/${groupId}`).json(),
  tag: `groups/${groupId}`,
});
