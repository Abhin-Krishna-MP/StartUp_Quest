import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import PhaseContent from "../components/PhaseContent";
import Profile from "../components/Profile";
import Chatbot from "../components/Chatbot";
import Explore from "../components/Explore";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(150);
  const [maxXP, setMaxXP] = useState(1000);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const [phases, setPhases] = useState([
    { id: "validation", title: "Idea Validation", description: "Validate your startup idea with real customers", status: "unlocked", progress: 60, xpReward: 200 },
    { id: "mvp", title: "Build MVP", description: "Create your minimum viable product", status: "locked", progress: 0, xpReward: 300 },
    { id: "launch", title: "Product Launch", description: "Launch your product to the market", status: "locked", progress: 0, xpReward: 400 },
    { id: "monetization", title: "Monetization", description: "Implement revenue streams", status: "locked", progress: 0, xpReward: 350 },
    { id: "feedback", title: "Feedback & Iterate", description: "Collect feedback and improve", status: "locked", progress: 0, xpReward: 250 },
    { id: "scale", title: "Pitch & Scale", description: "Scale your business and get funding", status: "locked", progress: 0, xpReward: 500 }
  ]);

  const [badges, setBadges] = useState([
    { id: "first-steps", name: "First Steps", description: "Complete your first phase", earned: false },
    { id: "validator", name: "Idea Validator", description: "Complete the validation phase", earned: false },
    { id: "builder", name: "MVP Builder", description: "Successfully build and launch your MVP", earned: false },
    { id: "entrepreneur", name: "True Entrepreneur", description: "Complete all startup phases", earned: false },
    { id: "community-member", name: "Community Member", description: "Share 5 ideas in the community", earned: false },
    { id: "supporter", name: "Supportive Member", description: "Give 10 upvotes to community ideas", earned: false }
  ]);

  const [userStats, setUserStats] = useState({
    username: "StartupFounder",
    ideasShared: 2,
    upvotesGiven: 7,
    completedPhases: []
  });

  useEffect(() => {
    const savedData = localStorage.getItem("startupQuestData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserLevel(parsed.userLevel || 1);
        setUserXP(parsed.userXP || 150);
        setMaxXP(parsed.maxXP || 1000);
        setPhases(parsed.phases || phases);
        setBadges(parsed.badges || badges);
        setUserStats(parsed.userStats || userStats);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      userLevel,
      userXP,
      maxXP,
      phases,
      badges,
      userStats
    };
    localStorage.setItem("startupQuestData", JSON.stringify(dataToSave));
  }, [userLevel, userXP, maxXP, phases, badges, userStats]);

  const handlePhaseComplete = (phaseId) => {
    setPhases((prev) => prev.map((phase, index) => {
      if (phase.id === phaseId) {
        const updatedPhase = { ...phase, status: "completed", progress: 100 };
        const newXP = userXP + phase.xpReward;
        if (newXP >= maxXP) {
          setUserLevel(prevLevel => prevLevel + 1);
          setMaxXP(prevMax => prevMax + 200);
          setUserXP(newXP - maxXP);
        } else {
          setUserXP(newXP);
        }

        setUserStats(prev => ({
          ...prev,
          completedPhases: [...prev.completedPhases.filter(id => id !== phaseId), phase.title]
        }));

        setBadges(prevBadges => prevBadges.map(badge => {
          if (badge.id === "first-steps" && userStats.completedPhases.length === 0) return { ...badge, earned: true };
          if (badge.id === "validator" && phaseId === "validation") return { ...badge, earned: true };
          if (badge.id === "builder" && phaseId === "mvp") return { ...badge, earned: true };
          return badge;
        }));

        return updatedPhase;
      }
      if (index === prev.findIndex(p => p.id === phaseId) + 1 && phase.status === "locked") {
        return { ...phase, status: "unlocked" };
      }
      return phase;
    }));
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
        return <Dashboard userLevel={userLevel} userXP={userXP} maxXP={maxXP} phases={phases} onPhaseComplete={handlePhaseComplete} />;
      case "validation":
      case "mvp":
      case "launch":
      case "monetization":
      case "feedback":
      case "scale":
        return <PhaseContent phase={activeTab} />;
      case "profile":
        return <Profile {...userStats} level={userLevel} xp={userXP} badges={badges} />;
      case "chatbot":
        return (
          <div className="tab-box">
            <h1>Startup Mentor Chatbot</h1>
            <p>Click the floating chat button to start a conversation with your AI mentor!</p>
            <div className="chat-info-box">
              <p>The chatbot is available in the bottom-right corner of your screen.</p>
            </div>
          </div>
        );
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

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>{renderTabContent()}</main>
      <Chatbot isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
    </div>
  );
};

export default Index;