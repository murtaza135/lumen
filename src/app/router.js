import { createRouter, html } from 'framework';

export const router = createRouter({
  root: document.querySelector('#root'),
  routes: [
    { path: '/', html: html`<main-page />` },
    { path: '/login', html: html`<login-page />` },
    { path: '/register', html: html`<register-page />` },
    { path: '/profile', html: html`<profile-page />` },
    { path: '/dashboard', redirect: '/dashboard/recent' },
    { path: '/dashboard/recent', html: html`<dashboard-recent-page />` },
    { path: '/dashboard/friends', html: html`<dashboard-friends-page />` },
    { path: '/dashboard/groups', html: html`<dashboard-groups-page />` },
    { path: '/chat', html: html`<chat-page />` },
    { path: '/chat-loading', html: html`<chat-loading-page />` },
    { path: '/chat/members/:id', html: html`<chat-group-members-page />` },
    { path: '/file-list', html: html`<file-list-page />` },
    { path: '/file/:id', html: html`<file-page />` },
    { path: '/create-group', html: html`<create-group-page />` },
    { path: '/manage-group/:id', html: html`<manage-group-page />` },
    { path: '/helpdesk', html: html`<helpdesk-page />` },
    { path: '/admin', html: html`<admin-page />` },
  ],
});
