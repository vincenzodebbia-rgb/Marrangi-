import { Unbounded, Caveat, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'
import PWAInstall from './components/PWAInstall'

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
  title: 'Marrangió',
  description: 'Mappa culturale di Lucera',
  manifest: '/manifest.json',
  themeColor: '#E8843C',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${unbounded.variable} ${caveat.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
        <PWAInstall />
        <Script id="sw-register" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
          }
        `}</Script>
      </body>
    </html>
  )
}
