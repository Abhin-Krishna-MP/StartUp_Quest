// PhaseContent.jsx
import { useState } from "react";
import { CheckCircle, Clock, Target, Users, DollarSign, MessageSquare, TrendingUp, Send } from "lucide-react";

const PhaseContent = ({ phase }) => {
  const [taskInputs, setTaskInputs] = useState({});
  const [submittedTasks, setSubmittedTasks] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);

  const handleTaskSubmit = (taskId, taskName, content) => {
    setSubmittedTasks(prev => ({ ...prev, [taskId]: true }));
    setTaskInputs(prev => ({ ...prev, [taskId]: '' }));
    setShowSuccessMessage(`Task "${taskName}" saved successfully!`);
    setTimeout(() => setShowSuccessMessage(null), 3000);
  };

  const getPhaseContent = () => {
    switch (phase) {
      case 'validation':
        return {
          title: 'Idea Validation',
          icon: Target,
          description: 'Validate your startup idea with real customers',
          tasks: [
            'Conduct 20+ customer interviews',
            'Create customer personas',
            'Define problem-solution fit',
            'Analyze market size and competition',
            'Validate pricing assumptions'
          ],
          tips: [
            'Ask open-ended questions to avoid bias',
            'Focus on problems, not solutions',
            'Look for patterns in customer responses',
            'Test your assumptions, don\'t just confirm them'
          ]
        };

      case 'mvp':
        return {
          title: 'Minimum Viable Product',
          icon: Target,
          description: 'Build and test your MVP with early users',
          tasks: [
            'Define core features',
            'Create wireframes and mockups',
            'Build MVP prototype',
            'Recruit beta testers',
            'Collect user feedback'
          ],
          tips: [
            'Start with the simplest version possible',
            'Focus on core value proposition',
            'Use no-code tools when possible',
            'Get feedback early and often'
          ]
        };

      case 'launch':
        return {
          title: 'Product Launch',
          icon: TrendingUp,
          description: 'Launch your product to the market',
          tasks: [
            'Create launch strategy',
            'Build landing page',
            'Set up analytics',
            'Execute marketing campaigns',
            'Monitor launch metrics'
          ],
          tips: [
            'Plan your launch timeline carefully',
            'Have a backup plan ready',
            'Engage with your community',
            'Be ready to handle feedback'
          ]
        };

      case 'monetization':
        return {
          title: 'Monetization',
          icon: DollarSign,
          description: 'Implement and optimize revenue streams',
          tasks: [
            'Choose revenue model',
            'Set up payment systems',
            'Create pricing strategy',
            'Implement billing logic',
            'Track financial metrics'
          ],
          tips: [
            'Start with simple pricing',
            'Test different price points',
            'Focus on customer lifetime value',
            'Monitor churn rates closely'
          ]
        };

      case 'feedback':
        return {
          title: 'Feedback & Iterate',
          icon: MessageSquare,
          description: 'Collect feedback and improve your product',
          tasks: [
            'Set up feedback channels',
            'Analyze user behavior',
            'Prioritize feature requests',
            'Implement improvements',
            'Measure impact of changes'
          ],
          tips: [
            'Listen more than you speak',
            'Look for patterns in feedback',
            'Not all feedback should be acted upon',
            'Focus on user outcomes, not features'
          ]
        };

      case 'scale':
        return {
          title: 'Pitch & Scale',
          icon: Users,
          description: 'Scale your business and attract investment',
          tasks: [
            'Create pitch deck',
            'Define growth strategy',
            'Build scalable systems',
            'Network with investors',
            'Prepare for funding rounds'
          ],
          tips: [
            'Tell a compelling story',
            'Focus on traction and metrics',
            'Build relationships before you need money',
            'Have a clear use of funds'
          ]
        };

      default:
        return {
          title: 'Phase Content',
          icon: Clock,
          description: 'Content for this phase',
          tasks: [],
          tips: []
        };
    }
  };

  const content = getPhaseContent();
  const Icon = content.icon;

  return (
    <div className="phasecontent-container">
      {/* Header */}
      <div className="phasecontent-header">
        <div className="phasecontent-icon">
          <Icon size={32} />
        </div>
        <div>
          <h1 className="phasecontent-title">{content.title}</h1>
          <p className="phasecontent-description">{content.description}</p>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="success-message">{showSuccessMessage}</div>
      )}

      {/* Tasks */}
      <div className="tasks-section">
        <h2>Phase Tasks</h2>
        {content.tasks.map((task, idx) => {
          const taskId = `${phase}-task-${idx}`;
          const isSubmitted = submittedTasks[taskId];
          const inputValue = taskInputs[taskId] || '';
          return (
            <div key={idx} className="task-card">
              <div className="task-header">
                <div className={isSubmitted ? 'task-icon-completed' : 'task-icon'}>
                  {isSubmitted ? <CheckCircle size={16} /> : <CheckCircle size={16} />}  
                </div>
                <h3 className="task-title">{task}</h3>
              </div>
              <textarea
                value={inputValue}
                onChange={e => setTaskInputs(prev => ({ ...prev, [taskId]: e.target.value }))}
                disabled={isSubmitted}
                className="task-input"
                placeholder={`Enter your progress for: ${task}`}
              />
              <button
                onClick={() => handleTaskSubmit(taskId, task, inputValue)}
                disabled={!inputValue.trim() || isSubmitted}
                className="btn-submit"
              >
                <Send size={16} /> {isSubmitted ? 'Completed' : 'Submit Task'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="tips-section">
        <h2>Tips & Best Practices</h2>
        <div className="tips-grid">
          {content.tips.map((tip, idx) => (
            <div key={idx} className="tip-card">
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="actions-section">
        <button className="btn-quest">Mark Phase Complete</button>
        <button className="btn-help">Get Help</button>
      </div>
    </div>
  );
};

export default PhaseContent;
