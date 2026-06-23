import Link from 'next/link'

export const metadata = { title: 'Associazione — Marrangió' }

export default function Associazione() {
  return (
    <main style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3', padding: '2rem 1.5rem', position: 'relative' }}>
      <Link href="/chi-sei" style={{ fontFamily: 'var(--font-grotesk)', fontSize: '1.25rem', color: '#F2E7D3', opacity: 0.5, textDecoration: 'none' }}>
        ←
      </Link>
      <h1 style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: '2rem', marginTop: '2rem' }}>
        Associazione
      </h1>
    </main>
  )
}
