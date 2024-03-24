import { stateManager, history } from 'framework';

export function navigateChat({ id, name, type }, to) {
  const query = stateManager.querySlice(`chat/${id}`);
  if (query) query.refetch();
  const slice = stateManager.slice('chatFriendsGroups');
  slice.setActiveFriendOrGroup({ id, name, type });
  if (type === 'group') slice.activateGroups();
  else if (type === 'friend') slice.activateFriends();
  const toRedirect = to.replace(/^\/+/g, '');
  if (toRedirect) history.push(`/chat-loading?redirect=${toRedirect}`);
}
