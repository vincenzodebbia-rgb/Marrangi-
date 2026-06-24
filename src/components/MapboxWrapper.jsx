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

    const style = document.createElement('style')
    style.textContent = `@keyframes pulse{0%{transform:scale(1);opacity:0.4}100%{transform:scale(2.5);opacity:0}}`
    document.head.appendChild(style)

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
          const color = tipo === 'associazione' ? '#2E7D52' : '#E8843C'

          const wrapper = document.createElement('div')
          wrapper.style.cssText = 'position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center'

          const pulse = document.createElement('div')
          pulse.style.cssText = `position:absolute;width:24px;height:24px;border-radius:50%;background:${color};opacity:0.4;animation:pulse 2s ease-out infinite`

          const dot = document.createElement('div')
          dot.style.cssText = `width:10px;height:10px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.8);position:relative;z-index:1`

          wrapper.appendChild(pulse)
          wrapper.appendChild(dot)

          new mapboxgl.default.Marker({ element: wrapper })
            .setLngLat([lng, lat])
            .addTo(map)
        })
      })
    })

    return () => { if (map) map.remove() }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '100vh' }} />
}
