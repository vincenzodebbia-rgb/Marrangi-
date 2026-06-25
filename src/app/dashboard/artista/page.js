'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const DISCIPLINE = ['Teatro', 'Musica', 'Danza', 'Arti visive', 'Altro']
const CERCA = ['Collaborazioni', 'Spazi', 'Progetti']

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

export default function DashboardArtista() {
  const router = useRouter()
  const [sezione, setSezione] = useState('profilo')
  const [utente, setUtente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [artista, setArtista] = useState(null)
  const [errore, setErrore] = useState('')
  const [salvato, setSalvato] = useState(false)

  const [nome, setNome] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [citta, setCitta] = useState('')
  const [bio, setBio] = useState('')
  const [cerca, setCerca] = useState([])
  const [emailPub, setEmailPub] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace('/accesso'); return }
      setUtente(session.user)

      const { data: art } = await supabase
        .from('artisti')
        .select()
        .eq('user_id', session.user.id)
        .single()

      if (art) setArtista(art)
      setLoading(false)
    })
  }, [router])

  useEffect(() => {
    if (artista) {
      setNome(artista.nome ?? '')
      setDisciplina(artista.disciplina ?? '')
      setCitta(artista.citta ?? '')
      setBio(artista.bio ?? '')
      setCerca(artista.cerca ?? [])
      setEmailPub(artista.email ?? '')
    }
  }, [artista])

  const toggleCerca = (v) =>
    setCerca((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])

  const salva = async (e) => {
    e.preventDefault()
    setErrore('')
    setSalvato(false)

    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    if (!user) return

    const payload = { nome, disciplina, citta, bio, cerca, email: emailPub }

    if (artista) {
      const { error } = await supabase.from('artisti').update(payload).eq('user_id', user.id)
      if (error) { setErrore(error.message); return }
      setArtista({ ...artista, ...payload })
    } else {
      const slug = nome.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const { data: nuovo, error } = await supabase
        .from('artisti')
        .insert({ ...payload, slug, user_id: user.id })
        .select()
        .single()
      if (error) { setErrore(error.message); return }
      setArtista(nuovo)
    }

    setSalvato(true)
    setTimeout(() => setSalvato(false), 3000)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  if (loading) return (
    <main style={{ background: '#0a0806', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-grotesk)', color: 'rgba(242,231,211,0.4)' }}>...</span>
    </main>
  )

  const tipo = utente?.user_metadata?.tipo?.toLowerCase()

  if (tipo !== 'artista') return (
    <main style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <p style={{ fontFamily: 'var(--font-grotesk)' }}>Area riservata agli artisti.</p>
      <Link href="/accesso" style={{ fontFamily: 'var(--font-grotesk)', color: '#E8843C', textDecoration: 'none', fontSize: '0.9rem' }}>
        Vai all&apos;accesso &rarr;
      </Link>
    </main>
  )

  return (
    <main style={{ background: '#0a0806', color: '#F2E7D3', minHeight: '100vh', display: 'flex' }}>

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
          MARRANGI&Oacute;
        </span>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[['profilo', 'Il mio profilo'], ['cerca', 'Cerca collaborazioni']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setSezione(key); setErrore(''); setSalvato(false) }}
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

      <section style={{ flex: 1, padding: '2rem 2.5rem' }}>

        {sezione === 'profilo' && (
          <>
            <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '1.5rem' }}>
              il mio profilo
            </p>
            <form onSubmit={salva} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '28rem' }}>
              <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required style={inputStyle} />

              <div>
                <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>Disciplina</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {DISCIPLINE.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDisciplina(d)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '2rem',
                        border: `1px solid ${disciplina === d ? '#E8843C' : 'rgba(255,255,255,0.2)'}`,
                        background: disciplina === d ? 'rgba(232,132,60,0.15)' : 'transparent',
                        color: disciplina === d ? '#E8843C' : '#F2E7D3',
                        fontFamily: 'var(--font-grotesk)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <input type="text" placeholder="Citt&agrave;" value={citta} onChange={(e) => setCitta(e.target.value)} style={inputStyle} />

              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />

              <div>
                <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>Cosa cerca</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {CERCA.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => toggleCerca(v)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '2rem',
                        border: `1px solid ${cerca.includes(v) ? '#E8843C' : 'rgba(255,255,255,0.2)'}`,
                        background: cerca.includes(v) ? 'rgba(232,132,60,0.15)' : 'transparent',
                        color: cerca.includes(v) ? '#E8843C' : '#F2E7D3',
                        fontFamily: 'var(--font-grotesk)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <input type="email" placeholder="Email pubblica" value={emailPub} onChange={(e) => setEmailPub(e.target.value)} style={inputStyle} />

              {errore && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: 0 }}>{errore}</p>}
              {salvato && <p style={{ color: '#4ade80', fontSize: '0.85rem', margin: 0, fontFamily: 'var(--font-grotesk)' }}>Salvato!</p>}

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
                Salva
              </button>
            </form>
          </>
        )}

        {sezione === 'cerca' && (
          <p style={{ fontFamily: 'var(--font-grotesk)', opacity: 0.4, fontSize: '0.9rem' }}>
            Prossimamente &mdash; esplora artisti e collabora.
          </p>
        )}

      </section>
    </main>
  )
}
