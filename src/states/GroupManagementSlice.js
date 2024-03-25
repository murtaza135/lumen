import { StateSlice } from 'framework';

export class GroupManagementSlice extends StateSlice {
  constructor() {
    const state = {
      activeTab: 'members',
      searchText: '',
    };

    super(state);
  }

  reset() {
    this.state.activeTab = 'members';
    this.state.searchText = '';
  }

  activateMembersTab() {
    this.state.activeTab = 'members';
  }

  activateRequestsTab() {
    this.state.activeTab = 'requests';
  }

  setSearchText(text) {
    this.state.searchText = text;
  }

  resetSearchText() {
    this.state.searchText = '';
  }
}
