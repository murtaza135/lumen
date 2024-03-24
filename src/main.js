import '@/styles/bootstrap.scss';
import '@/styles/reset.css';
import '@/styles/utilities.css';
import '@/styles/main.css';
import '@/styles/chat.css';
import '@/styles/file-list.css';
import '@/styles/zoom.css';

import 'bootstrap/dist/js/bootstrap.bundle';
import 'framework';

import '@/app/states';
import '@/app/components';
import '@/app/pages';
import '@/app/router';
import '@/utils/zoom/Zoom';

import { io } from 'socket.io-client';
import { getToken } from './api/api.util';
import config from './app/config';

// // const socket = io('wss://www.hwracing.co.uk:8080/zoom', {
// //   reconnectionDelayMax: 10000,
// //   query: {
// //     token: getToken(),
// //   },
// // });

// // const socket3 = io('wss://www.hwracing.co.uk:8080/zoom', {
// //   reconnectionDelayMax: 10000,
// //   query: {
// //     token: getToken(),
// //   },
// // });

// // const socket2 = io('wss://www.hwracing.co.uk:8080/chat', {
// //   reconnectionDelayMax: 10000,
// //   query: {
// //     token: getToken(),
// //   },
// // });

// const socket = io('wss://www.hwracing.co.uk:8080/zoom', {
//   reconnectionDelayMax: 10000,
//   query: {
//     token: getToken(),
//   },
// });

// const socket4 = io('wss://www.hwracing.co.uk:8080/chat', {
//   reconnectionDelayMax: 10000,
//   query: {
//     token: getToken(),
//   },
// });

// // socket.connect();

// socket.on('user_status', (data) => {
//   console.log('user_status');
//   console.log(data);
// });

// socket.on('start_call', (data) => {
//   console.log('start_call');
//   console.log(data);
// });

// socket.on('incoming_call', (data) => {
//   console.log('incoming_call');
//   console.log(data);
// });

// socket.on('connect', () => {
//   console.log('connect');
// });

// socket.on('disconnect', () => {
//   console.log('disconnect');
// });

// setTimeout(() => {
//   console.log('startcall');
//   socket.emit('startcall', {
//     token: getToken(),
//     recipient: 14,
//   });

//   // socket.timeout(1000).emitWithAck('startcall', {
//   //   token: getToken(),
//   //   recipient: 17,
//   // })
//   //   .then((res) => console.log(res))
//   //   .catch((error) => console.log(error));
// }, 2000);

// // setTimeout(() => {
// //   socket.disconnect();
// // }, 3000);

// // setTimeout(() => {
// //   console.log(socket.active);
// //   console.log(socket.connected);
// //   console.log(socket.disconnected);
// // }, 2500);
