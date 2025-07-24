// Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageCircle, Sparkles } from "lucide-react";

const Chatbot = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "👋 Hello! I'm your AI Startup Mentor. I can help you with validation, MVP development, fundraising, and more. What challenge are you facing today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const botResponses = [
    "🎯 For validation, start with the 'Mom Test' - ask about problems, not solutions. Focus on understanding customer pain points deeply.",
    "🚀 When building your MVP, remember: minimum means essential features only. What's the smallest version that proves your core hypothesis?",
    "📈 Product-market fit happens when customers are pulling your product from you, not when you're pushing it to them.",
    "💰 For monetization, test willingness to pay early. A customer's wallet speaks louder than their words.",
    "🔄 Use the Build-Measure-Learn cycle. Every feature should be an experiment with clear success metrics.",
    "📊 Focus on actionable metrics, not vanity metrics. Track what drives real business value.",
    "🌟 Remember: every successful entrepreneur failed multiple times. Persistence and adaptation are your superpowers!"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  if (!isOpen) {
    return (
      <button onClick={onToggle} className="floating-chat animate-float">
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-left">
          <div className="header-icon">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="chatbot-title">AI Startup Mentor</h3>
            <p className="chatbot-subtitle">Always here to help</p>
          </div>
        </div>
        <button onClick={onToggle} className="chatbot-close">
          <X size={16} />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-row ${message.isBot ? 'bot' : 'user'}`}>
            <div className={`chat-bubble-container ${message.isBot ? 'left' : 'right'}`}>
              {message.isBot && (
                <div className="chat-avatar">
                  <Bot size={14} />
                </div>
              )}
              <div className={`chat-bubble ${message.isBot ? 'bot-bubble' : 'user-bubble'}`}>
                <p>{message.text}</p>
                <span className="chat-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row bot">
            <div className="chat-bubble-container left">
              <div className="chat-avatar">
                <Bot size={14} />
              </div>
              <div className="chat-bubble bot-bubble">
                <div className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Message your AI mentor..."
          disabled={isTyping}
        />
        <button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;