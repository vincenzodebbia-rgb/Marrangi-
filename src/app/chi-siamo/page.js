import Link from 'next/link'

export const metadata = {
  title: 'Chi siamo — Marrangió',
}

export default function ChiSiamo() {
  return (
    <main
      style={{
        background: '#0a0806',
        color: '#F2E7D3',
        minHeight: '100vh',
        padding: '2.5rem 1.5rem 4rem',
      }}
    >
      <div style={{ maxWidth: '42rem', margin: '0 auto' }}>

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: '1.25rem',
            color: '#F2E7D3',
            opacity: 0.5,
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '3rem',
          }}
        >
          ←
        </Link>

        <h1
          style={{
            fontFamily: 'var(--font-unbounded)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '2rem',
          }}
        >
          Sotto la tua città c&apos;è un&apos;altra città.<br />
          Viva. Nascosta.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: '0.875rem',
            color: 'rgba(242,231,211,0.6)',
            borderBottom: '1px solid rgba(242,231,211,0.2)',
            paddingBottom: '2rem',
            marginBottom: '2rem',
            lineHeight: 1.7,
          }}
        >
          Marrangió è la mappa delle associazioni culturali, degli spazi e di chi costruisce nella tua città — tutto visibile allo stesso modo, senza che nessuno paghi per esistere più degli altri.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}
        >
          Ci sono associazioni che lavorano da vent&apos;anni in un seminterrato. Spazi che aprono ogni giovedì senza un euro di pubblicità. Artisti che costruiscono qualcosa di reale mentre nessuno guarda. Persone che tengono in piedi un quartiere intero con le proprie mani — spesso senza che nessuno lo sappia.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 700,
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}
        >
          Queste persone sono il quartiere che vive.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}
        >
          E poi ci sono quelli che cercano. Che escono la sera e non trovano niente che valga davvero. Che vorrebbero qualcosa di vivo e vicino ma non sanno dove guardare. Che seguono influencer pagati per pubblicizzare eventi e tornano a casa con la sensazione di aver speso soldi per niente.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}
        >
          Marrangió è il posto in cui questi due mondi si incontrano. Una mappa. Più siete, più il quartiere esiste. Più vi connettete, più la città cambia. Non dall&apos;alto. Dal basso. Da un seminterrato, da uno spazio piccolo.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}
        >
          Non chiamiamola cultura. Parliamo di gente che fa cose. A volte bellissime, a volte no. Ma vere.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            lineHeight: 1.8,
            marginBottom: '3rem',
          }}
        >
          Niente algoritmi. Niente pubblicità. Solo una mappa viva — che cresce ogni volta che qualcuno decide di entrarci. Questa piazza diventa grande solo se ci entrate voi.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-unbounded)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 900,
            borderTop: '1px solid rgba(242,231,211,0.2)',
            paddingTop: '2rem',
            marginTop: '2rem',
          }}
        >
          Vedetevi.
        </p>

      </div>
    </main>
  )
}
