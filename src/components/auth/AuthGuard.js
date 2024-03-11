import { BaseComponent, html, history } from 'framework';
import { getToken } from '@/api/api.util';
import { meQuery } from '@/api/auth/meQuery';
import config from '@/app/config';

export class AuthGuard extends BaseComponent {
  constructor() {
    super();
    this.me = config.auth.applyAuth ? this.query(meQuery()) : null;
  }

  render() {
    return html``;
  }

  async effect() {
    if (config.auth.applyAuth) {
      const isUserAccessTokenAvailable = !!getToken();

      const isErrorGettingUserProfile = (
        !this.me.state.isFetching
        && this.me.state.status === 'error'
        && this.me.state.error?.name === 'HTTPError'
      );

      if (!isUserAccessTokenAvailable || isErrorGettingUserProfile) {
        history.replace('/login');
      }
    }
  }
}
