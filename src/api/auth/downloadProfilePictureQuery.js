import { api, fileApi } from '@/api/api';
import { getUserId } from '@/api/api.util';

export const downloadProfilePictureQuery = () => ({
  queryFn: async () => {
    try {
      const id = getUserId();
      const { profile_picture_url: url } = await api.get(`profile_picture_url/${id}`).json();
      const file = await fileApi.get(url).blob();
      const src = URL.createObjectURL(file);
      return { file, src };
    } catch {
      return null;
    }
  },
  tag: 'auth/picture',
});
