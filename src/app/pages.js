import { createComponents } from 'framework';
import { MainPage } from '@/pages/MainPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { DashboardRecentPage } from '@/pages/DashboardRecentPage';
import { DashboardFriendsPage } from '@/pages/DashboardFriendsPage';
import { DashboardGroupsPage } from '@/pages/DashboardGroupsPage';
import { ChatPage } from '@/pages/ChatPage';
import { FileListPage } from '@/pages/FileListPage';
import { FilePage } from '@/pages/FilePage';
import { CreateGroupPage } from '@/pages/CreateGroupPage';
import { ManageGroupPage } from '@/pages/ManageGroupPage';
import { AdminPage } from '@/pages/AdminPage';
import { CounterPageOne } from '@/counter/CounterPageOne';
import { CounterPageTwo } from '@/counter/CounterPageTwo';
import config from './config';

createComponents({
  'main-page': MainPage,
  'login-page': LoginPage,
  'register-page': RegisterPage,
  'profile-page': ProfilePage,
  'dashboard-recent-page': DashboardRecentPage,
  'dashboard-friends-page': DashboardFriendsPage,
  'dashboard-groups-page': DashboardGroupsPage,
  'chat-page': ChatPage,
  'file-list-page': FileListPage,
  'file-page': FilePage,
  'create-group-page': CreateGroupPage,
  'manage-group-page': ManageGroupPage,
  'admin-page': AdminPage,
  'counter-page-one': !config.env.PROD ? CounterPageOne : null,
  'counter-page-two': !config.env.PROD ? CounterPageTwo : null,
});
