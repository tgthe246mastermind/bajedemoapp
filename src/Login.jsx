import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'
);

const styles = {
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
    marginTop: "50px",
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
      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // Assuming username is an email
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Successful login, redirect to Baje
        navigate('/baje');
      }
    } catch (error) {
      setError(error.message || 'Invalid login credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.loginHeader}>
        <div style={styles.logo}>BAJE</div>
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
        
        <div style={styles.signupLink}>
          Don’t have an account?
          <Link to="/signup" style={styles.signupLinkA}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
