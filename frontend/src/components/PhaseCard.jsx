import { CheckCircle, Lock, Play, Star } from "lucide-react";

const PhaseCard = ({ title, description, status, progress, xpReward, onComplete, canMarkComplete, isCurrent, isPrevious }) => {
  const getCardClass = () => {
    switch (status) {
      case 'locked':
        return 'phase-card phase-card-locked';
      case 'completed':
        return 'phase-card phase-card-completed';
      default:
        return 'phase-card phase-card-unlocked';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'locked':
        return <Lock className="phase-icon-muted" />;
      case 'completed':
        return <CheckCircle className="phase-icon-completed" />;
      default:
        return <Play className="phase-icon-active" />;
    }
  };

  return (
    <div className={getCardClass()}>
      <div className="phase-card-header">
        <div className="phase-header-left">
          {getIcon()}
          <div>
            <h3 className="phase-title">{title}</h3>
            <p className="phase-description">{description}</p>
          </div>
        </div>
        <div className="phase-xp">
          <Star size={16} />
          <span>{xpReward} XP</span>
        </div>
      </div>

      {status !== 'locked' && (
        <div className="phase-progress-section">
          <div className="phase-progress-info">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="phase-progress-bar">
            <div 
              className="phase-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {status === 'unlocked' && (
            <button
              onClick={onComplete}
              className="btn-complete"
              disabled={!canMarkComplete}
            >
              Mark Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PhaseCard;
