'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [isDay, setIsDay] = useState(false)

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center transition-all duration-700"
      style={{
        background: isDay
          ? 'linear-gradient(160deg, #5BB8D4, #F2E7D3)'
          : 'var(--nero)',
      }}
    >
      <button
        onClick={() => setIsDay(!isDay)}
        className="cursor-pointer focus:outline-none"
        aria-label="Cambia modalità"
      >
        <Image
          src="/logo.png"
          alt="Marrangio"
          height={180}
          width={180}
          className="animate-float object-contain"
          style={{ height: '180px', width: 'auto' }}
          priority
        />
      </button>

      <Link
        href="/mappa"
        className="mt-6 font-caveat font-bold text-2xl transition-colors duration-700"
        style={{ color: isDay ? '#2a1206' : 'var(--crema)' }}
      >
        scopri la mappa
      </Link>

      <Link
        href="/accesso"
        className="absolute bottom-6 right-6 font-grotesk text-sm transition-colors duration-700"
        style={{ color: isDay ? 'rgba(10,8,6,0.60)' : 'rgba(242,231,211,0.60)' }}
      >
        sei un&apos;associazione?
      </Link>
    </main>
  )
}
