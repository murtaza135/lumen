import { api } from '@/api/api';

export const uploadFileMutation = () => ({
  mutationFn: (data) => api.post('upload_file', { body: data }).json(),
  invalidateTags: ['files'],
});
