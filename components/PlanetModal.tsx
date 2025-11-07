'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FaTimes, FaTemperatureHigh, FaCalendarAlt, FaMoon, FaRuler, FaWeight, FaInfoCircle, FaArrowRight } from 'react-icons/fa'
import { useSpaceStore } from '@/store/useSpaceStore'
import planetsData from '@/data/planets.json'
import { Planet } from '@/types'

export default function PlanetModal() {
  const router = useRouter()
  const { selectedPlanet, isModalOpen, setIsModalOpen, setSelectedPlanet, setIsNavigating, setPreviousRoute } = useSpaceStore()

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isModalOpen])

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedPlanet(null)
  }

  const handleViewDetails = () => {
    if (!selectedPlanet) return
    setIsNavigating(true)
    setPreviousRoute(window.location.pathname)
    setIsModalOpen(false)
    router.push(`/planet/${selectedPlanet}`)
  }

  if (!selectedPlanet || !isModalOpen) return null

  const planet = planetsData.planets.find((p) => p.id === selectedPlanet) as Planet | undefined
  if (!planet) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="p-8 text-white relative"
            style={{ background: `linear-gradient(135deg, ${planet.color}22, ${planet.color}44)` }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <FaTimes className="text-xl" />
            </button>
            <div className="flex items-center space-x-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl"
                style={{
                  background: `radial-gradient(circle, ${planet.color}, ${planet.color}88)`,
                  boxShadow: `0 0 30px ${planet.color}66`,
                }}
              >
                {planet.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">{planet.name}</h2>
                <p className="text-xl text-gray-300 mb-1">{planet.type} Planet</p>
                <p className="text-gray-400">{planet.description}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center text-primary-400 mb-2">
                  <FaRuler className="mr-2" />
                  <span className="text-sm font-semibold">Diameter</span>
                </div>
                <p className="text-white font-bold">{planet.diameter}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center text-primary-400 mb-2">
                  <FaWeight className="mr-2" />
                  <span className="text-sm font-semibold">Mass</span>
                </div>
                <p className="text-white font-bold text-sm">{planet.mass}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center text-primary-400 mb-2">
                  <FaTemperatureHigh className="mr-2" />
                  <span className="text-sm font-semibold">Temperature</span>
                </div>
                <p className="text-white font-bold">{planet.temperature}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center text-primary-400 mb-2">
                  <FaMoon className="mr-2" />
                  <span className="text-sm font-semibold">Moons</span>
                </div>
                <p className="text-white font-bold text-2xl">{planet.moons}</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary-400" />
                  Orbital Information
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Distance from Sun:</span>
                    <span className="text-white font-semibold">{planet.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Day Length:</span>
                    <span className="text-white font-semibold">{planet.dayLength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year Length:</span>
                    <span className="text-white font-semibold">{planet.yearLength}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-primary-400" />
                  Composition
                </h3>
                <p className="text-gray-300 mb-3">{planet.composition}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-1">Atmosphere:</p>
                  <p className="text-gray-300">{planet.atmosphere}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {planet.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-400 mt-1">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={handleViewDetails}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                style={{
                  boxShadow: `0 0 20px ${planet.color}66`,
                }}
              >
                <span>Explore {planet.name} & Moons</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}


