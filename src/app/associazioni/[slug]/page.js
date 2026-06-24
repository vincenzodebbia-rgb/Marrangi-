import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data: a } = await getClient().from('associazioni').select('nome, descrizione').eq('slug', slug).single()
  if (!a) return {}
  return { title: `${a.nome} — Marrangió`, description: a.descrizione }
}

export default async function AssociazionePage({ params }) {
  const { slug } = await params
  const { data: a } = await getClient().from('associazioni').select('*, eventi(*)').eq('slug', slug).single()
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

        {a.citta && (
          <span
            style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.8rem', color: '#F2E7D3', opacity: 0.5, display: 'inline-block', marginBottom: '2rem' }}
          >
            {a.citta}
          </span>
        )}

        {a.descrizione && (
          <p
            style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, lineHeight: 1.8, marginBottom: '3rem' }}
          >
            {a.descrizione}
          </p>
        )}

        <section>
          <h2
            style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '1rem' }}
          >
            Prossimi eventi
          </h2>
          {!a.eventi || a.eventi.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, opacity: 0.4, fontSize: '0.9rem' }}>
              Nessun evento in programma
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {a.eventi.map((ev) => (
                <li key={ev.id}>
                  <Link
                    href={`/eventi/${ev.slug}`}
                    style={{ fontFamily: 'var(--font-grotesk)', color: '#F2E7D3', textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    {ev.titolo}
                    {ev.data && <span style={{ opacity: 0.5, marginLeft: '0.75rem', fontSize: '0.8rem' }}>{ev.data}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}
