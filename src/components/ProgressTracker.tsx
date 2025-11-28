import { Progress } from '../App'
import './ProgressTracker.css'

interface ProgressTrackerProps {
  progress: Progress
}

function ProgressTracker({ progress }: ProgressTrackerProps) {
  const totalQuests = 3
  const completionPercentage = Math.round((progress.questsCompleted.length / totalQuests) * 100)

  return (
    <div className="progress-tracker">
      <h3>Your Progress</h3>

      <div className="progress-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{progress.questsCompleted.length}/{totalQuests}</div>
            <div className="stat-label">Quests Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🧪</div>
          <div className="stat-content">
            <div className="stat-value">{progress.promptsRun}</div>
            <div className="stat-label">Prompts Run</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💡</div>
          <div className="stat-content">
            <div className="stat-value">{progress.useCasesSubmitted}</div>
            <div className="stat-label">Use Cases Shared</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{completionPercentage}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-label">
          <span>Journey Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {completionPercentage === 100 && (
        <div className="completion-message">
          <div className="celebration">🎉</div>
          <h4>Congratulations!</h4>
          <p>You've completed all quests in your learning pathway. Keep exploring and sharing your AI insights!</p>
        </div>
      )}

      {completionPercentage > 0 && completionPercentage < 100 && (
        <div className="encouragement-message">
          <p>Great progress! Keep going to unlock the next phase of your AI journey.</p>
        </div>
      )}
    </div>
  )
}

export default ProgressTracker
