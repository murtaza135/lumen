import { stateManager, history } from 'framework';

export function navigateChat({ id, name, type }, to) {
  const query = stateManager.querySlice(`chat/${id}`);
  if (query) query.refetch();
  const slice = stateManager.slice('chatFriendsGroups');
  slice.setActiveFriendOrGroup({ id, name, type });
  console.log(slice.state);
  if (to) history.push(to);
}
