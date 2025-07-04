import React, { useState } from 'react';

const styles = {
  root: {
    '--default-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "Source Han Sans CN", sans-serif'
  },
  mainContainer: {
    position: 'relative',
    width: '700px',
    height: '840px',
    margin: '50px auto',
    background: '#121212',
    overflowY: 'auto',
    borderRadius: '8px',
    color: 'white',
    fontFamily: 'Jost, var(--default-font-family)',
    boxShadow: '0 0 30px rgba(0,0,0,0.3)'
  },
  savedChatsHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1E1E1E',
    borderBottom: '1px solid #303139'
  },
  savedChatsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    flexGrow: '1'
  },
  editModeToggle: {
    color: '#5DB075',
    cursor: 'pointer',
    fontSize: '16px'
  },
  savedChatsList: {
    padding: '20px'
  },
  savedChatItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    position: 'relative'
  },
  savedChatItemHover: {
    backgroundColor: '#2A2A2A'
  },
  chatIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    backgroundColor: '#005A9C'
  },
  savedChatContent: {
    flexGrow: '1'
  },
  savedChatTitle: {
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '5px'
  },
  savedChatSnippet: {
    color: '#888',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  savedChatTime: {
    color: '#888',
    fontSize: '12px'
  },
  deleteChat: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#FF0000',
    cursor: 'pointer'
  },
  noSavedChats: {
    textAlign: 'center',
    color: '#888',
    padding: '50px 20px'
  }
};

function SavedChat() {
  const [savedChats, setSavedChats] = useState([
    {
      id: 1,
      title: "Barbados Tourism",
      snippet: "Discussing cultural heritage and top attractions...",
      time: "2 days ago"
    },
    {
      id: 2,
      title: "Traffic Information",
      snippet: "Details about current road conditions...",
      time: "1 week ago"
    }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const toggleEditMode = () => setEditMode(!editMode);

  const handleDelete = (id) => {
    setSavedChats((prev) => prev.filter(chat => chat.id !== id));
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.savedChatsHeader}>
        <div style={styles.savedChatsTitle}>Saved Chats</div>
        <div style={styles.editModeToggle} onClick={toggleEditMode}>
          {editMode ? 'Done' : 'Edit'}
        </div>
      </div>

      <div style={styles.savedChatsList}>
        {savedChats.length === 0 ? (
          <div style={styles.noSavedChats}>No saved chats found.</div>
        ) : (
          savedChats.map((chat, index) => (
            <div
              key={chat.id}
              style={Object.assign({}, styles.savedChatItem, hoverIndex === index ? styles.savedChatItemHover : {})}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div style={styles.chatIcon}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <div style={styles.savedChatContent}>
                <div style={styles.savedChatTitle}>{chat.title}</div>
                <div style={styles.savedChatSnippet}>{chat.snippet}</div>
              </div>
              <div style={styles.savedChatTime}>{chat.time}</div>
              {editMode && (
                <div style={styles.deleteChat} onClick={() => handleDelete(chat.id)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedChat;
