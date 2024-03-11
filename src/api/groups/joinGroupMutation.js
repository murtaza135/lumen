import { api } from '@/api/api';
import { getUserId } from '../api.util';

export const joinGroupMutation = () => ({
  mutationFn: async (groupId) => {
    const json = { group_id: groupId, user_ids: [getUserId()] };
    return api.post('add_user_to_group', { json }).json();
  },
  invalidateTags: ['groups/joined'],
});
