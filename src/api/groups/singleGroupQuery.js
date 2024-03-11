import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TODO server

const data = {
  group_id: 1,
  group_name: 'some group name',
};

export const singleGroupQuery = (groupId) => ({
  queryFn: async () => { await sleep(1000); return data; },
  // queryFn: (groupId) => api.get('api-route').json(),
  tag: `groups/${groupId}`,
});
