import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import Algorithm from './pages/Algorithm'
import Scenarios from './pages/Scenarios'
import WindowPeriod from './pages/WindowPeriod'
import QuickReference from './pages/QuickReference'
import About from './pages/About'
import ResultLookup from './pages/ResultLookup'
import Feedback from './pages/Feedback'

export default function App() {
  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      <Header />
      <main style={{ minHeight: 'calc(100dvh - var(--header-h))' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/algorithm" element={<Algorithm />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/window" element={<WindowPeriod />} />
          <Route path="/reference" element={<QuickReference />} />
          <Route path="/lookup" element={<ResultLookup />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
    </div>
  )
}
