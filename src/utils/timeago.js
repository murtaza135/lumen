import { format } from 'timeago.js';

export function timeago(datetime) {
  return format(datetime);
}
