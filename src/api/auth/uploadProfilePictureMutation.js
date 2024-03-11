import { api } from '@/api/api';

export const uploadProfilePictureMutation = () => ({
  mutationFn: (data) => api.post('update_profile_picture', { body: data }).json(),
  invalidateTags: ['auth/picture'],
});
