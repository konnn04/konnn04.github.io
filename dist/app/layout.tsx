import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "../styles/global.css" // Import global styles

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nguyen Thanh Trieu - Portfolio',
  description: 'Personal portfolio and social links',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}