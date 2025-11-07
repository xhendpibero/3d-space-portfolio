import { Metadata } from 'next'
import planetsData from '@/data/planets.json'
import { Planet } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const planet = planetsData.planets.find((p) => p.id === id) as Planet | undefined

  if (!planet) {
    return {
      title: 'Planet Not Found',
    }
  }

  const title = `${planet.name} - ${planet.type} Planet | 3D Space Portfolio`
  const description = `${planet.description} Explore ${planet.name} and its ${planet.moons} ${planet.moons === 1 ? 'moon' : 'moons'} in interactive 3D.`

  return {
    title,
    description,
    keywords: [
      planet.name,
      planet.type,
      'planet',
      'solar system',
      '3D',
      'interactive',
      'astronomy',
      ...(planet.moonList && planet.moonList.length > 0
        ? planet.moonList.map((moon) => moon.name)
        : []),
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/planet/${planet.id}`,
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${planet.name} - 3D Space Portfolio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `/planet/${planet.id}`,
    },
  }
}

export default function PlanetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

