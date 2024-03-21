import { api, fileApi } from '@/api/api';

// TODO createObjectURL may be causing a memory leak

async function convertFile(file, type) {
  if (type === 'text') return file.text();
  if (type === 'buffer') return file.arrayBuffer();
  return file;
}

export const downloadFileQuery = (id, { type }) => ({
  queryFn: async () => {
    const { url, ...rest } = await api.get(`download_file/${id}`).json();
    const file = await fileApi.get(url).blob();
    const convertedFile = await convertFile(file, type);
    const src = URL.createObjectURL(file);
    const ext = url.split('.')[url.split('.').length - 1];
    return { file: convertedFile, src, ext, ...rest };
  },
  tag: `files/${id}`,
});
