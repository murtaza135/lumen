import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

const data = [
  {
    message_id: 1,
    message: 'Expedita nihil harum blanditiis optio omnis.',
  },
  {
    message_id: 2,
    message: 'Id deserunt error tempore vero exercitationem provident.',
  },
];

export const allProfaneMessagesQuery = () => ({
  queryFn: async () => { await sleep(1500); return data; },
  // queryFn: () => api.get('api-route').json(),
  tag: 'chat',
});
