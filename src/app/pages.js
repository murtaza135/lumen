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
import { ChatLoadingPage } from '@/pages/ChatLoadingPage';
import { ChatGroupMembersPage } from '@/pages/ChatGroupMembersPage';
import { HelpdeskPage } from '@/pages/HelpDesk';

createComponents({
  'main-page': MainPage,
  'login-page': LoginPage,
  'register-page': RegisterPage,
  'profile-page': ProfilePage,
  'helpdesk-page': HelpdeskPage,
  'dashboard-recent-page': DashboardRecentPage,
  'dashboard-friends-page': DashboardFriendsPage,
  'dashboard-groups-page': DashboardGroupsPage,
  'chat-page': ChatPage,
  'file-list-page': FileListPage,
  'file-page': FilePage,
  'create-group-page': CreateGroupPage,
  'manage-group-page': ManageGroupPage,
  'admin-page': AdminPage,
  'chat-loading-page': ChatLoadingPage,
  'chat-group-members-page': ChatGroupMembersPage,
});
