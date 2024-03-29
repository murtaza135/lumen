import { stateManager } from 'framework';
import { SuccessSlice } from '@/states/SucessSlice';
import { ErrorSlice } from '@/states/ErrorSlice';
import { OpenCloseSlice } from '@/states/OpenCloseSlice';
import { SearchDashboardSlice } from '@/states/SearchDashboardSlice';
import { ChatFriendsGroupsSlice } from '@/states/ChatFriendsGroupsSlice';
import { ChatSideNavSlice } from '@/states/ChatSideNavSlice';
import { AddModalSlice } from '@/states/AddModalSlice';
import { GroupManagementSlice } from '@/states/GroupManagementSlice';
import { AdminSlice } from '@/states/AdminSlice';
import { AddFileModalSlice } from '@/states/AddFileModalSlice';
import { FileListSlice } from '@/states/FileListSlice';
import { ChatNotificationSlice } from '@/states/ChatNotificationSlice';

stateManager.createSlices({
  success: SuccessSlice,
  error: ErrorSlice,
  openClose: OpenCloseSlice,
  searchDashboard: SearchDashboardSlice,
  chatFriendsGroups: ChatFriendsGroupsSlice,
  chatSideNav: ChatSideNavSlice,
  addModal: AddModalSlice,
  groupManagement: GroupManagementSlice,
  admin: AdminSlice,
  addFileModal: AddFileModalSlice,
  fileList: FileListSlice,
  chatNotification: ChatNotificationSlice,
});
