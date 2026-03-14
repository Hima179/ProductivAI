import { motion } from 'framer-motion'
import {
  BarChart, Bar, RadialBarChart, RadialBar,
  PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
} from 'recharts'
import { Moon, BookOpen, Dumbbell, Monitor, Smartphone, Coffee, Smile } from 'lucide-react'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

function ChartCard({ title, icon: Icon, color, children }) {
  return (
    <motion.div variants={fadeUp} className="glass-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18` }}>
          <Icon size={16} color={color} />
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
      </div>
      <div style={{ height: 200 }}>{children}</div>
    </motion.div>
  )
}

function Tip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: 'var(--text-primary)' }}>
      <strong>{payload[0].value}</strong>
    </div>
  )
}

export default function AnalysisPage() {
  const stored = JSON.parse(localStorage.getItem('lastInput') || 'null')
  const d = stored || {
    sleep_hours: 7, study_hours: 4, exercise_minutes: 30,
    screen_time_hours: 4, social_media_hours: 2, breaks_taken: 3, mood_level: 7,
  }

  const tickStyle = { fill: 'var(--text-muted)', fontSize: 11 }
  const trackFill = 'var(--input-bg)'

  const charts = [
    {
      title: 'Sleep Hours', icon: Moon, color: '#8b5cf6',
      el: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{ name: 'Sleep', value: d.sleep_hours }]} layout="vertical">
            <XAxis type="number" domain={[0, 12]} tick={tickStyle} />
            <YAxis type="category" dataKey="name" tick={tickStyle} width={48} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Study Hours', icon: BookOpen, color: '#3b82f6',
      el: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{ name: 'Study', value: d.study_hours }]} layout="vertical">
            <XAxis type="number" domain={[0, 14]} tick={tickStyle} />
            <YAxis type="category" dataKey="name" tick={tickStyle} width={48} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Exercise Minutes', icon: Dumbbell, color: '#22c55e',
      el: (
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" startAngle={180} endAngle={0}
            data={[{ value: d.exercise_minutes, fill: '#22c55e' }]}>
            <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#1e293b' }} />
            <text x="50%" y="55%" textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="bold">{d.exercise_minutes}</text>
            <text x="50%" y="68%" textAnchor="middle" fill="var(--text-muted)" fontSize="11">minutes</text>
          </RadialBarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Screen Time', icon: Monitor, color: '#f59e0b',
      el: (() => {
        const pd = [{ name: 'Screen', value: d.screen_time_hours }, { name: 'Other', value: Math.max(16 - d.screen_time_hours, 0) }]
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pd} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                <Cell fill="#f59e0b" /><Cell fill="#1e293b" />
              </Pie>
              <text x="50%" y="48%" textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="bold">{d.screen_time_hours}h</text>
              <text x="50%" y="58%" textAnchor="middle" fill="var(--text-muted)" fontSize="11">of 16h</text>
            </PieChart>
          </ResponsiveContainer>
        )
      })(),
    },
    {
      title: 'Social Media Usage', icon: Smartphone, color: '#ef4444',
      el: (() => {
        const pd = [{ name: 'Social', value: d.social_media_hours }, { name: 'Other', value: Math.max(8 - d.social_media_hours, 0) }]
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pd} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                <Cell fill="#ef4444" /><Cell fill="#1e293b" />
              </Pie>
              <text x="50%" y="48%" textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="bold">{d.social_media_hours}h</text>
              <text x="50%" y="58%" textAnchor="middle" fill="var(--text-muted)" fontSize="11">of 8h max</text>
            </PieChart>
          </ResponsiveContainer>
        )
      })(),
    },
    {
      title: 'Breaks Taken', icon: Coffee, color: '#06b6d4',
      el: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{ name: 'Breaks', value: d.breaks_taken }]}>
            <XAxis dataKey="name" tick={tickStyle} />
            <YAxis domain={[0, 10]} tick={tickStyle} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Mood Level', icon: Smile, color: '#ec4899',
      el: (
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" startAngle={90} endAngle={-270}
            data={[{ value: d.mood_level * 10, fill: '#ec4899' }]}>
            <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#1e293b' }} />
            <text x="50%" y="48%" textAnchor="middle" fill="var(--text-primary)" fontSize="28" fontWeight="bold">{d.mood_level}</text>
            <text x="50%" y="62%" textAnchor="middle" fill="var(--text-muted)" fontSize="11">out of 10</text>
          </RadialBarChart>
        </ResponsiveContainer>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Analysis</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 14 }}>Visual breakdown of your daily routine inputs.</p>
      </motion.div>

      {!stored && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card"
          style={{ padding: 14, borderColor: 'rgba(251,191,36,0.3)', color: '#fbbf24', fontSize: 13, textAlign: 'center', marginBottom: 24 }}>
          Showing default values. Go to Dashboard and make a prediction to see your data here.
        </motion.div>
      )}

      <motion.div variants={stagger} initial="hidden" animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {charts.map(c => (
          <ChartCard key={c.title} title={c.title} icon={c.icon} color={c.color}>{c.el}</ChartCard>
        ))}
      </motion.div>
    </div>
  )
}
