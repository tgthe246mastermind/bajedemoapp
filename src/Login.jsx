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

      if (error) throw error;

      if (session?.user) {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const isFirstTimeUser = userData?.user?.user_metadata?.isFirstTimeUser ?? false;
        navigate(isFirstTimeUser ? '/onboarding' : '/baje');
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
      if (sessionError) return console.error('Session error:', sessionError);

      const url = new URL(window.location.href);
      const isRecovery = url.hash.includes('type=recovery');

      if (session?.user && !isRecovery) {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) return console.error('User data error:', userError);

        const isFirstTimeUser = userData?.user?.user_metadata?.isFirstTimeUser ?? false;
        navigate(isFirstTimeUser ? '/onboarding' : '/baje');
      } else if (isRecovery) {
        navigate('/reset-password');
      }
    }

    checkUserAfterRedirect();
  }, [navigate]);

  return (
    <>
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
