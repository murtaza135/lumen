import { jwtDecode } from 'jwt-decode';

export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem('auth')) || null;
}

export function getUserId() {
  const token = JSON.parse(localStorage.getItem('token'));
  const userId = token ? Number(jwtDecode(token).sub) : null;
  return userId || null;
}

export function getToken() {
  return JSON.parse(localStorage.getItem('token'));
}
