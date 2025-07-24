// Navigation.jsx
import { Home, Target, Rocket, DollarSign, MessageSquare, User as UserIcon, Compass, Bot, TrendingUp, Users } from "lucide-react";

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'validation', label: 'Validation', icon: Target },
  { id: 'mvp', label: 'MVP', icon: Rocket },
  { id: 'launch', label: 'Launch', icon: TrendingUp },
  { id: 'monetization', label: 'Monetization', icon: DollarSign },
  { id: 'feedback', label: 'Feedback & Iterate', icon: MessageSquare },
  { id: 'scale', label: 'Pitch & Scale', icon: Users },
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'chatbot', label: 'Chatbot', icon: Bot },
  { id: 'explore', label: 'Explore', icon: Compass }
];

const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navigation">
      <div className="nav-items">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`nav-tab ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
