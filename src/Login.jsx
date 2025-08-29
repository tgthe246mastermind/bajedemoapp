import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import isleImage from '../isle4.png';

const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'
);

const styles = {
  body: {
    background: 'black',
    display: "flex",
  },
  mainContainer: {
    position: "relative",
    width: "700px",
    height: "840px",
    margin: "0 auto",
    background: "#121212",
    overflow: "hidden",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    fontFamily: "Jost, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei UI', 'Microsoft Yahei', 'Source Han Sans CN', sans-serif",
  },
  loginHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "20px 30px",
    marginBottom: "5px",
  },
  logo: {
    fontSize: "30px",
    fontWeight: "700",
    color: "white",
  },
  loginForm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5px",
  },
  inputGroup: {
    width: "100%",
    marginBottom: "20px",
  },
  inputGroupLabel: {
    display: "block",
    marginBottom: "10px",
    color: "#a0a0a0",
  },
  inputGroupInput: {
    width: "100%",
    height: "50px",
    background: "#1e1e1e",
    border: "1px solid #303139",
    borderRadius: "10px",
    color: "white",
    padding: "0 15px",
    fontSize: "16px",
  },
  loginButton: {
    width: "100%",
    height: "50px",
    background: "#5db075",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginBottom: "10px",
    marginLeft: "20px",
  },
  googleButton: {
    width: "100%",
    height: "50px",
    background: "#4285F4",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "0 15px",
    marginLeft: "20px",
  },
  googleLogo: {
    width: "18px",
    height: "18px",
  },
  signupLink: {
    marginTop: "20px",
    color: "#a0a0a0",
  },
  signupLinkA: {
    color: "#5db075",
    textDecoration: "none",
    marginLeft: "5px",
  },
  errorMessage: {
    color: "#ff4d4d",
    marginBottom: "20px",
    fontSize: "14px",
  }
};

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

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message || 'Google login failed');
      console.error('Google login error:', error);
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
    <div style={styles.mainContainer}>
      <div style={styles.loginHeader}>
        <div style={styles.logo}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '20vh',
            marginBottom: '-30px' 
          }}>
            <img src={isleImage} alt="Isle" style={{ maxWidth: '100%', height: '70%' }} />
          </div>
        </div>
      </div>
      
      <form style={styles.loginForm} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.inputGroupLabel} htmlFor="username">Email</label>
          <input
            style={styles.inputGroupInput}
            type="email"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.inputGroupLabel} htmlFor="password">Password</label>
          <input
            style={styles.inputGroupInput}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        {error && <div style={styles.errorMessage}>{error}</div>}
        
        <button
          type="submit"
          style={{
            ...styles.loginButton,
            ...(isLoading ? { opacity: 0.6, cursor: 'not-allowed' } : {})
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <button
          type="button"
          style={{
            ...styles.googleButton,
            ...(isLoading ? { opacity: 0.6, cursor: 'not-allowed' } : {})
          }}
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google logo"
            style={styles.googleLogo}
          />
          {isLoading ? 'Processing...' : 'Sign in with Google'}
        </button>
        
        <div style={styles.signupLink}>
          Don’t have an account?
          <Link to="/signup" style={styles.signupLinkA}>Sign Up</Link>
        </div>
        <div style={styles.signupLink}>
          Forgot your password?
          <Link to="/forgot-password" style={styles.signupLinkA}>Reset Password</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
