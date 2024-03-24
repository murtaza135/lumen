import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TEMP cleanup

const data = [
  {
    content: 'Id aut quibusdam suscipit ut tenetur accusamus laborum quia.',
    date: '2023-06-30 09:20:00',
    name: 'John Doe',
    userId: 1,
  },
  {
    content: 'Sed ab corporis suscipit animi quae.',
    date: '2023-06-30 09:20:00',
    name: 'Mary Wilson',
    userId: 2,
  },
  {
    content: 'Optio quidem mollitia eos et porro earum dolore aut rerum.',
    date: '2023-06-30 09:20:00',
    name: 'John Doe',
    userId: 1,
  },
];

export const messagesQuery = (id, type) => ({
  // queryFn: async () => { await sleep(1000); return data; },
  queryFn: async () => {
    if (type === 'friend') {
      return api.post(`get_person_messages/${id}`, { json: { n: 100 } }).json();
    }
    return api.get('get_recent_messages', { searchParams: { group_id: id, n: 100 } }).json();
  },
  tag: `chat/${type}/${id}`,
});
