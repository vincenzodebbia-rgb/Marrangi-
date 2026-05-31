import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Mappa from './pages/Mappa'
import EventoPage from './pages/EventoPage'
import AssociazionePage from './pages/AssociazionePage'

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function Navbar({ dark, onToggle }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm transition-colors duration-300 ${
      dark ? 'bg-dark/90 border-night-border' : 'bg-cream/90 border-gray-200'
    }`}>
      <span
        className={`font-unbounded text-xl select-none ${
          dark
            ? 'bg-gradient-to-r from-[#FF3A0F] to-[#FFB300] bg-clip-text text-transparent'
            : 'text-[#D94F2B]'
        }`}
        style={{ fontWeight: 900, letterSpacing: '3px' }}
      >
        MARRANGIÓ
      </span>
      <div className="flex items-center gap-4">
        <Link
          to="/mappa"
          className={`font-sans text-sm transition-colors ${
            dark ? 'text-cream/60 hover:text-cream' : 'text-dark/60 hover:text-dark'
          }`}
        >
          Mappa
        </Link>
        <button
          onClick={onToggle}
          className={`p-2 rounded-full transition-colors ${
            dark ? 'text-cream/70 hover:text-gold' : 'text-dark/60 hover:text-coral'
          }`}
          aria-label="Cambia tema"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  )
}

function Hero({ dark }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
      <h1 className={`font-syne font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl ${
        dark ? 'text-cream' : 'text-dark'
      }`}>
        Fai cultura.{' '}
        <span className="bg-gradient-to-r from-coral via-gold to-cream bg-clip-text text-transparent">
          Al resto pensiamo noi.
        </span>
      </h1>
      <p className={`font-sans text-lg md:text-xl mb-10 max-w-xl leading-relaxed ${
        dark ? 'text-cream/60' : 'text-dark/60'
      }`}>
        Scopri eventi, mostre e spettacoli nella tua città. Prenota in un click.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/mappa"
          className="px-8 py-3 rounded-full bg-coral text-cream font-sans font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Vedi la mappa
        </Link>
        <a
          href="#chi-siamo"
          className={`px-8 py-3 rounded-full border font-sans font-semibold text-base transition-colors ${
            dark
              ? 'border-night-border text-cream hover:border-cream/50'
              : 'border-dark/25 text-dark hover:border-dark/60'
          }`}
        >
          Chi siamo
        </a>
      </div>
    </section>
  )
}

const STATS = [
  { value: '142', label: 'associazioni' },
  { value: '380+', label: 'eventi' },
  { value: '6', label: 'città' },
  { value: '0', label: 'algoritmi' },
]

function Stats({ dark }) {
  return (
    <section className={`py-16 border-t ${dark ? 'border-night-border' : 'border-dark/10'}`}>
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map(({ value, label }) => (
          <div key={label}>
            <p className={`font-syne font-bold text-4xl md:text-5xl mb-1 ${dark ? 'text-cream' : 'text-dark'}`}>
              {value}
            </p>
            <p className={`font-sans text-sm uppercase tracking-widest ${dark ? 'text-cream/50' : 'text-dark/50'}`}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

const BADGE_STYLES = {
  coral: 'bg-coral/20 text-coral',
  green: 'bg-green/20 text-green',
  gold: 'bg-gold/20 text-gold',
  orange: 'bg-orange-500/20 text-orange-400',
}

const MOCK_EVENTS = [
  { badge: 'coral', badgeLabel: 'Teatro' },
  { badge: 'green', badgeLabel: 'Mostra' },
  { badge: 'gold', badgeLabel: 'Musica' },
  { badge: 'orange', badgeLabel: 'Danza' },
]

function EventCard({ dark, badge, badgeLabel }) {
  return (
    <div className={`flex-shrink-0 w-64 rounded-2xl p-5 border transition-colors ${
      dark ? 'bg-night-card border-night-border' : 'bg-white border-dark/10'
    }`}>
      <span className={`inline-block text-xs font-sans font-semibold px-3 py-1 rounded-full mb-3 ${BADGE_STYLES[badge]}`}>
        {badgeLabel}
      </span>
      <h3 className={`font-syne font-bold text-base mb-1 ${dark ? 'text-cream' : 'text-dark'}`}>Testo</h3>
      <p className={`font-sans text-sm mb-3 ${dark ? 'text-cream/50' : 'text-dark/50'}`}>Testo</p>
      <div className={`flex items-center justify-between font-sans text-xs ${dark ? 'text-cream/40' : 'text-dark/40'}`}>
        <span>Testo</span>
        <span>Testo</span>
      </div>
    </div>
  )
}

function EventsRow({ dark }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className={`font-syne font-bold text-2xl md:text-3xl mb-8 ${dark ? 'text-cream' : 'text-dark'}`}>
          Adesso nella tua città
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {MOCK_EVENTS.map((ev, i) => (
            <EventCard key={i} dark={dark} badge={ev.badge} badgeLabel={ev.badgeLabel} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FOR_ALL = [
  { title: 'Associazioni' },
  { title: 'Artisti' },
  { title: 'Cittadini' },
]

function ForAll({ dark }) {
  return (
    <section className={`py-16 border-t ${dark ? 'border-night-border' : 'border-dark/10'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className={`font-syne font-bold text-2xl md:text-3xl mb-10 text-center ${dark ? 'text-cream' : 'text-dark'}`}>
          Marrangió è per tutti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FOR_ALL.map(({ title }) => (
            <div key={title} className={`rounded-2xl p-6 border ${dark ? 'bg-night-card border-night-border' : 'bg-white border-dark/10'}`}>
              <h3 className={`font-syne font-bold text-lg mb-3 ${dark ? 'text-cream' : 'text-dark'}`}>{title}</h3>
              <p className={`font-sans text-sm leading-relaxed ${dark ? 'text-cream/50' : 'text-dark/50'}`}>Testo</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer({ dark }) {
  return (
    <footer className={`border-t py-8 px-6 ${dark ? 'border-night-border' : 'border-dark/10'}`}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className={`font-sans text-sm ${dark ? 'text-cream/40' : 'text-dark/40'}`}>
          © 2026 Vincenzo De Biase — Marrangió
        </p>
        <div className="flex gap-6">
          {['GitHub', 'Privacy', 'Contatti'].map((label) => (
            <a
              key={label}
              href="#"
              className={`font-sans text-sm transition-colors ${
                dark ? 'text-cream/40 hover:text-cream' : 'text-dark/40 hover:text-dark'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

function HomePage({ dark, onToggle }) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-dark text-cream' : 'bg-cream text-dark'}`}>
      <Navbar dark={dark} onToggle={onToggle} />
      <Hero dark={dark} />
      <Stats dark={dark} />
      <EventsRow dark={dark} />
      <ForAll dark={dark} />
      <Footer dark={dark} />
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(true)

  return (
    <Routes>
      <Route path="/" element={<HomePage dark={dark} onToggle={() => setDark(d => !d)} />} />
      <Route path="/mappa" element={<Mappa dark={dark} onToggle={() => setDark(d => !d)} />} />
      <Route path="/eventi/:id" element={<EventoPage />} />
      <Route path="/associazioni/:slug" element={<AssociazionePage />} />
    </Routes>
  )
}
