import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server

const data = [
  {
    title: 'John sent you a message',
    subtitle: 'Hi, how are you?',
  },
  {
    title: 'Mary commented on your file',
    subtitle: 'This looks good.',
  },
  {
    title: 'Allie sent you a message',
    subtitle: 'Can you do that for me?',
  },
  {
    title: 'Jane sent you a message',
    subtitle: 'Nice!',
  },
];

export const recentQuery = () => ({
  queryFn: async () => { await sleep(1000); return data; },
  // queryFn: () => api.get('api-route').json(),
  tag: 'recent',
});
