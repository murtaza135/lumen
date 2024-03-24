import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server

export const removeMemberFromGroupMutation = (groupId) => ({
  // mutationFn: async () => { await sleep(1000); return null; },
  mutationFn: async (memberId) => {
    const json = { group_id: groupId, user_ids: [memberId] };
    return api.post('remove_users_from_group', { json }).json();
  },
  invalidateTags: [`groups/${groupId}/members`],
});
