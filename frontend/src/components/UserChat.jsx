// UserChat.jsx
import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Circle } from 'lucide-react';
import useUserData from '../hooks/useUserData';

const UserChat = ({ targetUser, onClose }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const {
    currentUserId,
    users,
    directMessages,
    sendDirectMessage
  } = useUserData();

  const currentUser = users.find(u => u.id === currentUserId);
  const conversation = directMessages
    .filter(
      m => (m.fromUserId === currentUserId && m.toUserId === targetUser.id) ||
           (m.fromUserId === targetUser.id && m.toUserId === currentUserId)
    )
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendDirectMessage(targetUser.id, message);
    setMessage('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="userchat-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-header">
          <button className="btn-back" onClick={onClose}>
            <ArrowLeft size={18} />
          </button>
          <div className="chat-user-info">
            <div className="avatar-wrapper">
              <div className="avatar-circle">{targetUser.avatar}</div>
            </div>
            <div className="user-details">
              <h2>{targetUser.username}</h2>
              <p className="status">
                <Circle size={8} className={targetUser.isOnline ? 'online' : 'offline'} />
                {targetUser.isOnline ? 'Online' : 'Offline'} • Level {targetUser.level}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {conversation.map(msg => (
            <div
              key={msg.id}
              className={`message-row ${msg.fromUserId === currentUserId ? 'own' : 'other'}`}
            >
              <div className="message-avatar">
                <div className="avatar-circle">
                  {msg.fromUserId === currentUserId ? currentUser?.avatar : targetUser.avatar}
                </div>
              </div>
              <div className={`message-content ${msg.fromUserId === currentUserId ? 'align-end' : 'align-start'}`}>
                <div className="message-meta">
                  <span className="username">
                    {msg.fromUserId === currentUserId ? currentUser?.username : targetUser.username}
                  </span>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={`message-bubble ${msg.fromUserId === currentUserId ? 'bubble-own' : 'bubble-other'}`}>    
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
          {conversation.length === 0 && (
            <div className="empty-state">
              <div className="avatar-circle-large">{targetUser.avatar}</div>
              <p>Start a conversation with {targetUser.username}!</p>
              <p className="subtitle">Send a message to get started.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Message ${targetUser.username}...`}
            className="input-field"
          />
          <button className="btn-send" onClick={handleSendMessage} disabled={!message.trim()}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
