import { StateSlice } from 'framework';

export class ChatFriendsGroupsSlice extends StateSlice {
  constructor() {
    const state = {
      activeTab: 'groups',
      activeFriendOrGroup: { id: null, name: null, type: '' },
    };

    super(state);
  }

  reset() {
    this.state.activeTab = 'groups';
    this.state.activeFriendOrGroup = { id: null, name: null, type: '' };
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
