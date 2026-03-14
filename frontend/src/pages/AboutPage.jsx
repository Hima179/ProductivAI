import { motion } from 'framer-motion'
import { Brain, Code2, BarChart3, Target, Layers, Cpu, Palette, GitBranch } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

const techStack = [
  { category: 'Frontend', items: ['React (Vite)', 'TailwindCSS', 'ShadCN UI', 'Recharts', 'Framer Motion'] },
  { category: 'Backend',  items: ['Python', 'FastAPI', 'Uvicorn'] },
  { category: 'ML / Data', items: ['Scikit-learn', 'Pandas', 'NumPy'] },
]

const mlSteps = [
  { icon: Layers,    title: 'Data Generation',   desc: '50,000 synthetic records with realistic correlations' },
  { icon: GitBranch, title: 'Train / Test Split', desc: '80/20 split with random state for reproducibility' },
  { icon: Cpu,       title: 'Model Training',     desc: 'Linear Regression & Random Forest Regressor' },
  { icon: Target,    title: 'Evaluation',          desc: 'R² Score, MAE, MSE — best model auto-selected' },
]

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 48 }}>
      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: 18,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            marginBottom: 20,
          }}
        >
          <Brain size={32} color="white" />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'white', margin: '0 0 12px 0' }}>
          AI Personal Productivity Analyzer
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.7, fontSize: 14 }}>
          A modern full-stack machine learning application that predicts your daily productivity
          score based on lifestyle habits and presents insights through an interactive analytics dashboard.
        </p>
      </motion.div>

      {/* ── Overview ── */}
      <motion.div
        initial="hidden"
        animate="show"
        className="glass-card"
        style={{ padding: 28, marginBottom: 36 }}
      >
        <motion.h2 variants={fadeUp} custom={0} style={{ fontSize: 20, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 14px 0' }}>
          <BarChart3 size={20} color="#60a5fa" /> Project Overview
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.75, margin: '0 0 10px 0' }}>
          The AI Productivity Analyzer lets users enter daily routine metrics — sleep, study hours,
          exercise, screen time, social media usage, breaks, and mood level. A trained Random Forest
          model processes these inputs and predicts a productivity score between 0 and 100.
        </motion.p>
        <motion.p variants={fadeUp} custom={2} style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.75, margin: 0 }}>
          Results are displayed in animated cards with a circular progress meter and category label.
          The Analysis page offers per-metric visualisations so users can explore each input independently.
        </motion.p>
      </motion.div>

      {/* ── ML Approach ── */}
      <div style={{ marginBottom: 36 }}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: 20, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 20px 0' }}
        >
          <Cpu size={20} color="#a78bfa" /> Machine Learning Approach
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {mlSteps.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              className="glass-card"
              style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 14 }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={18} color="#a78bfa" />
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'white', margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 6, marginBottom: 0 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div style={{ marginBottom: 36 }}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: 20, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 20px 0' }}
        >
          <Code2 size={20} color="#4ade80" /> Technology Stack
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {techStack.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={gi}
              className="glass-card"
              style={{ padding: 20 }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#60a5fa', margin: '0 0 14px 0' }}>{group.category}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map(item => (
                  <li key={item} style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Purpose ── */}
      <motion.div
        initial="hidden"
        animate="show"
        className="glass-card"
        style={{ padding: 28 }}
      >
        <motion.h2 variants={fadeUp} custom={0} style={{ fontSize: 20, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 14px 0' }}>
          <Palette size={20} color="#f472b6" /> Purpose
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.75, margin: 0 }}>
          This project demonstrates a complete machine learning pipeline — from synthetic data
          generation to model training, API serving, and a polished React dashboard — all
          integrated into a cohesive, production-ready application architecture.
        </motion.p>
      </motion.div>
    </div>
  )
}
