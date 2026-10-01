'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/admin/actions'
import logo from '@/app/sunnivera-logo.png'

export default function AdminBar() {
  const pathname = usePathname()
  if (pathname === '/admin/login') return null // no admin menu before signing in
  return (
    <aside className="adm-bar">
      <Link href="/admin" className="adm-brand" aria-label="Sunivera admin home">
        <Image src={logo} alt="Sunivera" width={166} height={69} priority />
      </Link>
      <nav aria-label="Admin navigation">
        <Link className={pathname === '/admin' ? 'active' : ''} href="/admin"><span aria-hidden="true">▦</span> Posts</Link>
        <Link className={pathname === '/admin/new' ? 'active' : ''} href="/admin/new"><span aria-hidden="true">＋</span> Create post</Link>
      </nav>
      <div className="adm-bottom">
        <Link href="/insights"><span aria-hidden="true">↗</span> View website</Link>
        <form action={logout}><button type="submit"><span aria-hidden="true">←</span> Sign out</button></form>
      </div>
    </aside>
  )
}
