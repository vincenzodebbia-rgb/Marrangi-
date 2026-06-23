'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const TIPI = ['Utente', 'Associazione', 'Artista']
const TIPO_ROUTE = { Utente: '/chi-sei/utente', Associazione: '/chi-sei/associazione', Artista: '/chi-sei/artista' }

const inputStyle = {
  width: '100%',
  background: 'rgba(242,231,211,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  color: '#F2E7D3',
  fontFamily: 'var(--font-grotesk)',
  fontSize: '1rem',
  outline: 'none',
}

const btnPrimary = {
  width: '100%',
  background: '#E8843C',
  color: '#0a0806',
  border: 'none',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-grotesk)',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '0.5rem',
}

const loading_style = { background: '#0a0806', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(242,231,211,0.4)', fontFamily: 'var(--font-grotesk)' }

export default function Accesso() {
  const router = useRouter()
  const [tab, setTab] = useState('accedi')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('Utente')
  const [errore, setErrore] = useState('')
  const [loading, setLoading] = useState(false)

  if (!supabase) return <main style={loading_style}>Configurazione in corso...</main>

  const accedi = async (e) => {
    e.preventDefault()
    setErrore('')
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setErrore(error.message); return }
    const tipo = data.user?.user_metadata?.tipo?.toLowerCase()
    router.push(tipo === 'associazione' ? '/dashboard' : '/mappa')
  }

  const registrati = async (e) => {
    e.preventDefault()
    setErrore('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome, tipo } },
    })
    setLoading(false)
    if (error) { setErrore(error.message); return }
    router.push(TIPO_ROUTE[tipo])
  }

  return (
    <main
      style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3', position: 'relative' }}
      className="flex flex-col items-center justify-center px-6 py-8"
    >
      <Link
        href="/"
        style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontFamily: 'var(--font-grotesk)', fontSize: '1.25rem', color: '#F2E7D3', opacity: 0.5, textDecoration: 'none' }}
      >
        ←
      </Link>

      <div style={{ width: '100%', maxWidth: '22rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* tabs */}
        <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-grotesk)', fontSize: '0.95rem' }}>
          {['accedi', 'crea'].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setErrore('') }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 0 0.4rem',
                fontFamily: 'var(--font-grotesk)',
                fontSize: '0.95rem',
                color: tab === t ? '#F2E7D3' : 'rgba(242,231,211,0.4)',
                borderBottom: tab === t ? '2px solid #E8843C' : '2px solid transparent',
                transition: 'color 0.15s',
              }}
            >
              {t === 'accedi' ? 'Accedi' : 'Crea account'}
            </button>
          ))}
        </div>

        {tab === 'accedi' ? (
          <form onSubmit={accedi} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            {errore && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: 0 }}>{errore}</p>}
            <button type="submit" disabled={loading} style={btnPrimary}>
              {loading ? '...' : 'Entra'}
            </button>
          </form>
        ) : (
          <form onSubmit={registrati} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {TIPI.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.25rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${tipo === t ? '#E8843C' : 'rgba(255,255,255,0.2)'}`,
                    background: 'transparent',
                    color: tipo === t ? '#E8843C' : '#F2E7D3',
                    fontFamily: 'var(--font-grotesk)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {errore && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: 0 }}>{errore}</p>}
            <button type="submit" disabled={loading} style={btnPrimary}>
              {loading ? '...' : 'Registrati'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
