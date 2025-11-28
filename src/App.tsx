import { useState, useEffect } from 'react'
import './App.css'
import RoadmapBanner from './components/RoadmapBanner'
import RoleGoalFilter from './components/RoleGoalFilter'
import LearningQuestPathway from './components/LearningQuestPathway'
import PromptPlayground from './components/PromptPlayground'
import UseCaseWall from './components/UseCaseWall'
import ProgressTracker from './components/ProgressTracker'

export interface Progress {
  questsCompleted: number[]
  promptsRun: number
  useCasesSubmitted: number
  currentPhase: number
}

export interface UserSelection {
  role: string
  goal: string
}

function App() {
  const [userSelection, setUserSelection] = useState<UserSelection>({
    role: '',
    goal: ''
  })

  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('aiLearningProgress')
    return saved ? JSON.parse(saved) : {
      questsCompleted: [],
      promptsRun: 0,
      useCasesSubmitted: 0,
      currentPhase: 0
    }
  })

  const [activeView, setActiveView] = useState<'pathway' | 'playground' | 'usecase'>('pathway')

  useEffect(() => {
    localStorage.setItem('aiLearningProgress', JSON.stringify(progress))
  }, [progress])

  const handleQuestComplete = (questId: number) => {
    if (!progress.questsCompleted.includes(questId)) {
      setProgress(prev => ({
        ...prev,
        questsCompleted: [...prev.questsCompleted, questId],
        currentPhase: Math.min(3, Math.floor((prev.questsCompleted.length + 1) / 2))
      }))
    }
  }

  const handlePromptRun = () => {
    setProgress(prev => ({
      ...prev,
      promptsRun: prev.promptsRun + 1
    }))
  }

  const handleUseCaseSubmit = () => {
    setProgress(prev => ({
      ...prev,
      useCasesSubmitted: prev.useCasesSubmitted + 1
    }))
  }

  return (
    <div className="app">
      <RoadmapBanner currentPhase={progress.currentPhase} />

      <main className="main-content">
        <div className="container">
          <header className="app-header">
            <h1>AI Learning Quest</h1>
            <p className="subtitle">Your personalized journey to AI mastery</p>
          </header>

          <RoleGoalFilter
            selection={userSelection}
            onChange={setUserSelection}
          />

          {userSelection.role && userSelection.goal && (
            <>
              <div className="view-tabs">
                <button
                  className={activeView === 'pathway' ? 'active' : ''}
                  onClick={() => setActiveView('pathway')}
                >
                  Learning Pathway
                </button>
                <button
                  className={activeView === 'playground' ? 'active' : ''}
                  onClick={() => setActiveView('playground')}
                >
                  Prompt Playground
                </button>
                <button
                  className={activeView === 'usecase' ? 'active' : ''}
                  onClick={() => setActiveView('usecase')}
                >
                  Use Case Wall
                </button>
              </div>

              {activeView === 'pathway' && (
                <LearningQuestPathway
                  userSelection={userSelection}
                  progress={progress}
                  onQuestComplete={handleQuestComplete}
                  onNavigate={setActiveView}
                />
              )}

              {activeView === 'playground' && (
                <PromptPlayground
                  userSelection={userSelection}
                  onPromptRun={handlePromptRun}
                />
              )}

              {activeView === 'usecase' && (
                <UseCaseWall
                  onSubmit={handleUseCaseSubmit}
                />
              )}

              <ProgressTracker progress={progress} />
            </>
          )}

          {(!userSelection.role || !userSelection.goal) && (
            <div className="welcome-message">
              <div className="welcome-card">
                <h2>Welcome to Your AI Learning Journey!</h2>
                <p>Select your role and learning goal above to get started with personalized quests.</p>
                <div className="features">
                  <div className="feature">
                    <span className="icon">📚</span>
                    <h3>Learn</h3>
                    <p>Access curated resources tailored to your role</p>
                  </div>
                  <div className="feature">
                    <span className="icon">🧪</span>
                    <h3>Try</h3>
                    <p>Experiment safely in the Prompt Playground</p>
                  </div>
                  <div className="feature">
                    <span className="icon">💡</span>
                    <h3>Share</h3>
                    <p>Contribute your AI use cases and learn from others</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
