import Link from 'next/link'

export const metadata = { title: 'Chi sei — Marrangió' }

const cards = [
  { label: 'Utente', href: '/chi-sei/utente' },
  { label: 'Associazione', href: '/chi-sei/associazione' },
  { label: 'Artista / Professionista', href: '/chi-sei/artista' },
]

export default function ChiSei() {
  return (
    <main
      style={{ background: '#0a0806', minHeight: '100vh', color: '#F2E7D3' }}
      className="flex flex-col items-center justify-center px-6 py-8 relative"
    >
      <Link
        href="/"
        className="absolute top-6 left-6 font-grotesk text-xl"
        style={{ color: '#F2E7D3', opacity: 0.5, textDecoration: 'none' }}
      >
        ←
      </Link>

      <p
        className="font-grotesk text-sm uppercase tracking-widest mb-10"
        style={{ color: '#F2E7D3', opacity: 0.5 }}
      >
        chi sei?
      </p>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        {cards.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex-1 rounded-2xl border border-white/10 hover:border-[#E8843C] transition-colors duration-200 cursor-pointer font-unbounded text-xl"
            style={{ padding: '40px', color: '#F2E7D3', textDecoration: 'none' }}
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  )
}
