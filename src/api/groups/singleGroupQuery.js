import { api } from '@/api/api';
import { sleep } from '@/utils/sleep';

// TEMP clean up

const data = {
  group_id: 1,
  group_name: 'some group name',
};

export const singleGroupQuery = (groupId) => ({
  // queryFn: async () => { await sleep(1000); return data; },
  queryFn: () => api.get(`group_info/${groupId}`).json(),
  tag: `groups/${groupId}`,
});
