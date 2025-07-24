import { useState } from "react";
import { Send, Users, Plus, Search } from "lucide-react";
import { mockProfiles, mockGroups } from "../mockData";

const FriendsCollabChat = ({ user }) => {
  const [groups, setGroups] = useState(mockGroups);
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || null);
  const [input, setInput] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [memberResults, setMemberResults] = useState([]);
  const [newMembers, setNewMembers] = useState([]);

  // Group selection
  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  // Group message send
  const handleSend = () => {
    if (!input.trim() || !selectedGroup) return;
    setGroups(groups => groups.map(g =>
      g.id === selectedGroup.id
        ? { ...g, messages: [...g.messages, { sender: 'You', text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] }
        : g
    ));
    setInput("");
  };

  // Group creation
  const handleMemberSearch = (e) => {
    const value = e.target.value;
    setMemberSearch(value);
    if (!value.trim()) {
      setMemberResults([]);
      return;
    }
    const lower = value.toLowerCase();
    setMemberResults(
      mockProfiles.filter(
        p => p.name.toLowerCase().includes(lower) && !newMembers.some(m => m.id === p.id)
      )
    );
  };
  const handleAddMember = (profile) => {
    setNewMembers(prev => [...prev, profile]);
    setMemberSearch("");
    setMemberResults([]);
  };
  const handleRemoveMember = (id) => {
    setNewMembers(prev => prev.filter(m => m.id !== id));
  };
  const handleCreateGroup = () => {
    if (!groupName.trim() || newMembers.length === 0) return;
    const newGroup = {
      id: `group-${Date.now()}`,
      name: groupName,
      members: newMembers.map(m => m.id),
      messages: []
    };
    setGroups(prev => [...prev, newGroup]);
    setShowCreate(false);
    setGroupName("");
    setNewMembers([]);
    setSelectedGroupId(newGroup.id);
  };

  return (
    <div className="friends-collab-chat-container">
      <div className="group-list-sidebar">
        <div className="group-list-header">
          <h2><Users size={20} /> Groups</h2>
          <button className="btn-create-group" onClick={() => setShowCreate(true)}><Plus size={16} /> New</button>
        </div>
        <ul className="group-list">
          {groups.map(group => (
            <li
              key={group.id}
              className={`group-list-item${group.id === selectedGroupId ? ' active' : ''}`}
              onClick={() => setSelectedGroupId(group.id)}
            >
              <span className="group-name">{group.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="collab-chat-section">
        {selectedGroup ? (
          <>
            <div className="group-chat-header">
              <h2>{selectedGroup.name}</h2>
              <span className="group-members-count">{selectedGroup.members.length} members</span>
            </div>
            <div className="chat-messages">
              {selectedGroup.messages.map((msg, idx) => (
                <div key={idx} className={`chat-row${msg.sender === 'You' ? ' own' : ''}`}>
                  <div className="chat-bubble">
                    <span className="chat-sender">{msg.sender}</span>
                    <span className="chat-text">{msg.text}</span>
                    <span className="chat-time">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message to the group..."
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} disabled={!input.trim()}><Send size={16} /></button>
            </div>
          </>
        ) : (
          <div className="no-group-selected">Select a group to start chatting.</div>
        )}
      </div>
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Create New Group</h3>
            <input
              type="text"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="Group name"
              className="modal-input"
            />
            <div className="modal-member-search">
              <Search size={16} />
              <input
                type="text"
                value={memberSearch}
                onChange={handleMemberSearch}
                placeholder="Add members..."
                className="modal-input"
              />
            </div>
            {memberResults.length > 0 && (
              <ul className="modal-search-results">
                {memberResults.map(profile => (
                  <li key={profile.id} className="modal-search-result-item">
                    <img src={profile.profilePic} alt={profile.name} className="friend-avatar" />
                    <span className="friend-name">{profile.name}</span>
                    <button className="btn-add-friend" onClick={() => handleAddMember(profile)}>Add</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="modal-members-list">
              {newMembers.map(member => (
                <div key={member.id} className="modal-member-chip">
                  <img src={member.profilePic} alt={member.name} className="friend-avatar" />
                  <span>{member.name}</span>
                  <button className="btn-remove-member" onClick={() => handleRemoveMember(member.id)}>&times;</button>
                </div>
              ))}
            </div>
            <button className="btn-create-group-final" onClick={handleCreateGroup} disabled={!groupName.trim() || newMembers.length === 0}>
              Create Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsCollabChat; 