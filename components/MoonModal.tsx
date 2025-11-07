'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaRuler, FaWeight, FaMoon, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa'
import { useSpaceStore } from '@/store/useSpaceStore'
import planetsData from '@/data/planets.json'
import { Moon } from '@/types'

export default function MoonModal() {
  const { selectedMoon, isMoonModalOpen, setIsMoonModalOpen, setSelectedMoon, selectedPlanet } = useSpaceStore()

  useEffect(() => {
    if (isMoonModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMoonModalOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    if (isMoonModalOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMoonModalOpen])

  const handleClose = () => {
    setIsMoonModalOpen(false)
    setSelectedMoon(null)
  }

  if (!selectedMoon || !isMoonModalOpen || !selectedPlanet) return null

  const planet = planetsData.planets.find((p) => p.id === selectedPlanet)
  if (!planet || !planet.moonList) return null

  const moon = planet.moonList.find((m) => m.id === selectedMoon) as Moon | undefined
  if (!moon) return null

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
          className="relative w-full max-w-3xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="p-8 text-white relative"
            style={{ background: `linear-gradient(135deg, ${moon.color}22, ${moon.color}44)` }}
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
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-2xl"
                style={{
                  background: `radial-gradient(circle, ${moon.color}, ${moon.color}88)`,
                  boxShadow: `0 0 30px ${moon.color}66`,
                }}
              >
                <FaMoon />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{moon.name}</h2>
                <p className="text-lg text-gray-300 mb-1">Moon of {planet.name}</p>
                <p className="text-gray-400">{moon.description}</p>
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
                <p className="text-white font-bold text-sm">{moon.diameter}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center text-primary-400 mb-2">
                  <FaWeight className="mr-2" />
                  <span className="text-sm font-semibold">Mass</span>
                </div>
                <p className="text-white font-bold text-xs">{moon.mass}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center text-primary-400 mb-2">
                  <FaMoon className="mr-2" />
                  <span className="text-sm font-semibold">Distance</span>
                </div>
                <p className="text-white font-bold text-sm">{moon.distance}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center text-primary-400 mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span className="text-sm font-semibold">Orbital Period</span>
                </div>
                <p className="text-white font-bold text-sm">{moon.orbitalPeriod}</p>
              </div>
            </div>

            {/* Discovery Info */}
            {(moon.discoveredBy || moon.discoveredYear) && (
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-primary-400" />
                  Discovery
                </h3>
                <div className="space-y-2 text-gray-300">
                  {moon.discoveredBy && (
                    <p>
                      <span className="text-gray-400">Discovered by:</span>{' '}
                      <span className="text-white font-semibold">{moon.discoveredBy}</span>
                    </p>
                  )}
                  {moon.discoveredYear && (
                    <p>
                      <span className="text-gray-400">Year:</span>{' '}
                      <span className="text-white font-semibold">{moon.discoveredYear}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {moon.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-400 mt-1">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

