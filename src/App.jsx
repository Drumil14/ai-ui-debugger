import { useState, useCallback } from 'react'
import InputBox from './components/InputBox'
import ResultBox from './components/ResultBox'
import LoadingBar from './components/LoadingBar'
import { analyzeCode } from './analyzer'

export default function App() {
  const [suggestions, setSuggestions] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = useCallback(async (code) => {
    setLoading(true)
    setSuggestions(null)

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800))

    const results = analyzeCode(code)
    setSuggestions(results)
    setLoading(false)
  }, [])

  return (
    <div className="app-wrapper">
      <header className="site-header">
        <span className="site-header__tag">dev tool</span>
        <h1 className="site-header__title">UI Debugger</h1>
        <p className="site-header__subtitle">
          Paste UI code or describe a problem |  Get accessibility, design, and performance fixes back.
        </p>
      </header>

      <InputBox onAnalyze={handleAnalyze} isLoading={loading} />

      {loading && <LoadingBar />}

      <ResultBox suggestions={suggestions} />

      <footer className="site-footer">
        <span>UI Debugger · built with React</span> | {""}
        <span>by Drumil</span>
      </footer>
    </div>
  )
}
