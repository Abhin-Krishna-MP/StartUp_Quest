// GuildChat.jsx
import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Users, Crown, Shield, User } from 'lucide-react';
import useUserData from '../hooks/useUserData';

const GuildChat = ({ guildId, onClose }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const {
    currentUserId,
    guilds,
    guildMessages,
    sendGuildMessage
  } = useUserData();

  const guild = guilds.find(g => g.id === guildId);
  const messages = guildMessages.filter(m => m.guildId === guildId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendGuildMessage(guildId, message);
    setMessage('');
  };

  const getRoleIcon = (userId) => {
    const member = guild?.members.find(m => m.id === userId);
    switch (member?.role) {
      case 'owner': return <Crown className="icon-owner" size={12} />;
      case 'admin': return <Shield className="icon-admin" size={12} />;
      default: return <User className="icon-member" size={12} />;
    }
  };

  const getMemberAvatar = (userId) => {
    const member = guild?.members.find(m => m.id === userId);
    return member?.avatar || '👤';
  };

  if (!guild) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="guildchat-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="guildchat-header">
          <button className="btn-back" onClick={onClose}><ArrowLeft size={18} /></button>
          <div className="guild-title">
            <h2>{guild.name}</h2>
            <div className="guild-members">
              <Users size={12} /> {guild.members.length} members
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="guildchat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message-row ${msg.userId === currentUserId ? 'own' : 'other'}`}>
              <div className="avatar-wrapper">
                <div className="avatar-circle">{getMemberAvatar(msg.userId)}</div>
              </div>
              <div className="message-content">
                <div className="message-meta">
                  <span className="username">{msg.username}</span>
                  {getRoleIcon(msg.userId)}
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={`message-bubble ${msg.userId === currentUserId ? 'bubble-own' : 'bubble-other'}`}>
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="empty-state">
              <Users size={48} />
              <p>Welcome to {guild.name}!</p>
              <p className="subtitle">Start the conversation by sending a message.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="guildchat-input">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Message ${guild.name}...`}
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

export default GuildChat;
