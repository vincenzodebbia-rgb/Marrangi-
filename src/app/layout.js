import { Unbounded, Caveat, Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-unbounded',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-caveat',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-grotesk',
})

export const metadata = {
  title: 'Marrangio',
  description: 'Mappa culturale di Lucera',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${unbounded.variable} ${caveat.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
