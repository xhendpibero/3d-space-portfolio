import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: '3D Milky Way Galaxy Space Portfolio',
    template: '%s | 3D Space Portfolio',
  },
  description:
    'Interactive 3D exploration of our solar system within the Milky Way galaxy (Bima Sakti). Built with Next.js, React Three Fiber, and Tailwind CSS.',
  keywords: [
    'Milky Way',
    'Bima Sakti',
    '3D',
    'Three.js',
    'React Three Fiber',
    'Next.js',
    'Planets',
    'Solar System',
    'WebGL',
  ],
  authors: [{ name: 'Dendy Sapto Adi', url: 'https://linkedin.com/in/dendysaptoadi' }],
  creator: 'Dendy Sapto Adi',
  openGraph: {
    type: 'website',
    url: '/',
    title: '3D Milky Way Galaxy Space Portfolio',
    description:
      'Interactive 3D exploration of our solar system within the Milky Way galaxy (Bima Sakti).',
    siteName: '3D Space Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '3D Milky Way Galaxy Space Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Milky Way Galaxy Space Portfolio',
    description:
      'Interactive 3D exploration of our solar system within the Milky Way galaxy (Bima Sakti).',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}


