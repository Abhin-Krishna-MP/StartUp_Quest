import { Trophy, Star } from "lucide-react";

const XPBar = ({ currentXP, maxXP, level }) => {
  const percentage = (currentXP / maxXP) * 100;

  return (
    <div className="xpbar-container">
      <div className="xpbar-header">
        <div className="xpbar-header-left">
          <div className="xpbar-icon-badge">
            <Trophy size={24} />
          </div>
          <div>
            <h2 className="xpbar-level-title">Level {level}</h2>
            <p className="xpbar-subtitle">Startup Entrepreneur</p>
          </div>
        </div>
        <div className="xpbar-xp-total">
          <Star size={20} />
          <span>{currentXP}/{maxXP} XP</span>
        </div>
      </div>

      <div className="xp-bar">
        <div 
          className="xp-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="xpbar-next-level-text">
        {maxXP - currentXP} XP until Level {level + 1}
      </div>
    </div>
  );
};

export default XPBar;
