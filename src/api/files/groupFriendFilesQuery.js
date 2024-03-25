import { api } from '@/api/api';

export const groupFriendFilesQuery = (groupFriendId) => ({
  queryFn: async () => {
    try {
      const data = await api.get(`files_by_group/${groupFriendId}`).json();
      return data.files;
    } catch {
      return [];
    }
  },
  tag: `files/${groupFriendId}`,
});
