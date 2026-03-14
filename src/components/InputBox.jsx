import { useState, useRef, useEffect } from 'react'

const PLACEHOLDER = `<!-- paste your HTML/JSX here -->\n<div class="card">\n  <img src="photo.jpg">\n  <div onclick="open()">\n    <p style="color:red;font-size:10px">Click me</p>\n  </div>\n</div>`

export default function InputBox({ onAnalyze, isLoading }) {
  const [code, setCode] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (code.trim() && !isLoading) {
          onAnalyze(code)
        }
      }
    }
    const el = textareaRef.current
    el?.addEventListener('keydown', handleKeyDown)
    return () => el?.removeEventListener('keydown', handleKeyDown)
  }, [code, isLoading, onAnalyze])

  return (
    <div className="input-section">
      <label className="input-section__label">
        <span className="input-section__label-dot" />
        Paste your UI code or describe a problem
      </label>
      <textarea
        ref={textareaRef}
        className="input-section__textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={PLACEHOLDER}
        spellCheck={false}
      />
      <div className="action-bar" style={{ marginTop: '1rem' }}>
        <span className="action-bar__hint">
          <kbd>⌘</kbd> + <kbd>↵</kbd> to run
        </span>
        <button
          className="btn-analyze"
          onClick={() => onAnalyze(code)}
          disabled={!code.trim() || isLoading}
        >
          {isLoading ? 'Analyzing…' : 'Analyze'}
          {!isLoading && <span className="btn-analyze__arrow">→</span>}
        </button>
      </div>
    </div>
  )
}
