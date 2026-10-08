import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './lib/api.js'

const navigation = [
  { path: '/activities', label: 'Activities', number: '01' },
  { path: '/leaderboard', label: 'Leaderboard', number: '02' },
  { path: '/teams', label: 'Teams', number: '03' },
  { path: '/users', label: 'Athletes', number: '04' },
  { path: '/workouts', label: 'Workouts', number: '05' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/activities" aria-label="OctoFit Tracker home">
          <img className="brand-logo" src={octofitLogo} alt="" />
          <span className="brand-copy">
            <strong>OctoFit</strong>
            <span>TRACKER / MERGINGTON</span>
          </span>
        </NavLink>

        <div className="sidebar-section-label">YOUR CLUB</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              key={item.path}
              to={item.path}
            >
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-kicker">MOVE TOGETHER</span>
          <p>Every session moves the team forward.</p>
          <span className="sidebar-season">FALL SEASON <span>·</span> 2026</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-context">
            <span className="connection-mark" aria-hidden="true" />
            <span>MERGINGTON HIGH <span className="topbar-divider">/</span> FITNESS CLUB</span>
          </div>
          <div className="topbar-date">FALL SEASON <span className="topbar-divider">/</span> 2026</div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <span>OCTOFIT TRACKER <span className="footer-separator">/</span> 2026</span>
          <span className="api-host">API <span>{API_BASE_URL}</span></span>
        </footer>
      </div>
    </div>
  )
}

export default App
