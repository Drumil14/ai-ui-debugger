const CATEGORY_META = {
  accessibility: { icon: '♿', className: 'accessibility' },
  responsive:    { icon: '📱', className: 'responsive' },
  design:        { icon: '🎨', className: 'design' },
  performance:   { icon: '⚡', className: 'performance' },
}

function SuggestionCard({ suggestion, index }) {
  const cat = suggestion.category?.toLowerCase() || 'design'
  const meta = CATEGORY_META[cat] || CATEGORY_META.design

  return (
    <div className="suggestion-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="suggestion-card__header">
        <div className={`suggestion-card__icon suggestion-card__icon--${meta.className}`}>
          {meta.icon}
        </div>
        <div>
          <div className="suggestion-card__title">{suggestion.title}</div>
          <div className="suggestion-card__tag">{cat}</div>
        </div>
      </div>
      <div className="suggestion-card__body">
        {suggestion.description}
        {suggestion.code && (
          <code className="suggestion-card__code">{suggestion.code}</code>
        )}
      </div>
    </div>
  )
}

export default function ResultBox({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div className="results">
      <div className="results__heading">
        Suggestions
        <span className="results__count">{suggestions.length}</span>
      </div>
      {suggestions.map((s, i) => (
        <SuggestionCard key={i} suggestion={s} index={i} />
      ))}
    </div>
  )
}
