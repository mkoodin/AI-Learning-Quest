import { UserSelection, Progress } from '../App'
import './LearningQuestPathway.css'

interface LearningQuestPathwayProps {
  userSelection: UserSelection
  progress: Progress
  onQuestComplete: (questId: number) => void
  onNavigate: (view: 'pathway' | 'playground' | 'usecase') => void
}

interface Quest {
  id: number
  type: 'learn' | 'try' | 'share'
  title: string
  description: string
  action: string
  icon: string
  resource?: {
    title: string
    url: string
    type: string
  }
}

const getQuestsForSelection = (role: string, goal: string): Quest[] => {
  const roleLabels: Record<string, string> = {
    'hr': 'HR',
    'sales': 'Sales',
    'underwriting': 'Underwriting',
    'leader': 'Leadership',
    'it': 'IT',
    'customer-service': 'Customer Service',
    'marketing': 'Marketing',
    'finance': 'Finance'
  }

  const goalLabels: Record<string, string> = {
    'automate': 'automation',
    'write': 'writing',
    'analyze': 'analysis',
    'basics': 'AI fundamentals',
    'customer': 'customer engagement',
    'decision': 'decision-making',
    'creative': 'creativity',
    'research': 'research'
  }

  const roleLabel = roleLabels[role] || role
  const goalLabel = goalLabels[goal] || goal

  return [
    {
      id: 1,
      type: 'learn',
      title: 'Learn: Foundations',
      description: `Discover how AI can enhance ${goalLabel} in ${roleLabel}`,
      action: 'Watch Video',
      icon: '📚',
      resource: {
        title: `AI for ${roleLabel}: ${goalLabel}`,
        url: 'https://www.youtube.com/watch?v=aircAruvnKk',
        type: 'Video (10 min)'
      }
    },
    {
      id: 2,
      type: 'try',
      title: 'Try: Hands-On Practice',
      description: `Experiment with AI prompts tailored for ${goalLabel}`,
      action: 'Open Playground',
      icon: '🧪'
    },
    {
      id: 3,
      type: 'share',
      title: 'Share: Your Experience',
      description: `Share how you're using AI for ${goalLabel} in ${roleLabel}`,
      action: 'Submit Use Case',
      icon: '💡'
    }
  ]
}

function LearningQuestPathway({
  userSelection,
  progress,
  onQuestComplete,
  onNavigate
}: LearningQuestPathwayProps) {
  const quests = getQuestsForSelection(userSelection.role, userSelection.goal)

  const handleQuestAction = (quest: Quest) => {
    if (quest.type === 'learn' && quest.resource) {
      window.open(quest.resource.url, '_blank')
      onQuestComplete(quest.id)
    } else if (quest.type === 'try') {
      onNavigate('playground')
      onQuestComplete(quest.id)
    } else if (quest.type === 'share') {
      onNavigate('usecase')
      onQuestComplete(quest.id)
    }
  }

  return (
    <div className="learning-quest-pathway">
      <h2>Your Learning Quest Pathway</h2>
      <p className="pathway-intro">
        Complete these quests to build your AI capabilities
      </p>

      <div className="quests">
        {quests.map((quest, index) => {
          const isCompleted = progress.questsCompleted.includes(quest.id)
          const isUnlocked = index === 0 || progress.questsCompleted.includes(quests[index - 1].id)

          return (
            <div
              key={quest.id}
              className={`quest-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`}
            >
              <div className="quest-header">
                <span className="quest-icon">{quest.icon}</span>
                <div className="quest-status">
                  {isCompleted && <span className="status-badge completed">✓ Completed</span>}
                  {!isCompleted && isUnlocked && <span className="status-badge ready">Ready</span>}
                  {!isUnlocked && <span className="status-badge locked">🔒 Locked</span>}
                </div>
              </div>

              <h3>{quest.title}</h3>
              <p className="quest-description">{quest.description}</p>

              {quest.resource && (
                <div className="quest-resource">
                  <div className="resource-info">
                    <strong>{quest.resource.title}</strong>
                    <span className="resource-type">{quest.resource.type}</span>
                  </div>
                </div>
              )}

              <button
                className={`quest-button ${quest.type}`}
                onClick={() => handleQuestAction(quest)}
                disabled={!isUnlocked}
              >
                {isCompleted ? 'Review' : quest.action}
              </button>

              {quest.type === 'try' && !isCompleted && isUnlocked && (
                <p className="quest-hint">
                  Try the Prompt Playground to practice safe AI experimentation
                </p>
              )}

              {quest.type === 'share' && !isCompleted && isUnlocked && (
                <p className="quest-hint">
                  Share your insights to help others learn from your experience
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="pathway-footer">
        <p>
          <strong>Progress Tip:</strong> Complete quests in order to unlock the next phase of your AI journey!
        </p>
      </div>
    </div>
  )
}

export default LearningQuestPathway
