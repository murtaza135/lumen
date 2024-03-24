import { createComponents } from 'framework';
import { Form } from '@/components/form/Form';
import { Input } from '@/components/form/Input';
import { Nav } from '@/components/nav/Nav';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Spinner } from '@/components/general/Spinner';
import { ErrorToast } from '@/components/error/ErrorToast';
import { ErrorText } from '@/components/error/ErrorText';
import { MainContent } from '@/components/main/MainContent';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { FriendsTable } from '@/components/dashboard/FriendsTable';
import { GroupsTable } from '@/components/dashboard/GroupsTable';
import { RecentGrid } from '@/components/dashboard/RecentGrid';
import { AddButton } from '@/components/dashboard/AddButton';
import { ChatSideNav } from '@/components/chat/side-nav/ChatSideNav';
import { ChatSideNavTopBar } from '@/components/chat/side-nav/ChatSideNavTopBar';
import { ChatSideNavToggleButton } from '@/components/chat/side-nav/ChatSideNavToggleButton';
import { ChatBackdrop } from '@/components/chat/ChatBackdrop';
import { ChatMain } from '@/components/chat/chat-main/ChatMain';
import { ChatMainTopBar } from '@/components/chat/chat-main/ChatMainTopBar';
import { ChatMainContent } from '@/components/chat/chat-main/ChatMainContent';
import { ChatBox } from '@/components/chat/chat-main/ChatBox';
import { ChatMessage } from '@/components/chat/chat-main/ChatMessage';
import { Avatar } from '@/components/general/Avatar';
import { CounterClient } from '@/counter/CounterClient';
import { FileListTopBar } from '@/components/file-list/FileListTopBar';
import { FileList } from '@/components/file-list/FileList';
import { FileListMain } from '@/components/file-list/FileListMain';
import { Backdrop } from '@/components/general/Backdrop';
import { AddModal } from '@/components/dashboard/AddModal';
import { CreateGroupForm } from '@/components/groups/CreateGroupForm';
import { GroupDetails } from '@/components/groups/GroupDetails';
import { GroupTopBar } from '@/components/groups/GroupTopBar';
import { GroupRequestsTable } from '@/components/groups/GroupRequestsTable';
import { GroupMembersTable } from '@/components/groups/GroupMembersTable';
import { FileItem } from '@/components/chat/chat-main/FileItem';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { AdminGroupsTable } from '@/components/admin/AdminGroupsTable';
import { AdminUsersTable } from '@/components/admin/AdminUsersTable';
import { AdminProfanityTable } from '@/components/admin/AdminProfanityTable';
import { AdminMessagesTable } from '@/components/admin/AdminMessagesTable';
import { FileTextEditor } from '@/components/file/FileTextEditor';
import { PDFViewer } from '@/components/file/PDFViewer';
import { AddFileModal } from '@/components/file-list/AddFileModal';
import { GroupContent } from '@/components/groups/GroupContent';
import { ZoomPanel } from '@/components/zoom/ZoomPanel';
import { ZoomAvatar } from '@/components/zoom/ZoomAvatar';
import { ZoomAcceptRejectPanel } from '@/components/zoom/ZoomAcceptRejectPanel';
import { ChatLoader } from '@/components/chat/ChatLoader';
import { SetupSockets } from '@/components/general/SetupSockets';
import { ChatLoadingMain } from '@/components/chat/chat-loading/ChatLoadingMain';
import { ChatMembersMain } from '@/components/chat/chat-members/ChatMembersMain';
import config from './config';

createComponents({
  'x-form': Form,
  'x-input': Input,
  'x-nav': Nav,
  'login-form': LoginForm,
  'register-form': RegisterForm,
  'x-spinner': Spinner,
  'error-toast': ErrorToast,
  'error-text': ErrorText,
  'main-content': MainContent,
  'auth-guard': AuthGuard,
  'dashboard-nav': DashboardNav,
  'friends-table': FriendsTable,
  'groups-table': GroupsTable,
  'recent-grid': RecentGrid,
  'add-button': AddButton,
  'chat-side-nav': ChatSideNav,
  'chat-side-nav-top-bar': ChatSideNavTopBar,
  'chat-side-nav-toggle-button': ChatSideNavToggleButton,
  'chat-backdrop': ChatBackdrop,
  'chat-main': ChatMain,
  'chat-main-top-bar': ChatMainTopBar,
  'chat-main-content': ChatMainContent,
  'chat-box': ChatBox,
  'chat-message': ChatMessage,
  'x-avatar': Avatar,
  'file-list-top-bar': FileListTopBar,
  'file-list': FileList,
  'file-list-main': FileListMain,
  'x-backdrop': Backdrop,
  'add-modal': AddModal,
  'create-group-form': CreateGroupForm,
  'group-details': GroupDetails,
  'group-top-bar': GroupTopBar,
  'group-requests-table': GroupRequestsTable,
  'group-members-table': GroupMembersTable,
  'file-item': FileItem,
  'admin-top-bar': AdminTopBar,
  'admin-groups-table': AdminGroupsTable,
  'admin-users-table': AdminUsersTable,
  'admin-profanity-table': AdminProfanityTable,
  'admin-messages-table': AdminMessagesTable,
  'file-text-editor': FileTextEditor,
  'pdf-viewer': PDFViewer,
  'add-file-modal': AddFileModal,
  'group-content': GroupContent,
  'zoom-panel': ZoomPanel,
  'zoom-avatar': ZoomAvatar,
  'zoom-accept-reject-panel': ZoomAcceptRejectPanel,
  'chat-loader': ChatLoader,
  'setup-sockets': SetupSockets,
  'chat-loading-main': ChatLoadingMain,
  'chat-members-main': ChatMembersMain,
  'counter-client': !config.env.PROD ? CounterClient : null,
});
