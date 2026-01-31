# BreakThrough

[![GitHub issues](https://img.shields.io/github/issues/Daniru2007/Breakthrough)](https://github.com/Daniru2007/Breakthrough/issues)
[![GitHub forks](https://img.shields.io/github/forks/Daniru2007/Breakthrough)](https://github.com/Daniru2007/Breakthrough/network)
[![GitHub stars](https://img.shields.io/github/stars/Daniru2007/Breakthrough)](https://github.com/Daniru2007/Breakthrough/stargazers)
[![GitHub license](https://img.shields.io/github/license/Daniru2007/Breakthrough)](LICENSE)

BreakThrough is an innovative learning platform designed to offer a personalized, engaging, and effective way to acquire new skills. It utilizes cutting-edge AI technologies and a user-centered approach to make learning fun, efficient, and tailored to individual needs.

---

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Codebase Tour](#codebase-tour)
- [License](#license)
- [Contributing](#contributing)

---

## Features

### Personalized Learning 
- **Emotion Tracking**: BreakThrough employs real-time video processing to analyze users' facial expressions and emotional states, allowing it to adapt content to the learner's mood and engagement level.
- **Tutorial Recommendations**: AI suggests the most relevant tutorials based on user engagement patterns to optimize learning paths.

### Subject Offerings
- **Languages**: Learn languages such as:
  - **Italian**: Engaging lessons with clear pronunciation practice and interactive exercises.
  - **Portuguese**: Cultural immersion through accessible learning materials.
  - **Dutch**: Lessons paced for gradual yet effective learning.
  - **Japanese**: Interactive lessons focusing on both the writing script and spoken usage.

### AI-Powered Tools
- **Exam Summarization**:
  - Summarizes important topics from past papers using AI to identify patterns and prioritize key areas of study.
- **PDF Analysis**:
  - Upload exam papers or notes to receive a detailed summary, identifying repeated topics and generating study recommendations.

### Interactive User Experience
- **Feature Card Designs**:
  - Cool and interactive animations for smoother UI interaction.
- **Statistical Tracking**:
  - Track total mistakes, improvement rates, and daily learning streaks.
- **Progress Bar**:
  - Live progress indicator to visualize learning milestones.

### Design Excellence
- **Motion Animations**:
  - Implemented using Framer Motion, creating dynamic transitions and interactive page elements.
- **Feature Box**:
  - Stylish, reusable components designed with responsive CSS for a consistent design experience.
- **Themed Backgrounds**:
  - Soft, gradient-based visuals that enhance the visual experience.

---

## Technologies

BreakThrough utilizes an array of modern technologies for both frontend and backend:

- **React.js**: Dynamic UI building.
- **TypeScript**: Statically typed language for better code reliability and maintainability.
- **Framer Motion**: Animation library for creating fluid UI interactions.
- **Tailwind CSS**: Fully customizable CSS utility-first framework.
- **Firebase**: Authentication, database, and hosting solutions for scalable backend.
- **AI Libraries**: 
  - Emotion tracking is powered by `@vladmandic/human` for detecting real-time facial expressions.
- **Modern JavaScript (ES6)**: Ensuring optimized coding patterns and high performance.

---

## Getting Started

### Prerequisite
Install the following:
- Node.js
- A web browser (recommended: Google Chrome)
- Yarn/ NPM

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Daniru2007/Breakthrough.git
cd Breakthrough
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn dev
# or
npm run dev
```

4. Open your browser and navigate to **`http://localhost:3000`**.

---

## Codebase Tour

The BreakThrough codebase is structured into multiple directories for well-organized development.

### Key Directories

1. **`src`**:
   - Contains all source code.
   - **Highlights**:
     - **Home.tsx**: The homepage showcasing interactive features such as the progress bar, hero elements, and "Get Started" buttons.
     - **EmotionTracker.tsx**: Manages the camera input and real-time emotion detection to provide personalized learning feedback.
     - **Mistake.tsx**: Tracks and analyzes learning mistakes to generate helpful insights like statistics (streak days, common categories, etc.).
     - **Sum.tsx**:
       - Houses the styled **FeatureGrid** and **Background** components. Implements animation effects with Framer Motion.
2. **`components`**:
   - Reusable UI components.
     - **FeatureBox.tsx**:
       - Focused on design consistency for displaying highlights like "Personalized Learning" and "Exam Summarizer."
     - **PdfSummary/hooks/useFileAnalysis.ts**:
       - Implements file reader and analysis for summarizing PDF content into actionable information.
3. **Stylesheets (CSS)**:
   - **`src/components/Sum`**:
     - Custom styling for "Sum" features that include animated cards.
4. **Firebase Integration**:
   - Managed in configuration files.

---

## License

This project is licensed under the **[MIT License](LICENSE)**.

---

## Contributing

We welcome contributions to BreakThrough! Whether it's fixing bugs, improving our documentation, or adding essential new features, we appreciate all kinds of contributions. For contributions:

1. Fork the repository.
2. Create a pull request with a clear description of changes.

Happy Learning! 🚀
