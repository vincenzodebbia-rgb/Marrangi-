'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const TYPE_COLORS = {
  associazione: '#2E7D52',
  evento: '#E8843C',
}

export default function MapboxWrapper({ center = [15.517, 41.507], zoom = 13, markers = [] }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const map = new mapboxgl.Map({
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
        const popup = new mapboxgl.Popup({ offset: 10 }).setHTML(
          `<strong>${name}</strong><br/><a href="${href}">Vedi pagina</a>`
        )
        new mapboxgl.Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map)
      })
    })

    return () => map.remove()
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
