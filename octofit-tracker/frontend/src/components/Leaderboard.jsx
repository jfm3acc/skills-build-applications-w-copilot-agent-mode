import { CollectionState, PageHeading } from './CollectionUi.jsx'
import { displayMember } from '../lib/formatters.js'
import { useApiCollection } from '../lib/useApiCollection.js'

function Leaderboard() {
  const { records: boards, loading, error, retry } = useApiCollection('/api/leaderboard/', fetch)
  const { records: users } = useApiCollection('/api/users/', fetch)

  return (
    <div className="page-view">
      <PageHeading
        number="02"
        eyebrow="FRIENDLY COMPETITION"
        title="Leaderboard"
        description="Celebrate consistency and see how the club is moving together."
        meta={<><strong>{boards.length.toString().padStart(2, '0')}</strong><span>BOARDS</span></>}
      />

      <CollectionState
        loading={loading}
        error={error}
        records={boards}
        onRetry={retry}
        emptyMessage="Leaderboards will appear when a challenge is created."
      >
        <div className="board-list">
          {boards.map((board) => {
            const entries = [...(board.entries ?? [])].sort((first, second) => first.rank - second.rank)

            return (
              <section className="data-section board-section" key={board._id} aria-label={board.name}>
                <div className="section-heading">
                  <div><span className="section-kicker">{String(board.period ?? 'CURRENT').toUpperCase()} STANDINGS</span><h2>{board.name}</h2></div>
                  <span className="record-count">{entries.length} athletes</span>
                </div>
                {entries.length === 0 ? (
                  <p className="inline-empty">No scores have been recorded for this board.</p>
                ) : (
                  <div className="table-scroll">
                    <table className="data-table leaderboard-table">
                      <thead><tr><th>Rank</th><th>Athlete</th><th>Score</th></tr></thead>
                      <tbody>
                        {entries.map((entry, index) => (
                          <tr className={index === 0 ? 'leader-row' : ''} key={entry.userId}>
                            <td><span className={`rank-number${index === 0 ? ' rank-number--first' : ''}`}>{entry.rank ?? index + 1}</span></td>
                            <td className="primary-cell">{displayMember(users, entry.userId)}</td>
                            <td className="points-cell">{entry.points} pts</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </CollectionState>
    </div>
  )
}

export default Leaderboard