import { Routes, Route } from 'react-router-dom';
import Signup1 from './SignUp1.jsx';
import Baje from './Baje.jsx';
import Login from './Login.jsx'; // <-- make sure this file exists
import Home from './Home.jsx'; // <-- make sure this file exists
import Dashboard from './Dashboard.jsx'; // <-- make sure this file exists
import HelpPage from './FAQ.jsx';
import Issues from './Playground.jsx';
import Packages from './Packages.jsx';
import Profile from './Profile.jsx';
import ReportIssue from './ReportIssue.jsx';
import SavedChat from './SavedChat.jsx';
import Settings from './Settings.jsx';
import Workbench from './Workbench.jsx';
import Notifications from './Notifications.jsx';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Home />} /> 
      <Route path="/signup" element={<Signup1 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/baje" element={<Baje />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/playground" element={<Issues />}/>
      <Route path="/packages" element={<Packages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/report" element={<ReportIssue />} />
      <Route path="/saved-chats" element={<SavedChat />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/workbench" element={<Workbench />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
   
  );
}

export default App;


