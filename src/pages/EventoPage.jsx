import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TIPI, MOCK_MARKERS } from '../data/markers'
import { useAuth } from '../hooks/useAuth'

const MAX = 150

function toSlug(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const MOCK_MESSAGGI = [
  { id: 1, nome: 'Sofia M.',  testo: `Non vedo l'ora! L'anno scorso era stato fantastico, ci sarò di sicuro.`, orario: '10:23' },
  { id: 2, nome: 'Carlos R.', testo: 'Qualcuno sa se ci sono ancora biglietti? Ho provato il sito ma non carica niente.', orario: '11:45' },
  { id: 3, nome: 'Ana B.',    testo: `Perfetto per portare i bambini, l'anno passato erano entusiasti. Evento imperdibile!`, orario: '13:02' },
  { id: 4, nome: 'Luca T.',   testo: 'Ci vediamo lì! Ho già avvisato il gruppo. Arriviamo verso le 19:30 per trovare posto.', orario: '15:17' },
  { id: 5, nome: 'María J.',  testo: 'Ottimo programma, molto meglio delle edizioni precedenti. Complimenti.', orario: '16:55' },
]

function Avatar({ nome }) {
  return (
    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
      <span className="font-syne font-bold text-xs text-coral">{nome[0]}</span>
    </div>
  )
}

function Conversazione({ user }) {
  const [messaggi, setMessaggi] = useState(MOCK_MESSAGGI)
  const [testo, setTesto] = useState('')

  const rimanenti = MAX - testo.length

  const handleInvia = (e) => {
    e.preventDefault()
    if (!testo.trim()) return
    const nome = user.user_metadata?.nome || user.email.split('@')[0]
    setMessaggi((prev) => [
      ...prev,
      { id: Date.now(), nome, testo: testo.trim(), orario: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) },
    ])
    setTesto('')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Messages */}
      <div className="flex flex-col gap-5">
        {messaggi.map((m) => (
          <div key={m.id} className="flex gap-3">
            <Avatar nome={m.nome} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-sans text-sm font-semibold text-cream">{m.nome}</span>
                <span className="font-sans text-xs text-cream/30">{m.orario}</span>
              </div>
              <p className="font-sans text-sm text-cream/70 leading-relaxed">{m.testo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleInvia} className="border-t border-night-border pt-6">
        <div className="relative">
          <textarea
            placeholder="Scrivi un messaggio... (max 150 caratteri)"
            value={testo}
            onChange={(e) => setTesto(e.target.value.slice(0, MAX))}
            rows={3}
            className="w-full bg-[#0d0d0d] border border-night-border rounded-xl px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-coral transition-colors resize-none"
          />
          <span className={`absolute bottom-3 right-3 font-sans text-xs ${rimanenti <= 20 ? 'text-coral' : 'text-cream/30'}`}>
            {rimanenti}
          </span>
        </div>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={!testo.trim()}
            className="px-6 py-2 rounded-full bg-coral text-cream font-sans font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Invia
          </button>
        </div>
      </form>
    </div>
  )
}

export default function EventoPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
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
      <section className="py-16 px-6 border-b border-night-border">
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

      {/* Community */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-2xl text-cream mb-8">Unisciti alla conversazione</h2>

          {loading ? null : user ? (
            <Conversazione user={user} />
          ) : (
            <div className="border border-night-border rounded-2xl p-8 text-center">
              <p className="font-sans text-cream/50 mb-4">Accedi per partecipare alla conversazione.</p>
              <Link
                to="/auth"
                className="inline-block px-8 py-2.5 rounded-full bg-coral text-cream font-sans font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Accedi
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
