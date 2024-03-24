import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TEMP clean up

export const acceptFriendRequestMutation = () => ({
  // mutationFn: async () => { await sleep(1000); return null; },
  mutationFn: (memberId) => api.post('respond_to_friend_request', { json: { senderID: memberId, action: 'accept' } }).json(),
  invalidateTags: ['friends'],
});
