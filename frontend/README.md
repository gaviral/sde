# LeetCode Practice App

A client-side React application for practicing coding interview problems, similar to LeetCode. This application runs entirely in the browser with no backend services required.

## Features

- **50 question slots** with 11 real problems and placeholder spots for future additions
- **Interactive code editor** for Python solutions with syntax highlighting
- **Voice command support** for hands-free navigation
- **Progress tracking** with visual indicators for completed questions 
- **Persistent storage** of your code and progress using localStorage
- **Export/import functionality** to backup and restore your progress
- **Two modes**: Learning and Mock Interview
- **Responsive design** that works on both desktop and mobile devices
- **Keyboard shortcuts** for improved accessibility

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/leetcode-practice-app.git
   cd leetcode-practice-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:5173

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Usage

### Interface

- **Left sidebar**: Question list (hover near left edge to reveal)
- **Main area**: Question details and code editor
- **Right sidebar**: Settings panel (hover near right edge to reveal)
- **Bottom panel**: Issue list for code validation (hover near bottom edge to reveal)
- **Bottom right button**: Voice command activation

### Keyboard Shortcuts

- **Ctrl+Q**: Toggle question sidebar
- **Ctrl+S**: Toggle settings sidebar
- **Ctrl+I**: Toggle issue panel
- **Ctrl+Enter**: Check your code
- **Ctrl+V**: Activate voice commands
- **Alt+[1-9,0]**: Navigate to questions 1-10 (0 = question 10)
- **Escape**: Close all panels

### Voice Commands

- "Go to question [number]" - Navigate to a specific question
- "Check code" - Validate your solution
- "Show settings" - Open the settings panel
- "Show questions" - Open the question list
- "Show issues" - Open the issue panel
- "Toggle debug" - Show/hide the debug overlay

## Data Storage

All progress is saved automatically in your browser's localStorage. You can:

- **Export** your progress to a JSON file via the Settings panel
- **Import** previously exported data
- **Clear** all progress and start fresh

## Development

This project uses:

- **React** with **TypeScript** for the UI
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Monaco Editor** for the code editor
- **Web Speech API** for voice commands

## License

This project is licensed under the MIT License - see the LICENSE file for details.
