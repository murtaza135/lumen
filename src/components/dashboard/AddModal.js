import { BaseComponent, html } from 'framework';
import { searchUsersMutation } from '@/api/users/searchUsersMutation';
import { searchGroupsMutation } from '@/api/groups/searchGroupsMutation';
import { sendFriendRequestMutation } from '@/api/friend-requests/sendFriendRequestMutation';
import { deleteFriendMutation } from '@/api/friends/deleteFriendMutation';
import { joinGroupMutation } from '@/api/groups/joinGroupMutation';
import { leaveGroupMutation } from '@/api/groups/leaveGroupMutation';
import userSVG from '@/assets/user.svg';
import { capitaliseWords } from '@/utils/capitalise';

export class AddModal extends BaseComponent {
  constructor() {
    super();
    this.formRef = this.ref('form');
    this.searchInputRef = this.ref('search');
    this.friendsGroups = this.state('friends');
    this.addModal = this.slice('addModal');
    this.error = this.slice('error');
    this.success = this.slice('success');
    this.searchUsers = this.mutation(searchUsersMutation());
    this.searchGroups = this.mutation(searchGroupsMutation());
    this.sendFriendRequest = this.mutation(sendFriendRequestMutation());
    this.deleteFriend = this.mutation(deleteFriendMutation());
    this.joinGroup = this.mutation(joinGroupMutation());
    this.leaveGroup = this.mutation(leaveGroupMutation());

    // TODO move to effect?
    this.searchUsers.actions.mutate('');
    this.searchGroups.actions.mutate('');
  }

  render() {
    this.rootCSSClasses('w-100');

    const dataRows = (() => {
      if (this.friendsGroups.state === 'friends') {
        if (this.searchUsers.state.status === 'loading') {
          return [html`<div class="center pt-3"><x-spinner variant="light" class="bg-primary" /></div>`];
        }

        if (this.searchUsers.state.status === 'error') {
          return [html`<p class="text-light fs-6 mt-2 ms-3">Could not load users.</p>`];
        }

        if (this.searchUsers.state.data.length === 0) {
          return [html`<p class="text-light fs-6 mt-2 ms-3">Could not find any users.</p>`];
        }

        return this.searchUsers.state.data.map((friend) => html`
          <tr class="py-4">
            <th scope="row" class="bg-primary text-light"><i class="fa-solid fa-user"></i></th>
            <td class="bg-primary text-light">${friend.email}</td>
            <td class="bg-primary text-light">
              <div class="d-flex align-items-center justify-content-end gap-3 hover-opacity cursor-pointer">
                <i class="fa-solid fa-plus" @click=${() => this.handleSendFriendRequest(friend.user_id)}></i>
              </div>
            </td>
          </tr>
        `);
      }

      if (this.searchGroups.state.status === 'loading') {
        return [html`<div class="center pt-3"><x-spinner/></div>`];
      }

      if (this.searchGroups.state.status === 'error') {
        return [html`<p class="text-light fs-6 mt-2 ms-3">Could not load groups.</p>`];
      }

      if (this.searchGroups.state.data.length === 0) {
        return [html`<p class="text-light fs-6 mt-2 ms-3">Could not find any groups.</p>`];
      }

      return this.searchGroups.state.data.map((group) => html`
        <tr class="py-4">
          <th scope="row" class="bg-primary text-light"><i class="fa-solid fa-user-group"></i></th>
          <td class="bg-primary text-light">${capitaliseWords(group.group_name)}</td>
          <td class="bg-primary text-light">
            <div class="d-flex align-items-center justify-content-end gap-3 hover-opacity cursor-pointer">
              <i class="fa-solid fa-plus" @click=${() => this.handleJoinGroup(group.group_id, group.group_name)}></i>
            </div>
          </td>
        </tr>
      `);
    })();

    return html`
      <div class=${`dashboard-add-modal px-3 py-5 ${this.addModal.state.isOpen ? 'show' : ''}`}>
        <div class="dashboard-add-modal-content hide-scrollbar text-light bg-primary p-5">
          <button
            class="dashboard-add-modal-close-button hover-opacity"
            @click=${() => this.addModal.actions.close()}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          
          <h2 class="mb-3 fs-4">Find Friend or Group</h2>

          <form
            @submit=${(event) => this.handleSearchSubmit(event)}
            class="d-flex flex-column align-items-start gap-3 mb-4"  
          >
            <div class="d-flex align-items-center gap-3 w-100">
              <x-input id=${this.searchInputRef.id} type="text" placeholder="Enter friend's email or group name" icon=${userSVG} />
              <button type="submit" class="hover-opacity center h-7 w-8 rounded-circle bg-white text-primary">
                <i class="fa-solid fa-magnifying-glass fs-6 -translate-y-1"></i>
              </button>
            </div>
          </form>

          <div class="chat-side-nav-top-bar d-flex gap-3 justify-content-between border-bottom border-gray px-3">
            <div class="d-flex gap-3">
              <button
                class=${`chat-side-nav-top-bar-button px-1 pb-1 translate-y-1 ${this.friendsGroups.state === 'friends' ? 'border-light' : 'border-transparent'}`}
                @click=${() => this.goToTab('friends')}
              >
                Friends
              </button>
              <button
                class=${`chat-side-nav-top-bar-button px-1 pb-1 translate-y-1 ${this.friendsGroups.state === 'groups' ? 'border-light' : 'border-transparent'}`}
                @click=${() => this.goToTab('groups')}
              >
                Groups
              </button>
            </div>
          </div>

          <table class="table mb-5">
            <tbody>
              ${dataRows}
            </tbody>
          </table>

          <div>
            <h2 class="mb-3 fs-4">Create your Own Group</h2>
            <x-link href="/create-group" class="btn btn-light text-primary fw-medium">New Group</x-link>
          </div>
        </div>
      </div>
    `;
  }

  cleanup() {
    this.addModal.actions.close();
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const query = this.searchInputRef.element.value;

    if (this.friendsGroups.state === 'friends') {
      this.searchUsers.actions.mutate(query);
    } else {
      this.searchGroups.actions.mutate(query);
    }
  }

  goToTab(tab) {
    this.searchUsers.actions.mutate('');
    this.searchGroups.actions.mutate('');
    this.searchInputRef.element.value = '';
    this.friendsGroups.state = tab;
  }

  async handleSendFriendRequest(id) {
    await this.sendFriendRequest.actions.mutate(id);
    if (this.sendFriendRequest.state.status === 'error') {
      this.error.actions.setError('You have already send a friend request');
    } else if (this.sendFriendRequest.state.status === 'success') {
      this.success.actions.setSuccess('Friend request sent');
    }
  }

  async handleJoinGroup(id, name) {
    await this.joinGroup.actions.mutate(id);
    if (this.joinGroup.state.status === 'error') {
      this.error.actions.setError('You have already joint this group');
    } else if (this.joinGroup.state.status === 'success') {
      this.success.actions.setSuccess(`You have joined ${capitaliseWords(name)}`);
    }
  }
}
