import { BaseComponent, html } from 'framework';
import { joinedGroupsQuery } from '@/api/groups/joinedGroupsQuery';

export class ChatLoader extends BaseComponent {
  constructor() {
    super();
    this.joinedGroups = this.query(joinedGroupsQuery());
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
  }

  effectBefore() {
    if (!this.chatFriendsGroups.state.activeFriendOrGroup.id) {
      if (this.joinedGroups.state.status === 'success') {
        this.chatFriendsGroups.actions.setActiveFriendOrGroup({
          id: this.joinedGroups.state.data[0].group_id,
          name: this.joinedGroups.state.data[0].group_name,
          type: 'group',
        });
      }
    }
  }

  render() {
    return html``;
  }
}
