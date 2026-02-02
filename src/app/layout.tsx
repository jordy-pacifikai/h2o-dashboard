import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Chatbot from '@/components/Chatbot'
import InteractiveGuide from '@/components/InteractiveGuide'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'H2O Ingenierie - Dashboard IA',
  description: 'Tableau de bord intelligent pour H2O Ingenierie - Bureau d\'etudes techniques en Polynesie francaise',
  icons: {
    icon: 'https://www.h2oingenierie.com/wp-content/uploads/2023/12/Logo-H2O-Ingenierie-V1.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Sidebar />
        <main className="ml-64 min-h-screen p-8">
          {children}
        </main>
        <Chatbot />
        <InteractiveGuide />
      </body>
    </html>
  )
}
