import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import './globals.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--f-d' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--f-b' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suniveralogisticsltd.com'),
  title: { default: 'Sunivera | Business Execution Infrastructure for Africa', template: '%s | Sunivera' },
  description: 'Sunivera connects procurement, compliance, projects, workforce and technology so organisations can execute with control.',
  openGraph: { title: 'Sunivera', description: 'One operating partner from requirement to delivery.', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
