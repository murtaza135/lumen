import { StateSlice } from 'framework';

export class AdminSlice extends StateSlice {
  constructor() {
    const state = {
      activeTab: 'users',
      searchText: '',
    };

    super(state);
  }

  reset() {
    this.state.activeTab = 'users';
    this.state.searchText = '';
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
