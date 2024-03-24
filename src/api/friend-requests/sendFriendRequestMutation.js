import { api } from '@/api/api';

export const sendFriendRequestMutation = () => ({
  mutationFn: (id) => api.post('send_friend_request', { json: { recipientID: id } }).json(),
  invalidateTags: [''],
});
