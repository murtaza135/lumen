/* eslint-disable class-methods-use-this */
import { BaseComponent, html, stateManager } from 'framework';
import { getLoggedInUser } from '@/api/api.util';
import { capitaliseWords } from '@/utils/capitalise';
import { zoom } from '@/utils/zoom/Zoom';
import { socket } from '@/ws/ws';

export class SetupSockets extends BaseComponent {
  constructor() {
    super();
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
  }

  render() {
    return html`
      <zoom-accept-reject-panel />
    `;
  }

  effectBefore() {
    const name = capitaliseWords(getLoggedInUser().first_name);

    const receiveMessage = (data) => {
      console.log(data);
      // this.messages.actions.refetch();
    };

    const startCall = async ({ zoomToken, tpc }) => {
      await zoom.join(zoomToken, tpc, name);
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
}
