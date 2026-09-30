import { ImageResponse } from 'next/og'

export const alt = 'Sunivera: business execution infrastructure for Africa'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#202020', padding: 72, color: '#ebe9e5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 800, letterSpacing: 6 }}>
          <div style={{ width: 26, height: 26, background: '#c0a080' }} />
          SUNIVERA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          <div style={{ display: 'flex' }}>We turn requirements</div>
          <div style={{ display: 'flex' }}>into reliable</div>
          <div style={{ display: 'flex', background: '#c0a080', color: '#202020', padding: '0 20px', marginTop: 8, alignSelf: 'flex-start' }}>execution.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#a8a49c' }}>Procurement. Compliance. Projects. Workforce. Technology.</div>
      </div>
    ),
    size,
  )
}
