import { api } from '@/api/api';

export const removeMemberFromGroupMutation = (groupId) => ({
  mutationFn: async (memberId) => {
    const json = { group_id: groupId, user_ids: [memberId] };
    return api.post('remove_users_from_group', { json }).json();
  },
  invalidateTags: [`groups/${groupId}`],
});
