import { StateSlice } from 'framework';

export class AdminSlice extends StateSlice {
  constructor() {
    const state = {
      activeTab: 'messages',
      searchText: '',
    };

    super(state);
  }

  activateMessagesTab() {
    this.state.activeTab = 'messages';
  }

  activateProfanityTab() {
    this.state.activeTab = 'profanity';
  }

  activateUsersTab() {
    this.state.activeTab = 'users';
  }

  activateGroupsTab() {
    this.state.activeTab = 'groups';
  }

  setSearchText(text) {
    this.state.searchText = text;
  }

  resetSearchText() {
    this.state.searchText = '';
  }
}
