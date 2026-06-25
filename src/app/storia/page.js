import Link from 'next/link'

export default function Storia() {
  return (
    <main style={{
      background: '#0a0806',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F2E7D3',
    }}>
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'var(--font-grotesk)',
          color: 'rgba(242,231,211,0.5)',
          textDecoration: 'none',
          fontSize: '1.25rem',
        }}
      >
        ←
      </Link>

      <p style={{
        fontFamily: 'var(--font-unbounded)',
        fontSize: '3rem',
        fontWeight: 700,
        margin: 0,
      }}>
        Presto.
      </p>
    </main>
  )
}
