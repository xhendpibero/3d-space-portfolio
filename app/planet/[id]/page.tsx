'use client'

import { Suspense, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Script from 'next/script'
import PlanetDetailScene from '@/components/PlanetDetailScene'
import MoonModal from '@/components/MoonModal'
import MoonListPanel from '@/components/MoonListPanel'
import ControlPanel from '@/components/ControlPanel'
import Footer from '@/components/Footer'
import { useSpaceStore } from '@/store/useSpaceStore'
import planetsData from '@/data/planets.json'
import { Planet } from '@/types'
import { FaArrowLeft } from 'react-icons/fa'

function LoadingFallback() {
  return (
    <div className="w-full h-screen bg-space-dark flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Planet...</p>
      </div>
    </div>
  )
}

export default function PlanetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { setIsNavigating, previousRoute, setSelectedPlanet } = useSpaceStore()
  const planetId = params?.id as string

  const planet = planetsData.planets.find((p) => p.id === planetId) as Planet | undefined

  useEffect(() => {
    if (!planet) {
      router.push('/')
      return
    }
    // Set selected planet for moon modal
    setSelectedPlanet(planet.id)
    // Reset navigation state after a brief delay
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 500)
    return () => {
      clearTimeout(timer)
      setSelectedPlanet(null)
    }
  }, [planet, router, setIsNavigating, setSelectedPlanet])

  const handleBack = () => {
    setIsNavigating(true)
    const route = previousRoute || '/'
    router.push(route)
  }

  if (!planet) {
    return <LoadingFallback />
  }

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AstronomicalBody',
    name: planet.name,
    description: planet.description,
    astronomicalBodyType: planet.type,
    diameter: planet.diameter,
    mass: planet.mass,
    temperature: planet.temperature,
    numberOfMoons: planet.moons,
    orbitalPeriod: planet.yearLength,
    rotationPeriod: planet.dayLength,
    distanceFromSun: planet.distance,
    color: planet.color,
    ...(planet.moonList && planet.moonList.length > 0 && {
      satellite: planet.moonList.map((moon) => ({
        '@type': 'AstronomicalBody',
        name: moon.name,
        description: moon.description,
        diameter: moon.diameter,
        mass: moon.mass,
        orbitalPeriod: moon.orbitalPeriod,
      })),
    }),
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Script
        id="ld-json-planet"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handleBack}
        className="fixed top-6 left-6 z-50 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-200 hover:scale-105 border border-gray-700"
      >
        <FaArrowLeft />
        <span>Back to Milky Way</span>
      </motion.button>

      {/* Planet Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginLeft: "-166px" }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 drop-shadow-2xl">
          {planet.name}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 drop-shadow-lg">
          {planet.type} Planet - {planet.moons} {planet.moons === 1 ? 'Moon' : 'Moons'}
        </p>
      </motion.div>

      {/* 3D Scene */}
      <Suspense fallback={<LoadingFallback />}>
        <PlanetDetailScene planet={planet} />
      </Suspense>

      {/* UI Components */}
      <ControlPanel />
      <Footer />
      <MoonListPanel planet={planet} />

      {/* Moon Modal */}
      <MoonModal />
    </main>
  )
}

