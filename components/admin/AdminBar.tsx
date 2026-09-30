'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/admin/actions'

export default function AdminBar() {
  if (usePathname() === '/admin/login') return null // no admin menu before signing in
  return (
    <div className="adm-bar">
      <span>Sunivera admin</span>
      <Link href="/admin">Posts</Link>
      <Link href="/admin/new">New post</Link>
      <Link href="/insights">View site</Link>
      <form action={logout}><button className="lnk" type="submit">Sign out</button></form>
    </div>
  )
}
