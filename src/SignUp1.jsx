import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'
);

const Signup1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            username, 
            display_name: username,
            isFirstTimeUser: true
          },
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }

      setSuccess('Signup successful! Please check your email to confirm, then log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

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
          font-family: Jost, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .signupHeader {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 20px 30px;
          margin-bottom: 5px;
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
        .signupForm {
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
        .signupButton {
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
        .signupButtonDisabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .loginLink {
          margin-top: 20px;
          color: #a0a0a0;
        }
        .loginLinkA {
          color: #5db075;
          text-decoration: none;
          margin-left: 5px;
        }
        .errorMessage {
          color: #ff4d4d;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }
        .successMessage {
          color: lightgreen;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
      <div className="mainContainer">
        <div className="signupHeader">
          <div className="logoContainer">
            <img src="/isle4.png" alt="Isle" className="logoImage" />
          </div>
        </div>
        <form className="signupForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="email">Email</label>
            <input
              className="inputGroupInput"
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="username">Username</label>
            <input
              className="inputGroupInput"
              type="text"
              name="username"
              id="username"
              required
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="password">Password</label>
            <input
              className="inputGroupInput"
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="inputGroupInput"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          {error && <div className="errorMessage">{error}</div>}
          {success && <div className="successMessage">{success}</div>}
          <button
            type="submit"
            className={isLoading ? "signupButton signupButtonDisabled" : "signupButton"}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          <div className="loginLink">
            Already have an account?
            <Link to="/login" className="loginLinkA">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup1;
