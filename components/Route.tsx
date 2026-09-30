'use client'
import { useEffect, useRef, useState } from 'react'

const steps = [
  ['Discover', 'Identify requirements and opportunities.'],
  ['Qualify', 'Assess eligibility, cost, capability and risk.'],
  ['Structure', 'Build the commercial and execution approach.'],
  ['Mobilise', 'Activate suppliers, people and resources.'],
  ['Execute', 'Deliver against scope, schedule and quality.'],
  ['Control', 'Track milestones, records and performance.'],
  ['Close and grow', 'Complete, report, and see what comes next.'],
]

export default function Route() {
  const ref = useRef<HTMLOListElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const f = () => {
      const r = ref.current!.getBoundingClientRect()
      setP(Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height)))
    }
    f(); addEventListener('scroll', f, { passive: true }); addEventListener('resize', f)
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f) }
  }, [])
  const active = Math.min(steps.length - 1, Math.floor(p * steps.length))
  return (
    <ol className="route" ref={ref} style={{ ['--p' as string]: p }}>
      <span className="track"><i /><b /></span>
      {steps.map(([n, d], i) => (
        <li key={n} className={i <= active && p > 0 ? 'on' : ''}>
          <span className="stop">{String(i + 1).padStart(2, '0')}</span>
          <h3>{n}</h3>
          <p>{d}</p>
        </li>
      ))}
    </ol>
  )
}
