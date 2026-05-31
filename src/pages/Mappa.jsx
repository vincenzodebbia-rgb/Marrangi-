import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const TIPI = {
  eventi:   { color: '#FF5A35', label: 'Eventi' },
  spazi:    { color: '#2E7D52', label: 'Spazi' },
  progetti: { color: '#FFB300', label: 'Progetti' },
  corsi:    { color: '#E06830', label: 'Corsi' },
}

const MOCK_MARKERS = [
  {
    id: 1, tipo: 'eventi', lng: -3.7038, lat: 40.4268,
    title: 'Festival Flamenco',
    desc: 'Tre sere di flamenco puro nel cuore di Madrid con artisti di fama internazionale.',
    indirizzo: 'Plaza de Oriente s/n, Madrid Centro',
    orario: '21–23 Jun · 20:00–23:30',
    associazione: 'Fundación Arte Vivo',
  },
  {
    id: 2, tipo: 'eventi', lng: -3.6900, lat: 40.4150,
    title: 'Concierto Jazz',
    desc: 'Quartetto jazz dal vivo con aperitivo incluso. Prenotazione obbligatoria.',
    indirizzo: 'Calle Alburquerque 14, Malasaña',
    orario: '28 Jun · 21:00',
    associazione: 'Sala Clamores',
  },
  {
    id: 3, tipo: 'spazi', lng: -3.7138, lat: 40.4068,
    title: 'Centro Cultural Lavapiés',
    desc: 'Spazio multidisciplinare con sale prove, sala espositiva e co-working creativo.',
    indirizzo: 'Calle Argumosa 11, Lavapiés',
    orario: 'Lun–Sab · 10:00–22:00',
    associazione: 'Ayuntamiento de Madrid',
  },
  {
    id: 4, tipo: 'spazi', lng: -3.6850, lat: 40.4300,
    title: 'Sala de Ensayo',
    desc: 'Sala insonorizzata disponibile per band, teatro e danza. Accesso libero su prenotazione.',
    indirizzo: 'Calle Fuencarral 80, Malasaña',
    orario: 'Tutti i giorni · 09:00–21:00',
    associazione: 'Colectivo Malasaña Viva',
  },
  {
    id: 5, tipo: 'progetti', lng: -3.7200, lat: 40.4200,
    title: 'Mural Colectivo',
    desc: 'Progetto di arte pubblica partecipata: un murale di 200m² co-creato dal quartiere.',
    indirizzo: 'Calle de la Paloma, La Latina',
    orario: 'Inaugurazione: 15 Jul 2026',
    associazione: 'Barrio en Movimiento',
  },
  {
    id: 6, tipo: 'progetti', lng: -3.6980, lat: 40.4050,
    title: 'Radio Comunitaria',
    desc: 'Stazione radio autogestita del quartiere. Aperta a chiunque voglia condurre un programma.',
    indirizzo: 'Centro Social Okupado, Lavapiés',
    orario: 'On air: 24/7 · Studi aperti Mer/Ven 16:00',
    associazione: 'Radio Patio',
  },
  {
    id: 7, tipo: 'corsi', lng: -3.7100, lat: 40.4350,
    title: 'Taller de Teatro',
    desc: 'Workshop di recitazione per adulti principianti e intermedi. Metodo Stanislavski.',
    indirizzo: 'Calle de la Luna 22, Malasaña',
    orario: 'Lun & Mié · 18:00–20:00',
    associazione: 'Teatro Lagrada',
  },
  {
    id: 8, tipo: 'corsi', lng: -3.7020, lat: 40.3980,
    title: 'Curso de Cerámica',
    desc: 'Corso di ceramica per principianti: costruzione a lastra e tornio. Materiali inclusi.',
    indirizzo: 'Calle Embajadores 53, Lavapiés',
    orario: 'Sáb · 10:00–13:00',
    associazione: 'Taller Tierra',
  },
]

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

async function geocodeUrl(url, zoom, map) {
  const res = await fetch(url)
  const data = await res.json()
  if (!data.features || data.features.length === 0) return false
  const [lng, lat] = data.features[0].center
  map.flyTo({ center: [lng, lat], zoom, duration: 1400 })
  return true
}

