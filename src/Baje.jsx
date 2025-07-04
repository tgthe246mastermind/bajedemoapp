import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';  // You can choose any highlight.js theme

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

      const aiMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response.data.response || "Sorry, I couldn't process that request."
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
          >
            <ReactMarkdown
              children={msg.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  return inline ? (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="code-block" {...props}>
                      <code className={className}>
                        {children}
                      </code>
                    </pre>
                  );
                }
              }}
            />
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
        .baje-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 700px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #121212;
          color: #ddd;
        }
        .chat-header {
          position: sticky;
          top: 0;
          z-index: 1001;
          background-color: #1a1a1a;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 5px rgba(0,0,0,0.6);
          border-bottom: 1px solid #333;
        }
        .ai-avatar {
          width: 40px;
          height: 40px;
          background-color: #0a74da;
          border-radius: 50%;
          margin-right: 12px;
          box-shadow: 0 0 8px #0a74da;
        }
        .ai-info {
          display: flex;
          flex-direction: column;
        }
        .ai-name {
          font-weight: 700;
          font-size: 18px;
          color: #0a74da;
        }
        .ai-status {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }
        .barbados-flag {
          box-shadow: 0 0 4px #222;
        }
        .header-buttons button {
          background: transparent;
          border: none;
          font-size: 20px;
          color: #ddd;
          cursor: pointer;
          margin-left: 12px;
        }
        .nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0);
          z-index: 999;
          transition: background 0.3s ease;
          visibility: hidden;
        }
        .nav-overlay.active {
          background: rgba(0, 0, 0, 0.5);
          visibility: visible;
        }
        .nav-card {
          position: fixed;
          top: 0;
          right: -300px;
          width: 250px;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          padding: 20px;
          transition: right 0.3s ease;
          z-index: 1000;
          visibility: hidden;
          border-radius: 10px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .nav-card-open {
          right: 0;
          visibility: visible;
        }
        .close-nav {
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .nav-list {
          list-style: none;
          padding: 0;
          margin: 40px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: calc(100% - 40px);
        }
        .nav-item {
          margin: 15px 0;
        }
        .nav-item-a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-family: var(--default-font-family);
          transition: color 0.2s ease;
        }
        .nav-item-a:hover {
          color: #1E90FF;
        }
        .hamburger-button {
          position: relative;
          width: 28px;
          height: 20px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hamburger-button-span {
          display: block;
          height: 3px;
          background: #ddd;
          border-radius: 2px;
          transition: all 0.3s ease;
          position: relative;
          top: 0;
        }
        .hamburger-button.active .hamburger-button-span {
          background: white;
        }
        .hamburger-button.active .hamburger-button-span:nth-child(1) {
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }
        .hamburger-button.active .hamburger-button-span:nth-child(2) {
          opacity: 0;
        }
        .hamburger-button.active .hamburger-button-span:nth-child(3) {
          top: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
        .chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 20px;
          background-color: #1e1e1e;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scroll-behavior: smooth;
        }
        .message {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 20px;
          white-space: pre-wrap;
          word-wrap: break-word;
          line-height: 1.4;
          font-size: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .user-message {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: #000;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .assistant-message {
          background-color: #2a2a2a;
          color: #ddd;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .loading {
          opacity: 0.6;
        }
        .inline-code {
          background-color: #333;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 90%;
        }
        .code-block {
          background-color: #1e1e1e;
          padding: 12px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Source Code Pro', monospace, monospace;
          font-size: 14px;
          margin: 12px 0;
          color: #ddd;
        }
        .input-section {
          display: flex;
          padding: 12px 20px;
          background-color: #1a1a1a;
          border-top: 1px solid #333;
        }
        .input-field {
          flex-grow: 1;
          resize: none;
          border-radius: 20px;
          border: none;
          padding: 10px 16px;
          font-size: 16px;
          font-family: inherit;
          background-color: #2a2a2a;
          color: #ddd;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.7);
          outline: none;
          transition: background-color 0.2s ease;
        }
        .input-field:focus {
          background-color: #3a3a3a;
        }
        .send-button {
          margin-left: 12px;
          background: #0a74da;
          border: none;
          color: white;
          font-size: 22px;
          padding: 0 20px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px #0a74da;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .send-button:disabled {
          background: #555;
          cursor: not-allowed;
          box-shadow: none;
        }
        @media only screen and (max-width: 450px) {
          .chat-header {
            padding: 10px;
          }
          .hamburger-button {
            margin-left: auto;
          }
          .nav-card {
            width: 100%;
            max-width: 450px;
            right: -450px;
            border-radius: 0;
          }
          .nav-card-open {
            right: 0;
          }
          .nav-item {
            margin: 20px 0;
          }
          .nav-item-a {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}

export default Baje;
