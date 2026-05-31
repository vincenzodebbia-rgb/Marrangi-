import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { TIPI } from '../data/markers'

const MOCK_EVENTI = [
  { id: 1, titolo: 'Festival Flamenco',    tipo: 'eventi',   data: '21 Jun 2026', stato: 'pubblicato' },
  { id: 2, titolo: 'Workshop Ceramica',    tipo: 'corsi',    data: '28 Jun 2026', stato: 'bozza' },
  { id: 3, titolo: 'Sala Prove Malasaña',  tipo: 'spazi',    data: '01 Jul 2026', stato: 'pubblicato' },
  { id: 4, titolo: 'Radio Comunitaria Ep.12', tipo: 'progetti', data: '05 Jul 2026', stato: 'bozza' },
  { id: 5, titolo: 'Taller de Teatro',     tipo: 'corsi',    data: '10 Jul 2026', stato: 'pubblicato' },
]

const TIPI_EVENTO = ['eventi', 'spazi', 'progetti', 'corsi']

const inputClass = 'w-full bg-[#0d0d0d] border border-night-border rounded-lg px-4 py-2.5 font-sans text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-coral transition-colors'
const labelClass = 'block font-sans text-xs uppercase tracking-widest text-cream/40 mb-2'

function CreAEvento() {
  const [form, setForm] = useState({
    titolo: '', descrizione: '', tipo: 'eventi', città: '', indirizzo: '',
    data: '', ora: '', maxPartecipanti: '', gratuito: true,
  })
  const [saved, setSaved] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-syne font-bold text-2xl text-cream mb-8">Crea evento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelClass}>Titolo</label>
          <input type="text" placeholder="Nome dell'evento" value={form.titolo} onChange={set('titolo')} required className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Descrizione</label>
          <textarea
            placeholder="Descrivi l'evento..."
            value={form.descrizione}
            onChange={set('descrizione')}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className={labelClass}>Tipo</label>
          <div className="flex gap-2 flex-wrap">
            {TIPI_EVENTO.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, tipo: t }))}
                className={`px-4 py-2 rounded-lg border font-sans text-xs font-semibold capitalize transition-all ${
                  form.tipo === t
                    ? 'border-transparent text-cream'
                    : 'border-night-border text-cream/40 hover:text-cream/60'
                }`}
                style={form.tipo === t ? { backgroundColor: `${TIPI[t].color}22`, borderColor: `${TIPI[t].color}66`, color: TIPI[t].color } : {}}
              >
                {TIPI[t].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Città</label>
            <input type="text" placeholder="Madrid" value={form.città} onChange={set('città')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Indirizzo</label>
            <input type="text" placeholder="Via / Calle..." value={form.indirizzo} onChange={set('indirizzo')} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Data</label>
            <input type="date" value={form.data} onChange={set('data')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ora</label>
            <input type="time" value={form.ora} onChange={set('ora')} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Max partecipanti</label>
            <input type="number" placeholder="50" min="1" value={form.maxPartecipanti} onChange={set('maxPartecipanti')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Gratuito</label>
            <div className="flex gap-2 mt-0.5">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, gratuito: v }))}
                  className={`flex-1 py-2.5 rounded-lg border font-sans text-sm font-semibold transition-all ${
                    form.gratuito === v
                      ? 'bg-gold/20 border-gold/60 text-gold'
                      : 'border-night-border text-cream/40 hover:text-cream/60'
                  }`}
                >
                  {v ? 'Sì' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {saved && (
          <p className="font-sans text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
            Evento salvato come bozza.
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-coral text-cream font-sans font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Salva bozza
        </button>
      </form>
    </div>
  )
}

function MieiEventi() {
  return (
    <div>
      <h2 className="font-syne font-bold text-2xl text-cream mb-8">I miei eventi</h2>
      <div className="overflow-x-auto rounded-xl border border-night-border">
        <table className="w-full font-sans text-sm">
          <thead>
            <tr className="border-b border-night-border">
              {['Titolo', 'Tipo', 'Data', 'Stato'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs uppercase tracking-widest text-cream/30 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_EVENTI.map((ev, i) => {
              const tipo = TIPI[ev.tipo]
              return (
                <tr key={ev.id} className={`border-b border-night-border/50 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                  <td className="px-5 py-4 text-cream font-medium">{ev.titolo}</td>
                  <td className="px-5 py-4">
                    <span
                      className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${tipo.color}22`, color: tipo.color }}
                    >
                      {tipo.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-cream/50">{ev.data}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                      ev.stato === 'pubblicato'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-cream/10 text-cream/40'
                    }`}>
                      {ev.stato}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MioProfilo({ user }) {
  return (
    <div className="max-w-md">
      <h2 className="font-syne font-bold text-2xl text-cream mb-8">Il mio profilo</h2>
      <div className="flex flex-col gap-4">
        {[
          { label: 'Nome', value: user.user_metadata?.nome || '—' },
          { label: 'Email', value: user.email },
          { label: 'Tipo account', value: user.user_metadata?.tipo || '—' },
          { label: 'ID utente', value: user.id },
        ].map(({ label, value }) => (
          <div key={label} className="border border-night-border rounded-xl px-5 py-4">
            <p className="font-sans text-xs uppercase tracking-widest text-cream/30 mb-1">{label}</p>
            <p className="font-sans text-sm text-cream break-all">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const NAV_ITEMS = [
  { id: 'eventi', label: 'I miei eventi' },
  { id: 'crea',   label: 'Crea evento' },
  { id: 'profilo', label: 'Il mio profilo' },
]

export default function Dashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [sezione, setSezione] = useState('eventi')

  if (loading) {
    return <div className="min-h-screen bg-dark flex items-center justify-center"><p className="font-sans text-cream/40">Caricamento...</p></div>
  }

  if (!user) {
    navigate('/auth')
    return null
  }

  if (user.user_metadata?.tipo !== 'associazione') {
    return (
      <div className="min-h-screen bg-dark text-cream flex flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-syne font-bold text-2xl">Area riservata alle associazioni.</p>
        <p className="font-sans text-cream/50 max-w-sm">Accedi con un account di tipo "associazione" per accedere alla dashboard.</p>
        <Link to="/" className="font-sans text-sm text-coral hover:opacity-80 transition-opacity">← Home</Link>
      </div>
    )
  }

  const nome = user.user_metadata?.nome || user.email.split('@')[0]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="h-screen flex flex-col bg-dark text-cream overflow-hidden">
      {/* Navbar */}
      <nav className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-night-border bg-dark/90 backdrop-blur-sm z-10">
        <Link
          to="/"
          className="font-unbounded text-lg bg-gradient-to-r from-[#FF3A0F] to-[#FFB300] bg-clip-text text-transparent"
          style={{ fontWeight: 900, letterSpacing: '3px' }}
        >
          MARRANGIÓ
        </Link>
        <div className="flex items-center gap-4">
          <span className="font-sans text-sm text-cream/60">Ciao, {nome}</span>
          <button
            onClick={handleLogout}
            className="font-sans text-sm text-cream/40 hover:text-coral transition-colors"
          >
            Esci
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 border-r border-night-border flex flex-col p-4 gap-1">
          <p className="font-sans text-xs uppercase tracking-widest text-cream/30 px-3 pt-2 pb-3">Dashboard</p>
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSezione(id)}
              className={`text-left px-3 py-2.5 rounded-xl font-sans text-sm transition-all ${
                sezione === id
                  ? 'bg-coral/15 text-coral font-semibold'
                  : 'text-cream/50 hover:text-cream hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-8">
          {sezione === 'eventi'  && <MieiEventi />}
          {sezione === 'crea'    && <CreAEvento />}
          {sezione === 'profilo' && <MioProfilo user={user} />}
        </main>
      </div>
    </div>
  )
}
