import Navbar from './components/Navbar'
import Home from './components/Home'
import TimetablePage from './components/TimetablePage'
import ResourcesPage from './components/ResourcesPage'
import DoubtsPage from './components/DoubtsPage'
import { Routes, Route } from 'react-router-dom'

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative min-h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/doubts" element={<DoubtsPage />} />
      </Routes>
    </Shell>
  )
}

export default App
