import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const TIPI_ACCOUNT = ['utente', 'associazione', 'artista']

const inputClass = 'w-full bg-[#0d0d0d] border border-night-border rounded-lg px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-coral transition-colors'
const labelClass = 'block font-sans text-xs uppercase tracking-widest text-cream/40 mb-2'

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('utente')

  const isSignup = mode === 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isSignup) {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { nome, tipo } },
        })
        if (err) throw err
        navigate('/')
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark text-cream flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-night-border bg-dark/90 backdrop-blur-sm">
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

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Toggle */}
          <div className="flex rounded-xl border border-night-border mb-8 overflow-hidden">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null) }}
                className={`flex-1 py-2.5 font-sans text-sm font-semibold transition-colors ${
                  mode === m ? 'bg-coral text-cream' : 'text-cream/40 hover:text-cream/70'
                }`}
              >
                {m === 'login' ? 'Accedi' : 'Registrati'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {isSignup && (
              <div>
                <label className={labelClass}>Nome</label>
                <input
                  type="text"
                  placeholder="Il tuo nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                placeholder="email@esempio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                placeholder="Minimo 6 caratteri"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={inputClass}
              />
            </div>

            {isSignup && (
              <div>
                <label className={labelClass}>Tipo account</label>
                <div className="flex gap-2">
                  {TIPI_ACCOUNT.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTipo(t)}
                      className={`flex-1 py-2 rounded-lg border font-sans text-xs font-semibold capitalize transition-all ${
                        tipo === t
                          ? 'bg-coral/20 border-coral/60 text-coral'
                          : 'border-night-border text-cream/40 hover:text-cream/60'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="font-sans text-sm text-coral/90 bg-coral/10 border border-coral/20 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-coral text-cream font-sans font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Caricamento...' : isSignup ? 'Crea account' : 'Accedi'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
