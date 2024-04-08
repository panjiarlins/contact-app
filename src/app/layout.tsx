import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'

const inter = Cairo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contact App',
  description: 'Contact App',
}

export default function RootLayout({
  children,
  header,
  footer,
}: Readonly<{
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} mx-auto my-4 max-w-screen-lg space-y-8 bg-secondary px-4`}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  )
}
