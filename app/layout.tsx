import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SiteChrome from '@/components/SiteChrome'
import { companyName, siteUrl } from '@/lib/site'
import './globals.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--f-d' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--f-b' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Sunivera | Business Execution Infrastructure for Africa', template: '%s | Sunivera' },
  description: 'Sunivera connects procurement, compliance, projects, workforce and technology so organisations can execute with control.',
  applicationName: companyName,
  openGraph: {
    title: 'Sunivera | Business Execution Infrastructure for Africa',
    description: 'One operating partner from requirement to delivery.',
    type: 'website',
    url: '/',
    siteName: companyName,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunivera | Business Execution Infrastructure for Africa',
    description: 'One operating partner from requirement to delivery.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  )
}
