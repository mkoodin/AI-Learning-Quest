import { useState } from 'react'
import './UseCaseWall.css'

interface UseCaseWallProps {
  onSubmit: () => void
}

interface UseCase {
  id: number
  title: string
  description: string
  team: string
  impact: string
  author: string
  tags: string[]
}

const sampleUseCases: UseCase[] = [
  {
    id: 1,
    title: 'Automated Policy Document Drafting',
    description: 'Used AI to draft initial versions of HR policy documents, reducing drafting time by 60%. The AI provides a solid first draft that we then review and customize.',
    team: 'HR',
    impact: '60% time saved',
    author: 'Sarah M.',
    tags: ['automation', 'writing', 'efficiency']
  },
  {
    id: 2,
    title: 'Personalized Client Follow-ups',
    description: 'Created templates using AI for personalized follow-up emails after client meetings. Each email is tailored to the specific discussion points, improving response rates.',
    team: 'Sales',
    impact: '35% higher response rate',
    author: 'James T.',
    tags: ['customer engagement', 'writing', 'sales']
  },
  {
    id: 3,
    title: 'Risk Assessment Summaries',
    description: 'Using AI to summarize lengthy medical reports and financial documents for underwriting review. Helps identify key risk factors more quickly.',
    team: 'Underwriting',
    impact: '45% faster reviews',
    author: 'Maria L.',
    tags: ['analysis', 'efficiency', 'decision-making']
  },
  {
    id: 4,
    title: 'Meeting Notes & Action Items',
    description: 'Implemented AI-assisted meeting summaries that automatically generate action items and key decisions. Team members can focus on discussion rather than note-taking.',
    team: 'Leadership',
    impact: 'Better meeting outcomes',
    author: 'David K.',
    tags: ['productivity', 'collaboration', 'writing']
  },
  {
    id: 5,
    title: 'Customer Service Response Templates',
    description: 'Built a library of AI-generated response templates for common customer inquiries. Representatives personalize them for each situation, ensuring faster and more consistent service.',
    team: 'Customer Service',
    impact: '30% faster response time',
    author: 'Linda R.',
    tags: ['customer engagement', 'efficiency', 'writing']
  }
]

function UseCaseWall({ onSubmit }: UseCaseWallProps) {
  const [showForm, setShowForm] = useState(false)
  const [filterTag, setFilterTag] = useState<string>('all')
  const [newUseCase, setNewUseCase] = useState({
    title: '',
    description: '',
    team: '',
    impact: ''
  })
  const [submittedCases, setSubmittedCases] = useState<UseCase[]>([])

  const allUseCases = [...sampleUseCases, ...submittedCases]

  const allTags = Array.from(new Set(allUseCases.flatMap(uc => uc.tags)))

  const filteredUseCases = filterTag === 'all'
    ? allUseCases
    : allUseCases.filter(uc => uc.tags.includes(filterTag))

  const handleSubmitUseCase = (e: React.FormEvent) => {
    e.preventDefault()

    const newCase: UseCase = {
      id: Date.now(),
      ...newUseCase,
      author: 'You',
      tags: ['new submission']
    }

    setSubmittedCases([newCase, ...submittedCases])
    setNewUseCase({ title: '', description: '', team: '', impact: '' })
    setShowForm(false)
    onSubmit()
  }

  return (
    <div className="use-case-wall">
      <div className="wall-header">
        <div>
          <h2>💡 AI Use Case Wall</h2>
          <p>Learn from real examples of AI in action across our organization</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="submit-case-btn"
        >
          {showForm ? 'Cancel' : '+ Submit Use Case'}
        </button>
      </div>

      {showForm && (
        <div className="use-case-form-container">
          <form onSubmit={handleSubmitUseCase} className="use-case-form">
            <h3>Share Your AI Use Case</h3>

            <div className="form-group">
              <label htmlFor="title">Use Case Title *</label>
              <input
                id="title"
                type="text"
                value={newUseCase.title}
                onChange={(e) => setNewUseCase({ ...newUseCase, title: e.target.value })}
                placeholder="e.g., Automated Email Responses"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="team">Your Team *</label>
              <select
                id="team"
                value={newUseCase.team}
                onChange={(e) => setNewUseCase({ ...newUseCase, team: e.target.value })}
                required
              >
                <option value="">Select your team...</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Underwriting">Underwriting</option>
                <option value="Leadership">Leadership</option>
                <option value="IT">IT</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={newUseCase.description}
                onChange={(e) => setNewUseCase({ ...newUseCase, description: e.target.value })}
                placeholder="Describe how you're using AI, what problem it solves, and any tips for others..."
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="impact">Impact / Results *</label>
              <input
                id="impact"
                type="text"
                value={newUseCase.impact}
                onChange={(e) => setNewUseCase({ ...newUseCase, impact: e.target.value })}
                placeholder="e.g., 50% time saved, Better customer satisfaction"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Use Case
            </button>
          </form>
        </div>
      )}

      <div className="filter-section">
        <label>Filter by topic:</label>
        <div className="filter-tags">
          <button
            className={`tag-filter ${filterTag === 'all' ? 'active' : ''}`}
            onClick={() => setFilterTag('all')}
          >
            All Cases
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-filter ${filterTag === tag ? 'active' : ''}`}
              onClick={() => setFilterTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="use-cases-grid">
        {filteredUseCases.map(useCase => (
          <div key={useCase.id} className="use-case-card">
            <div className="use-case-header">
              <h3>{useCase.title}</h3>
              <span className="team-badge">{useCase.team}</span>
            </div>

            <p className="use-case-description">{useCase.description}</p>

            <div className="use-case-footer">
              <div className="impact">
                <strong>Impact:</strong> {useCase.impact}
              </div>
              <div className="author">
                by {useCase.author}
              </div>
            </div>

            <div className="use-case-tags">
              {useCase.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredUseCases.length === 0 && (
        <div className="no-cases">
          <p>No use cases found for this filter.</p>
        </div>
      )}
    </div>
  )
}

export default UseCaseWall
