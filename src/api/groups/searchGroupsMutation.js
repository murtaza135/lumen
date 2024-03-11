import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server

const data = [
  { group_name: 'Dogs', is_added: false, group_id: 1 },
  { group_name: 'Cats', is_added: true, group_id: 2 },
  { group_name: 'Lumen', is_added: true, group_id: 3 },
];

export const searchGroupsMutation = () => ({
  mutationFn: async () => { await sleep(1000); return data; },
  // mutationFn: (query) => api.get('search_groups', { searchParams: { query } }).json(),
  invalidateTags: [''],
});
