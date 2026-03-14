import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, BarChart3, Info, Brain, ChevronLeft } from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analysis', icon: BarChart3, label: 'Analysis' },
  { to: '/about', icon: Info, label: 'About' },
]

export default function Sidebar({ onClose }) {
  return (
    <aside
      style={{
        width: '100%',
        height: '100%',
        background: '#060a16',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Brand ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 20px 20px 20px',
          borderBottom: '1px solid #1e293b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Brain size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 15, fontWeight: 700, color: 'white', letterSpacing: '-0.01em', margin: 0 }}>
              Productivity
            </h1>
            <p style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
              Analyzer
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: 'transparent',
            border: '1px solid #1e293b',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b' }}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 16px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
              color: isActive ? '#60a5fa' : '#94a3b8',
              background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: 3,
                      height: 26,
                      background: '#3b82f6',
                      borderRadius: '0 4px 4px 0',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={18} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
        <p style={{ fontSize: 10, color: '#475569', margin: 0 }}>
          AI Productivity Analyzer v1.0
        </p>
      </div>
    </aside>
  )
}
