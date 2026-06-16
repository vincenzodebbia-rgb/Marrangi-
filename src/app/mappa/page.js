import dynamic from 'next/dynamic'

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
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapboxWrapper center={[15.517, 41.507]} zoom={13} markers={MARKERS} />
    </div>
  )
}
