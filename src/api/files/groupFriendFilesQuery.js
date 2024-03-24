import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server
// TODO you might need to make 2 separate queries for friend files vs group files

// const data = [
//   { file_id: 16, file_name: 'temp1.trix', timestamp: '2024-01-30 09:20:00' },
//   { file_id: 17, file_name: 'temp2.trix', timestamp: '2024-01-30 09:20:00' },
//   { file_id: 18, file_name: 'temp3.trix', timestamp: '2024-01-30 09:20:00' },
//   { file_id: 19, file_name: 'temp4.trix', timestamp: '2024-01-30 09:20:00' },
//   { file_id: 20, file_name: 'temp5.trix', timestamp: '2024-01-30 09:20:00' },
//   { file_id: 21, file_name: 'temp6.trix', timestamp: '2024-01-30 09:20:00' },
//   { file_id: 22, file_name: 'temp7.trix', timestamp: '2024-01-30 09:20:00' },
// ];

export const groupFriendFilesQuery = (groupFriendId) => ({
  // queryFn: async () => { await sleep(1000); return data; },
  queryFn: async () => {
    try {
      const data = await api.get(`files_by_group/${groupFriendId}`).json();
      console.log(data);
      return data.files;
    } catch {
      return [];
    }
  },
  tag: `files/${groupFriendId}`,
});
