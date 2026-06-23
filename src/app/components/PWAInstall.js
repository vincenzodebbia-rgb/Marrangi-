'use client'
import { useState, useEffect } from 'react'

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <button
      onClick={install}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        background: 'rgba(10,8,6,0.7)',
        color: '#F2E7D3',
        border: '1px solid rgba(242,231,211,0.2)',
        borderRadius: '0.5rem',
        padding: '0.5rem 0.75rem',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-grotesk)',
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
      }}
    >
      Aggiungi a Home
    </button>
  )
}
