import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const TIPI = {
  eventi:   { color: '#FF5A35', label: 'Eventi' },
  spazi:    { color: '#2E7D52', label: 'Spazi' },
  progetti: { color: '#FFB300', label: 'Progetti' },
  corsi:    { color: '#E06830', label: 'Corsi' },
}

const MOCK_MARKERS = [
  { id: 1, tipo: 'eventi',   lng: -3.7038, lat: 40.4268, title: 'Festival Flamenco',       desc: 'Teatro Real · 21 Jun' },
  { id: 2, tipo: 'eventi',   lng: -3.6900, lat: 40.4150, title: 'Concierto Jazz',           desc: 'Sala Clamores · 28 Jun' },
  { id: 3, tipo: 'spazi',    lng: -3.7138, lat: 40.4068, title: 'Centro Cultural Lavapiés', desc: 'Calle Argumosa 11' },
  { id: 4, tipo: 'spazi',    lng: -3.6850, lat: 40.4300, title: 'Sala de Ensayo',           desc: 'Malasaña · libre' },
  { id: 5, tipo: 'progetti', lng: -3.7200, lat: 40.4200, title: 'Mural Colectivo',          desc: 'Apertura: Jul 2026' },
  { id: 6, tipo: 'progetti', lng: -3.6980, lat: 40.4050, title: 'Radio Comunitaria',        desc: 'Lavapiés · abierto' },
  { id: 7, tipo: 'corsi',    lng: -3.7100, lat: 40.4350, title: 'Taller de Teatro',         desc: 'Lun/Mié 18:00' },
  { id: 8, tipo: 'corsi',    lng: -3.7020, lat: 40.3980, title: 'Curso de Cerámica',        desc: 'Sáb 10:00' },
]

export default function Mappa() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markerRefs = useRef({})
  const [filtri, setFiltri] = useState({ eventi: true, spazi: true, progetti: true, corsi: true })
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!window.mapboxgl || mapInstance.current) return
    window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
    const map = new window.mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-3.7038, 40.4168],
      zoom: 13,
    })
    mapInstance.current = map
    map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right')

    MOCK_MARKERS.forEach((m) => {
      // Static wrapper owns the hit area — prevents jitter when inner dot scales
      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer'

      const dot = document.createElement('div')
      dot.style.cssText = `width:14px;height:14px;border-radius:50%;background:${TIPI[m.tipo].color};border:2px solid rgba(255,255,255,0.6);transition:transform 0.15s;pointer-events:none`

      wrapper.appendChild(dot)
      wrapper.addEventListener('mouseenter', () => { dot.style.transform = 'scale(1.5)' })
      wrapper.addEventListener('mouseleave', () => { dot.style.transform = 'scale(1)' })
      wrapper.addEventListener('click', () => setSelected(m))

      const marker = new window.mapboxgl.Marker({ element: wrapper })
        .setLngLat([m.lng, m.lat])
        .addTo(map)

      markerRefs.current[m.id] = { marker, el: wrapper, tipo: m.tipo }
    })

    return () => { map.remove(); mapInstance.current = null }
  }, [])

  useEffect(() => {
    Object.values(markerRefs.current).forEach(({ el, tipo }) => {
      el.style.display = filtri[tipo] ? 'flex' : 'none'
    })
  }, [filtri])

  const toggleFiltro = (tipo) => {
    setFiltri((f) => ({ ...f, [tipo]: !f[tipo] }))
    if (selected?.tipo === tipo) setSelected(null)
  }

  return (
    <div className="h-screen flex flex-col bg-dark text-cream overflow-hidden">
      {/* Topbar */}
      <nav className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-night-border bg-dark/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="font-unbounded text-lg bg-gradient-to-r from-[#FF3A0F] to-[#FFB300] bg-clip-text text-transparent"
            style={{ fontWeight: 900, letterSpacing: '3px' }}
          >
            MARRANGIÓ
          </Link>
          <span className="font-sans text-sm text-cream/50">/ Mappa</span>
        </div>
        <Link to="/" className="font-sans text-sm text-cream/50 hover:text-cream transition-colors">
          ← Home
        </Link>
      </nav>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-night-border bg-dark flex flex-col overflow-y-auto p-5 gap-5 z-10">

          {/* Search inputs */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Cerca città..."
              className="w-full bg-[#0d0d0d] border border-night-border rounded-lg px-3 py-2 font-sans text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-coral transition-colors"
            />
            <input
              type="text"
              placeholder="Cerca quartiere..."
              className="w-full bg-[#0d0d0d] border border-night-border rounded-lg px-3 py-2 font-sans text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-coral transition-colors"
            />
          </div>

          {/* Filtri */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-cream/40 mb-3">Filtra per tipo</p>
            <div className="flex flex-col gap-2">
              {Object.entries(TIPI).map(([tipo, { color, label }]) => (
                <button
                  key={tipo}
                  onClick={() => toggleFiltro(tipo)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all font-sans text-sm ${
                    filtri[tipo]
                      ? 'border-transparent text-cream'
                      : 'border-night-border text-cream/30 bg-transparent'
                  }`}
                  style={filtri[tipo] ? { backgroundColor: `${color}22`, borderColor: `${color}66` } : {}}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 transition-opacity"
                    style={{ backgroundColor: color, opacity: filtri[tipo] ? 1 : 0.3 }}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Selected card */}
          {selected && (
            <div className="rounded-xl border border-night-border p-4" style={{ borderLeftColor: TIPI[selected.tipo].color, borderLeftWidth: 3 }}>
              <span
                className="inline-block text-xs font-sans font-semibold px-2 py-0.5 rounded-full mb-2"
                style={{ backgroundColor: `${TIPI[selected.tipo].color}22`, color: TIPI[selected.tipo].color }}
              >
                {TIPI[selected.tipo].label}
              </span>
              <p className="font-syne font-bold text-sm text-cream mb-1">{selected.title}</p>
              <p className="font-sans text-xs text-cream/50">{selected.desc}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-3 font-sans text-xs text-cream/30 hover:text-cream/60 transition-colors"
              >
                Chiudi
              </button>
            </div>
          )}
        </aside>

        {/* Map */}
        <div ref={mapRef} className="flex-1" />
      </div>
    </div>
  )
}
