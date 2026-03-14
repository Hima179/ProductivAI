import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart as PieIcon } from 'lucide-react'

const COLORS = {
  sleep: '#8b5cf6',
  study: '#3b82f6',
  exercise: '#22c55e',
  screen_time: '#f59e0b',
  social_media: '#ef4444',
  mood: '#ec4899',
}

const LABELS = {
  sleep: 'Sleep',
  study: 'Study',
  exercise: 'Exercise',
  screen_time: 'Screen Time',
  social_media: 'Social Media',
  mood: 'Mood',
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value, isNegative } = payload[0].payload
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--card-border)',
      borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--text-primary)',
    }}>
      <strong>{name}</strong>: {isNegative ? '' : '+'}{value}%
    </div>
  )
}

export default function ScoreBreakdownChart({ breakdown = {} }) {
  if (!Object.keys(breakdown).length) return null

  // Separate positive and negative for the donut (show absolute values)
  const data = Object.entries(breakdown).map(([key, val]) => ({
    name: LABELS[key] || key,
    value: Math.abs(val),
    actualValue: val,
    isNegative: val < 0,
    color: COLORS[key] || '#64748b',
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="glass-card"
      style={{ padding: '28px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(59, 130, 246, 0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PieIcon size={18} color="#3b82f6" />
        </div>
        <h3 className="section-title" style={{ margin: 0 }}>Score Breakdown</h3>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        {/* Donut chart */}
        <div style={{ width: 220, height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={entry.isNegative ? 0.55 : 1} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
          {data.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.06 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: d.color,
                opacity: d.isNegative ? 0.55 : 1,
                flexShrink: 0,
              }} />
              <span className="body-text" style={{ fontSize: 13 }}>{d.name}</span>
              <span style={{
                marginLeft: 'auto',
                fontSize: 13,
                fontWeight: 600,
                color: d.isNegative ? '#f87171' : '#4ade80',
              }}>
                {d.isNegative ? '' : '+'}{d.actualValue}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
