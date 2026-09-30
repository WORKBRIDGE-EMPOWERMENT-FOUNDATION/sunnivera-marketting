'use client'
import { useEffect, useRef, useState } from 'react'

const rows: [string, string, number][] = [
  ['RFQ', 'Road works supply', 6],
  ['EOI', 'Facility services', 12],
  ['Tender', 'Medical equipment', 3],
  ['Grant', 'Energy partnership', 20],
]

export default function Board() {
  const ref = useRef<HTMLTableElement>(null)
  const [seen, setSeen] = useState(false)
  const [t, setT] = useState(0)

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      setSeen(true)
      if (reduce) return setT(1)
      const t0 = performance.now()
      const f = (now: number) => {
        const p = Math.min(1, Math.max(0, (now - t0 - 500) / 1400))
        setT(p)
        if (p < 1) requestAnimationFrame(f)
      }
      requestAnimationFrame(f)
    }, { threshold: 0.3 })
    io.observe(ref.current!)
    return () => io.disconnect()
  }, [])

  const ease = 1 - Math.pow(1 - t, 3)
  return (
    <table ref={ref} className={`board ${seen ? 'in' : ''}`}>
      <caption>Sample opportunity board</caption>
      <thead><tr><th>Type</th><th>Opportunity</th><th>Closes</th></tr></thead>
      <tbody>
        {rows.map(([type, name, d], i) => (
          <tr key={name} style={{ ['--i' as string]: i }}>
            <td>{type}</td>
            <td>{name}</td>
            <td>{Math.round(d + 8 * (1 - ease))} days</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
