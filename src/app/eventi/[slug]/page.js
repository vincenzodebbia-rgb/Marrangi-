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
  const { data: ev } = await getClient().from('eventi').select('titolo, luogo, data').eq('slug', slug).single()
  if (!ev) return {}
  return { title: `${ev.titolo} — Marrangió`, description: `${ev.luogo ?? ''} · ${ev.data ?? ''}` }
}

export default async function EventoPage({ params }) {
  const { slug } = await params
  const { data: ev } = await getClient().from('eventi').select('*, associazioni(nome, slug)').eq('slug', slug).single()
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

        {(ev.data || ev.ora) && (
          <p
            style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.9rem', color: '#F2E7D3', opacity: 0.7, marginBottom: '0.5rem' }}
          >
            {[ev.data, ev.ora].filter(Boolean).join(' · ')}
          </p>
        )}

        {ev.luogo && (
          <p
            style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.9rem', marginBottom: '2.5rem' }}
          >
            📍 {ev.luogo}
          </p>
        )}

        {ev.associazioni && (
          <div
            style={{ borderTop: '1px solid rgba(242,231,211,0.1)', paddingTop: '1.5rem' }}
          >
            <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '0.5rem' }}>
              Organizzato da
            </p>
            <Link
              href={`/associazioni/${ev.associazioni.slug}`}
              style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, color: '#E8843C', textDecoration: 'none', fontSize: '1rem' }}
            >
              {ev.associazioni.nome}
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}
