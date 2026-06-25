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
    height: '220px',
    width: 'auto',
    transformOrigin: 'bottom center',
    ...(clicks > 0 ? { animation: animMap[clicks] } : {}),
  }

  const bg = isDay
    ? 'linear-gradient(160deg, #5BB8D4, #F2E7D3)'
    : '#0a0806'

  const textColor = isDay ? '#2a1206' : '#F2E7D3'
  const mutedColor = isDay ? 'rgba(42,18,6,0.50)' : 'rgba(242,231,211,0.50)'

  return (
    <main style={{ background: bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'background 0.7s' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wind1 { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        @keyframes wind2 { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(10deg)} }
        @keyframes wind3 { 0%,100%{transform:rotate(-14deg)} 50%{transform:rotate(18deg)} }
        @keyframes wind4 { 0%,100%{transform:rotate(-20deg)} 30%{transform:rotate(25deg)} 60%{transform:rotate(-18deg)} 100%{transform:rotate(22deg)} }
        @keyframes flyaway { 0%{transform:rotate(0) scale(1) translate(0,0);opacity:1} 100%{transform:rotate(720deg) scale(0.1) translate(300px,-800px);opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}} />

      <button onClick={handleUmbrellaClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <Image
          src="/logo.png"
          alt="Marrangió"
          height={220}
          width={220}
          className={clicks === 0 ? 'animate-float object-contain' : 'object-contain'}
          style={umbrellaStyle}
          priority
        />
      </button>

      <p style={{ fontFamily: 'var(--font-unbounded)', fontWeight: 900, fontSize: 'clamp(2rem, 6vw, 4rem)', color: textColor, marginTop: '1.5rem', letterSpacing: '0.05em', transition: 'color 0.7s' }}>
        MARRANGI<span style={{ color: '#E8843C' }}>Ó</span>
      </p>

      <Link href="/mappa" style={{ fontFamily: 'var(--font-caveat)', fontWeight: 700, fontSize: '1.8rem', color: textColor, marginTop: '1rem', textDecoration: 'none', transition: 'color 0.7s' }}>
        scopri la mappa
      </Link>

      <Link href="/chi-sei" style={{ fontFamily: 'var(--font-caveat)', fontSize: '1.2rem', color: mutedColor, marginTop: '0.5rem', textDecoration: 'none', transition: 'color 0.7s' }}>
        prima, scopri cos&apos;è
      </Link>

      <Link href="/accesso" style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', fontFamily: 'var(--font-grotesk)', fontSize: '0.8rem', color: mutedColor, textDecoration: 'none' }}>
        sei un&apos;associazione?
      </Link>

      <button onClick={() => setIsDay(d => !d)} style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', opacity: 0.5 }}>
        {isDay ? '☀' : '☽'}
      </button>
    </main>
  )
}
