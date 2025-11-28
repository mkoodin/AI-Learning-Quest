import { useState } from 'react'
import './RoadmapBanner.css'

interface RoadmapBannerProps {
  currentPhase: number
}

const phases = [
  {
    id: 0,
    name: 'Spark',
    icon: '✨',
    description: 'Discover AI possibilities and build awareness'
  },
  {
    id: 1,
    name: 'Try',
    icon: '🧪',
    description: 'Experiment with AI tools in a safe environment'
  },
  {
    id: 2,
    name: 'Share',
    icon: '💡',
    description: 'Share learnings and use cases with your team'
  },
  {
    id: 3,
    name: 'Scale',
    icon: '🚀',
    description: 'Apply AI at scale to drive business value'
  }
]

function RoadmapBanner({ currentPhase }: RoadmapBannerProps) {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null)

  return (
    <div className="roadmap-banner">
      <div className="roadmap-container">
        <h2 className="roadmap-title">AI Capability Roadmap</h2>
        <div className="roadmap-phases">
          {phases.map((phase, index) => (
            <div key={phase.id} className="phase-wrapper">
              <div
                className={`phase ${currentPhase >= phase.id ? 'active' : ''} ${currentPhase === phase.id ? 'current' : ''}`}
                onMouseEnter={() => setHoveredPhase(phase.id)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                <div className="phase-icon">{phase.icon}</div>
                <div className="phase-name">{phase.name}</div>
                {currentPhase === phase.id && (
                  <div className="you-are-here">You are here</div>
                )}

                {(hoveredPhase === phase.id || currentPhase === phase.id) && (
                  <div className="phase-tooltip">
                    <div className="tooltip-content">
                      <strong>{phase.name}</strong>
                      <p>{phase.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {index < phases.length - 1 && (
                <div className={`phase-arrow ${currentPhase > phase.id ? 'active' : ''}`}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoadmapBanner
