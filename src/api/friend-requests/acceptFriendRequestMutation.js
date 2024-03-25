import { api } from '@/api/api';

export const acceptFriendRequestMutation = () => ({
  mutationFn: (memberId) => api.post('respond_to_friend_request', { json: { senderID: memberId, action: 'accept' } }).json(),
  invalidateTags: ['friends'],
});
