import { BaseComponent, html } from 'framework';
import { friendsQuery } from '@/api/friends/friendsQuery';
import { friendRequestsQuery } from '@/api/friend-requests/friendRequestsQuery';
import { deleteFriendMutation } from '@/api/friends/deleteFriendMutation';
import { acceptFriendRequestMutation } from '@/api/friend-requests/acceptFriendRequestMutation';
import { rejectFriendRequestMutation } from '@/api/friend-requests/rejectFriendRequestMutation';
import { timeago } from '@/utils/timeago';
import { capitaliseWords } from '@/utils/capitalise';
import chatDotsFillImg from '@/assets/chat-dots-fill-primary.svg';
import { navigateChat } from '@/utils/navigate';

// TODO <td>Last online ${timeago(friend.timeLastSeen)}</td>

export class FriendsTable extends BaseComponent {
  constructor() {
    super();
    this.friends = this.query(friendsQuery());
    this.friendRequests = this.query(friendRequestsQuery());
    this.deleteFriend = this.mutation(deleteFriendMutation());
    this.acceptFriendRequest = this.mutation(acceptFriendRequestMutation());
    this.rejectFriendRequest = this.mutation(rejectFriendRequestMutation());
    this.error = this.slice('error');
    this.searchDashboard = this.slice('searchDashboard');
    this.searchDashboard.actions.resetText();
  }

  render() {
    this.rootCSSClasses('w-100');

    if (this.friends.state.status === 'loading' || this.friendRequests.state.status === 'loading') {
      return html`<x-spinner class="center mt-5" />`;
    }

    if (this.friends.state.status === 'error' || this.friendRequests.state.status === 'error') {
      return html`<error-text class="center mt-5">Could not retrieve friends.</error-text>`;
    }

    const friends = this.friends.state.data.filter((friend) => {
      const friendName = `${friend.first_name.toLowerCase()} ${friend.last_name.toLowerCase()}`;
      const searchText = this.searchDashboard.state.text.toLowerCase();
      return friendName.includes(searchText);
    });

    const friendRequests = this.friendRequests.state.data.filter((friend) => {
      const friendName = `${friend.senderFirstName.toLowerCase()} ${friend.senderLastName.toLowerCase()}`;
      const searchText = this.searchDashboard.state.text.toLowerCase();
      return friendName.includes(searchText);
    });

    return html`
      <h2 class="fs-4 mt-4.5">Friend Requests</h2>
      <table class="table mt-1">
        <tbody>
          ${friendRequests.length === 0
        ? html`You have no friend requests.`
        : friendRequests.map((friend) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user text-primary translate-y-3"></i></th>
              <td>${capitaliseWords(`${friend.senderFirstName} ${friend.senderLastName}`)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i
                    @click=${() => this.handleRejectFriendRequest(friend.senderID)}
                    class="fa-solid fa-xmark fa-xl translate-y-3 text-danger cursor-pointer hover-opacity"></i>
                  <i
                    @click=${() => this.handleAcceptFriendRequest(friend.senderID)}
                    class="fa-solid fa-check fs-5 translate-y-2 text-primary cursor-pointer hover-opacity"></i>
                </div>
              </td>
            </tr>
          `)}
        </tbody>
      </table>

      <h2 class="fs-4 mt-4.5">Friends</h2>
      <table class="table mt-1">
        <tbody>
          ${friends.length === 0
        ? html`You have no friends.`
        : friends.map((friend) => html`
            <tr class="py-4">
              <th scope="row"><i class="fa-solid fa-user text-primary translate-y-3"></i></th>
              <td>${capitaliseWords(`${friend.first_name} ${friend.last_name}`)}</td>
              <td>
                <div class="d-flex align-items-center justify-content-end gap-3">
                  <i 
                    @click=${() => this.handleDeleteFriend(friend.user_id)}
                    class="fa-solid fa-trash fs-5 translate-y-3 text-danger cursor-pointer hover-opacity"
                  />
                  <button @click=${() => navigateChat({ id: friend.user_id, name: capitaliseWords(`${friend.first_name} ${friend.last_name}`), type: 'friend' }, '/chat')} class="w-6 h-6">
                    <img src=${chatDotsFillImg} alt="Chat" width="23" />
                  </button>
                </div>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  async handleDeleteFriend(id) {
    await this.deleteFriend.actions.mutate(id);
    if (this.deleteFriend.state.status === 'error') {
      this.error.actions.setError('Could not delete friend');
    }
  }

  async handleAcceptFriendRequest(id) {
    await this.acceptFriendRequest.actions.mutate(id);
    if (this.acceptFriendRequest.state.status === 'error') {
      this.error.actions.setError('Could not accept friend request');
    }
  }

  async handleRejectFriendRequest(id) {
    await this.rejectFriendRequest.actions.mutate(id);
    if (this.rejectFriendRequest.state.status === 'error') {
      this.error.actions.setError('Could not reject friend request');
    }
  }
}
