import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Loader2, Moon, BookOpen, Dumbbell,
  Monitor, Smartphone, Coffee, Smile,
} from 'lucide-react'
import CircularProgress from '../components/CircularProgress'
import InsightsPanel from '../components/InsightsPanel'
import SuggestionsPanel from '../components/SuggestionsPanel'
import ScoreBreakdownChart from '../components/ScoreBreakdownChart'

const API_URL = 'http://localhost:8000'

const fields = [
  { key: 'sleep_hours',        label: 'Sleep Hours',        icon: Moon,       min: 2,  max: 12,  step: 0.5, default: 7 },
  { key: 'study_hours',        label: 'Study Hours',        icon: BookOpen,   min: 0,  max: 14,  step: 0.5, default: 4 },
  { key: 'exercise_minutes',   label: 'Exercise (min)',     icon: Dumbbell,   min: 0,  max: 120, step: 5,   default: 30 },
  { key: 'screen_time_hours',  label: 'Screen Time (hrs)',  icon: Monitor,    min: 0,  max: 16,  step: 0.5, default: 4 },
  { key: 'social_media_hours', label: 'Social Media (hrs)', icon: Smartphone, min: 0,  max: 8,   step: 0.5, default: 2 },
  { key: 'breaks_taken',       label: 'Breaks Taken',       icon: Coffee,     min: 0,  max: 10,  step: 1,   default: 3 },
  { key: 'mood_level',         label: 'Mood Level',         icon: Smile,      min: 1,  max: 10,  step: 1,   default: 7 },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const fadeUp  = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function DashboardPage() {
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map(f => [f.key, f.default]))
  )
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: Number(value) }))
  }

  const handlePredict = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Prediction failed')
      const data = await res.json()
      setResult(data)
      localStorage.setItem('lastInput', JSON.stringify(formData))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 32 }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>
          Enter your daily routine metrics to predict your productivity score.
        </p>
      </motion.div>

      {/* ── Input Cards ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {fields.map(({ key, label, icon: Icon, min, max, step }) => (
          <motion.div
            key={key}
            variants={fadeUp}
            className="glass-card"
            style={{ padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
              <Icon size={15} />
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
              </span>
            </div>

            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={formData[key]}
              onChange={e => handleChange(key, e.target.value)}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={formData[key]}
                onChange={e => handleChange(key, e.target.value)}
                style={{
                  width: 70,
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: 8,
                  padding: '6px 0',
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                }}
              />
              <span style={{ fontSize: 10, color: 'var(--text-subtle)' }}>{min} – {max}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Predict Button ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}
      >
        <button
          onClick={handlePredict}
          disabled={loading}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 36px', borderRadius: 12, fontWeight: 600, fontSize: 15,
            color: 'white', border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            boxShadow: '0 4px 24px rgba(59,130,246,0.25)',
            transition: 'all 0.3s',
          }}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {loading ? 'Analyzing...' : 'Predict Productivity'}
        </button>
      </motion.div>

      {/* ── Error ── */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ padding: 14, borderColor: 'rgba(239,68,68,0.3)', color: '#f87171', fontSize: 13, textAlign: 'center', marginBottom: 32 }}
        >
          ⚠ {error} — Is the backend running on port 8000?
        </motion.div>
      )}

      {/* ── Results Section ── */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="all-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            {/* Score + Summary */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="glass-card glow"
              style={{ padding: '36px 32px' }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center', margin: '0 0 28px 0' }}>
                Prediction Result
              </h2>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
                <CircularProgress value={result.productivity_score} label={result.category} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 280 }}>
                  {[
                    { label: 'Score',    value: result.productivity_score, suffix: '/100' },
                    { label: 'Category', value: result.category },
                    { label: 'Sleep',    value: `${formData.sleep_hours}h` },
                    { label: 'Study',    value: `${formData.study_hours}h` },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      style={{ background: 'var(--input-bg)', borderRadius: 10, padding: '14px 16px', transition: 'background 0.3s' }}
                    >
                      <p style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
                        {item.value}{item.suffix || ''}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Score Breakdown */}
            <ScoreBreakdownChart breakdown={result.score_breakdown} />

            {/* AI Insights */}
            <InsightsPanel insights={result.insights} />

            {/* Suggestions */}
            <SuggestionsPanel suggestions={result.suggestions} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
