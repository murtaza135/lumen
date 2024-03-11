import { api } from '@/api/api';

// TODO server

export const replaceFileMutation = (id) => ({
  mutationFn: (data) => api.post(`replace_file/${id}`, { body: data }).json(),
  invalidateTags: [`files/${id}`],
});
