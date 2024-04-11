import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

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
        className={`${inter.className} mx-auto max-w-screen-lg bg-secondary`}
      >
        {header}
        {children}
        {footer}
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  )
}
