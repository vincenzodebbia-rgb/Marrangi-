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
  const { data: art } = await getClient().from('artisti').select('nome, bio, disciplina').eq('slug', slug).single()
  if (!art) return {}
  return { title: `${art.nome} — Marrangió`, description: art.bio ?? art.disciplina ?? '' }
}

export default async function ArtistaPage({ params }) {
  const { slug } = await params
  const { data: art } = await getClient().from('artisti').select().eq('slug', slug).single()
  if (!art) notFound()

  return (
    <main style={{ background: '#0a0806', color: '#F2E7D3', minHeight: '100vh', padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto' }}>

        <Link
          href="/"
          style={{ fontFamily: 'var(--font-grotesk)', fontSize: '1.25rem', color: '#F2E7D3', opacity: 0.5, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}
        >
          ←
        </Link>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <h1 style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', lineHeight: 1.2, margin: 0 }}>
            {art.nome}
          </h1>
          {art.disciplina && (
            <span style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: '0.75rem',
              color: '#E8843C',
              border: '1px solid #E8843C',
              borderRadius: '2rem',
              padding: '0.25rem 0.75rem',
              whiteSpace: 'nowrap',
              alignSelf: 'center',
            }}>
              {art.disciplina}
            </span>
          )}
        </div>

        {art.citta && (
          <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.5rem' }}>
            {art.citta}
          </p>
        )}

        {art.bio && (
          <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, lineHeight: 1.8, marginBottom: '2rem' }}>
            {art.bio}
          </p>
        )}

        {art.cerco && art.cerco.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '0.75rem' }}>
              Cerca
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {art.cerco.map((v) => (
                <span key={v} style={{
                  fontFamily: 'var(--font-grotesk)',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(242,231,211,0.25)',
                  borderRadius: '2rem',
                  padding: '0.25rem 0.75rem',
                  opacity: 0.8,
                }}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {art.email && (
          <div style={{ borderTop: '1px solid rgba(242,231,211,0.1)', paddingTop: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '0.5rem' }}>
              Contatto
            </p>
            <a
              href={`mailto:${art.email}`}
              style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, color: '#E8843C', textDecoration: 'none', fontSize: '1rem' }}
            >
              {art.email}
            </a>
          </div>
        )}

      </div>
    </main>
  )
}
