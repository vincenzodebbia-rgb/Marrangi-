import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const tipo = data.user?.user_metadata?.tipo?.toLowerCase()
      return NextResponse.redirect(
        new URL(tipo === 'associazione' ? '/dashboard' : '/mappa', origin)
      )
    }
  }

  return NextResponse.redirect(new URL('/accesso', origin))
}
