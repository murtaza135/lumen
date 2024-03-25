import { api } from '@/api/api';

export const deleteGroupMutation = () => ({
  mutationFn: (groupId) => api.delete('delete_group', { json: { group_id: groupId } }).json(),
  invalidateTags: ['groups'],
});
