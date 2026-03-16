AI UI Debugger
A developer tool built with React that analyzes UI code and surfaces accessibility, responsiveness, design, and performance issues — with actionable fix suggestions.
Paste any HTML, CSS, or JSX snippet and get instant feedback on what to improve and how.
Live Demo: ai-ui-debugger.netlify.app

What It Does
Drop in your UI code → the analyzer scans it against 16+ common anti-patterns and returns categorized suggestions with code fixes.
Categories covered:

Accessibility — missing alt text, unlabeled inputs, clickable divs without keyboard support, table semantics
Responsive — fixed pixel widths, small font sizes, missing relative units
Design — inline styles, hardcoded colors, !important overuse, stacked <br> tags, excessive div nesting
Performance — deprecated elements (<marquee>, <font>, <center>), deep DOM trees, z-index bloat

Each suggestion includes a title, explanation, and a code snippet showing the recommended fix.

Tech Stack

React 18 — component-based UI with hooks (useState, useCallback, useRef, useEffect)
Vite — fast dev server and optimized production builds
JavaScript — pattern-based analysis engine with regex rule matching
CSS — hand-written styles, no frameworks, CSS custom properties for theming
Google Fonts — JetBrains Mono + Outfit


Project Structure
ai-ui-debugger/
├── src/
│   ├── App.jsx              # Main app — state management, layout
│   ├── analyzer.js           # Pattern-based code analysis engine (16+ rules)
│   ├── main.jsx              # React entry point
│   ├── index.css             # All styles — dark terminal theme
│   └── components/
│       ├── InputBox.jsx      # Code textarea with ⌘+Enter shortcut
│       ├── ResultBox.jsx     # Suggestion cards with category icons
│       └── LoadingBar.jsx    # Animated loading indicator
├── index.html
├── vite.config.js
├── netlify.toml              # Netlify deploy config
└── package.json

Getting Started
bash# clone the repo
git clone https://github.com/Drumil14/ai-ui-debugger.git
cd ai-ui-debugger

# install dependencies
npm install

# start dev server
npm run dev
Open http://localhost:5173 — paste some code and hit Analyze.

Try It With This
html<div onclick="open()">
  <img src="photo.jpg">
  <p style="color:red;font-size:10px">click here</p>
  <marquee>welcome!!</marquee>
</div>
This snippet triggers suggestions for: missing alt text, non-semantic click handler, inline styles, tiny font size, hardcoded color, and deprecated <marquee>.

Deploy
The project is configured for Netlify out of the box:
bash# build for production
npm run build

# deploy via Netlify CLI
netlify deploy --prod
Or connect the GitHub repo to Netlify — it auto-detects netlify.toml and deploys on every push.

What I Learned

Building a rule-based analysis engine using regex pattern matching in JavaScript
Structuring a React app with clean component separation and prop-driven data flow
Designing a dark UI theme from scratch using CSS custom properties without any UI framework
Handling edge cases in user input parsing and providing meaningful developer feedbac
