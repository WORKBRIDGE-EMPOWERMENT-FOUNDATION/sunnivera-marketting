import type { Metadata } from 'next'
import Link from 'next/link'
import { logout } from './actions'
import '@/components/admin/admin.css'

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pg"><div className="wrap">
      <div className="adm-bar">
        <span>Sunivera admin</span>
        <Link href="/admin">Posts</Link>
        <Link href="/admin/new">New post</Link>
        <Link href="/insights">View site</Link>
        <form action={logout}><button className="lnk" type="submit">Sign out</button></form>
      </div>
      {children}
    </div></main>
  )
}
