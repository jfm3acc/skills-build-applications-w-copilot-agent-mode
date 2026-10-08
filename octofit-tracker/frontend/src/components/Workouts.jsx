import { CollectionState, PageHeading } from './CollectionUi.jsx'
import { useApiCollection } from '../lib/useApiCollection.js'

function Workouts() {
  const { records: workouts, loading, error, retry } = useApiCollection('/api/workouts/', fetch)

  return (
    <div className="page-view">
      <PageHeading
        number="05"
        eyebrow="PRACTICE / PLAN"
        title="Workouts"
        description="A starting point for your next run, walk, or strength session."
        meta={<><strong>{workouts.length.toString().padStart(2, '0')}</strong><span>SESSIONS</span></>}
      />

      <CollectionState
        loading={loading}
        error={error}
        records={workouts}
        onRetry={retry}
        emptyMessage="Suggested workouts will appear here when they are added."
      >
        <div className="workout-grid">
          {workouts.map((workout, index) => {
            const category = String(workout.category ?? 'fitness').toLowerCase()
            const difficulty = String(workout.difficulty ?? 'beginner').toLowerCase()

            return (
              <article className={`workout-card workout-card--${category}`} key={workout._id}>
                <div className="workout-card-topline"><span>{String(index + 1).padStart(2, '0')}</span><span className={`difficulty-tag difficulty-tag--${difficulty}`}>{difficulty}</span></div>
                <p className="workout-category">{category}</p>
                <h2>{workout.title}</h2>
                <p className="workout-description">{workout.description || 'A focused session to keep your momentum going.'}</p>
                <div className="workout-duration"><strong>{workout.durationMinutes ?? '—'}</strong><span>MINUTES</span></div>
              </article>
            )
          })}
        </div>
      </CollectionState>
    </div>
  )
}

export default Workouts