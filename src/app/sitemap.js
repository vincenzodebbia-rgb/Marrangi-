import { createClient } from '@supabase/supabase-js'

export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: associazioni } = await supabase.from('associazioni').select('slug, created_at')
  const { data: eventi } = await supabase.from('eventi').select('slug, created_at')

  const staticPages = [
    { url: 'https://marrangio.vercel.app', lastModified: new Date() },
    { url: 'https://marrangio.vercel.app/chi-siamo', lastModified: new Date() },
    { url: 'https://marrangio.vercel.app/chi-sei', lastModified: new Date() },
    { url: 'https://marrangio.vercel.app/mappa', lastModified: new Date() },
  ]

  const assPages = (associazioni ?? []).map(a => ({
    url: `https://marrangio.vercel.app/associazioni/${a.slug}`,
    lastModified: new Date(a.created_at),
  }))

  const evPages = (eventi ?? []).map(e => ({
    url: `https://marrangio.vercel.app/eventi/${e.slug}`,
    lastModified: new Date(e.created_at),
  }))

  return [...staticPages, ...assPages, ...evPages]
}
