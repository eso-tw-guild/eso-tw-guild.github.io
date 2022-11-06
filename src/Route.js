import { 
  HashRouter, 
  Route, 
  Routes
} from 'react-router-dom';

import LoginView from './view/Login';
import MainView from './view/Main';
import MyProfileView from './view/MyProfile';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/main" element={<MainView />} />
        <Route path="/my-profile" element={<MyProfileView />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;