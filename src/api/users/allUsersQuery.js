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
  {
    email: 'john@test.com',
    first_name: 'John',
    last_name: 'Doe',
    user_id: 2,
  },
  {
    email: 'mary@test.com',
    first_name: 'Mary',
    last_name: 'Wilson',
    user_id: 3,
  },
];

export const allUsersQuery = () => ({
  // queryFn: async () => { await sleep(1000); return data; },
  queryFn: () => api.get('get_all_users_info').json(),
  tag: 'users',
});
