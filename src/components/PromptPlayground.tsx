import { useState, useEffect } from 'react'
import { UserSelection } from '../App'
import './PromptPlayground.css'

interface PromptPlaygroundProps {
  userSelection: UserSelection
  onPromptRun: () => void
}

const getDefaultPrompt = (role: string, goal: string): string => {
  const prompts: Record<string, Record<string, string>> = {
    'hr': {
      'automate': 'Help me draft a job description for a Senior Software Engineer position that emphasizes our company culture and benefits.',
      'write': 'Write a professional email to announce our new remote work policy to all employees.',
      'basics': 'Explain how AI can help HR departments work more efficiently.',
      default: 'How can AI help me improve HR processes?'
    },
    'sales': {
      'automate': 'Create a follow-up email template for prospects who attended our product demo.',
      'write': 'Draft a compelling value proposition for our life insurance products targeting young families.',
      'customer': 'Suggest 5 questions I should ask to better understand a client\'s insurance needs.',
      default: 'How can I use AI to improve my sales conversations?'
    },
    'underwriting': {
      'analyze': 'Summarize the key risk factors I should consider when reviewing a large commercial policy application.',
      'decision': 'What questions should I ask to assess risk for a high-net-worth individual life insurance application?',
      'automate': 'Help me create a checklist for reviewing health insurance applications.',
      default: 'How can AI assist in the underwriting process?'
    },
    'leader': {
      'decision': 'Help me structure a team meeting agenda to discuss our Q4 goals and challenges.',
      'write': 'Draft talking points for a 1-on-1 meeting with an underperforming team member.',
      'basics': 'What are the key ways leaders can leverage AI to improve team productivity?',
      default: 'How can I use AI to become a better leader?'
    }
  }

  const rolePrompts = prompts[role] || {}
  return rolePrompts[goal] || rolePrompts['default'] || 'How can AI help me in my work?'
}

function PromptPlayground({ userSelection, onPromptRun }: PromptPlaygroundProps) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(true)

  useEffect(() => {
    const defaultPrompt = getDefaultPrompt(userSelection.role, userSelection.goal)
    setPrompt(defaultPrompt)

    const savedApiKey = localStorage.getItem('openai_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
      setShowApiKeyInput(false)
    }
  }, [userSelection])

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim())
      setShowApiKeyInput(false)
      setError('')
    }
  }

  const handleRunPrompt = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key first')
      setShowApiKeyInput(true)
      return
    }

    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for New York Life employees learning about AI. Provide clear, practical, and professional responses.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI')
      }

      const data = await res.json()
      const aiResponse = data.choices[0]?.message?.content || 'No response generated'

      setResponse(aiResponse)
      onPromptRun()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const getSuggestion = () => {
    const suggestions = [
      'Try being more specific about what you need',
      'Add context about your specific situation',
      'Ask for examples or step-by-step guidance',
      'Request the output in a specific format (bullet points, email, etc.)',
      'Include any constraints or requirements'
    ]
    return suggestions[Math.floor(Math.random() * suggestions.length)]
  }

  return (
    <div className="prompt-playground">
      <div className="playground-header">
        <h2>🧪 Prompt Playground</h2>
        <p>Experiment with AI in a safe environment. Your prompts stay private.</p>
      </div>

      {showApiKeyInput ? (
        <div className="api-key-section">
          <div className="api-key-card">
            <h3>OpenAI API Key Required</h3>
            <p>To use the Prompt Playground, you need an OpenAI API key. Your key is stored locally and never sent to our servers.</p>

            <div className="api-key-input-group">
              <input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="api-key-input"
              />
              <button onClick={handleSaveApiKey} className="save-key-btn">
                Save Key
              </button>
            </div>

            <div className="api-key-info">
              <p><strong>Don't have an API key?</strong></p>
              <ol>
                <li>Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI API Keys</a></li>
                <li>Sign up or log in to your account</li>
                <li>Create a new API key</li>
                <li>Copy and paste it above</li>
              </ol>
              <p className="privacy-note">
                🔒 Your API key is stored only in your browser and is never shared.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="api-key-status">
            <span className="status-indicator">🔑 API Key Configured</span>
            <button
              onClick={() => setShowApiKeyInput(true)}
              className="change-key-btn"
            >
              Change Key
            </button>
          </div>

          <div className="playground-content">
            <div className="prompt-section">
              <label htmlFor="prompt-input">
                <strong>Your Prompt</strong>
                <span className="label-hint">(Edit the prompt below or write your own)</span>
              </label>
              <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="prompt-input"
                rows={6}
                placeholder="Type your prompt here..."
              />

              <div className="playground-actions">
                <button
                  onClick={handleRunPrompt}
                  disabled={isLoading || !prompt.trim()}
                  className="run-prompt-btn"
                >
                  {isLoading ? 'Generating...' : 'Run Prompt'}
                </button>

                {response && (
                  <div className="suggestion-hint">
                    💡 Tip: {getSuggestion()}
                  </div>
                )}
              </div>

              {error && (
                <div className="error-message">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {(response || isLoading) && (
              <div className="response-section">
                <label>
                  <strong>AI Response</strong>
                </label>

                {isLoading ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Generating response...</p>
                  </div>
                ) : (
                  <div className="response-output">
                    <p>{response}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      <div className="playground-tips">
        <h3>Playground Tips</h3>
        <ul>
          <li><strong>Be specific:</strong> The more context you provide, the better the AI response</li>
          <li><strong>Iterate:</strong> Refine your prompt based on the response you get</li>
          <li><strong>Experiment:</strong> Try different approaches to see what works best</li>
          <li><strong>Privacy:</strong> This is a safe space to practice - your prompts aren't monitored</li>
        </ul>
      </div>
    </div>
  )
}

export default PromptPlayground
