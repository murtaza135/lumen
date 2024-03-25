import { io } from 'socket.io-client';
import { getToken } from '@/api/api.util';
import config from '@/app/config';

const sockets = {
  global: null,
};

export function socket(namespace) {
  const token = getToken();
  if (!token) return null;
  console.log('call socket @ ws/socket');

  const namespaceVal = namespace.toLowerCase();
  if (!sockets[namespaceVal]) {
    console.log('creating socket @ ws/socket');
    sockets[namespaceVal] = io(`${config.urls.ws}/${namespaceVal}`, {
      reconnectionDelayMax: 10000,
      query: { token: getToken() },
    });
  }

  return sockets[namespaceVal];
}

export function closeSocket(namespace) {
  console.log('closeSocket @ ws/closeSocket');
  const namespaceVal = namespace.toLowerCase();
  const socketItem = sockets[namespaceVal];
  if (!socketItem) return null;
  socketItem.removeAllListeners();
  socketItem.close();
  sockets[namespaceVal] = null;
  return socketItem;
}
