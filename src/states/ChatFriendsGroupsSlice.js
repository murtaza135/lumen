import { StateSlice } from 'framework';

export class ChatFriendsGroupsSlice extends StateSlice {
  constructor() {
    const state = {
      activeTab: 'groups',
      activeFriendOrGroup: { id: null, name: null, type: '' },
    };

    super(state);
  }

  activateGroups() {
    this.state.activeTab = 'groups';
  }

  activateFriends() {
    this.state.activeTab = 'friends';
  }

  setActiveFriendOrGroup(friendOrGroup) {
    this.state.activeFriendOrGroup = friendOrGroup;
  }
}
