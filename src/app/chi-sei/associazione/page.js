import Link from 'next/link'

export const metadata = { title: 'Associazione — Marrangió' }

export default function Associazione() {
  return (
    <main style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3', padding: '2.5rem 1.5rem 4rem', position: 'relative' }}>
      <div style={{ maxWidth: '36rem', margin: '0 auto' }}>

        <Link href="/chi-sei" style={{ fontFamily: 'var(--font-grotesk)', fontSize: '1.25rem', color: '#F2E7D3', opacity: 0.5, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
          ←
        </Link>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#E8843C', marginBottom: '0.75rem' }}>
          SEI UN&apos;ASSOCIAZIONE
        </p>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.875rem', fontStyle: 'italic', color: 'rgba(242,231,211,0.5)', marginBottom: '1.5rem' }}>
          Lavori nel culturale, gestisci uno spazio, organizzi eventi.
        </p>

        <h1 style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 1.875rem)', lineHeight: 1.25, color: '#F2E7D3', marginBottom: '2rem' }}>
          Lavori, crei, resisti. Ma sei invisibile.
        </h1>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, lineHeight: 1.8, color: 'rgba(242,231,211,0.8)', marginBottom: '2.5rem' }}>
          Volontari esauriti, burocrazia infinita, nessun budget per esistere online. Hai costruito qualcosa di vero — e nessuno lo sa. Qui il tuo puntino sulla mappa dice che ci sei, cosa fai, dove sei. Gratis. Sempre. Trovi chi cerca quello che fai, professionisti che vogliono fare parte di qualcosa di vero, realtà come la tua. Non ti chiediamo niente. Ti diamo solo lo spazio per dire che esisti.
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
