# AI Learning Quest 🚀

A personalized AI learning experience prototype designed for New York Life Insurance Company. This interactive web application helps employees understand their AI journey, access role-specific learning paths, practice GenAI safely, and share applied AI use cases.

![AI Learning Quest](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple)

## ✨ Features

### 🗺️ AI Capability Roadmap
- Visual 4-phase roadmap: **Spark → Try → Share → Scale**
- Interactive tooltips describing each phase
- Progress indicator showing "You are here"
- Anchors learning journey in organizational strategy

### 🎯 Role + Goal Filter
- Personalized experience based on user role and learning goals
- Dropdown selections for:
  - **Roles**: HR, Sales, Underwriting, Leadership, IT, Customer Service, Marketing, Finance
  - **Goals**: Automate, Write better, Analyze data, Explore AI basics, and more
- Instant personalization in under 5 seconds

### 📚 Learning Quest Pathway
- Three dynamic quests based on user selection:
  1. **Learn**: Access curated resources (videos, articles)
  2. **Try**: Open the Prompt Playground for hands-on practice
  3. **Share**: Submit your AI use case to inspire others
- Progressive unlock system to guide learning journey

### 🧪 Prompt Playground
- Safe, hands-on experimentation with GenAI
- Pre-filled role-specific prompts (fully editable)
- Direct OpenAI API integration
- Real-time AI responses
- Contextual tips and feedback
- Privacy-focused (API key stored locally)

### 💡 AI Use Case Wall
- Gallery of real AI use cases from across the organization
- Filter by topic/team
- Impact metrics and success stories
- Submit your own use cases
- Peer learning and cross-pollination

### 📊 Progress Tracking
- Real-time progress dashboard
- Tracks:
  - Quests completed
  - Prompts run
  - Use cases submitted
  - Overall completion percentage
- Local storage persistence
- Celebration on completion

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AI-Learning-Quest.git
   cd AI-Learning-Quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will be running locally

### OpenAI API Key Setup

When you first use the Prompt Playground, you'll be prompted to enter your OpenAI API key:

1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key and paste it in the application
5. Your key is stored locally in your browser (never sent to our servers)

## 🎨 Design

The application uses **New York Life's brand colors**:
- Navy Blue: `#003087` (Primary)
- Gold: `#FFB81C` (Accent)
- Light Blue: `#0066CC` (Interactive elements)

## 📁 Project Structure

```
AI-Learning-Quest/
├── src/
│   ├── components/
│   │   ├── RoadmapBanner.tsx/css      # 4-phase roadmap banner
│   │   ├── RoleGoalFilter.tsx/css     # Role & goal selection
│   │   ├── LearningQuestPathway.tsx/css  # Quest pathway
│   │   ├── PromptPlayground.tsx/css   # AI playground
│   │   ├── UseCaseWall.tsx/css        # Use case gallery
│   │   └── ProgressTracker.tsx/css    # Progress dashboard
│   ├── App.tsx                        # Main application
│   ├── App.css                        # App styles
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Global styles
├── index.html                         # HTML template
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite config
└── README.md                          # This file
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Tech Stack

- **React 18.3.1** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool and dev server
- **OpenAI API** - GPT-3.5-turbo integration
- **CSS3** - Styling (no framework, custom CSS)
- **LocalStorage** - Progress persistence

## 🎯 Usage Guide

### For Employees

1. **Select Your Profile**
   - Choose your role (e.g., Sales, HR, Underwriting)
   - Select your learning goal (e.g., Automate tasks, Write better)

2. **Follow Your Quest Pathway**
   - Complete quests in order
   - Start with "Learn" to understand concepts
   - Move to "Try" for hands-on practice
   - Finish with "Share" to contribute back

3. **Experiment in the Playground**
   - Try pre-filled prompts tailored to your role
   - Edit and refine prompts
   - Learn from AI responses
   - Get tips for improvement

4. **Share Your Experience**
   - Submit use cases showing how you use AI
   - Browse others' use cases for inspiration
   - Filter by team or topic

### For Demonstration

This prototype is designed for interview demonstrations with New York Life. Key talking points:

- **Personalization**: Role and goal-based customization
- **Safe Learning**: Playground for risk-free experimentation
- **Community Learning**: Use case sharing for peer education
- **Strategic Alignment**: Roadmap ties learning to organizational phases
- **Behavioral Tracking**: Progress monitoring (simulated analytics)

## 🔒 Privacy & Security

- OpenAI API keys are stored **only in browser localStorage**
- No API keys are sent to any server except OpenAI's
- User progress is stored locally on the device
- No personal data is collected or transmitted
- All API calls go directly from browser to OpenAI

## 🎓 Educational Purpose

This prototype demonstrates:
- Component-based React architecture
- TypeScript for type safety
- State management with hooks
- API integration patterns
- Responsive design
- User experience design
- Progressive disclosure
- Gamification elements

## 📝 License

This is a prototype for demonstration purposes.

## 🤝 Contributing

This is a demonstration prototype. For production use:
- Add authentication
- Implement backend API
- Add analytics integration
- Enhanced error handling
- Accessibility improvements
- Performance optimizations
- Security audits

## 📧 Contact

For questions or feedback about this prototype, please contact the development team.

---

**Built with ❤️ for New York Life Insurance Company**
