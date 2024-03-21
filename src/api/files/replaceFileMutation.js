import { api } from '@/api/api';

export const replaceFileMutation = (id) => ({
  mutationFn: (data) => api.post(`replace_file/${id}`, { body: data }).json(),
  invalidateTags: [`files/${id}`],
});
