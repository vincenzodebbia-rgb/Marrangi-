import Link from 'next/link'
import { notFound } from 'next/navigation'

const eventi = [
  {
    slug: 'concerto-aperto-maggio',
    titolo: 'Concerto Aperto — Maggio in Piazza',
    data: '24 maggio 2025',
    ora: '21:00',
    luogo: 'Piazza del Duomo, Lucera',
    associazione: 'Officina Creativa',
    associazione_slug: 'officina-creativa',
  },
  {
    slug: 'laboratorio-teatro-giugno',
    titolo: 'Laboratorio di Teatro Fisico',
    data: '7 giugno 2025',
    ora: '18:30',
    luogo: 'Via Roma 14, Lucera',
    associazione: 'Teatro del Popolo',
    associazione_slug: 'teatro-del-popolo',
  },
  {
    slug: 'showcase-emergenti-luglio',
    titolo: 'Showcase Artisti Emergenti',
    data: '12 luglio 2025',
    ora: '20:00',
    luogo: 'Cortile Ariston, Foggia',
    associazione: 'Suoni dal Basso',
    associazione_slug: 'suoni-dal-basso',
  },
]

export async function generateMetadata({ params }) {
  const ev = eventi.find((x) => x.slug === params.slug)
  if (!ev) return {}
  return { title: `${ev.titolo} — Marrangió`, description: `${ev.luogo} · ${ev.data}` }
}

export default function EventoPage({ params }) {
  const ev = eventi.find((x) => x.slug === params.slug)
  if (!ev) notFound()

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
          style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', lineHeight: 1.2, marginBottom: '1rem' }}
        >
          {ev.titolo}
        </h1>

        <p
          style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.9rem', color: '#F2E7D3', opacity: 0.7, marginBottom: '0.5rem' }}
        >
          {ev.data} · {ev.ora}
        </p>

        <p
          style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.9rem', marginBottom: '2.5rem' }}
        >
          📍 {ev.luogo}
        </p>

        <div
          style={{ borderTop: '1px solid rgba(242,231,211,0.1)', paddingTop: '1.5rem' }}
        >
          <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '0.5rem' }}>
            Organizzato da
          </p>
          <Link
            href={`/associazioni/${ev.associazione_slug}`}
            style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, color: '#E8843C', textDecoration: 'none', fontSize: '1rem' }}
          >
            {ev.associazione}
          </Link>
        </div>

      </div>
    </main>
  )
}
