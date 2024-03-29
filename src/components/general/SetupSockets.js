/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { BaseComponent, html, stateManager, history } from 'framework';
import { getLoggedInUser } from '@/api/api.util';
import { capitaliseWords } from '@/utils/capitalise';
import { zoom } from '@/utils/zoom/Zoom';
import { socket } from '@/ws/ws';
import { chatscroll } from '@/utils/events';
import { meQuery } from '@/api/auth/meQuery';
import { singleGroupQuery } from '@/api/groups/singleGroupQuery';
import { userQuery } from '@/api/users/userQuery';

export class SetupSockets extends BaseComponent {
  constructor() {
    super();
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.me = this.query(meQuery());
  }

  render() {
    return html`
      <zoom-accept-reject-panel />
    `;
  }

  effectBefore() {
    const name = getLoggedInUser()?.first_name;
    if (name) {
      const receiveMessage = (data) => {
        const chatFriendsGroups = stateManager.slice('chatFriendsGroups');
        // I should be using data.userId/data.groupId and data.isDirectMessage, but leave it for now because im scared to try
        const id = chatFriendsGroups.state?.activeFriendOrGroup?.id;
        const type = chatFriendsGroups.state?.activeFriendOrGroup?.type;
        if (id && type) {
          const messagesQuery = stateManager.querySlice(`chat/${type}/${id}`);
          messagesQuery.refetch();
          if ((data.userId === id && type === 'friend') || (data.groupId === id && type === 'group')) {
            document.querySelector('chat-main')?.dispatchEvent(chatscroll);
          }
        }
      };

      const receiveMessageNotification = async (data) => {
        const chatFriendsGroups = stateManager.slice('chatFriendsGroups');
        const id = chatFriendsGroups.state?.activeFriendOrGroup?.id;
        const type = chatFriendsGroups.state?.activeFriendOrGroup?.type;
        const { userId, groupId, content } = data;

        if (history.data.pathname !== '/chat' || (!(data.userId === id && type === 'friend') && !(data.groupId === id && type === 'group'))) {
          let recipientId = null;
          let recipientName = null;
          let recipientType = null;

          if (groupId) {
            try {
              const { name: groupName } = await singleGroupQuery(groupId).queryFn();
              recipientId = groupId;
              recipientName = groupName;
              recipientType = 'group';
            } catch {
              // pass
            }
          } else if (userId) {
            try {
              const { first_name, last_name } = await userQuery(userId).queryFn();
              recipientId = userId;
              recipientName = `${first_name} ${last_name}`;
              recipientType = 'grofriendup';
            } catch {
              // pass
            }
          }

          if (!!recipientId && !!recipientName && !!recipientType) {
            const chatNotification = stateManager.slice('chatNotification');
            chatNotification.setNotification(recipientId, recipientName, recipientType, content || '');
          }
        }
      };

      const startCall = async ({ zoomToken, tpc }) => {
        await zoom.join(zoomToken, tpc, capitaliseWords(name));
        zoom.startAudio();
        zoom.show();
      };

      socket('global')?.on('receive_message', receiveMessage);
      socket('global')?.on('receive_message', receiveMessageNotification);
      socket('global')?.on('start_call', startCall);

      return () => {
        socket('global')?.off('receive_message', receiveMessage);
        socket('global')?.off('receive_message', receiveMessageNotification);
        socket('global')?.off('start_call', startCall);
      };
    }

    return undefined;
  }
}
