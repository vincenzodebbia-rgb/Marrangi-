'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const mockEventi = [
  { id: 1, titolo: 'Concerto Aperto — Maggio in Piazza', data: '24 mag 2025', stato: 'pubblicato' },
  { id: 2, titolo: 'Laboratorio Serigrafia', data: '3 giu 2025', stato: 'bozza' },
  { id: 3, titolo: 'Apertura Estiva Cortile', data: '15 lug 2025', stato: 'pubblicato' },
]

const inputStyle = {
  width: '100%',
  background: 'rgba(242,231,211,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '0.5rem',
  padding: '0.6rem 0.875rem',
  color: '#F2E7D3',
  fontFamily: 'var(--font-grotesk)',
  fontSize: '0.9rem',
  outline: 'none',
}

const cfg_style = { background: '#0a0806', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(242,231,211,0.4)', fontFamily: 'var(--font-grotesk)' }

export default function Dashboard() {
  const router = useRouter()
  const [sezione, setSezione] = useState('eventi')
  const [utente, setUtente] = useState(null)
  const [loading, setLoading] = useState(true)

  // form state
  const [titolo, setTitolo] = useState('')
  const [data, setData] = useState('')
  const [ora, setOra] = useState('')
  const [indirizzo, setIndirizzo] = useState('')

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/accesso'); return }
      setUtente(session.user)
      setLoading(false)
    })
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  const pubblica = (e) => {
    e.preventDefault()
    console.log({ titolo, data, ora, indirizzo })
  }

  if (!supabase) return <main style={cfg_style}>Configurazione in corso...</main>

  if (loading) return (
    <main style={{ background: '#0a0806', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-grotesk)', color: 'rgba(242,231,211,0.4)' }}>...</span>
    </main>
  )

  const tipo = utente?.user_metadata?.tipo?.toLowerCase()

  if (tipo !== 'associazione') return (
    <main style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <p style={{ fontFamily: 'var(--font-grotesk)' }}>Area riservata alle associazioni.</p>
      <Link href="/accesso" style={{ fontFamily: 'var(--font-grotesk)', color: '#E8843C', textDecoration: 'none', fontSize: '0.9rem' }}>
        Vai all&apos;accesso →
      </Link>
    </main>
  )

  return (
    <main style={{ background: '#0a0806', color: '#F2E7D3', minHeight: '100vh', display: 'flex' }}>

      {/* sidebar */}
      <aside style={{
        width: '12rem',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-unbounded)', fontSize: '0.65rem', opacity: 0.5, letterSpacing: '0.08em' }}>
          MARRANGIÓ
        </span>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[['eventi', 'I miei eventi'], ['crea', 'Crea evento']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSezione(key)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.4rem 0',
                fontFamily: 'var(--font-grotesk)',
                fontSize: '0.875rem',
                color: sezione === key ? '#E8843C' : '#F2E7D3',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={signOut}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            padding: '0.4rem 0',
            fontFamily: 'var(--font-grotesk)',
            fontSize: '0.875rem',
            color: 'rgba(242,231,211,0.4)',
          }}
        >
          Esci
        </button>
      </aside>

      {/* main */}
      <section style={{ flex: 1, padding: '2rem 2.5rem' }}>

        {sezione === 'eventi' && (
          <>
            <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '1.5rem' }}>
              i miei eventi
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-grotesk)', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(242,231,211,0.1)' }}>
                  {['Titolo', 'Data', 'Stato'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '0 0 0.75rem', fontWeight: 400, opacity: 0.4, fontSize: '0.75rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockEventi.map((ev) => (
                  <tr key={ev.id} style={{ borderBottom: '1px solid rgba(242,231,211,0.06)' }}>
                    <td style={{ padding: '0.875rem 0' }}>{ev.titolo}</td>
                    <td style={{ padding: '0.875rem 0', opacity: 0.6 }}>{ev.data}</td>
                    <td style={{ padding: '0.875rem 0', color: ev.stato === 'pubblicato' ? '#2E7D52' : undefined, opacity: ev.stato === 'bozza' ? 0.4 : 1 }}>
                      {ev.stato}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {sezione === 'crea' && (
          <>
            <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '1.5rem' }}>
              crea evento
            </p>
            <form onSubmit={pubblica} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '28rem' }}>
              <input type="text" placeholder="Titolo" value={titolo} onChange={(e) => setTitolo(e.target.value)} required style={inputStyle} />
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} required style={inputStyle} />
              <input type="time" value={ora} onChange={(e) => setOra(e.target.value)} required style={inputStyle} />
              <input type="text" placeholder="Indirizzo" value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} required style={inputStyle} />
              <button
                type="submit"
                style={{
                  background: '#E8843C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.7rem 1rem',
                  fontFamily: 'var(--font-grotesk)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  marginTop: '0.25rem',
                }}
              >
                Pubblica
              </button>
            </form>
          </>
        )}

      </section>
    </main>
  )
}
