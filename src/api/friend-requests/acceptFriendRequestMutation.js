import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server

export const acceptFriendRequestMutation = () => ({
  mutationFn: async () => { await sleep(1000); return null; },
  // mutationFn: (memberId) => api.post('api-route', { json: { memberId } }).json(),
  invalidateTags: ['friends/requests'],
});
