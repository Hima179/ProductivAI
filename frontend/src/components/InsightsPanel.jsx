import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const icons = ['💡', '🧠', '📊', '🎯', '⚡', '🌟', '🔍', '📈']

export default function InsightsPanel({ insights = [] }) {
  if (!insights.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card"
      style={{ padding: '28px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(250, 204, 21, 0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Lightbulb size={18} color="#facc15" />
        </div>
        <h3 className="section-title" style={{ margin: 0 }}>AI Insights</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {insights.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.07 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '12px 14px',
              borderRadius: 10,
            }}
            className="insight-row"
          >
            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
              {icons[i % icons.length]}
            </span>
            <p className="body-text" style={{ margin: 0, lineHeight: 1.6 }}>{text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
