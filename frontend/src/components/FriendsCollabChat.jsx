import { useState } from "react";
import { Send, Users, Plus, Search, MessageCircle } from "lucide-react";
import { mockProfiles, mockGroups, mockFriends } from "../mockData";

const FriendsCollabChat = ({ user }) => {
  const [groups, setGroups] = useState(mockGroups);
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || null);
  const [input, setInput] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [memberResults, setMemberResults] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  // Friends for individual chat
  const [friends] = useState(mockFriends);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [friendMessages, setFriendMessages] = useState({});
  const [friendInput, setFriendInput] = useState("");

  // Group selection
  const selectedGroup = selectedGroupId ? groups.find(g => g.id === selectedGroupId) : null;
  const selectedFriend = selectedFriendId ? friends.find(f => f.id === selectedFriendId) : null;

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

  // Private friend chat send
  const handleFriendSend = () => {
    if (!friendInput.trim() || !selectedFriend) return;
    setFriendMessages(prev => {
      const prevMsgs = prev[selectedFriend.id] || [];
      return {
        ...prev,
        [selectedFriend.id]: [
          ...prevMsgs,
          { sender: 'You', text: friendInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      };
    });
    setFriendInput("");
  };

  // Group creation (unchanged)
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
    setSelectedFriendId(null);
  };

  return (
    <div className="friends-collab-chat-container">
      <div className="group-list-sidebar">
        <div className="group-list-header">
          <h2><Users size={20} /> Groups</h2>
          <button className="btn-create-group" onClick={() => { setShowCreate(true); setSelectedGroupId(null); setSelectedFriendId(null); }}><Plus size={16} /> New</button>
        </div>
        <ul className="group-list">
          {groups.map(group => (
            <li
              key={group.id}
              className={`group-list-item${group.id === selectedGroupId ? ' active' : ''}`}
              onClick={() => { setSelectedGroupId(group.id); setSelectedFriendId(null); }}
            >
              <span className="group-name">{group.name}</span>
            </li>
          ))}
        </ul>
        <div className="friends-list-header">
          <h2><MessageCircle size={18} /> Friends</h2>
        </div>
        <ul className="group-list">
          {friends.map(friend => (
            <li
              key={friend.id}
              className={`group-list-item${friend.id === selectedFriendId ? ' active' : ''}`}
              onClick={() => { setSelectedFriendId(friend.id); setSelectedGroupId(null); }}
            >
              <img src={friend.profilePic} alt={friend.name} className="friend-avatar" style={{ width: 24, height: 24, marginRight: 8 }} />
              <span className="group-name">{friend.name}</span>
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
        ) : selectedFriend ? (
          <>
            <div className="group-chat-header">
              <h2>{selectedFriend.name}</h2>
              <span className="group-members-count">Private Chat</span>
            </div>
            <div className="chat-messages">
              {(friendMessages[selectedFriend.id] || []).map((msg, idx) => (
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
                value={friendInput}
                onChange={e => setFriendInput(e.target.value)}
                placeholder={`Message ${selectedFriend.name}...`}
                onKeyDown={e => e.key === 'Enter' && handleFriendSend()}
              />
              <button onClick={handleFriendSend} disabled={!friendInput.trim()}><Send size={16} /></button>
            </div>
          </>
        ) : (
          <div className="no-group-selected">Select a group or friend to start chatting.</div>
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