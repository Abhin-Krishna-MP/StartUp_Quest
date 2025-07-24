// PhaseContent.jsx
import { useState } from "react";
import { CheckCircle, Clock, Target, Users, DollarSign, MessageSquare, TrendingUp, Send } from "lucide-react";

const PhaseContent = ({ phase, phaseData, onMarkPhaseComplete, onTaskComplete }) => {
  const [taskInputs, setTaskInputs] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);

  const handleTaskSubmit = (taskIdx, taskName, content) => {
    if (typeof onTaskComplete === 'function') {
      onTaskComplete(phase, taskIdx);
    }
    setTaskInputs(prev => ({ ...prev, [taskIdx]: '' }));
    setShowSuccessMessage(`Task "${taskName}" saved successfully!`);
    setTimeout(() => setShowSuccessMessage(null), 3000);
  };

  // Use phaseData for all content
  const phaseIcons = {
    ideation: Clock,
    validation: Target,
    mvp: Target,
    launch: TrendingUp,
    feedback: MessageSquare,
    monetization: DollarSign,
    scale: Users
  };
  const Icon = phaseIcons[phase] || Clock;
  const content = {
    title: phaseData?.title || '',
    description: phaseData?.description || '',
    tasks: phaseData?.tasks || [],
    tips: phaseData?.tips || []
  };

  // Determine if all tasks are completed for this phase
  const completedTasks = phaseData?.completedTasks || [];
  const allTasksCompleted = content.tasks.length > 0 && completedTasks.length === content.tasks.length;
  // Only enable the button if progress is 100%
  const canMarkComplete = allTasksCompleted && phaseData && phaseData.progress === 100;

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
          // Support new structure: task = { name, submissionType }
          const taskName = typeof task === 'string' ? task : task.name;
          const submissionType = typeof task === 'string' ? 'form' : task.submissionType;
          const isSubmitted = completedTasks.includes(idx);
          const inputValue = taskInputs[idx] || '';
          const pdfFile = taskInputs[`pdf-${idx}`] || null;
          return (
            <div key={idx} className="task-card">
              <div className="task-header">
                <div className={isSubmitted ? 'task-icon-completed' : 'task-icon'}>
                  {isSubmitted ? <CheckCircle size={16} /> : <CheckCircle size={16} />}  
                </div>
                <h3 className="task-title">{taskName}</h3>
              </div>
              {submissionType === 'form' ? (
                <>
                  <textarea
                    value={inputValue}
                    onChange={e => setTaskInputs(prev => ({ ...prev, [idx]: e.target.value }))}
                    disabled={isSubmitted}
                    className="task-input"
                    placeholder={`Enter your submission for: ${taskName}`}
                  />
                  <button
                    onClick={() => handleTaskSubmit(idx, taskName, inputValue)}
                    disabled={!inputValue.trim() || isSubmitted}
                    className="btn-submit"
                  >
                    <Send size={16} /> {isSubmitted ? 'Completed' : 'Submit Task'}
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    accept="application/pdf"
                    disabled={isSubmitted}
                    onChange={e => {
                      const file = e.target.files[0];
                      setTaskInputs(prev => ({ ...prev, [`pdf-${idx}`]: file }));
                    }}
                    className="task-input-file"
                  />
                  {pdfFile && !isSubmitted && (
                    <div className="pdf-preview">Selected: {pdfFile.name}</div>
                  )}
                  <button
                    onClick={() => handleTaskSubmit(idx, taskName, pdfFile)}
                    disabled={!pdfFile || isSubmitted}
                    className="btn-submit"
                  >
                    <Send size={16} /> {isSubmitted ? 'Completed' : 'Upload PDF'}
                  </button>
                  {isSubmitted && pdfFile && (
                    <div className="pdf-preview">Uploaded: {pdfFile.name}</div>
                  )}
                </>
              )}
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
        <button
          className="btn-quest"
          disabled={!canMarkComplete}
          onClick={() => {
            if (canMarkComplete && typeof onMarkPhaseComplete === 'function') {
              onMarkPhaseComplete(phase);
            }
          }}
        >
          Mark Phase Complete
        </button>
        <button className="btn-help">Get Help</button>
      </div>
    </div>
  );
};

export default PhaseContent;
