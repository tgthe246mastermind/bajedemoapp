// Home.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isleImage from '../isle2.png';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
   
    }}>
      <img src={isleImage} alt="Isle" style={{ maxWidth: '100%', height: '70%' }} />
    </div>
  );
};

export default Home;
