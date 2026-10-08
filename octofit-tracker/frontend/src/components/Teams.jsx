import { CollectionState, PageHeading } from './CollectionUi.jsx'
import { displayMember } from '../lib/formatters.js'
import { useApiCollection } from '../lib/useApiCollection.js'

function Teams() {
  const { records: teams, loading, error, retry } = useApiCollection('/api/teams/', fetch)
  const { records: users } = useApiCollection('/api/users/', fetch)

  return (
    <div className="page-view">
      <PageHeading
        number="03"
        eyebrow="CLUB ROSTER"
        title="Teams"
        description="Find your crew, meet your teammates, and build momentum together."
        meta={<><strong>{teams.length.toString().padStart(2, '0')}</strong><span>TEAMS</span></>}
      />

      <CollectionState
        loading={loading}
        error={error}
        records={teams}
        onRetry={retry}
        emptyMessage="Your teams will appear here once they are formed."
      >
        <div className="team-grid">
          {teams.map((team, index) => {
            const members = team.memberIds ?? []

            return (
              <article className="team-card" key={team._id}>
                <div className="team-card-topline"><span>TEAM {String(index + 1).padStart(2, '0')}</span><span>{members.length} MEMBERS</span></div>
                <h2>{team.name}</h2>
                <p className="team-description">{team.description || 'A crew building healthy habits together.'}</p>
                <div className="team-members-label">ROSTER</div>
                <ul className="member-list">
                  {members.length > 0 ? members.map((memberId) => (
                    <li key={String(memberId)}><span className="member-dot" />{displayMember(users, memberId)}</li>
                  )) : <li className="member-empty">Roster is ready for new members.</li>}
                </ul>
              </article>
            )
          })}
        </div>
      </CollectionState>
    </div>
  )
}

export default Teams