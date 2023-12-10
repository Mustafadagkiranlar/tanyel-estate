import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tanyel Estate',
  description: 'Find your perfect location',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-background-color'>
      <body >{children}</body>
    </html>
  )
}
