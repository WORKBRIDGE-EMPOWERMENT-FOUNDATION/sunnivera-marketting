'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const links = [
  ['What we do', '/#work'], ['Method', '/#method'], ['Proof', '/#proof'], ['Insights', '/insights'],
  ['Opportunities', '/opportunities'], ['About', '/about'], ['Discuss a project', '/#contact'],
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => { removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [open])
  return (
    <>
      <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mm" onClick={() => setOpen(!open)}>
        <i /><i />
      </button>
      <nav id="mm" className={open ? 'open' : ''} aria-label="Mobile">
        {links.map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{name}</Link>)}
      </nav>
    </>
  )
}
