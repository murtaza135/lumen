import { api } from '@/api/api';

// TODO server

export const deleteFileMutation = () => ({
  mutationFn: (id) => api.post(`delete_file/${id}`).json(),
  invalidateTags: ['files'],
});
