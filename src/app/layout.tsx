import type { Metadata } from 'next'
import { Geist_Mono, Noto_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import './globals.css'

const sans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
})

const mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'tiny-yurl',
  description: 'Personal link shortening service',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
