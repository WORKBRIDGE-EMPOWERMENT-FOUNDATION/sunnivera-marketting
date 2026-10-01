'use client'

import { usePathname } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname().startsWith('/admin')

  if (isAdmin) return children

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
