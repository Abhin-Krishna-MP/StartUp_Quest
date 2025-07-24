import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import PhaseContent from "../components/PhaseContent";
import Profile from "../components/Profile";
import FriendsCollabChat from "../components/FriendsCollabChat";
import Explore from "../components/Explore";
import Chatbot from "../components/Chatbot";
import { mockPhases, mockBadges, mockUser, mockFriends } from "../mockData";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(150);
  const [maxXP, setMaxXP] = useState(1000);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Load from localStorage or mockData
  const [phases, setPhases] = useState(() => {
    const saved = localStorage.getItem("startupQuestPhases");
    return saved ? JSON.parse(saved) : mockPhases;
  });
  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem("startupQuestBadges");
    return saved ? JSON.parse(saved) : mockBadges;
  });
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem("startupQuestUser");
    return saved ? JSON.parse(saved) : mockUser;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("startupQuestPhases", JSON.stringify(phases));
  }, [phases]);
  useEffect(() => {
    localStorage.setItem("startupQuestBadges", JSON.stringify(badges));
  }, [badges]);
  useEffect(() => {
    localStorage.setItem("startupQuestUser", JSON.stringify(userStats));
  }, [userStats]);

  // Handle marking a task as complete for a phase
  const handleTaskComplete = (phaseId, taskIdx) => {
    setPhases(prev => prev.map(phase => {
      if (phase.id !== phaseId) return phase;
      const completedTasks = phase.completedTasks.includes(taskIdx)
        ? phase.completedTasks
        : [...phase.completedTasks, taskIdx];
      const progress = Math.round((completedTasks.length / phase.tasks.length) * 100);
      return { ...phase, completedTasks, progress };
    }));
    // Award XP for task completion
    const phase = phases.find(p => p.id === phaseId);
    if (phase && phase.tasks[taskIdx] && !phase.completedTasks.includes(taskIdx)) {
      const taskXP = phase.tasks[taskIdx].xpReward || 0;
      setUserXP(prevXP => {
        let totalXP = prevXP + taskXP;
        let newLevel = userLevel;
        let newMaxXP = maxXP;
        while (totalXP >= newMaxXP && newLevel < 10) {
          totalXP -= newMaxXP;
          newLevel += 1;
          newMaxXP += 200;
        }
        setUserLevel(newLevel);
        setMaxXP(newMaxXP);
        return totalXP;
      });
    }
  };

  // Handle marking a phase as complete
  const handlePhaseComplete = (phaseId) => {
    setPhases(prev => {
      // Find the index of the completed phase
      const idx = prev.findIndex(p => p.id === phaseId);
      return prev.map((phase, i) => {
        if (phase.id === phaseId) {
          return { ...phase, status: "completed", progress: 100 };
        }
        // Unlock the next phase (only one phase at a time)
        if (i === idx + 1 && phase.status === "locked") {
          return { ...phase, status: "unlocked" };
        }
        return phase;
      });
    });
    // Award XP for phase completion
    const completedPhase = phases.find(p => p.id === phaseId);
    if (completedPhase) {
      const xpGained = completedPhase.xpReward || 0;
      setUserXP(prevXP => {
        let totalXP = prevXP + xpGained;
        let newLevel = userLevel;
        let newMaxXP = maxXP;
        while (totalXP >= newMaxXP && newLevel < 10) {
          totalXP -= newMaxXP;
          newLevel += 1;
          newMaxXP += 200;
        }
        setUserLevel(newLevel);
        setMaxXP(newMaxXP);
        return totalXP;
      });
      setUserStats(prev => ({
        ...prev,
        completedPhases: [...prev.completedPhases.filter(id => id !== phaseId), completedPhase.title]
      }));
      setBadges(prevBadges => prevBadges.map(badge => {
        if (badge.id === "first-steps" && userStats.completedPhases.length === 0) return { ...badge, earned: true };
        if (badge.id === "validator" && phaseId === "validation") return { ...badge, earned: true };
        if (badge.id === "builder" && phaseId === "mvp") return { ...badge, earned: true };
        return badge;
      }));
    }
  };

  const handleUpvote = (ideaId) => {
    setUserStats(prev => {
      const newUpvotes = prev.upvotesGiven + 1;
      if (newUpvotes >= 10) {
        setBadges(prevBadges => prevBadges.map(b => b.id === "supporter" ? { ...b, earned: true } : b));
      }
      return { ...prev, upvotesGiven: newUpvotes };
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard
          userLevel={userLevel}
          userXP={userXP}
          maxXP={maxXP}
          phases={phases}
          onPhaseComplete={handlePhaseComplete}
        />;
      case "ideation":
      case "validation":
      case "mvp":
      case "launch":
      case "monetization":
      case "feedback":
      case "scale": {
        // Always get the latest phase object from phases state
        const currentPhase = phases.find(p => p.id === activeTab);
        if (!currentPhase) return null;
        return <PhaseContent phase={activeTab} phaseData={currentPhase} onMarkPhaseComplete={handlePhaseComplete} onTaskComplete={handleTaskComplete} />;
      }
      case "profile":
        return <Profile {...userStats} badges={badges} />;
      case "friends":
        return <FriendsCollabChat user={userStats} friends={mockFriends} />;
      case "chatbot":
        // The tab is for legacy, but the floating button is the main entry point
        return null;
      case "explore":
        return <Explore onUpvote={handleUpvote} />;
      default:
        return (
          <div className="tab-box">
            <h1>Coming Soon</h1>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  // Find the current phase (first unlocked)
  const currentPhaseIndex = phases.findIndex(p => p.status === 'unlocked');

  return (
    <div className="app">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        phases={phases}
        currentPhaseIndex={currentPhaseIndex}
      />
      <main>{renderTabContent()}</main>
      {/* FriendsCollabChat is rendered as a tab, not a floating button */}
      {/* Floating Chatbot button and modal */}
      <Chatbot isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(open => !open)} />
    </div>
  );
};

export default Index;