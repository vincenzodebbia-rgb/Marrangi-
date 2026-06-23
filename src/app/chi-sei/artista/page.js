import Link from 'next/link'

export const metadata = { title: 'Artista / Professionista — Marrangió' }

export default function Artista() {
  return (
    <main style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3', padding: '2.5rem 1.5rem 4rem', position: 'relative' }}>
      <div style={{ maxWidth: '36rem', margin: '0 auto' }}>

        <Link href="/chi-sei" style={{ fontFamily: 'var(--font-grotesk)', fontSize: '1.25rem', color: '#F2E7D3', opacity: 0.5, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
          ←
        </Link>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#E8843C', marginBottom: '0.75rem' }}>
          CHI COSTRUISCE
        </p>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.875rem', fontStyle: 'italic', color: 'rgba(242,231,211,0.5)', marginBottom: '1.5rem' }}>
          Hai un&apos;idea, un progetto, una competenza. Vuoi costruire qualcosa o trovare chi ti permette di farlo.
        </p>

        <h1 style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 1.875rem)', lineHeight: 1.25, color: '#F2E7D3', marginBottom: '2rem' }}>
          Hai qualcosa da dare. Nessuno sa ancora dove trovarti.
        </h1>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, lineHeight: 1.8, color: 'rgba(242,231,211,0.8)', marginBottom: '2.5rem' }}>
          Ci sono associazioni che cercano qualcuno come te. Spazi che hanno bisogno di quello che sai fare. Progetti che aspettano solo le persone giuste per esistere. Senza di te gli spazi restano vuoti. I progetti restano idee. Adesso chi ha bisogno di quello che fai può trovarti.
        </p>

        <Link
          href="/accesso"
          style={{ display: 'inline-block', background: '#E8843C', color: '#fff', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: '0.95rem', padding: '0.75rem 1.75rem', borderRadius: '9999px', textDecoration: 'none' }}
        >
          Registrati
        </Link>

      </div>
    </main>
  )
}
