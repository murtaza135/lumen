import { io } from 'socket.io-client';
import { getToken } from '@/api/api.util';
import config from '@/app/config';

const sockets = {
  chat: null,
  zoom: null,
};

export function socket(namespace) {
  const namespaceVal = namespace.toLowerCase();
  console.log(namespaceVal);
  if (!sockets[namespaceVal]) {
    sockets[namespaceVal] = io(`${config.urls.ws}/${namespaceVal}`, {
      reconnectionDelayMax: 10000,
      query: { token: getToken() },
    });
  }
  return sockets[namespaceVal];
}

export function closeSocket(namespace) {
  const namespaceVal = namespace.toLowerCase();
  const socketItem = sockets[namespaceVal];
  if (!socketItem) return null;
  socketItem.removeAllListeners();
  socketItem.close();
  sockets[namespaceVal] = null;
  return socketItem;
}
