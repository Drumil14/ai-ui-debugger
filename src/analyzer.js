
const RULES = [
  {
    test: (c) => /<img\b[^>]*(?!alt=)[^>]*>/i.test(c) || /<img\b[^>]*alt\s*=\s*""\s*/i.test(c),
    result: {
      title: 'Add alt text to images',
      category: 'accessibility',
      description: 'Screen readers can\'t describe images without alt text. Every <img> needs a meaningful alt attribute.',
      code: '<img src="photo.jpg" alt="Team celebrating product launch">',
    },
  },
  {
    test: (c) => /onclick\s*=/i.test(c) && /<div\b/i.test(c),
    result: {
      title: 'Use <button> instead of clickable <div>',
      category: 'accessibility',
      description: 'Divs with onclick aren\'t keyboard-focusable or announced by screen readers. Use a <button> element instead.',
      code: '<button onClick={handleClick}>Click me</button>',
    },
  },
  {
    test: (c) => /style\s*=\s*"/i.test(c),
    result: {
      title: 'Move inline styles to CSS classes',
      category: 'design',
      description: 'Inline styles are hard to maintain and override. Extract them into reusable CSS classes for consistency.',
      code: '.card-text {\n  color: var(--text-primary);\n  font-size: 0.875rem;\n}',
    },
  },
  {
    test: (c) => /font-size\s*:\s*(\d+)px/i.test(c) && parseInt(c.match(/font-size\s*:\s*(\d+)px/i)?.[1]) < 14,
    result: {
      title: 'Font size is too small',
      category: 'responsive',
      description: 'Text below 14px is hard to read on mobile. Use rem units (0.875rem minimum) so text scales with user preferences.',
      code: 'font-size: 0.875rem; /* 14px base, scales with user settings */',
    },
  },
  {
    test: (c) => /color\s*:\s*(red|blue|green|#f00|#0f0|#00f)\b/i.test(c),
    result: {
      title: 'Avoid hardcoded color keywords',
      category: 'design',
      description: 'Raw color names like "red" look harsh. Use a design token or CSS variable for a cohesive palette.',
      code: 'color: var(--color-danger); /* instead of color: red */',
    },
  },
  {
    test: (c) => /<marquee/i.test(c),
    result: {
      title: 'Remove <marquee> — it\'s deprecated',
      category: 'performance',
      description: 'The <marquee> element is deprecated and causes layout reflows. Use CSS animation if you need scrolling text.',
      code: '@keyframes scroll {\n  from { transform: translateX(100%); }\n  to { transform: translateX(-100%); }\n}',
    },
  },
  {
    test: (c) => /<table\b/i.test(c) && !/role=/i.test(c),
    result: {
      title: 'Add role or scope to table elements',
      category: 'accessibility',
      description: 'Tables need proper <th scope="col"> headers so screen readers can associate data with column names.',
      code: '<th scope="col">Name</th>\n<th scope="col">Price</th>',
    },
  },
  {
    test: (c) => /width\s*:\s*\d+px/i.test(c) && !/max-width/i.test(c),
    result: {
      title: 'Use max-width instead of fixed width',
      category: 'responsive',
      description: 'Fixed pixel widths break on smaller screens. Use max-width with percentage or rem for fluid layouts.',
      code: 'max-width: 600px;\nwidth: 100%;',
    },
  },
  {
    test: (c) => /<input\b[^>]*(?!label|aria-label|id)[^>]*>/i.test(c) || (/<input/i.test(c) && !/<label/i.test(c)),
    result: {
      title: 'Add labels to form inputs',
      category: 'accessibility',
      description: 'Inputs without associated <label> elements are invisible to assistive technology. Every input needs a label.',
      code: '<label htmlFor="email">Email address</label>\n<input id="email" type="email" />',
    },
  },
  {
    test: (c) => /position\s*:\s*absolute/i.test(c) && !/position\s*:\s*relative/i.test(c),
    result: {
      title: 'Missing relative parent for absolute positioning',
      category: 'design',
      description: 'Absolutely positioned elements need a relative parent, otherwise they\'ll position relative to the viewport unexpectedly.',
      code: '.parent {\n  position: relative;\n}\n.child {\n  position: absolute;\n  top: 0;\n}',
    },
  },
  {
    test: (c) => /!important/i.test(c),
    result: {
      title: 'Avoid !important — fix specificity instead',
      category: 'design',
      description: '!important creates specificity wars that are painful to debug. Refactor your selectors to increase specificity naturally.',
      code: '/* Instead of: .btn { color: red !important; } */\n.card .btn { color: var(--color-danger); }',
    },
  },
  {
    test: (c) => /<br\s*\/?>\s*<br/i.test(c),
    result: {
      title: 'Replace <br> stacking with margins',
      category: 'design',
      description: 'Multiple <br> tags for spacing is fragile. Use margin or padding for reliable, responsive spacing.',
      code: '.section {\n  margin-bottom: 1.5rem;\n}',
    },
  },
  {
    test: (c) => /<center/i.test(c) || /align\s*=\s*"center"/i.test(c),
    result: {
      title: 'Use CSS for centering, not HTML attributes',
      category: 'design',
      description: 'The <center> tag and align attributes are deprecated. Use flexbox or text-align in CSS.',
      code: '.container {\n  display: flex;\n  justify-content: center;\n}',
    },
  },
  {
    test: (c) => /<font\b/i.test(c),
    result: {
      title: 'Replace <font> with CSS',
      category: 'performance',
      description: 'The <font> tag is obsolete HTML. Use CSS font properties for styling text.',
      code: '.heading {\n  font-family: "Georgia", serif;\n  font-size: 1.25rem;\n  color: var(--text-primary);\n}',
    },
  },
  {
    test: (c) => /z-index\s*:\s*(\d+)/i.test(c) && parseInt(c.match(/z-index\s*:\s*(\d+)/i)?.[1]) > 100,
    result: {
      title: 'Simplify z-index values',
      category: 'design',
      description: 'High z-index values like 9999 suggest a stacking context issue. Use a z-index scale (1–10) with documented layers.',
      code: ':root {\n  --z-dropdown: 2;\n  --z-modal: 3;\n  --z-toast: 4;\n}',
    },
  },
  {
    test: (c) => /<div\b[^>]*>\s*<div\b[^>]*>\s*<div\b[^>]*>\s*<div/i.test(c),
    result: {
      title: 'Reduce excessive div nesting',
      category: 'performance',
      description: 'Deeply nested divs increase DOM size and slow rendering. Flatten your structure and use semantic elements like <section>, <article>, <main>.',
      code: '<main>\n  <section className="hero">...</section>\n  <section className="features">...</section>\n</main>',
    },
  },
]

const GENERAL_SUGGESTIONS = [
  {
    title: 'Use semantic HTML elements',
    category: 'accessibility',
    description: 'Replace generic <div> wrappers with semantic tags like <header>, <main>, <nav>, <section> to improve screen reader navigation.',
    code: '<header>...</header>\n<main>\n  <nav>...</nav>\n  <section>...</section>\n</main>',
  },
  {
    title: 'Add responsive meta viewport',
    category: 'responsive',
    description: 'Without a viewport meta tag, mobile browsers render at desktop width and zoom out. Always include it in your <head>.',
    code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
  },
  {
    title: 'Use CSS custom properties for theming',
    category: 'design',
    description: 'Hardcoded colors scattered across files make redesigns painful. Centralize colors in CSS variables for easy theme changes.',
    code: ':root {\n  --color-primary: #2c2416;\n  --color-accent: #c9553a;\n}',
  },
]

export function analyzeCode(input) {
  const code = input.toLowerCase ? input : String(input)
  const matched = RULES.filter((rule) => rule.test(code)).map((rule) => rule.result)

  if (matched.length === 0) {
    return GENERAL_SUGGESTIONS
  }

  return matched.slice(0, 6)
}
