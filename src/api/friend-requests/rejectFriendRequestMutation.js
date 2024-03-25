import { api } from '@/api/api';

export const rejectFriendRequestMutation = () => ({
  mutationFn: (memberId) => api.post('respond_to_friend_request', { json: { senderID: memberId, action: 'reject' } }).json(),
  invalidateTags: ['friends'],
});
