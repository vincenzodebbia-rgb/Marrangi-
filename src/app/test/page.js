'use client'
import { useEffect, useState } from 'react'

export default function Test() {
  const [vars, setVars] = useState({})
  useEffect(() => {
    setVars({
      supabase: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'VUOTO',
      mapbox: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? 'OK' : 'VUOTO',
    })
  }, [])
  return (
    <div style={{background:'#000',color:'#fff',padding:'2rem'}}>
      <p>Supabase URL: {vars.supabase}</p>
      <p>Mapbox: {vars.mapbox}</p>
    </div>
  )
}
