import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ARTISTI, CERCA_CONFIG, DISCIPLINA_COLOR } from '../data/artisti'

const DISCIPLINE = ['Tutti', 'Teatro', 'Musica', 'Danza', 'Arti visive', 'Altro']

export default function Artisti() {
  const [filtro, setFiltro] = useState('Tutti')

  const lista = filtro === 'Tutti' ? ARTISTI : ARTISTI.filter((a) => a.disciplina === filtro)

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
        <div className="flex items-center gap-5">
          <Link to="/" className="font-sans text-sm text-cream/50 hover:text-cream transition-colors">Home</Link>
          <Link to="/mappa" className="font-sans text-sm text-cream/50 hover:text-cream transition-colors">Mappa</Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-syne font-bold text-4xl md:text-5xl text-cream mb-3">Artisti</h1>
            <p className="font-sans text-cream/50">Scopri i creativi della comunità Marrangió.</p>
          </div>

          {/* Filtri disciplina */}
          <div className="flex flex-wrap gap-2 mb-10">
            {DISCIPLINE.map((d) => {
              const color = d === 'Tutti' ? null : DISCIPLINA_COLOR[d]
              const active = filtro === d
              return (
                <button
                  key={d}
                  onClick={() => setFiltro(d)}
                  className={`px-4 py-2 rounded-full border font-sans text-sm font-semibold transition-all ${
                    active
                      ? 'text-cream border-transparent'
                      : 'border-night-border text-cream/40 hover:text-cream/70'
                  }`}
                  style={active && color ? { backgroundColor: `${color}22`, borderColor: `${color}66`, color } : active ? { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' } : {}}
                >
                  {d}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          {lista.length === 0 ? (
            <p className="font-sans text-cream/40 text-center py-20">Nessun artista trovato per questa disciplina.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lista.map((a) => {
                const color = DISCIPLINA_COLOR[a.disciplina] || '#8B5CF6'
                return (
                  <div
                    key={a.slug}
                    className="flex flex-col rounded-2xl border border-night-border bg-night-card p-6 hover:border-cream/20 transition-colors"
                  >
                    {/* Badge + città */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="inline-block text-xs font-sans font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${color}22`, color }}
                      >
                        {a.disciplina}
                      </span>
                      <span className="font-sans text-xs text-cream/30">{a.città}</span>
                    </div>

                    {/* Nome */}
                    <h2 className="font-syne font-bold text-lg text-cream mb-3 leading-tight">{a.nome}</h2>

                    {/* Cosa cerca */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {a.cerca.map((c) => {
                        const cfg = CERCA_CONFIG[c]
                        if (!cfg) return null
                        return (
                          <span
                            key={c}
                            className="text-xs font-sans px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        )
                      })}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        to={`/artisti/${a.slug}`}
                        className="inline-block w-full text-center py-2 rounded-full bg-coral text-cream font-sans font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        Vedi profilo
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
