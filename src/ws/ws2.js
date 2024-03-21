import { io } from 'socket.io-client';
import { getToken } from '@/api/api.util';
import config from '@/app/config';

const sockets = {
  chat: null,
  zoom: null,
};

export function chatSocket() {
  if (!sockets.chat) {
    sockets.chat = io(`${config.urls.ws}/chat`, {
      reconnectionDelayMax: 10000,
      query: { token: getToken() },
    });
  }

  return sockets.chat;
}

export function zoomSocket() {
  if (!sockets.zoom) {
    sockets.zoom = io(`${config.urls.ws}/zoom`, {
      reconnectionDelayMax: 10000,
      query: { token: getToken() },
    });
  }

  return sockets.zoom;
}

// socket.on('user_status', (data) => {
//   console.log(data);
// });

// socket.on('connect', () => {
//   console.log('lol');
// });

// socket.on('disconnect', () => {
//   console.log('lol2');
// });

// setTimeout(() => {
//   socket.disconnect();
// }, 3000);
