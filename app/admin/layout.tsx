import type { Metadata } from 'next'
import AdminBar from '@/components/admin/AdminBar'
import '@/components/admin/admin.css'

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pg"><div className="wrap">
      <AdminBar />
      {children}
    </div></main>
  )
}