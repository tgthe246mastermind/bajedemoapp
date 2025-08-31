import { Routes, Route, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useEffect } from "react";
import Signup1 from './SignUp1.jsx';
import Baje from './Baje.jsx';
import BajeTour from './BajeTour.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import HelpPage from './FAQ.jsx';
import Packages from './Packages.jsx';
import Profile from './Profile.jsx';
import ReportIssue from './ReportIssue.jsx';
import SavedChat from './SavedChat.jsx';
import Settings from './Settings.jsx';
import Workbench from './Workbench.jsx';
import Notifications from './Notifications.jsx';
import PaymentCard from './PaymentCard.jsx';
import Onboarding from './Onboarding.jsx';
import Paywall from './PaymentWall.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ResetPassword from './ResetPassword.jsx';
import AdminSendNotification from './AdminSendNotification.jsx';
import Loadscreen from './Loadscreen.jsx';

const supabase = createClient(
  "https://lgurtucciqvwgjaphdqp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk"
);

function useAuthRefresh() {
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error || !session) {
        console.error("Auto-refresh error:", error?.message || "No session");
        navigate("/login", { replace: true });
      } else {
        console.log("Session refreshed successfully at", new Date().toISOString());
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes
    return () => clearInterval(interval);
  }, [navigate]);
}


function App() {
  const navigate = useNavigate();

  // Integrate global session refresh
  useAuthRefresh();

/

  return (
   
      <Routes>
        <Route path="/" element={<Baje />} />
       
      </Routes>
   
  );
}

export default App;
