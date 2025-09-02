import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'
);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });

      if (error) {
        throw error;
      }

      if (session?.user) {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          throw userError;
        }

        const isFirstTimeUser = userData?.user?.user_metadata?.isFirstTimeUser ?? false;

        if (isFirstTimeUser) {
          navigate('/onboarding');
        } else {
          navigate('/baje');
        }
      } else {
        throw new Error('No user session found');
      }
    } catch (error) {
      setError(error.message || 'Invalid login credentials');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function checkUserAfterRedirect() {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session error:', sessionError);
        return;
      }

      const url = new URL(window.location.href);
      const isRecovery = url.hash.includes('type=recovery');

      if (session?.user && !isRecovery) {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('User data error:', userError);
          return;
        }

        const isFirstTimeUser = userData?.user?.user_metadata?.isFirstTimeUser ?? false;
        if (isFirstTimeUser) {
          navigate('/onboarding');
        } else {
          navigate('/baje');
        }
      } else if (isRecovery) {
        navigate('/reset-password');
      }
    }

    checkUserAfterRedirect();
  }, [navigate]);

  return (
    <>
      <style jsx>{`
        body {
          background: var(--bg-gradient);
         --bg-gradient: linear-gradient(135deg, #000000, #1E90FF);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .mainContainer {
          position: relative;
          width: 700px;
          height: 840px;
          margin: 0 auto;
          background: #121212;
          overflow: hidden;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          font-family: Jost, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei UI', 'Microsoft Yahei', 'Source Han Sans CN', sans-serif;
        }
        .loginHeader {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 20px 30px;
          margin-bottom: 5px;
        }
        .logo {
          font-size: 30px;
          font-weight: 700;
          color: white;
        }
        .logoContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 20vh;
          margin-bottom: -30px;
        }
        .logoImage {
          max-width: 100%;
          height: 70%;
        }
        .loginForm {
          width: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 5px;
        }
        .inputGroup {
          width: 100%;
          margin-bottom: 20px;
        }
        .inputGroupLabel {
          display: block;
          margin-bottom: 10px;
          color: #a0a0a0;
        }
        .inputGroupInput {
          width: 100%;
          height: 50px;
          background: #1e1e1e;
          border: 1px solid #303139;
          border-radius: 10px;
          color: white;
          padding: 0 15px;
          font-size: 16px;
        }
        .loginButton {
          width: 100%;
          height: 50px;
          background: #5db075;
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-bottom: 10px;
          margin-left: 20px;
        }
        .loginButtonDisabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .signupLink {
          margin-top: 20px;
          color: #a0a0a0;
        }
        .signupLinkA {
          color: #5db075;
          text-decoration: none;
          margin-left: 5px;
        }
        .errorMessage {
          color: #ff4d4d;
          margin-bottom: 20px;
          font-size: 14px;
        }
      
 /* Mobile Portrait (320px) */
@media (min-width: 320px) and (max-width: 374px) {
  body {
    padding: 8px;
    align-items: flex-start;
  }
  .mainContainer {
    width: 100%;
    height: auto;
    min-height: 60px;
    border-radius: 6px;
    padding: 8px;
    margin: 80px 0 0 0;
  }
  .loginHeader {
    padding: 12px 16px;
    margin-bottom: 8px;
  }
  .logo {
    font-size: 22px;
  }
  .logoContainer {
    height: 12vh;
    margin-bottom: -15px;
  }
  .logoImage {
    height: 55%;
  }
  .loginForm {
    width: 95%;
    margin-top: 8px;
    margin-right: 10px;
  }
  .inputGroup {
    margin-bottom: 12px;
    margin-right: 8px;
  }
  .inputGroupLabel {
    font-size: 13px;
    margin-bottom: 6px;
  }
  .inputGroupInput {
    height: 36px;
    font-size: 13px;
    padding: 0 8px;
    border-radius: 6px;
  }
  .loginButton {
    height: 36px;
    font-size: 14px;
    margin-left: 0;
    margin-bottom: 6px;
    border-radius: 6px;
  }
  .signupLink {
    margin-top: 12px;
    font-size: 13px;
  }
  .signupLinkA {
    margin-left: 3px;
  }
  .errorMessage {
    font-size: 11px;
    margin-bottom: 12px;
  }
}

/* Mobile Portrait (375px) */
@media (min-width: 375px) and (max-width: 424px) {
  body {
    padding: 8px;
    align-items: flex-start;
  }
  .mainContainer {
    width: 100%;
    height: auto;
    min-height: 60px;
    border-radius: 6px;
    padding: 10px;
    margin: 80px 0 0 0;
  }
  .loginHeader {
    padding: 15px 20px;
    margin-bottom: 10px;
  }
  .logo {
    font-size: 24px;
  }
  .logoContainer {
    height: 15vh;
    margin-bottom: -20px;
  }
  .logoImage {
    height: 60%;
  }
  .loginForm {
    width: 92%;
    margin-top: 10px;
    margin-right: 15px;
  }
  .inputGroup {
    margin-bottom: 15px;
    margin-right: 10px;
  }
  .inputGroupLabel {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .inputGroupInput {
    height: 40px;
    font-size: 14px;
    padding: 0 10px;
    border-radius: 8px;
  }
  .loginButton {
    height: 40px;
    font-size: 16px;
    margin-left: 0;
    margin-bottom: 8px;
    border-radius: 8px;
  }
  .signupLink {
    margin-top: 15px;
    font-size: 14px;
  }
  .signupLinkA {
    margin-left: 4px;
  }
  .errorMessage {
    font-size: 12px;
    margin-bottom: 15px;
  }
}

/* Mobile Portrait (425px) */
@media (min-width: 425px) and (max-width: 479px) {
  body {
    padding: 8px;
    align-items: flex-start;
  }
  .mainContainer {
    width: 100%;
    height: auto;
    min-height: 60px;
    border-radius: 6px;
    padding: 12px;
    margin: 80px 0 0 0;
  }
  .loginHeader {
    padding: 15px 20px;
    margin-bottom: 10px;
  }
  .logo {
    font-size: 24px;
  }
  .logoContainer {
    height: 15vh;
    margin-bottom: -20px;
  }
  .logoImage {
    height: 60%;
  }
  .loginForm {
    width: 90%;
    margin-top: 10px;
    margin-right: 20px;
  }
  .inputGroup {
    margin-bottom: 15px;
    margin-right: 10px;
  }
  .inputGroupLabel {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .inputGroupInput {
    height: 40px;
    font-size: 14px;
    padding: 0 10px;
    border-radius: 8px;
  }
  .loginButton {
    height: 40px;
    font-size: 16px;
    margin-left: 0;
    margin-bottom: 8px;
    border-radius: 8px;
  }
  .signupLink {
    margin-top: 15px;
    font-size: 14px;
  }
  .signupLinkA {
    margin-left: 4px;
  }
  .errorMessage {
    font-size: 12px;
    margin-bottom: 15px;
  }
}

/* Mobile Landscape (481px to 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  body {
    padding: 12px;
    align-items: flex-start;
  }
  .mainContainer {
    width: 85%;
    height: auto;
    min-height: 650px;
    border-radius: 6px;
    padding: 15px;
  }
  .loginHeader {
    padding: 15px 25px;
    margin-bottom: 10px;
  }
  .logo {
    font-size: 26px;
  }
  .logoContainer {
    height: 18vh;
    margin-bottom: -25px;
  }
  .logoImage {
    height: 65%;
  }
  .loginForm {
    width: 85%;
    margin-top: 8px;
  }
  .inputGroup {
    margin-bottom: 18px;
  }
  .inputGroupLabel {
    font-size: 15px;
    margin-bottom: 9px;
  }
  .inputGroupInput {
    height: 45px;
    font-size: 15px;
    padding: 0 12px;
    border-radius: 9px;
  }
  .loginButton {
    height: 45px;
    font-size: 17px;
    margin-left: 10px;
    margin-bottom: 9px;
    border-radius: 9px;
  }
  .signupLink {
    margin-top: 18px;
    font-size: 15px;
  }
  .signupLinkA {
    margin-left: 5px;
  }
  .errorMessage {
    font-size: 13px;
    margin-bottom: 18px;
  }
}

/* Tablet Portrait and Landscape (768px to 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  body {
    padding: 16px;
  }
  .mainContainer {
    display: flex;
    align-items: center;
    width: 170%;
    height: 600px;
    border-radius: 7px;
    padding: 20px;
    margin-left: -90px;
  }
  .loginHeader {
    padding: 18px 28px;
    margin-bottom: 8px;
  }
  .logo {
    font-size: 28px;
  }
  .logoContainer {
    height: 18vh;
    margin-bottom: -28px;
  }
  .logoImage {
    height: 65%;
  }
  .loginForm {
    width: 80%;
    margin-top: 8px;
  }
  .inputGroup {
    margin-bottom: 18px;
  }
  .inputGroupLabel {
    font-size: 15px;
    margin-bottom: 9px;
  }
  .inputGroupInput {
    height: 48px;
    font-size: 15px;
    padding: 0 14px;
    border-radius: 9px;
  }
  .loginButton {
    height: 48px;
    font-size: 17px;
    margin-left: 15px;
    margin-bottom: 9px;
    border-radius: 9px;
  }
  .signupLink {
    margin-top: 18px;
    font-size: 15px;
  }
  .signupLinkA {
    margin-left: 5px;
  }
  .errorMessage {
    font-size: 13px;
    margin-bottom: 18px;
  }
}

/* Laptop/Desktop (1025px to 1280px) */
@media (min-width: 1025px) and (max-width: 1280px) {
  body {
    padding: 20px;
  }
  .mainContainer {
    width: 750px;
    height: 820px;
    border-radius: 8px;
    padding: 20px;
  }
  .loginHeader {
    padding: 20px 30px;
    margin-bottom: 5px;
  }
  .logo {
    font-size: 30px;
  }
  .logoContainer {
    height: 20vh;
    margin-bottom: -30px;
  }
  .logoImage {
    height: 70%;
  }
  .loginForm {
    width: 80%;
    margin-top: 5px;
  }
  .inputGroup {
    margin-bottom: 20px;
  }
  .inputGroupLabel {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .inputGroupInput {
    height: 50px;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 10px;
  }
  .loginButton {
    height: 50px;
    font-size: 18px;
    margin-left: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  .signupLink {
    margin-top: 20px;
    font-size: 16px;
  }
  .signupLinkA {
    margin-left: 5px;
  }
  .errorMessage {
    font-size: 14px;
    margin-bottom: 20px;
  }
}

/* Desktop (1281px+) */
@media (min-width: 1281px) {
  body {
    padding: 24px;
  }
  .mainContainer {
    width: 700px;
    height: 700px;
    border-radius: 8px;
    padding: 24px;
  }
  .loginHeader {
    padding: 20px 30px;
    margin-bottom: 5px;
  }
  .logo {
    font-size: 30px;
  }
  .logoContainer {
    height: 20vh;
    margin-bottom: -30px;
  }
  .logoImage {
    height: 70%;
  }
  .loginForm {
    width: 80%;
    margin-top: 5px;
  }
  .inputGroup {
    margin-bottom: 20px;
  }
  .inputGroupLabel {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .inputGroupInput {
    height: 50px;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 10px;
  }
  .loginButton {
    height: 50px;
    font-size: 18px;
    margin-left: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  .signupLink {
    margin-top: 20px;
    font-size: 16px;
  }
  .signupLinkA {
    margin-left: 5px;
  }
  .errorMessage {
    font-size: 14px;
    margin-bottom: 20px;
  }
}
      `}</style>
      <div className="mainContainer">
        <div className="loginHeader">
          <div className="logo">
            <div className="logoContainer">
              <img src="/isle4.png" alt="Isle" className="logoImage" />
            </div>
          </div>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="username">Email</label>
            <input
              className="inputGroupInput"
              type="email"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="password">Password</label>
            <input
              className="inputGroupInput"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="errorMessage">{error}</div>}
          <button
            type="submit"
            className={isLoading ? "loginButton loginButtonDisabled" : "loginButton"}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <div className="signupLink">
            Don’t have an account?
            <Link to="/signup" className="signupLinkA">Sign Up</Link>
          </div>
          <div className="signupLink">
            Forgot your password?
            <Link to="/forgot-password" className="signupLinkA">Reset Password</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
