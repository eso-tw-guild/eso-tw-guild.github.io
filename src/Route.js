import { 
  HashRouter, 
  Route, 
  Routes
} from 'react-router-dom';

import LoginView from './view/Login';
import MainView from './view/Main';
import GroupView from './view/Group';
import CreateGroupView from './view/CreateGroup';
import CheckGroupView from './view/CheckGroup';
import MyProfileView from './view/MyProfile';
import GuildMemberView from './view/GuildMember';
import LineAuthCallbackView from './view/LineAuthCallback';
import EnableLineNotifyView from './view/EnableLineNotify';
import MyAchievementView from './view/MyAchievement';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/main" element={<MainView />} />
        <Route path="/group" element={<GroupView />} />
        <Route path="/create-group" element={<CreateGroupView />} />
        <Route path="/check-group/:gid" element={<CheckGroupView />} />
        <Route path="/guild-member" element={<GuildMemberView />} />
        <Route path="/my-profile" element={<MyProfileView />} />
        <Route path="/my-achievement" element={<MyAchievementView />} />
        <Route path="/line-auth-callback" element={<LineAuthCallbackView />} />
        <Route path="/enable-line-notify" element={<EnableLineNotifyView />} />
        <Route path="/enable-line-notify/:action" element={<EnableLineNotifyView />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;