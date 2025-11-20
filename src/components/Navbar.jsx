import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ to, label }) => {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-md transition-colors ${active ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-600/30'}`}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-slate-900/70 backdrop-blur border-b border-blue-500/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <span className="text-white font-semibold">Timetable & Resources</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavItem to="/" label="Home" />
          <NavItem to="/timetable" label="Timetable" />
          <NavItem to="/resources" label="Resources" />
          <a href="/test" className="px-4 py-2 rounded-md text-blue-100 hover:bg-blue-600/30">System</a>
        </nav>
      </div>
    </header>
  )
}
