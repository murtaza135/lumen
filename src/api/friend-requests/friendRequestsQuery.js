import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server

const data = [
  {
    email: 'person1@test.com',
    first_name: 'person1',
    last_name: 'person1',
    user_id: 1,
  },
];

export const friendRequestsQuery = () => ({
  queryFn: async () => { await sleep(1000); return data; },
  // queryFn: () => api.get('api-route').json(),
  tag: 'friends/requests',
});
