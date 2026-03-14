import { motion } from 'framer-motion'
import { Zap, ArrowRight } from 'lucide-react'

export default function SuggestionsPanel({ suggestions = [] }) {
  if (!suggestions.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card"
      style={{ padding: '28px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(34, 197, 94, 0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={18} color="#22c55e" />
        </div>
        <h3 className="section-title" style={{ margin: 0 }}>Suggestions to Improve</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
        {suggestions.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              padding: '14px 16px',
              borderRadius: 10,
            }}
            className="suggestion-row"
          >
            <ArrowRight size={15} color="#22c55e" style={{ flexShrink: 0, marginTop: 3 }} />
            <p className="body-text" style={{ margin: 0, lineHeight: 1.6 }}>{text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
