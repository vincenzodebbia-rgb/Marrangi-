'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [isDay, setIsDay] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

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
        href="/chi-sei"
        className="mt-2 font-caveat text-sm transition-colors duration-700"
        style={{ color: isDay ? 'rgba(42,18,6,0.40)' : 'rgba(242,231,211,0.40)' }}
      >
        prima, scopri cos&apos;è
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
