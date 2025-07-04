

//WORKING CODE This is showing up
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Signup.css';

// Initialize Supabase client
const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co', // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'             // Replace with your Supabase anon key
);

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Signup successful! Check your email to confirm your account.');
    }
  };

  return (
    <div className="main-container">
      <div className="login-header">
        <div className="logo">BAJE</div>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required value={formData.username} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required value={formData.password} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
        </div>

        {error && <p style={{ color: 'tomato', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'lightgreen', textAlign: 'center' }}>{success}</p>}

        <button type="submit" className="signup-button">Sign Up</button>

        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;

//WORKING CODE


