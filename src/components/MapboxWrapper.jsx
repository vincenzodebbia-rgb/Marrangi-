'use client'
import { useEffect, useRef } from 'react'

const TYPE_COLORS = {
  associazione: '#2E7D52',
  evento: '#E8843C',
}

export default function MapboxWrapper({ center = [15.517, 41.507], zoom = 13, markers = [] }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let map
    let cancelled = false

    const init = async () => {
      const mapboxgl = await import('mapbox-gl')
      await import('mapbox-gl/dist/mapbox-gl.css')
      if (cancelled) return

      const t = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || window.__NEXT_DATA__?.env?.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      console.log('mapbox token:', t ? t.slice(0, 8) + '...' : 'EMPTY')
      mapboxgl.default.accessToken = t

      map = new mapboxgl.default.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center,
        zoom,
      })

      map.on('load', () => {
        markers.forEach(({ name, tipo, lng, lat, href = '#' }) => {
          const el = document.createElement('div')
          el.style.cssText = `
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: ${TYPE_COLORS[tipo] ?? '#888888'};
            border: 2px solid rgba(255,255,255,0.6);
            cursor: pointer;
          `
          const popup = new mapboxgl.default.Popup({ offset: 10 }).setHTML(
            `<strong>${name}</strong><br/><a href="${href}">Vedi pagina</a>`
          )
          new mapboxgl.default.Marker({ element: el })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map)
        })
      })
    }

    init()

    return () => {
      cancelled = true
      if (map) map.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '100vh' }}
    />
  )
}
