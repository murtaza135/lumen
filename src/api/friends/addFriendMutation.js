import { api } from '@/api/api';

export const addFriendMutation = () => ({
  mutationFn: (id) => api.post('add_friendship', { json: { friend_user_id: id } }).json(),
  invalidateTags: ['friends'],
});
