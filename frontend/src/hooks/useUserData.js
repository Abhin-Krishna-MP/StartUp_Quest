// src/hooks/useUserData.js
import { useState, useEffect } from 'react';

const useUserData = () => {
  const [currentUserId] = useState('user-1'); // Mock current user
  const [users] = useState([
    { id: 'user-1', username: 'StartupFounder', level: 3, avatar: '🚀', isOnline: true },
    { id: 'user-2', username: 'EcoTechFounder', level: 5, avatar: '🌱', isOnline: true },
    { id: 'user-3', username: 'WellnessBuilder', level: 4, avatar: '💊', isOnline: false },
    { id: 'user-4', username: 'EduChainVision', level: 6, avatar: '🎓', isOnline: true },
  ]);

  const [guilds, setGuilds] = useState([
    {
      id: 'guild-1',
      name: 'Green Tech Innovators',
      description: 'Building sustainable technology solutions for a better planet',
      category: 'environment',
      ownerId: 'user-2',
      isPrivate: false,
      createdAt: new Date('2024-01-15'),
      members: [
        { id: 'user-2', username: 'EcoTechFounder', level: 5, avatar: '🌱', isOnline: true, role: 'owner', joinedAt: new Date('2024-01-15') },
        { id: 'user-1', username: 'StartupFounder', level: 3, avatar: '🚀', isOnline: true, role: 'member', joinedAt: new Date('2024-01-20') },
      ]
    },
    {
      id: 'guild-2',
      name: 'HealthTech Pioneers',
      description: 'Revolutionizing healthcare with digital solutions',
      category: 'health',
      ownerId: 'user-3',
      isPrivate: false,
      createdAt: new Date('2024-01-10'),
      members: [
        { id: 'user-3', username: 'WellnessBuilder', level: 4, avatar: '💊', isOnline: false, role: 'owner', joinedAt: new Date('2024-01-10') },
      ]
    },
    {
      id: 'guild-3',
      name: 'FinTech Disruptors',
      description: 'Creating the future of financial services',
      category: 'fintech',
      ownerId: 'user-4',
      isPrivate: true,
      createdAt: new Date('2024-01-05'),
      members: [
        { id: 'user-4', username: 'EduChainVision', level: 6, avatar: '🎓', isOnline: true, role: 'owner', joinedAt: new Date('2024-01-05') },
      ]
    }
  ]);

  const [guildRequests, setGuildRequests] = useState([
    {
      id: 'req-1',
      guildId: 'guild-2',
      userId: 'user-1',
      username: 'StartupFounder',
      message: 'I have experience in health monitoring apps and would love to contribute!',
      status: 'pending',
      createdAt: new Date('2024-01-22')
    }
  ]);

  const [directMessages, setDirectMessages] = useState([
    {
      id: 'dm-1',
      fromUserId: 'user-2',
      toUserId: 'user-1',
      message: 'Hey! Great work on the sustainability project. Want to collaborate?',
      timestamp: new Date('2024-01-21T10:30:00'),
      read: true
    }
  ]);

  const [guildMessages, setGuildMessages] = useState([
    {
      id: 'gm-1',
      guildId: 'guild-1',
      userId: 'user-2',
      username: 'EcoTechFounder',
      message: "Welcome everyone! Let's discuss our next green tech project.",
      timestamp: new Date('2024-01-21T09:00:00')
    },
    {
      id: 'gm-2',
      guildId: 'guild-1',
      userId: 'user-1',
      username: 'StartupFounder',
      message: 'Excited to be here! I have some ideas about solar energy optimization.',
      timestamp: new Date('2024-01-21T09:15:00')
    }
  ]);

  // Persist to localStorage
  useEffect(() => {
    const data = { guilds, guildRequests, directMessages, guildMessages };
    localStorage.setItem('userData', JSON.stringify(data));
  }, [guilds, guildRequests, directMessages, guildMessages]);

  // Load from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem('userData');
    if (saved) {
      try {
        const { guilds, guildRequests, directMessages, guildMessages } = JSON.parse(saved);
        if (guilds) setGuilds(guilds);
        if (guildRequests) setGuildRequests(guildRequests);
        if (directMessages) setDirectMessages(directMessages);
        if (guildMessages) setGuildMessages(guildMessages);
      } catch (err) {
        console.error('Failed to load userData', err);
      }
    }
  }, []);

  const joinGuild = (guildId, message) => {
    const guild = guilds.find(g => g.id === guildId);
    if (!guild) return;
    if (guild.isPrivate) {
      // Add join request
      setGuildRequests(prev => [
        ...prev,
        {
          id: `req-${Date.now()}`,
          guildId,
          userId: currentUserId,
          username: users.find(u => u.id === currentUserId)?.username || '',
          message: message || '',
          status: 'pending',
          createdAt: new Date()
        }
      ]);
    } else {
      // Directly join
      const user = users.find(u => u.id === currentUserId);
      if (user) {
        setGuilds(prev =>
          prev.map(g =>
            g.id === guildId
              ? { ...g, members: [...g.members, { ...user, role: 'member', joinedAt: new Date() }] }
              : g
          )
        );
      }
    }
  };

  const handleGuildRequest = (requestId, action) => {
    const req = guildRequests.find(r => r.id === requestId);
    if (!req) return;
    setGuildRequests(prev =>
      prev.map(r =>
        r.id === requestId ? { ...r, status: action === 'accept' ? 'accepted' : 'rejected' } : r
      )
    );
    if (action === 'accept') {
      const user = users.find(u => u.id === req.userId);
      if (user) {
        setGuilds(prev =>
          prev.map(g =>
            g.id === req.guildId
              ? { ...g, members: [...g.members, { ...user, role: 'member', joinedAt: new Date() }] }
              : g
          )
        );
      }
    }
  };

  const sendDirectMessage = (toUserId, message) => {
    setDirectMessages(prev => [
      ...prev,
      {
        id: `dm-${Date.now()}`,
        fromUserId: currentUserId,
        toUserId,
        message,
        timestamp: new Date(),
        read: false
      }
    ]);
  };

  const sendGuildMessage = (guildId, message) => {
    const user = users.find(u => u.id === currentUserId);
    if (!user) return;
    setGuildMessages(prev => [
      ...prev,
      {
        id: `gm-${Date.now()}`,
        guildId,
        userId: currentUserId,
        username: user.username,
        message,
        timestamp: new Date()
      }
    ]);
  };

  const isUserInGuild = guildId =>
    guilds.find(g => g.id === guildId)?.members.some(m => m.id === currentUserId) || false;

  const getUserGuilds = () =>
    guilds.filter(g => g.members.some(m => m.id === currentUserId));

  const getPendingRequests = () =>
    guildRequests.filter(r =>
      r.status === 'pending' && guilds.find(g => g.id === r.guildId && g.ownerId === currentUserId)
    );

  return {
    currentUserId,
    users,
    guilds,
    guildRequests,
    directMessages,
    guildMessages,
    joinGuild,
    handleGuildRequest,
    sendDirectMessage,
    sendGuildMessage,
    isUserInGuild,
    getUserGuilds,
    getPendingRequests
  };
};

export default useUserData;
