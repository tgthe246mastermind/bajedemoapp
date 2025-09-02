import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup1 from './SignUp1.jsx';
import Baje from './Baje.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Onboarding from './Onboarding.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ResetPassword from './ResetPassword.jsx';
import Loadscreen from './Loadscreen.jsx';





function App() {
 

  return (
   
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/baje" element={<Baje />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/loadscreen" element={<Loadscreen />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
  );
}

export default App;