async function geocode(query, types, zoom, map) {
  const base = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${TOKEN}&language=it,es`
  const found = await geocodeUrl(`${base}&types=${types}`, zoom, map)
  if (found) return true
  return geocodeUrl(base, zoom, map)
}

export default function Mappa() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markerRefs = useRef({})

  const [filtri, setFiltri] = useState({ eventi: true, spazi: true, progetti: true, corsi: true })
  const [selected, setSelected] = useState(null)
  const [cityQuery, setCityQuery] = useState('')
  const [quartiereQuery, setQuartiereQuery] = useState('')
  const [geoError, setGeoError] = useState({ citta: null, quartiere: null })

  useEffect(() => {
    if (!window.mapboxgl || mapInstance.current) return
    window.mapboxgl.accessToken = TOKEN
    const map = new window.mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-3.7038, 40.4168],
      zoom: 13,
    })
    mapInstance.current = map
    map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right')

    MOCK_MARKERS.forEach((m) => {
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

  const handleCitySearch = async (e) => {
    if (e.key !== 'Enter' || !cityQuery.trim() || !mapInstance.current) return
    setGeoError((prev) => ({ ...prev, citta: null }))
    const found = await geocode(cityQuery.trim(), 'place', 12, mapInstance.current)
    if (!found) setGeoError((prev) => ({ ...prev, citta: `Nessun risultato per "${cityQuery}"` }))
  }

  const handleQuartiereSearch = async (e) => {
    if (e.key !== 'Enter' || !quartiereQuery.trim() || !mapInstance.current) return
    setGeoError((prev) => ({ ...prev, quartiere: null }))
    const found = await geocode(quartiereQuery.trim(), 'neighborhood,locality,district,place', 14, mapInstance.current)
    if (!found) setGeoError((prev) => ({ ...prev, quartiere: `Nessun risultato per "${quartiereQuery}"` }))
  }

  const inputClass = 'w-full bg-[#0d0d0d] border border-night-border rounded-lg px-3 py-2 font-sans text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-coral transition-colors'

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
        <aside className="w-64 flex-shrink-0 border-r border-night-border bg-dark flex flex-col overflow-y-auto z-10">

          {selected ? (
            /* ── EVENT CARD ── */
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-night-border">
                <button
                  onClick={() => setSelected(null)}
                  className="font-sans text-xs text-cream/40 hover:text-cream transition-colors"
                >
                  ← Filtri
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="inline-block text-xs font-sans font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${TIPI[selected.tipo].color}22`, color: TIPI[selected.tipo].color }}
                  >
                    {TIPI[selected.tipo].label}
                  </span>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-cream/30 hover:text-cream transition-colors text-lg leading-none"
                    aria-label="Chiudi"
                  >
                    ×
                  </button>
                </div>

                <h2 className="font-syne font-bold text-base text-cream leading-snug">{selected.title}</h2>
                <p className="font-sans text-sm text-cream/60 leading-relaxed">{selected.desc}</p>

                <div className="flex flex-col gap-2 text-xs font-sans">
                  <div className="flex gap-2">
                    <span className="text-cream/30 w-16 flex-shrink-0">Dove</span>
                    <span className="text-cream/70">{selected.indirizzo}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cream/30 w-16 flex-shrink-0">Quando</span>
                    <span className="text-cream/70">{selected.orario}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cream/30 w-16 flex-shrink-0">Chi</span>
                    <span className="text-cream/70">{selected.associazione}</span>
                  </div>
                </div>

                <button className="mt-2 w-full py-2.5 rounded-full bg-coral text-cream font-sans font-semibold text-sm hover:opacity-90 transition-opacity">
                  Scopri di più
                </button>
              </div>
            </div>
          ) : (
            /* ── SEARCH + FILTERS ── */
            <div className="p-5 flex flex-col gap-5">
              {/* Search */}
              <div className="flex flex-col gap-2">
                <div>
                  <input
                    type="text"
                    placeholder="Cerca città..."
                    value={cityQuery}
                    onChange={(e) => { setCityQuery(e.target.value); setGeoError((p) => ({ ...p, citta: null })) }}
                    onKeyDown={handleCitySearch}
                    className={inputClass}
                  />
                  {geoError.citta && <p className="mt-1 font-sans text-xs text-coral/80">{geoError.citta}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Cerca quartiere..."
                    value={quartiereQuery}
                    onChange={(e) => { setQuartiereQuery(e.target.value); setGeoError((p) => ({ ...p, quartiere: null })) }}
                    onKeyDown={handleQuartiereSearch}
                    className={inputClass}
                  />
                  {geoError.quartiere && <p className="mt-1 font-sans text-xs text-coral/80">{geoError.quartiere}</p>}
                </div>
              </div>

              {/* Filters */}
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
            </div>
          )}
        </aside>

        {/* Map */}
        <div ref={mapRef} className="flex-1" />
      </div>
    </div>
  )
}
