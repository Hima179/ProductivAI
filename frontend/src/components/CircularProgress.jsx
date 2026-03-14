import { motion } from 'framer-motion'

export default function CircularProgress({ value = 0, size = 160, strokeWidth = 10, label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  let color = '#ef4444'
  if (value >= 75) color = '#22c55e'
  else if (value >= 45) color = '#f59e0b'

  return (
    <div className="flex flex-col items-center gap-2">
      {/* SVG + centred label wrapper */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>

        {/* Centre text — positioned absolutely inside the relative wrapper */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.span
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {value}
          </motion.span>
          <span className="text-xs uppercase tracking-wider" style={{ color: '#94a3b8' }}>
            Score
          </span>
        </div>
      </div>

      {/* Category label below the circle */}
      {label && (
        <motion.p
          className="text-sm font-semibold"
          style={{ color }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  )
}
