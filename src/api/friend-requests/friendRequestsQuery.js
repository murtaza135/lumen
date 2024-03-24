import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TEMP cleanup

// const data = [
//   {
//     email: 'person1@test.com',
//     first_name: 'person1',
//     last_name: 'person1',
//     user_id: 1,
//   },
// ];

export const friendRequestsQuery = () => ({
  // queryFn: async () => { await sleep(1000); return data; },
  queryFn: async () => {
    try {
      const data = await api.get('view_friend_requests').json();
      return data.requests;
    } catch {
      return [];
    }
  },
  tag: 'friends/requests',
});
