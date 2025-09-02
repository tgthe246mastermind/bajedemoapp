import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'
);

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMessage('Please enter your new password.');
      }
    });

    const url = new URL(window.location.href);
    if (url.hash.includes('type=recovery')) {
      setMessage('Please enter your new password.');
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setMessage('Password updated successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.message || 'Failed to update password');
      console.error('Password update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        /* All your existing styles remain unchanged */
      `}</style>
      <div className="mainContainer">
        <div className="resetHeader">
          <div className="logo">
            <div className="logoContainer">
              {/* Load image from public folder */}
              <img src="/isle4.png" alt="Isle" className="logoImage" />
            </div>
          </div>
        </div>
        <form className="resetForm" onSubmit={handlePasswordUpdate}>
          <div className="inputGroup">
            <label className="inputGroupLabel" htmlFor="newPassword">New Password</label>
            <input
              className="inputGroupInput"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
          <div className="loginLink">
            Back to <Link to="/login" className="loginLinkA">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
