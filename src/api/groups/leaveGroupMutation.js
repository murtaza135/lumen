import { api } from '@/api/api';
import { getUserId } from '../api.util';

export const leaveGroupMutation = () => ({
  mutationFn: async (groupId) => {
    const json = { group_id: groupId, user_ids: [getUserId()] };
    return api.post('remove_user_from_group', { json }).json();
  },
  invalidateTags: ['groups/joined'],
});
