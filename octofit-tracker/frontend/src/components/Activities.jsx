import { CollectionState, MetricTile, PageHeading } from './CollectionUi.jsx'
import { displayMember, formatDate } from '../lib/formatters.js'
import { useApiCollection } from '../lib/useApiCollection.js'

function Activities() {
  const { records: activities, loading, error, retry } = useApiCollection('/api/activities/', fetch)
  const { records: users } = useApiCollection('/api/users/', fetch)
  const totalMinutes = activities.reduce((total, activity) => total + (Number(activity.durationMinutes) || 0), 0)
  const totalDistance = activities.reduce((total, activity) => total + (Number(activity.distanceKm) || 0), 0)
  const totalPoints = activities.reduce((total, activity) => total + (Number(activity.points) || 0), 0)

  return (
    <div className="page-view">
      <PageHeading
        number="01"
        eyebrow="MOVEMENT / LOG"
        title="Activity log"
        description="A clear record of the work your team puts in, one session at a time."
        meta={<><strong>{activities.length.toString().padStart(2, '0')}</strong><span>SESSIONS</span></>}
      />

      <section className="metric-grid" aria-label="Activity totals">
        <MetricTile label="Sessions logged" value={activities.length} note="Across the club" tone="green" />
        <MetricTile label="Time in motion" value={`${totalMinutes} min`} note="Combined duration" tone="coral" />
        <MetricTile label="Distance covered" value={`${totalDistance.toFixed(1)} km`} note={`${totalPoints} points earned`} tone="gold" />
      </section>

      <CollectionState
        loading={loading}
        error={error}
        records={activities}
        onRetry={retry}
        emptyMessage="New activity entries will appear here."
      >
        <section className="data-section" aria-labelledby="activity-table-title">
          <div className="section-heading">
            <div><span className="section-kicker">RECENT EFFORT</span><h2 id="activity-table-title">Training sessions</h2></div>
            <span className="record-count">{activities.length} records</span>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Date</th><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id}>
                    <td className="date-cell">{formatDate(activity.performedAt)}</td>
                    <td className="primary-cell">{displayMember(users, activity.userId)}</td>
                    <td><span className={`type-tag type-tag--${String(activity.type ?? 'other').toLowerCase()}`}>{activity.type ?? 'Activity'}</span></td>
                    <td>{activity.durationMinutes ?? '—'} min</td>
                    <td>{activity.distanceKm == null ? '—' : `${activity.distanceKm} km`}</td>
                    <td className="points-cell">{activity.points ?? 0} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </CollectionState>
    </div>
  )
}

export default Activities