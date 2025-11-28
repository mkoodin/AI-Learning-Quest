import { UserSelection } from '../App'
import './RoleGoalFilter.css'

interface RoleGoalFilterProps {
  selection: UserSelection
  onChange: (selection: UserSelection) => void
}

const roles = [
  { value: '', label: 'Select your role...' },
  { value: 'hr', label: 'HR Professional' },
  { value: 'sales', label: 'Sales Representative' },
  { value: 'underwriting', label: 'Underwriter' },
  { value: 'leader', label: 'Team Leader / Manager' },
  { value: 'it', label: 'IT Professional' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance / Actuarial' }
]

const goals = [
  { value: '', label: 'Select your learning goal...' },
  { value: 'automate', label: 'Automate repetitive tasks' },
  { value: 'write', label: 'Write better and faster' },
  { value: 'analyze', label: 'Analyze data more effectively' },
  { value: 'basics', label: 'Explore AI basics' },
  { value: 'customer', label: 'Improve customer interactions' },
  { value: 'decision', label: 'Make better decisions' },
  { value: 'creative', label: 'Boost creative work' },
  { value: 'research', label: 'Research and learn faster' }
]

function RoleGoalFilter({ selection, onChange }: RoleGoalFilterProps) {
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...selection, role: e.target.value })
  }

  const handleGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...selection, goal: e.target.value })
  }

  return (
    <div className="role-goal-filter">
      <div className="filter-card">
        <h3>Personalize Your Journey</h3>
        <p className="filter-description">
          Tell us about yourself to get tailored learning quests
        </p>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="role-select">
              <span className="label-icon">👤</span>
              Your Role
            </label>
            <select
              id="role-select"
              value={selection.role}
              onChange={handleRoleChange}
              className="filter-select"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="goal-select">
              <span className="label-icon">🎯</span>
              Learning Goal
            </label>
            <select
              id="goal-select"
              value={selection.goal}
              onChange={handleGoalChange}
              className="filter-select"
            >
              {goals.map(goal => (
                <option key={goal.value} value={goal.value}>
                  {goal.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selection.role && selection.goal && (
          <div className="selection-summary">
            <p>
              <strong>Great choice!</strong> Your personalized learning pathway is ready below.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoleGoalFilter
