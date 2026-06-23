'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const MapboxWrapper = dynamic(() => import('@/components/MapboxWrapper'), { ssr: false })

const MARKERS = [
  { id: 1, name: 'Associazione Culturale Daunos', tipo: 'associazione', lng: 15.521, lat: 41.509 },
  { id: 2, name: 'Festival del Tavoliere',         tipo: 'evento',        lng: 15.512, lat: 41.503 },
  { id: 3, name: 'Circolo ArCe',                   tipo: 'associazione', lng: 15.525, lat: 41.512 },
  { id: 4, name: 'Notte Bianca Lucera',             tipo: 'evento',        lng: 15.508, lat: 41.499 },
  { id: 5, name: 'Teatro dei Senza Tetto',          tipo: 'associazione', lng: 15.518, lat: 41.514 },
]

export default function Mappa() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
      }}>
        {[['chi siamo', '/chi-siamo'], ['chi sei', '/chi-sei'], ['accedi', '/accesso']].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="font-grotesk text-xs opacity-50 hover:opacity-100 transition-opacity duration-150"
            style={{ color: '#F2E7D3', textDecoration: 'none' }}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <MapboxWrapper center={[15.517, 41.507]} zoom={13} markers={MARKERS} />
      </div>
    </div>
  )
}
