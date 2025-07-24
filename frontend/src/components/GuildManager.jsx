// GuildManager.jsx
import { useState } from 'react';
import { Users, Crown, Shield, User as UserIcon, Clock, Check, X as XIcon, MessageSquare, Settings } from 'lucide-react';
import useUserData from '../hooks/useUserData';
import GuildChat from './GuildChat';

const GuildManager = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [joinMessage, setJoinMessage] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [targetGuildId, setTargetGuildId] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatGuildId, setChatGuildId] = useState('');

  const {
    currentUserId,
    guilds,
    guildRequests,
    joinGuild,
    handleGuildRequest,
    isUserInGuild,
    getUserGuilds,
    getPendingRequests
  } = useUserData();

  const handleJoinGuild = (guildId) => {
    const guild = guilds.find(g => g.id === guildId);
    if (guild?.isPrivate) {
      setTargetGuildId(guildId);
      setShowJoinModal(true);
    } else {
      joinGuild(guildId);
    }
  };

  const submitJoinRequest = () => {
    joinGuild(targetGuildId, joinMessage);
    setShowJoinModal(false);
    setJoinMessage('');
    setTargetGuildId('');
  };

  const openGuildChat = (guildId) => {
    setChatGuildId(guildId);
    setShowChat(true);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner': return <Crown className="icon-owner" size={16} />;
      case 'admin': return <Shield className="icon-admin" size={16} />;
      default: return <UserIcon className="icon-member" size={16} />;
    }
  };

  const myGuilds = getUserGuilds();
  const pendingRequests = getPendingRequests();

  if (!isOpen) return null;

  if (showChat && chatGuildId) {
    return <GuildChat guildId={chatGuildId} onClose={() => setShowChat(false)} />;
  }

  return (
    <div className="guildmanager-overlay" onClick={onClose}>
      <div className="guildmanager-container" onClick={e => e.stopPropagation()}>
        <header className="guildmanager-header">
          <h2><Users className="icon-primary" size={20} /> Guild Manager</h2>
          <button className="btn-close" onClick={onClose}><XIcon size={20} /></button>
        </header>
        <nav className="guildmanager-tabs">
          <button className={activeTab === 'browse' ? 'tab-active' : 'tab'} onClick={() => setActiveTab('browse')}>Browse Guilds</button>
          <button className={activeTab === 'my-guilds' ? 'tab-active' : 'tab'} onClick={() => setActiveTab('my-guilds')}>My Guilds ({myGuilds.length})</button>
          <button className={activeTab === 'requests' ? 'tab-active' : 'tab'} onClick={() => setActiveTab('requests')}>Requests ({pendingRequests.length})</button>
        </nav>

        <div className="guildmanager-content">
          {activeTab === 'browse' && guilds.map(guild => (
            <div key={guild.id} className="guild-card">
              <div className="guild-info">
                <h3>{guild.name} {guild.isPrivate && <span className="badge-private">Private</span>}</h3>
                <p className="guild-desc">{guild.description}</p>
                <div className="guild-meta">{guild.members.length} members · Category: {guild.category}</div>
              </div>
              <div className="guild-actions">
                {isUserInGuild(guild.id) ? (
                  <>                  
                    <button className="btn-outline" onClick={() => openGuildChat(guild.id)}><MessageSquare size={16} /> Chat</button>
                    <button className="btn-outline" onClick={() => setSelectedGuild(guild)}><Settings size={16} /> View</button>
                  </>
                ) : (
                  <button className="btn-primary" onClick={() => handleJoinGuild(guild.id)}>Join Guild</button>
                )}
              </div>
            </div>
          ))}

          {activeTab === 'my-guilds' && myGuilds.map(guild => (
            <div key={guild.id} className="guild-card">
              <h3>{guild.name}</h3>
              <p className="guild-desc">{guild.description}</p>
              <button className="btn-outline" onClick={() => openGuildChat(guild.id)}>Chat</button>
              <div className="member-list">
                {guild.members.map(member => (
                  <div key={member.id} className="member-item">
                    <span className="avatar">{member.avatar}</span>
                    <div>
                      <span className="username">{member.username}</span> {getRoleIcon(member.role)}
                      <div className="user-level">Level {member.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {activeTab === 'requests' && pendingRequests.map(req => (
            <div key={req.id} className="guild-card">
              <h3>{req.username} wants to join {guilds.find(g => g.id === req.guildId)?.name}</h3>
              <p className="guild-desc">{req.message}</p>
              <div className="guild-meta"><Clock size={14} /> {new Date(req.createdAt).toLocaleDateString()}</div>
              <div className="request-actions">
                <button className="btn-outline" onClick={() => handleGuildRequest(req.id, 'reject')}><XIcon /> Reject</button>
                <button className="btn-primary" onClick={() => handleGuildRequest(req.id, 'accept')}><Check /> Accept</button>
              </div>
            </div>
          ))}

          {showJoinModal && (
            <div className="joinmodal-overlay" onClick={() => setShowJoinModal(false)}>
              <div className="joinmodal-container" onClick={e => e.stopPropagation()}>
                <h3>Request to Join Guild</h3>
                <p>Please write a message explaining why you'd like to join.</p>
                <textarea className="join-textarea" value={joinMessage} onChange={e => setJoinMessage(e.target.value)} rows={4} />
                <div className="modal-actions">
                  <button className="btn-outline" onClick={() => setShowJoinModal(false)}>Cancel</button>
                  <button className="btn-primary" onClick={submitJoinRequest} disabled={!joinMessage.trim()}>Send Request</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuildManager;
