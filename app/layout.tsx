import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/globals/Navbar'
import SessionProviders from '@/components/Providers/SessionProviders'
import { TrpcProviders } from '@/components/Providers/TrpcProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PDF Analyser',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProviders>
        <TrpcProviders>
        <body className={cn('min-h-screen font-sans antialiased grainy',inter.className)}>
            <main>
              <Navbar />
              {children}
            </main>
        </body>
        </TrpcProviders>
      </SessionProviders>
    </html>
  )
}
