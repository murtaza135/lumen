/* eslint-disable class-methods-use-this */
import { BaseComponent, html, history } from 'framework';
import { getToken } from '@/api/api.util';
import { meQuery } from '@/api/auth/meQuery';
import config from '@/app/config';
import { closeSocket } from '@/ws/ws';
import { logoutMutation } from '@/api/auth/logoutMutation';

export class AuthGuard extends BaseComponent {
  constructor() {
    super();
    this.me = config.auth.applyAuth ? this.query(meQuery()) : null;
    this.logout = this.mutation(logoutMutation());
  }

  render() {
    return html``;
  }

  effectBefore() {
    if (config.auth.applyAuth) {
      const isUserAccessTokenAvailable = !!getToken();

      const isErrorGettingUserProfile = (
        !this.me.state.isFetching
        && this.me.state.status === 'error'
        && this.me.state.error?.name === 'HTTPError'
      );

      if (!isUserAccessTokenAvailable || isErrorGettingUserProfile) {
        this.logout.actions.mutate().finally(() => {
          closeSocket('global');
          history.replace('/login');
          window.location.reload();
        });
      }
    }
  }
}
