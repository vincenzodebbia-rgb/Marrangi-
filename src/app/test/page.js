'use client'
import { useEffect, useState } from 'react'

export default function Test() {
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? 'VUOTO')
  }, [])
  return (
    <div style={{background:'#000',color:'#fff',padding:'2rem',minHeight:'100vh'}}>
      <p>Token: {token}</p>
    </div>
  )
}
