import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server

export const acceptMemberRequestMutation = (groupId) => ({
  mutationFn: async () => { await sleep(1000); return null; },
  // mutationFn: (memberId) => api.post('api-route', { json: { memberId } }).json(),
  invalidateTags: [`groups/${groupId}/members`],
});
