'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const MapboxWrapper = dynamic(() => import('@/components/MapboxWrapper'), { ssr: false })

export default function Mappa() {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    supabase
      .from('eventi')
      .select('id, titolo, slug, lat, lng, associazioni(nome, slug)')
      .not('lat', 'is', null)
      .then(({ data: eventiDB }) => {
        if (!eventiDB) return
        setMarkers(
          eventiDB.map((ev) => ({
            id: ev.id,
            name: ev.titolo,
            tipo: 'evento',
            lat: ev.lat,
            lng: ev.lng,
            slug: ev.slug,
          }))
        )
      })
  }, [])

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
        <MapboxWrapper center={[-3.7038, 40.4168]} zoom={5} markers={markers} />
      </div>
    </div>
  )
}
