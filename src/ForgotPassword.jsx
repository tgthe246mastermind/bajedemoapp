import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'
);

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError(error.message || 'Failed to send password reset email');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        /* ... all your styles remain unchanged ... */
      `}</style>
      <div className="mainContainer">
        <div className="forgotHeader">
          <div className="logo">
            <div className="logoContainer">
              {/* Load image from public folder */}
              <img src="/isle4.png" alt="Isle" className="logoImage" />
            </div>
          </div>
        </div>
        <form className="forgotForm" onSubmit={handlePasswordReset}>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="email">Email</label>
            <input
              className="inputGroupInput"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="errorMessage">{error}</div>}
          {message && <div className="successMessage">{message}</div>}
          <button
            type="submit"
            className={isLoading ? "resetButton resetButtonDisabled" : "resetButton"}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <div className="loginLink">
            Back to <Link to="/login" className="loginLinkA">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
