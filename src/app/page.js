'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [isDay, setIsDay] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [clicks, setClicks] = useState(0)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const handleUmbrellaClick = () => {
    setClicks(prev => {
      const next = prev + 1
      if (next >= 5) {
        setTimeout(() => router.push('/storia'), 1000)
        return 5
      }
      return next
    })
  }

  const animMap = {
    1: 'wind1 2s ease-in-out infinite',
    2: 'wind2 1.5s ease-in-out infinite',
    3: 'wind3 1s ease-in-out infinite',
    4: 'wind4 0.6s ease-in-out infinite',
    5: 'flyaway 1s forwards',
  }

  const umbrellaStyle = {
    height: '180px',
    width: 'auto',
    transformOrigin: 'bottom center',
    ...(clicks > 0 ? { animation: animMap[clicks] } : {}),
  }

  const windStyles = `
    @keyframes wind1 { 0%,100%{transform:rotate(-3deg) translateY(-6px)} 50%{transform:rotate(3deg) translateY(6px)} }
    @keyframes wind2 { 0%,100%{transform:rotate(-6deg) translateY(-8px)} 50%{transform:rotate(8deg) translateY(8px)} }
    @keyframes wind3 { 0%,100%{transform:rotate(-10deg) translateY(-10px)} 50%{transform:rotate(14deg) translateY(10px)} }
    @keyframes wind4 { 0%,100%{transform:rotate(-15deg) translateY(-12px)} 50%{transform:rotate(20deg) translateY(12px)} }
    @keyframes flyaway { 0%{transform:rotate(0deg) scale(1) translate(0,0)} 50%{transform:rotate(360deg) scale(0.5) translate(100px,-300px)} 100%{transform:rotate(720deg) scale(0) translate(200px,-600px)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    .animate-float { animation: float 3s ease-in-out infinite; }
  `

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center transition-all duration-700"
      style={{
        background: isDay
          ? 'linear-gradient(160deg, #5BB8D4, #F2E7D3)'
          : 'var(--nero)',
      }}
    >
      <style dangerouslySetInnerHTML={{__html: windStyles}} />

      <button
        onClick={handleUmbrellaClick}
        className="cursor-pointer focus:outline-none"
        aria-label="Cambia modalità"
      >
        <Image
          src="/logo.png"
          alt="Marrangio"
          height={180}
          width={180}
          className={clicks === 0 ? 'animate-float object-contain' : 'object-contain'}
          style={umbrellaStyle}
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

      <button
        onClick={() => setIsDay(d => !d)}
        className="absolute top-5 right-5 focus:outline-none transition-opacity duration-300"
        style={{ opacity: 0.45, fontSize: '1.25rem', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Cambia modalità giorno/notte"
      >
        {isDay ? '☀' : '☽'}
      </button>
    </main>
  )
}
