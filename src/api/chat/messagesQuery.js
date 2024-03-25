import { api } from '@/api/api';

export const messagesQuery = (id, type) => ({
  queryFn: async () => {
    if (type === 'friend') {
      return api.post(`get_person_messages/${id}`, { json: { n: 100 } }).json();
    }
    return api.get('get_recent_messages', { searchParams: { group_id: id, n: 100 } }).json();
  },
  tag: `chat/${type}/${id}`,
});
