import { api } from '@/api/api';

export const deleteFileMutation = () => ({
  mutationFn: (id) => api.delete(`delete_file/${id}`).json(),
  invalidateTags: ['files'],
});
