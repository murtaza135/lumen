import { io } from 'socket.io-client';
import { getToken } from '@/api/api.util';
import config from '@/app/config';

const sockets = {
  global: null,
};

export function socket(namespace) {
  const token = getToken();
  if (!token) return null;

  const namespaceVal = namespace.toLowerCase();
  if (!sockets[namespaceVal]) {
    sockets[namespaceVal] = io(`${config.urls.ws}/${namespaceVal}`, {
      autoConnect: true,
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
