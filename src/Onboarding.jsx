import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lgurtucciqvwgjaphdqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndXJ0dWNjaXF2d2dqYXBoZHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzgzNTAsImV4cCI6MjA0NTIxNDM1MH0.I1ajlHp5b4pGL-NQzzvcVdznoiyIvps49Ws5GZHSXzk'
);

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    country: 'Barbados',
    interests: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const caribbeanCountries = [
    'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Dominica',
    'Grenada', 'Guyana', 'Jamaica', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Suriname', 'Trinidad and Tobago'
  ];

  const interestsOptions = [
    'Beaches', 'Cultural Festivals', 'Food', 'History', 'Sports', 'Nature', 'Music'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter(item => item !== value),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError('');
    setSuccess('');
  };

  const handleNext = async () => {
    if (currentSlide === 0 && !formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (currentSlide === 1 && !formData.country) {
      setError('Please select a country.');
      return;
    }
    if (currentSlide === 2 && formData.interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }

    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setIsLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) throw new Error('User not authenticated');

        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            fullName: formData.fullName,
            country: formData.country,
            interests: formData.interests,
            isFirstTimeUser: false,
          },
        });

        if (updateError) throw updateError;

        setSuccess('Profile updated successfully!');
        localStorage.setItem('isFirstTime', 'true');
        navigate('/loadscreen');
      } catch (error) {
        setError(error.message || 'Failed to save profile');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) throw new Error('User not authenticated');

      const { error: updateError } = await supabase.auth.updateUser({
        data: { ...user.user_metadata, isFirstTimeUser: false },
      });

      if (updateError) throw updateError;

      localStorage.setItem('isFirstTime', 'true');
      navigate('/loadscreen');
    } catch (error) {
      setError(error.message || 'Failed to skip onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="onboardingHeader">
        <div className="logoContainer">
          {/* Use image from public folder */}
          <img src="/isle4.png" alt="Isle" className="logoImage" />
        </div>
      </div>

      <div className="onboardingForm">
        <div className="progress">
          {[0, 1, 2].map(index => (
            <div key={index} className={currentSlide === index ? "dot dotActive" : "dot"} />
          ))}
        </div>

        {/* Slide 1 */}
        {currentSlide === 0 && (
          <div className="slide slideActive">
            <div className="inputGroup">
              <label className="inputGroupLabel" htmlFor="fullName">Full Name</label>
              <input
                className="inputGroupInput"
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {/* Slide 2 */}
        {currentSlide === 1 && (
          <div className="slide slideActive">
            <div className="inputGroup">
              <label className="inputGroupLabel" htmlFor="country">Select Your Country</label>
              <select
                className="select"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                disabled={isLoading}
              >
                {caribbeanCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Slide 3 */}
        {currentSlide === 2 && (
          <div className="slide slideActive">
            <div className="inputGroup">
              <label className="inputGroupLabel">Select Your Interests</label>
              {interestsOptions.map(interest => (
                <div key={interest} className="checkboxContainer">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    className="checkbox"
                    disabled={isLoading}
                  />
                  <label className="checkboxLabel">{interest}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        <button
          className={isLoading ? "nextButton nextButtonDisabled" : "nextButton"}
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : currentSlide === 2 ? 'Finish' : 'Next'}
        </button>

        <button
          className={isLoading ? "skipButton skipButtonDisabled" : "skipButton"}
          onClick={handleSkip}
          disabled={isLoading}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
