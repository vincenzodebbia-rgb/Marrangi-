import Link from 'next/link'

export const metadata = { title: 'Utente — Marrangió' }

export default function Utente() {
  return (
    <main style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3', padding: '2.5rem 1.5rem 4rem', position: 'relative' }}>
      <div style={{ maxWidth: '36rem', margin: '0 auto' }}>

        <Link href="/chi-sei" style={{ fontFamily: 'var(--font-grotesk)', fontSize: '1.25rem', color: '#F2E7D3', opacity: 0.5, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
          ←
        </Link>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#E8843C', marginBottom: '0.75rem' }}>
          VUOI PARTECIPARE
        </p>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontSize: '0.875rem', fontStyle: 'italic', color: 'rgba(242,231,211,0.5)', marginBottom: '1.5rem' }}>
          Sei curioso, vuoi scoprire cosa succede intorno a te.
        </p>

        <h1 style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 1.875rem)', lineHeight: 1.25, color: '#F2E7D3', marginBottom: '2rem' }}>
          Esci. Vedi cosa c&apos;è. Se non ti va, torna a casa. Almeno lo sai.
        </h1>

        <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 300, lineHeight: 1.8, color: 'rgba(242,231,211,0.8)', marginBottom: '2.5rem' }}>
          Nessun influencer pagato per dirti che vale la pena. Nessun algoritmo che decide cosa devi volere. Niente fomo da gestire. Spazi vivi, eventi veri, angoli nascosti a due passi da casa tua. Non promettiamo serate indimenticabili. A volte esci e torni a casa prima. Ma l&apos;hai scelto tu. E se anche la serata non era granché, hai sostenuto qualcuno nel tuo quartiere. Qualcuno che ci crede davvero.
        </p>

        <Link
          href="/mappa"
          style={{ display: 'inline-block', background: '#E8843C', color: '#fff', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: '0.95rem', padding: '0.75rem 1.75rem', borderRadius: '9999px', textDecoration: 'none' }}
        >
          Entra nella mappa
        </Link>

      </div>
    </main>
  )
}
