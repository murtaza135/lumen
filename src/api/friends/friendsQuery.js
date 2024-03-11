import { api } from '@/api/api';
import { getUserId } from '../api.util';

export const friendsQuery = () => ({
  queryFn: () => api.get(`user_friends/${getUserId()}`).json(),
  tag: 'friends',
});
