import { api } from '@/api/api';

export const joinGroupMutation = () => ({
  mutationFn: (id) => api.post('join_group', { json: { group_id: id } }).json(),
  invalidateTags: ['groups'],
});
