'use client'
import { useEffect, useRef } from 'react'

export default function MapboxWrapper({ center, zoom, markers }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!containerRef.current) return

    let map

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) return

    import('mapbox-gl').then((mapboxgl) => {
      import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.default.accessToken = token
      map = new mapboxgl.default.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center,
        zoom,
      })
      map.on('load', () => {
        markers.forEach(({ name, tipo, lng, lat }) => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${tipo === 'associazione' ? '#2E7D52' : '#E8843C'};border:2px solid rgba(255,255,255,0.6);cursor:pointer`
          new mapboxgl.default.Marker({ element: el })
            .setLngLat([lng, lat])
            .addTo(map)
        })
      })
    })

    return () => { if (map) map.remove() }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '100vh' }} />
}
