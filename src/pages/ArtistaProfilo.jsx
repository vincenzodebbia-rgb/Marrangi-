import { useParams, Link } from 'react-router-dom'
import { ARTISTI, CERCA_CONFIG, DISCIPLINA_COLOR } from '../data/artisti'

export default function ArtistaProfilo() {
  const { slug } = useParams()
  const artista = ARTISTI.find((a) => a.slug === slug)

  if (!artista) {
    return (
      <div className="min-h-screen bg-dark text-cream flex flex-col items-center justify-center gap-6">
        <p className="font-syne font-bold text-2xl">Artista non trovato.</p>
        <Link to="/" className="font-sans text-sm text-coral hover:opacity-80 transition-opacity">
          ← Home
        </Link>
      </div>
    )
  }

  const disciplinaColor = DISCIPLINA_COLOR[artista.disciplina] || '#8B5CF6'

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
            <span
              className="inline-block text-sm font-sans font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: `${disciplinaColor}22`, color: disciplinaColor }}
            >
              {artista.disciplina}
            </span>
            <span className="font-sans text-sm text-cream/40">{artista.città}</span>
          </div>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-cream leading-tight mb-4">
            {artista.nome}
          </h1>
          <p className="font-sans text-sm text-cream/40">Attivo dal {artista.annoInizio}</p>
        </div>
      </section>

      {/* Chi sono */}
      <section className="py-14 px-6 border-b border-night-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-xl text-cream mb-5">Chi sono</h2>
          <p className="font-sans text-base text-cream/60 leading-relaxed">{artista.bio}</p>
        </div>
      </section>

      {/* Le mie discipline */}
      <section className="py-14 px-6 border-b border-night-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-xl text-cream mb-5">Le mie discipline</h2>
          <ul className="flex flex-wrap gap-3">
            <li
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-sans text-sm"
              style={{ backgroundColor: `${disciplinaColor}18`, borderColor: `${disciplinaColor}44`, color: disciplinaColor }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: disciplinaColor }} />
              {artista.disciplina}
            </li>
          </ul>
        </div>
      </section>

      {/* Cosa cerco */}
      <section className="py-14 px-6 border-b border-night-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-xl text-cream mb-5">Cosa cerco</h2>
          <div className="flex flex-wrap gap-3">
            {artista.cerca.map((c) => {
              const cfg = CERCA_CONFIG[c]
              if (!cfg) return null
              return (
                <span
                  key={c}
                  className="inline-block px-4 py-2 rounded-full font-sans text-sm font-semibold"
                  style={{ backgroundColor: `${cfg.color}22`, color: cfg.color }}
                >
                  {cfg.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start gap-4">
          <a
            href={`mailto:${artista.email}`}
            className="inline-block px-10 py-3 rounded-full bg-coral text-cream font-sans font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Contattami
          </a>
          {artista.portfolio && (
            <span className="font-sans text-sm text-cream/40 self-center">
              Portfolio: <span className="text-cream/70">{artista.portfolio}</span>
            </span>
          )}
        </div>
      </section>
    </div>
  )
}
