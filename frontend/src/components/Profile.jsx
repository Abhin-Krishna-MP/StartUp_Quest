// Profile.jsx
import { User as UserIcon, Award, Trophy, Target, TrendingUp } from 'lucide-react';

const Profile = ({ username, level, xp, badges, completedPhases, ideasShared, upvotesGiven }) => {
  const earnedBadges = badges.filter(b => b.earned);

  const getCharacterAvatar = (level) => {
    if (level >= 10) {
      return (
        <div className="avatar-container high-tier">
          <div className="avatar-overlay"></div>
          <span className="avatar-icon">🧙‍♂️</span>
          <div className="avatar-badge">★</div>
        </div>
      );
    } else if (level >= 5) {
      return (
        <div className="avatar-container mid-tier">
          <div className="avatar-overlay"></div>
          <span className="avatar-icon">🏗️</span>
          <div className="avatar-badge">⚡</div>
        </div>
      );
    } else {
      return (
        <div className="avatar-container base-tier">
          <div className="avatar-overlay"></div>
          <span className="avatar-icon">🚀</span>
          <div className="avatar-badge">🌟</div>
        </div>
      );
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {getCharacterAvatar(level)}
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{username}</h1>
          <p className="profile-level">Level {level} Entrepreneur</p>
          <p className="profile-xp">{xp} Total XP Earned</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <Target className="stat-icon" />
          <div className="stat-value">{completedPhases.length}</div>
          <div className="stat-label">Phases Completed</div>
        </div>
        <div className="stat-card">
          <TrendingUp className="stat-icon" />
          <div className="stat-value">{ideasShared}</div>
          <div className="stat-label">Ideas Shared</div>
        </div>
        <div className="stat-card">
          <Award className="stat-icon" />
          <div className="stat-value">{upvotesGiven}</div>
          <div className="stat-label">Upvotes Given</div>
        </div>
      </div>

      <div className="badges-section">
        <h2 className="section-title">
          <Trophy className="section-icon" /> Badges Earned ({earnedBadges.length}/{badges.length})
        </h2>
        <div className="badges-grid">
          {badges.map(badge => (
            <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
              <Award className="badge-icon" />
              <div className="badge-name">{badge.name}</div>
              <div className="badge-desc">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="phases-section">
        <h2 className="section-title">Completed Phases</h2>
        <div className="phases-list">
          {completedPhases.length > 0 ? completedPhases.map((phase, idx) => (
            <div key={idx} className="phase-item">
              <Target className="phase-icon" />
              <span className="phase-name">{phase}</span>
            </div>
          )) : (
            <p className="no-phases">No phases completed yet. Start your journey!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
