import { api } from '@/api/api';

export const deleteFriendMutation = () => ({
  mutationFn: (id) => api.delete('delete_friendship', { json: { friend_user_id: id } }).json(),
  invalidateTags: ['friends'],
});
