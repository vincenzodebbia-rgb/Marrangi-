import { useParams, Link } from 'react-router-dom'
import { ASSOCIAZIONI } from '../data/associazioni'
import { TIPI, MOCK_MARKERS } from '../data/markers'

export default function AssociazionePage() {
  const { slug } = useParams()
  const assoc = ASSOCIAZIONI.find((a) => a.slug === slug)

  if (!assoc) {
    return (
      <div className="min-h-screen bg-dark text-cream flex flex-col items-center justify-center gap-6">
        <p className="font-syne font-bold text-2xl">Associazione non trovata.</p>
        <Link to="/" className="font-sans text-sm text-coral hover:opacity-80 transition-opacity">
          ← Home
        </Link>
      </div>
    )
  }

  const eventi = MOCK_MARKERS.filter((m) => m.associazione === assoc.nome).slice(0, 3)

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
        <Link to="/" className="font-sans text-sm text-cream/50 hover:text-cream transition-colors">
          ← Home
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 border-b border-night-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block text-sm font-sans font-semibold px-3 py-1 rounded-full bg-gold/20 text-gold">
              {assoc.categoria}
            </span>
            <span className="font-sans text-sm text-cream/40">{assoc.città}</span>
          </div>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-cream leading-tight mb-6">
            {assoc.nome}
          </h1>
          <div className="flex flex-wrap gap-8 text-xs font-sans">
            <div>
              <p className="text-cream/30 uppercase tracking-widest mb-1">Fondata</p>
              <p className="text-cream font-semibold text-base">{assoc.anno}</p>
            </div>
            <div>
              <p className="text-cream/30 uppercase tracking-widest mb-1">Soci</p>
              <p className="text-cream font-semibold text-base">{assoc.soci.toLocaleString('it-IT')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chi siamo */}
      <section className="py-14 px-6 border-b border-night-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-xl text-cream mb-5">Chi siamo</h2>
          <p className="font-sans text-base text-cream/60 leading-relaxed">{assoc.missione}</p>
        </div>
      </section>

      {/* I nostri eventi */}
      {eventi.length > 0 && (
        <section className="py-14 px-6 border-b border-night-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-syne font-bold text-xl text-cream mb-8">I nostri eventi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {eventi.map((ev) => {
                const tipo = TIPI[ev.tipo]
                return (
                  <Link
                    key={ev.id}
                    to={`/eventi/${ev.id}`}
                    className="block rounded-2xl p-5 border border-night-border bg-night-card hover:border-cream/20 transition-colors group"
                  >
                    <span
                      className="inline-block text-xs font-sans font-semibold px-2 py-0.5 rounded-full mb-3"
                      style={{ backgroundColor: `${tipo.color}22`, color: tipo.color }}
                    >
                      {tipo.label}
                    </span>
                    <h3 className="font-syne font-bold text-sm text-cream mb-1 group-hover:text-gold transition-colors">
                      {ev.title}
                    </h3>
                    <p className="font-sans text-xs text-cream/40">{ev.orario}</p>
                    <p className="font-sans text-xs text-cream/30 mt-1">{ev.indirizzo}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contatti */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-xl text-cream mb-8">Contatti</h2>
          <div className="flex flex-col sm:flex-row gap-8 mb-10">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-cream/30 mb-2">Email</p>
              <a
                href={`mailto:${assoc.email}`}
                className="font-sans text-cream hover:text-coral transition-colors"
              >
                {assoc.email}
              </a>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-cream/30 mb-2">Sito web</p>
              <span className="font-sans text-cream/70">{assoc.web}</span>
            </div>
          </div>
          <a
            href={`mailto:${assoc.email}`}
            className="inline-block px-10 py-3 rounded-full bg-coral text-cream font-sans font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Scrivici
          </a>
        </div>
      </section>
    </div>
  )
}
