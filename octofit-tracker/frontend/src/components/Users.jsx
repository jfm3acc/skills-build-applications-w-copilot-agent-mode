import { CollectionState, PageHeading } from './CollectionUi.jsx'
import { initials } from '../lib/formatters.js'
import { useApiCollection } from '../lib/useApiCollection.js'

function Users() {
  const { records: users, loading, error, retry } = useApiCollection('/api/users/', fetch)
  const { records: teams } = useApiCollection('/api/teams/', fetch)

  return (
    <div className="page-view">
      <PageHeading
        number="04"
        eyebrow="PEOPLE / PROGRESS"
        title="Athletes"
        description="The people behind the points, practice, and team spirit."
        meta={<><strong>{users.length.toString().padStart(2, '0')}</strong><span>ATHLETES</span></>}
      />

      <CollectionState
        loading={loading}
        error={error}
        records={users}
        onRetry={retry}
        emptyMessage="Athlete profiles will appear here when they join the club."
      >
        <section className="data-section" aria-labelledby="athlete-table-title">
          <div className="section-heading">
            <div><span className="section-kicker">MEMBER DIRECTORY</span><h2 id="athlete-table-title">Club athletes</h2></div>
            <span className="record-count">{users.length} profiles</span>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Athlete</th><th>Age</th><th>Team</th><th>Joined</th></tr></thead>
              <tbody>
                {users.map((user) => {
                  const teamId = String(user.teamId?._id ?? user.teamId ?? '')
                  const team = teams.find((item) => String(item._id) === teamId)

                  return (
                    <tr key={user._id}>
                      <td><div className="athlete-cell"><span className="avatar-mark">{initials(user.name)}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div></td>
                      <td>{user.age ?? '—'}</td>
                      <td>{team?.name ?? 'Unassigned'}</td>
                      <td className="date-cell">{user.createdAt ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(user.createdAt)) : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </CollectionState>
    </div>
  )
}

export default Users