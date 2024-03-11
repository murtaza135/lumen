import ky from 'ky';
import config from '@/app/config';
import { sleep } from '@/utils/sleep';
import { getUserId } from './api.util';

export const api = ky.create({
  prefixUrl: config.urls.api,
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      async (request, options) => {
        if (config.api.artificialDelay) {
          await sleep(2500);
        }

        const token = JSON.parse(localStorage.getItem('token')) ?? '';
        const path = request.url.replace(options.prefixUrl, '');

        // if /logout, then remove auth data from local storage and do not send request
        const isLogoutRequest = path === 'logout' && request.method === 'POST';
        if (isLogoutRequest) {
          localStorage.removeItem('token');
          localStorage.removeItem('auth');
          return new Response();
        }

        // send auth header for every request
        request.headers.set('Authorization', `Bearer ${token}`);
        return request;
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        const path = request.url.replace(options.prefixUrl, '');
        const userId = getUserId();

        const isLoginRequest = path === 'login' && request.method === 'POST';
        const isMeRequest = path === `get_user_info/${userId}` && request.method === 'GET';

        // set auth data in local storage after successful login
        if (isLoginRequest) {
          if (response.status === 200 || response.status === 201) {
            const data = await response.clone().json();
            localStorage.setItem('token', JSON.stringify(data.token));
          } else {
            localStorage.removeItem('token');
          }
        } else if (isMeRequest && (response.status === 200)) {
          const data = await response.clone().json();
          localStorage.setItem('auth', JSON.stringify({ ...data, id: userId }));
        }
      },
    ],
  },
});

export const fileApi = ky.create({
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (config.api.artificialDelay) {
          await sleep(2500);
        }
        return request;
      },
    ],
  },
});
