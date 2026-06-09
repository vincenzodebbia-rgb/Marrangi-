import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Mappa from './pages/Mappa'
import EventoPage from './pages/EventoPage'
import AssociazionePage from './pages/AssociazionePage'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ArtistaProfilo from './pages/ArtistaProfilo'
import Artisti from './pages/Artisti'
import { useAuth } from './hooks/useAuth'
import { supabase } from './lib/supabase'

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

function Navbar({ dark, onToggle, user, onLogout }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-4 border-b backdrop-blur-sm transition-colors duration-300 ${
      dark ? 'bg-dark/90 border-night-border' : 'bg-cream/90 border-gray-200'
    }`}>
      <div className="flex items-center gap-4">
        <Link
          to="/mappa"
          className={`font-sans text-sm transition-colors ${
            dark ? 'text-cream/60 hover:text-cream' : 'text-dark/60 hover:text-dark'
          }`}
        >
          Mappa
        </Link>
        <Link
          to="/artisti"
          className={`font-sans text-sm transition-colors ${
            dark ? 'text-cream/60 hover:text-cream' : 'text-dark/60 hover:text-dark'
          }`}
        >
          Artisti
        </Link>
        {user ? (
          <div className="flex items-center gap-3">
            {user.user_metadata?.tipo === 'associazione' && (
              <Link
                to="/dashboard"
                className={`font-sans text-sm transition-colors ${
                  dark ? 'text-cream/60 hover:text-cream' : 'text-dark/60 hover:text-dark'
                }`}
              >
                Dashboard
              </Link>
            )}
            <span className={`font-sans text-sm ${dark ? 'text-cream/60' : 'text-dark/60'}`}>
              Ciao, {user.user_metadata?.nome || user.email.split('@')[0]}
            </span>
            <button
              onClick={onLogout}
              className={`font-sans text-sm transition-colors ${
                dark ? 'text-cream/40 hover:text-coral' : 'text-dark/40 hover:text-coral'
              }`}
            >
              Esci
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className={`font-sans text-sm transition-colors ${
              dark ? 'text-cream/60 hover:text-cream' : 'text-dark/60 hover:text-dark'
            }`}
          >
            Accedi
          </Link>
        )}
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
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt="Marrangió" style={{ height: '160px', marginRight: '16px' }} />
        <span
          className="font-unbounded bg-gradient-to-r from-coral to-gold bg-clip-text text-transparent text-5xl md:text-7xl select-none leading-none"
          style={{ fontWeight: 900 }}
        >
          MARRANGIÓ
        </span>
      </div>
      <p className={`font-syne text-2xl mt-4 ${dark ? 'text-cream' : 'text-dark'}`}>
        Il barrio che vive.
      </p>
      <p className={`font-sans text-lg ${dark ? 'text-cream/40' : 'text-dark/40'}`}>
        Tu barrio vive.
      </p>
      <p className={`font-syne font-bold text-xl mt-6 ${dark ? 'text-cream' : 'text-dark'}`}>
        Il tuo puntino sulla mappa.
      </p>
      <p className={`font-sans text-base max-w-lg leading-relaxed ${dark ? 'text-cream/50' : 'text-dark/50'}`}>
        Quello che dice che esisti. Quello che dice che il tuo quartiere è vivo.
      </p>
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

const TRE_PORTE = [
  {
    label: 'VUOI PARTECIPARE',
    desc: 'Sei curioso, vuoi scoprire cosa succede intorno a te.',
    headline: "Esci. Vedi cosa c'è. Se non ti va, torna a casa. Almeno lo sai.",
    body: "Nessun influencer pagato per dirti che vale la pena. Nessun algoritmo che decide cosa devi volere. Niente fomo da gestire. Spazi vivi, eventi veri, angoli nascosti a due passi da casa tua. Non promettiamo serate indimenticabili. A volte esci e torni a casa prima. Ma l'hai scelto tu. E se anche la serata non era granché, hai sostenuto qualcuno nel tuo quartiere. Qualcuno che ci crede davvero.",
  },
  {
    label: 'CHI COSTRUISCE',
    desc: "Hai un'idea, un progetto, una competenza. Vuoi costruire qualcosa o trovare chi ti permette di farlo.",
    headline: 'Hai qualcosa da dare. Nessuno sa ancora dove trovarti.',
    body: 'Ci sono associazioni che cercano qualcuno come te. Spazi che hanno bisogno di quello che sai fare. Progetti che aspettano solo le persone giuste per esistere. Senza di te gli spazi restano vuoti. I progetti restano idee. Adesso chi ha bisogno di quello che fai può trovarti.',
  },
  {
    label: "SEI UN'ASSOCIAZIONE",
    desc: 'Lavori nel culturale, gestisci uno spazio, organizzi eventi.',
    headline: 'Lavori, crei, resisti. Ma sei invisibile.',
    body: "Volontari esauriti, burocrazia infinita, nessun budget per esistere online. Hai costruito qualcosa di vero — e nessuno lo sa. Qui il tuo puntino sulla mappa dice che ci sei, cosa fai, dove sei. Gratis. Sempre. Trovi chi cerca quello che fai, professionisti che vogliono fare parte di qualcosa di vero, realtà come la tua. Non ti chiediamo niente. Ti diamo solo lo spazio per dire che esisti.",
  },
]

function TrePorte({ dark }) {
  return (
    <section className={`py-16 border-t ${dark ? 'border-night-border' : 'border-dark/10'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRE_PORTE.map(({ label, desc, headline, body }) => (
            <div key={label} className={`rounded-2xl p-6 border ${dark ? 'bg-night-card border-night-border' : 'bg-white border-dark/10'}`}>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-coral mb-2">{label}</p>
              <p className={`font-sans text-xs italic mb-4 ${dark ? 'text-cream/40' : 'text-dark/40'}`}>{desc}</p>
              <h3 className={`font-playfair italic text-lg mb-4 leading-snug ${dark ? 'text-cream' : 'text-dark'}`}>{headline}</h3>
              <p className={`font-sans text-sm leading-relaxed ${dark ? 'text-cream/50' : 'text-dark/50'}`}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Manifesto({ dark }) {
  return (
    <section className={`py-20 border-t ${dark ? 'border-night-border' : 'border-dark/10'}`}>
      <div className="max-w-2xl mx-auto px-6">
        <p className={`font-playfair italic text-3xl md:text-4xl leading-snug mb-6 whitespace-pre-line ${dark ? 'text-cream' : 'text-dark'}`}>
          {"Sotto la tua città c'è un'altra città.\nViva. Nascosta."}
        </p>
        <p className={`font-sans font-light text-sm leading-relaxed pb-8 mb-8 border-b ${
          dark ? 'text-cream/40 border-night-border' : 'text-dark/40 border-dark/10'
        }`}>
          Marrangió è la mappa delle associazioni culturali, degli spazi e di chi costruisce nella tua città — tutto visibile allo stesso modo, senza che nessuno paghi per esistere più degli altri.
        </p>
        <p className={`font-sans text-base leading-relaxed mb-6 ${dark ? 'text-cream/60' : 'text-dark/60'}`}>
          Ci sono associazioni che lavorano da vent'anni in un seminterrato. Spazi che aprono ogni giovedì senza un euro di pubblicità. Artisti che costruiscono qualcosa di reale mentre nessuno guarda. Persone che tengono in piedi un quartiere intero con le proprie mani — spesso senza che nessuno lo sappia.
        </p>
        <p className={`font-sans text-base font-bold leading-relaxed mb-6 ${dark ? 'text-cream' : 'text-dark'}`}>
          Queste persone sono il quartiere che vive.
        </p>
        <p className={`font-sans text-base leading-relaxed mb-6 ${dark ? 'text-cream/60' : 'text-dark/60'}`}>
          E poi ci sono quelli che cercano. Che escono la sera e non trovano niente che valga davvero. Che vorrebbero qualcosa di vivo e vicino ma non sanno dove guardare. Che seguono influencer pagati per pubblicizzare eventi e tornano a casa con la sensazione di aver speso soldi per niente.
        </p>
        <p className={`font-sans text-base leading-relaxed mb-6 ${dark ? 'text-cream/60' : 'text-dark/60'}`}>
          Marrangió è il posto in cui questi due mondi si incontrano. Una mappa. Più siete, più il quartiere esiste. Più vi connettete, più la città cambia. Non dall'alto. Dal basso. Da un seminterrato, da uno spazio piccolo.
        </p>
        <p className={`font-sans text-base leading-relaxed mb-6 ${dark ? 'text-cream/60' : 'text-dark/60'}`}>
          Non chiamiamola cultura. Parliamo di gente che fa cose. A volte bellissime, a volte no. Ma vere.
        </p>
        <p className={`font-sans text-base leading-relaxed mb-12 ${dark ? 'text-cream/60' : 'text-dark/60'}`}>
          Niente algoritmi. Niente pubblicità. Solo una mappa viva — che cresce ogni volta che qualcuno decide di entrarci. Questa piazza diventa grande solo se ci entrate voi.
        </p>
        <p className={`font-playfair italic text-3xl md:text-4xl pt-10 border-t ${dark ? 'text-cream border-night-border' : 'text-dark border-dark/10'}`}>
          Vedetevi.
        </p>
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

function HomePage({ dark, onToggle, user, onLogout }) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-dark text-cream' : 'bg-cream text-dark'}`}>
      <Navbar dark={dark} onToggle={onToggle} user={user} onLogout={onLogout} />
      <Hero dark={dark} />
      <EventsRow dark={dark} />
      <TrePorte dark={dark} />
      <Manifesto dark={dark} />
      <Footer dark={dark} />
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage dark={dark} onToggle={() => setDark(d => !d)} user={user} onLogout={handleLogout} />} />
      <Route path="/mappa" element={<Mappa dark={dark} onToggle={() => setDark(d => !d)} />} />
      <Route path="/eventi/:id" element={<EventoPage />} />
      <Route path="/associazioni/:slug" element={<AssociazionePage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/artisti" element={<Artisti />} />
      <Route path="/artisti/:slug" element={<ArtistaProfilo />} />
    </Routes>
  )
}
