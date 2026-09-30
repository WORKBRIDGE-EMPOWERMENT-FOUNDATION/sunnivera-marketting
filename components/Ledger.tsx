'use client'
import { useState } from 'react'

export type Item = { name: string; verbs: string; text: string; scope: string[] }

export default function Ledger({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="ledger">
      {items.map((it, i) => (
        <div key={it.name} className={`lrow ${open === i ? 'open' : ''}`}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="ln">{it.name}</span>
            <span className="lv">{it.verbs}</span>
            <span className="lx" aria-hidden />
          </button>
          <div className="lbody"><div>
            <p>{it.text}</p>
            <ul>{it.scope.map(s => <li key={s}>{s}</li>)}</ul>
          </div></div>
        </div>
      ))}
    </div>
  )
}
