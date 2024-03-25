/* eslint-disable no-nested-ternary */
import { BaseComponent, html, history, converter } from 'framework';
import { Tooltips } from '@/utils/Tooltips';
import { meQuery } from '@/api/auth/meQuery';
import { extractInitials } from '@/utils/extractInitials';
import { logoutMutation } from '@/api/auth/logoutMutation';
import { downloadProfilePictureQuery } from '@/api/auth/downloadProfilePictureQuery';
import { getLoggedInUser } from '@/api/api.util';
import lumenLogoImg from '@/assets/Lumen-logo-removebg.png';
import listRichImg from '@/assets/list-rich.svg';
import chatDotsFillImg from '@/assets/chat-dots-fill.svg';
import { closeSocket } from '@/ws/ws';

export class Nav extends BaseComponent {
  constructor() {
    super();
    this.hasLogin = this.attr('hasLogin', converter.boolean) ?? false;
    this.hasRegister = this.attr('hasRegister', converter.boolean) ?? false;
    this.hasAdmin = this.attr('hasAdmin', converter.boolean) ?? false;
    this.hasDashboard = this.attr('hasDashboard', converter.boolean) ?? false;
    this.hasChat = this.attr('hasChat', converter.boolean) ?? false;
    this.hasLogout = this.attr('hasLogout', converter.boolean) ?? false;
    this.hasUserProfile = this.attr('hasUserProfile', converter.boolean) ?? false;
    this.hasHelpdesk = this.attr('hasHelpdesk', converter.boolean) ?? false;
    this.me = this.query(meQuery());
    this.profilePicture = this.query(downloadProfilePictureQuery());
    this.logout = this.mutation(logoutMutation());
    this.path = history.data.pathname;
    this.tooltips = new Tooltips();
  }

  render() {
    this.rootCSSClasses('nav-root bg-primary w-100 d-flex');

    const loggedInUser = getLoggedInUser();

    const avatarComponent = !loggedInUser
      ? null
      : this.profilePicture.state.status === 'success' && !!this.profilePicture.state.data?.src
        ? html`<x-link href="/profile" class="nav-link-item" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Profile">
          <x-avatar src=${this.profilePicture.state.data.src} />
        </x-link>`
        : html`<x-link href="/profile" class="nav-link-item" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Profile">
          <x-avatar initials=${extractInitials(`${loggedInUser.first_name} ${loggedInUser.last_name}`)} />
        </x-link>`;

    const helpdeskLink = this.hasHelpdesk ? html`
      <x-link href="/helpdesk" class="nav-link-item -translate-y-1" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Helpdesk">
        <i style="padding-top: 8px" class="fa-solid fa-circle-info text-white fs-5"></i>
      </x-link>
    ` : '';

    return html`
      <nav class="container h-100 my-auto d-flex justify-content-between align-items-center">
          <!-- Logo -->
          <div>
            <x-link href="/">
              <img src=${lumenLogoImg} alt="Logo" class="nav-logo" />
            </x-link>
          </div>

          <!-- NavLinks -->
          <div class="d-flex justify-content-between align-items-center gap-4">
            ${this.hasLogin ? html`<x-link href="/login" class=${`nav-link-item px-2 pb-1 text-white fs-5 ${this.path === '/login' && 'active'}`}>Login</x-link>` : ''}
            ${this.hasRegister ? html`<x-link href="/register" class=${`nav-link-item px-2 pb-1 text-white fs-5 ${this.path === '/register' && 'active'}`}>Register</x-link>` : ''}
            ${this.hasAdmin && loggedInUser?.user_role === 1 ? html`<x-link href="/admin" class="nav-link-item translate-y-2" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Admin Panel"><i class="fa-solid fa-screwdriver-wrench text-white fs-5"></i></x-link>` : ''}
            ${this.hasHelpdesk ? html`${helpdeskLink}` : ''}
            ${this.hasDashboard ? html`<x-link href="/dashboard/recent" class="nav-link-item" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Dashboard"><img src=${listRichImg} alt="Dashboard" width="20" /></x-link>` : ''}
            ${this.hasChat ? html`<x-link href="/chat" class="nav-link-item -translate-y-1"  data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Chat"><img src=${chatDotsFillImg} alt="Chat" width="24" /></x-link>` : ''}
            ${this.hasLogout ? html`<button @click=${() => this.handleLogout()} class="nav-link-item translate-y-1" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Logout"><i class="fa-solid fa-right-from-bracket text-white fs-5"></i></button>` : ''}
            ${this.hasUserProfile ? html`${avatarComponent}` : ''}
          </div>
      </nav>
    `;
  }

  effect() {
    this.tooltips.initialise();
    return () => this.tooltips.destroy();
  }

  async handleLogout() {
    await this.logout.actions.mutate();
    closeSocket('global');
    history.push('/login');
    window.location.reload();
  }
}
