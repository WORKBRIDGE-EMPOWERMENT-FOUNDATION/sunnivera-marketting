'use client'
import { useEffect, useRef, useState } from 'react'

const stages = [
  ['Requested', 'Client submits the requirement'],
  ['Verified', 'Vendors and documents checked'],
  ['In execution', 'Owner and deadline assigned'],
  ['Delivered', 'Records filed, invoice raised'],
]

export default function StatusTrail() {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let timer: ReturnType<typeof setInterval>
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (reduce) return setN(stages.length)
      timer = setInterval(() => setN(v => { if (v >= stages.length) { clearInterval(timer); return v } return v + 1 }), 750)
    }, { threshold: 0.5 })
    io.observe(ref.current!)
    return () => { io.disconnect(); clearInterval(timer) }
  }, [])

  return (
    <div className="trail" ref={ref}>
      <p className="trail-cap">Sample engagement trail</p>
      <ol style={{ ['--f' as string]: Math.max(0, n - 1) }}>
        {stages.map(([name, text], i) => (
          <li key={name} className={i < n ? 'on' : ''}>
            <h3>{name}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
