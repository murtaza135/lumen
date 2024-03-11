/* eslint-disable camelcase */
import { api } from '@/api/api';

export const createGroupMutation = () => ({
  mutationFn: ({ group_name }) => api.post('add_group', { json: { group_name } }).json(),
  invalidateTags: ['groups/created'],
});
