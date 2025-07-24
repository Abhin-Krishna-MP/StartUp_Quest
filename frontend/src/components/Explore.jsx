// Explore.jsx
import { useState } from "react";
import { Search, ThumbsUp, Users, Plus, Filter, TrendingUp, Eye, MessageCircle } from "lucide-react";
import GuildManager from "./GuildManager";
import UserChat from "./UserChat";
import useUserData from "../hooks/useUserData";

const Explore = ({ onUpvote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewIdeaModal, setShowNewIdeaModal] = useState(false);
  const [showGuildManager, setShowGuildManager] = useState(false);
  const [showUserChat, setShowUserChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { users } = useUserData();
  const categories = ['all', 'tech', 'environment', 'health', 'fintech', 'education'];

  const [ideas] = useState([
    {
      id: '1',
      title: 'AI-Powered Sustainable Energy Optimizer',
      summary: 'Using machine learning to optimize renewable energy consumption in smart homes',
      author: 'EcoTechFounder',
      category: 'environment',
      upvotes: 42,
      views: 234,
      trending: true,
      hasUpvoted: false
    },
    {
      id: '2',
      title: 'Mental Health Companion App',
      summary: 'A mobile app that provides personalized mental health support using CBT techniques',
      author: 'WellnessBuilder',
      category: 'health',
      upvotes: 38,
      views: 189,
      trending: true,
      hasUpvoted: false
    },
    {
      id: '3',
      title: 'Blockchain-Based Learning Credits',
      summary: 'Decentralized platform for verifying and transferring educational achievements',
      author: 'EduChainVision',
      category: 'education',
      upvotes: 29,
      views: 156,
      trending: false,
      hasUpvoted: true
    }
  ]);

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-container">
      {/* Header */}
      <div className="explore-header">
        <div>
          <h1>Explore Ideas</h1>
          <p>Discover, share, and collaborate on startup ideas</p>
        </div>
        <div className="explore-actions">
          <button className="btn-quest" onClick={() => setShowNewIdeaModal(true)}>
            <Plus size={20} /> Share Idea
          </button>
          <button className="btn-outline" onClick={() => setShowGuildManager(true)}>
            <Users size={20} /> Manage Guilds
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="explore-filters">
        <div className="filter-group">
          <Search className="icon-muted" size={20} />
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter className="icon-muted" size={20} />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="ideas-grid">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="idea-card">
            <div className="idea-card-header">
              <span className="idea-category">{idea.category}</span>
              {idea.trending && <span className="idea-trending"><TrendingUp size={12} /> Trending</span>}
            </div>
            <h3 className="idea-title">{idea.title}</h3>
            <p className="idea-summary">{idea.summary}</p>
            <div className="idea-meta">
              <button className="idea-author" onClick={() => {
                const u = users.find((u) => u.username === idea.author);
                if (u) { setSelectedUser(u); setShowUserChat(true); }
              }}>
                <MessageCircle size={14} /> by {idea.author}
              </button>x``
              <div className="idea-stats">
                <Eye size={14} /> {idea.views}
              </div>
            </div>
            <div className="idea-actions">
              <button
                onClick={() => onUpvote(idea.id)}
                className={`btn-upvote ${idea.hasUpvoted ? 'upvoted' : ''}`}
              >
                <ThumbsUp size={16} /> {idea.upvotes}
              </button>
              <button className="btn-outline-small">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* New Idea Modal */}
      {showNewIdeaModal && (
        <div className="modal-overlay" onClick={() => setShowNewIdeaModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Share Your Idea</h3>
            <p>Coming soon! You'll be able to share your startup ideas here.</p>
            <button onClick={() => setShowNewIdeaModal(false)}>Close</button>
          </div>
        </div>
      )}

      <GuildManager isOpen={showGuildManager} onClose={() => setShowGuildManager(false)} />
      {selectedUser && <UserChat targetUser={selectedUser} onClose={() => { setShowUserChat(false); setSelectedUser(null); }} />}
    </div>
  );
};

export default Explore;
