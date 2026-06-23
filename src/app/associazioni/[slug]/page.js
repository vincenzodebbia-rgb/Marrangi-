import Link from 'next/link'
import { notFound } from 'next/navigation'

const associazioni = [
  {
    slug: 'officina-creativa',
    nome: 'Officina Creativa',
    città: 'Lucera',
    descrizione: 'Spazio culturale indipendente nel centro storico. Laboratori, residenze artistiche e concerti dal vivo ogni weekend.',
    eventi: [],
  },
  {
    slug: 'teatro-del-popolo',
    nome: 'Teatro del Popolo',
    città: 'Lucera',
    descrizione: 'Associazione teatrale fondata nel 1987. Produzioni originali, rassegne e corsi di recitazione per tutte le età.',
    eventi: [],
  },
  {
    slug: 'suoni-dal-basso',
    nome: 'Suoni dal Basso',
    città: 'Foggia',
    descrizione: 'Collettivo musicale che promuove artisti emergenti del Sud Italia attraverso showcase, festival e pubblicazioni indipendenti.',
    eventi: [],
  },
]

export async function generateMetadata({ params }) {
  const a = associazioni.find((x) => x.slug === params.slug)
  if (!a) return {}
  return { title: `${a.nome} — Marrangió`, description: a.descrizione }
}

export default function AssociazionePage({ params }) {
  const a = associazioni.find((x) => x.slug === params.slug)
  if (!a) notFound()

  return (
    <main
      style={{ background: '#0a0806', color: '#F2E7D3', minHeight: '100vh', padding: '2.5rem 1.5rem 4rem' }}
    >
      <div style={{ maxWidth: '42rem', margin: '0 auto' }}>

        <Link
          href="/mappa"
          style={{ fontFamily: 'var(--font-grotesk)', fontSize: '1.25rem', color: '#F2E7D3', opacity: 0.5, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}
        >
          ←
        </Link>

        <h1
          style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', lineHeight: 1.2, marginBottom: '0.75rem' }}
        >
          {a.nome}
        </h1>

        <span
          style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.8rem', color: '#F2E7D3', opacity: 0.5, display: 'inline-block', marginBottom: '2rem' }}
        >
          {a.città}
        </span>

        <p
          style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, lineHeight: 1.8, marginBottom: '3rem' }}
        >
          {a.descrizione}
        </p>

        <section>
          <h2
            style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '1rem' }}
          >
            Prossimi eventi
          </h2>
          {a.eventi.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, opacity: 0.4, fontSize: '0.9rem' }}>
              Nessun evento in programma
            </p>
          ) : (
            <ul>
              {a.eventi.map((ev) => (
                <li key={ev.slug}>{ev.titolo}</li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}
