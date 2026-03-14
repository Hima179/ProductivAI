import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Sidebar from './components/Sidebar'
import DashboardPage from './pages/DashboardPage'
import AnalysisPage from './pages/AnalysisPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080d1c' }}>
      {/* Sidebar overlay for mobile / closed state */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Animated sidebar */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100vh',
                width: 260,
                zIndex: 50,
              }}
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>

            {/* Backdrop on smaller screens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 40,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        style={{
          marginLeft: sidebarOpen ? 260 : 0,
          width: sidebarOpen ? 'calc(100% - 260px)' : '100%',
          minHeight: '100vh',
          transition: 'margin-left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)',
          padding: '32px 40px 40px 40px',
        }}
      >
        {/* Top bar with toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: '#0f1629',
              border: '1px solid #1e293b',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0f1629'; e.currentTarget.style.color = '#94a3b8' }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  )
}
