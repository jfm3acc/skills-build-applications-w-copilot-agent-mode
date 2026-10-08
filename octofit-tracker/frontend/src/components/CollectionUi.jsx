export function PageHeading({ number, eyebrow, title, description, meta }) {
  return (
    <header className="page-heading">
      <div>
        <p className="eyebrow"><span className="heading-number">{number}</span>{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {meta && <div className="heading-meta">{meta}</div>}
    </header>
  )
}

export function MetricTile({ label, value, note, tone = 'green' }) {
  return (
    <article className={`metric-tile metric-tile--${tone}`}>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-note">{note}</span>
    </article>
  )
}

export function CollectionState({ loading, error, records, emptyMessage, onRetry, children }) {
  if (loading) {
    return (
      <div className="state-panel" role="status" aria-live="polite">
        <span className="state-spinner" aria-hidden="true" />
        <div><strong>Loading records</strong><p>Connecting to the OctoFit API.</p></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-panel state-panel--error" role="alert">
        <div><strong>Could not load this view</strong><p>{error}</p></div>
        <button className="text-button" onClick={onRetry} type="button">Retry request</button>
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="state-panel state-panel--empty">
        <span className="empty-mark" aria-hidden="true">0</span>
        <div><strong>No records yet</strong><p>{emptyMessage}</p></div>
      </div>
    )
  }

  return children
}