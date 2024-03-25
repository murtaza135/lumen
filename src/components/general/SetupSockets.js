/* eslint-disable class-methods-use-this */
import { BaseComponent, html, stateManager } from 'framework';
import { getLoggedInUser } from '@/api/api.util';
import { capitaliseWords } from '@/utils/capitalise';
import { zoom } from '@/utils/zoom/Zoom';
import { socket } from '@/ws/ws';
import { chatscroll } from '@/utils/events';
import { meQuery } from '@/api/auth/meQuery';

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

      const startCall = async ({ zoomToken, tpc }) => {
        await zoom.join(zoomToken, tpc, capitaliseWords(name));
        zoom.startAudio();
        zoom.show();
      };

      socket('global')?.on('receive_message', receiveMessage);
      socket('global')?.on('start_call', startCall);

      return () => {
        socket('global')?.off('receive_message', receiveMessage);
        socket('global')?.off('start_call', startCall);
      };
    }

    return undefined;
  }
}
