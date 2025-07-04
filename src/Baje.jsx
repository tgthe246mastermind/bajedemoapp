import React, { useState, useRef, useEffect } from 'react'; 
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

import './Baje.css';

function Baje() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      role: 'assistant',
      content: "Welcome to BAJE! I'm your Barbados helper! Ask me about beaches, food, history, festivals."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  // API URL from env
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: inputValue
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/ask`, {
        prompt: inputValue
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Strip markdown: remove asterisks, double spaces, etc.
      // For a basic cleanup, just remove *, **, __, and backticks:
      const cleanContent = response.data.response
        ? response.data.response
            .replace(/(\*\*|\*|__|`)/g, '') // remove markdown symbols
            .replace(/^\s*[-*]\s+/gm, '- ') // convert markdown list markers to simple dashes with spaces
        : "Sorry, I couldn't process that request.";

      const aiMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: cleanContent
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, {
        id: uuidv4(),
        role: 'assistant',
        content: "Sorry mon! I'm having a beach day! 🏖️ Try again later!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Signup', path: '/signup' },
    { name: 'Login', path: '/login' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Help', path: '/help' },
    { name: 'Playground', path: '/playground' },
    { name: 'Profile', path: '/profile' },
    { name: 'Packages', path: '/packages' },
    { name: 'Saved Chats', path: '/saved-chats' },
    { name: 'Workbench', path: '/workbench' },
    { name: 'Settings', path: '/settings' },
    { name: 'Report Issue', path: '/report' }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isNavOpen && !e.target.closest('.nav-card') && !e.target.closest('.hamburger-button')) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isNavOpen]);

  return (
    <div className="baje-container">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="ai-avatar" />
          <div className="ai-info">
            <div className="ai-name">ISLE</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="ai-status">Your Barbados Guide</div>
              <div
                className="barbados-flag"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Barbados.svg/1200px-Flag_of_Barbados.svg.png) center/cover',
                  marginLeft: '10px'
                }}
              />
            </div>
          </div>
        </div>
        <div className="header-buttons">
          <button className="notification-button" onClick={() => navigate('/notifications')}>
            🔔
          </button>
          <button
            className={`hamburger-button ${isNavOpen ? 'active' : ''}`}
            onClick={toggleNav}
          >
            <span className="hamburger-button-span"></span>
            <span className="hamburger-button-span"></span>
            <span className="hamburger-button-span"></span>
          </button>
        </div>
      </div>

      <div className={`nav-overlay ${isNavOpen ? 'active' : ''}`}>
        <div className={`nav-card ${isNavOpen ? 'nav-card-open' : ''}`}>
          <button className="close-nav" onClick={toggleNav}>✕</button>
          <ul className="nav-list">
            {navItems.map(item => (
              <li key={item.name} className="nav-item">
                <Link
                  to={item.path}
                  className="nav-item-a"
                  onClick={() => setIsNavOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
            style={{ whiteSpace: 'pre-wrap' }} // preserve line breaks
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message loading">
            <div style={{ display: 'flex', gap: '5px' }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ccc',
                    animation: 'bounce 1.4s infinite ease-in-out',
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-section">
        <textarea
          className="input-field"
          rows={2}
          placeholder="Ask me about Barbados..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? '...' : '➤'}
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        /* (You can keep your existing CSS from your previous code here) */
      `}</style>
    </div>
  );
}

export default Baje;
