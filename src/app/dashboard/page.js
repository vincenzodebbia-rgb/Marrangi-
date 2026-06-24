'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

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

export default function Dashboard() {
  const router = useRouter()
  const [sezione, setSezione] = useState('eventi')
  const [utente, setUtente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [associazione, setAssociazione] = useState(null)
  const [eventi, setEventi] = useState([])
  const [errore, setErrore] = useState('')

  const [titolo, setTitolo] = useState('')
  const [data, setData] = useState('')
  const [ora, setOra] = useState('')
  const [indirizzo, setIndirizzo] = useState('')
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [geocodeHint, setGeocodeHint] = useState('')

  const caricaEventi = async (assId) => {
    const { data: rows } = await supabase.from('eventi').select().eq('associazione_id', assId)
    setEventi(rows ?? [])
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace('/accesso'); return }
      setUtente(session.user)

      const { data: ass } = await supabase
        .from('associazioni')
        .select()
        .eq('user_id', session.user.id)
        .single()

      if (ass) {
        setAssociazione(ass)
        await caricaEventi(ass.id)
      }

      setLoading(false)
    })
  }, [router])

  const geocode = async () => {
    if (!indirizzo) return
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(indirizzo)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&limit=1`
    const res = await fetch(url)
    const json = await res.json()
    const feature = json.features?.[0]
    if (feature) {
      setLng(feature.center[0])
      setLat(feature.center[1])
      setGeocodeHint(`📍 ${feature.place_name}`)
    } else {
      setLat(null)
      setLng(null)
      setGeocodeHint('Indirizzo non trovato')
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  const pubblica = async (e) => {
    e.preventDefault()
    setErrore('')

    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    if (!user) return

    let ass = associazione
    if (!ass) {
      const nome = user.user_metadata?.nome ?? user.email
      const slug = nome.toLowerCase().replace(/\s+/g, '-')
      const { data: nuova, error: errAss } = await supabase
        .from('associazioni')
        .insert({ user_id: user.id, nome, slug })
        .select()
        .single()
      if (errAss) { setErrore(errAss.message); return }
      ass = nuova
      setAssociazione(ass)
    }

    const { error: errEv } = await supabase.from('eventi').insert({
      titolo,
      data,
      ora,
      luogo: indirizzo,
      slug: titolo.toLowerCase().replace(/\s+/g, '-'),
      associazione_id: ass.id,
      lat,
      lng,
    })
    if (errEv) { setErrore(errEv.message); return }

    await caricaEventi(ass.id)
    setTitolo('')
    setData('')
    setOra('')
    setIndirizzo('')
    setLat(null)
    setLng(null)
    setGeocodeHint('')
    setSezione('eventi')
  }

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
                  {['Titolo', 'Data', 'Luogo'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '0 0 0.75rem', fontWeight: 400, opacity: 0.4, fontSize: '0.75rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eventi.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ padding: '1.5rem 0', opacity: 0.4, fontFamily: 'var(--font-grotesk)', fontSize: '0.875rem' }}>
                      Nessun evento ancora.
                    </td>
                  </tr>
                ) : eventi.map((ev) => (
                  <tr key={ev.id} style={{ borderBottom: '1px solid rgba(242,231,211,0.06)' }}>
                    <td style={{ padding: '0.875rem 0' }}>{ev.titolo}</td>
                    <td style={{ padding: '0.875rem 0', opacity: 0.6 }}>{ev.data}</td>
                    <td style={{ padding: '0.875rem 0', opacity: 0.6 }}>{ev.luogo}</td>
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
              <div>
                <input
                  type="text"
                  placeholder="Indirizzo"
                  value={indirizzo}
                  onChange={(e) => { setIndirizzo(e.target.value); setGeocodeHint('') }}
                  onBlur={geocode}
                  required
                  style={inputStyle}
                />
                {geocodeHint && (
                  <p style={{
                    margin: '0.3rem 0 0',
                    fontSize: '0.75rem',
                    color: geocodeHint.startsWith('📍') ? 'rgba(242,231,211,0.6)' : '#f87171',
                    fontFamily: 'var(--font-grotesk)',
                  }}>
                    {geocodeHint}
                  </p>
                )}
              </div>
              {errore && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: 0 }}>{errore}</p>}
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
