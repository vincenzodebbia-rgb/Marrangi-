import { useParams, Link } from 'react-router-dom'
import { TIPI, MOCK_MARKERS } from '../data/markers'

function toSlug(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function EventoPage() {
  const { id } = useParams()
  const evento = MOCK_MARKERS.find((m) => m.id === parseInt(id))

  if (!evento) {
    return (
      <div className="min-h-screen bg-dark text-cream flex flex-col items-center justify-center gap-6">
        <p className="font-syne font-bold text-2xl">Evento non trovato.</p>
        <Link to="/mappa" className="font-sans text-sm text-coral hover:opacity-80 transition-opacity">
          ← Torna alla mappa
        </Link>
      </div>
    )
  }

  const tipo = TIPI[evento.tipo]

  return (
    <div className="min-h-screen bg-dark text-cream">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-night-border bg-dark/90 backdrop-blur-sm">
        <Link
          to="/"
          className="font-unbounded text-xl bg-gradient-to-r from-[#FF3A0F] to-[#FFB300] bg-clip-text text-transparent"
          style={{ fontWeight: 900, letterSpacing: '3px' }}
        >
          MARRANGIÓ
        </Link>
        <Link to="/mappa" className="font-sans text-sm text-cream/50 hover:text-cream transition-colors">
          ← Mappa
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 border-b border-night-border">
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-block text-sm font-sans font-semibold px-3 py-1 rounded-full mb-6"
            style={{ backgroundColor: `${tipo.color}22`, color: tipo.color }}
          >
            {tipo.label}
          </span>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-cream leading-tight mb-4">
            {evento.title}
          </h1>
          <p className="font-sans text-lg text-cream/60 leading-relaxed max-w-xl">
            {evento.desc}
          </p>
        </div>
      </section>

      {/* Dettagli */}
      <section className="py-12 px-6 border-b border-night-border">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-cream/30 mb-2">Dove</p>
            <p className="font-syne font-semibold text-cream">{evento.indirizzo}</p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-cream/30 mb-2">Quando</p>
            <p className="font-syne font-semibold text-cream">{evento.orario}</p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-cream/30 mb-2">Organizzatore</p>
            <Link
              to={`/associazioni/${toSlug(evento.associazione)}`}
              className="font-syne font-semibold text-cream hover:text-coral transition-colors"
            >
              {evento.associazione}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start gap-4">
          <button className="px-10 py-3 rounded-full bg-coral text-cream font-sans font-semibold text-base hover:opacity-90 transition-opacity">
            Partecipa
          </button>
          <Link
            to="/mappa"
            className="px-10 py-3 rounded-full border border-night-border text-cream/60 font-sans font-semibold text-base hover:border-cream/40 hover:text-cream transition-colors"
          >
            ← Torna alla mappa
          </Link>
        </div>
      </section>
    </div>
  )
}
