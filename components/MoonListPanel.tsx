'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInfoCircle, FaTimes, FaMoon, FaRuler, FaCalendarAlt } from 'react-icons/fa'
import { useSpaceStore } from '@/store/useSpaceStore'
import { Planet, Moon } from '@/types'

interface MoonListPanelProps {
  planet: Planet
}

export default function MoonListPanel({ planet }: MoonListPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setSelectedMoon, setIsMoonModalOpen } = useSpaceStore()
  const moons = planet.moonList || []

  const handleMoonClick = (moonId: string) => {
    setSelectedMoon(moonId)
    setIsMoonModalOpen(true)
  }

  if (moons.length === 0) return null

  return (
    <div className="fixed bottom-16 left-4 z-50">
      {/* Collapsed floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="moon-list-button"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ 
              type: 'spring', 
              damping: 28, 
              stiffness: 350,
              mass: 0.6,
              delay: 0.15
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-xl border border-primary-500/40 transition-all duration-200 relative"
            aria-label="Open moons list"
            style={{
              boxShadow: `0 0 20px ${planet.color}66`,
            }}
          >
            <FaInfoCircle className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {moons.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="moon-list-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: 'spring', 
              damping: 28, 
              stiffness: 350,
              mass: 0.6
            }}
            className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 overflow-hidden w-[22rem] sm:w-[24rem] max-h-[75vh] flex flex-col"
          >
            {/* Header */}
            <div
              className="p-4 border-b border-gray-700 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${planet.color}22, ${planet.color}44)` }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${planet.color}, ${planet.color}88)`,
                    boxShadow: `0 0 15px ${planet.color}66`,
                  }}
                >
                  <FaMoon className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{planet.name}'s Moons</h3>
                  <p className="text-gray-300 text-sm">{moons.length} {moons.length === 1 ? 'Moon' : 'Moons'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Close panel"
              >
                <FaTimes />
              </button>
            </div>

            {/* Moon List */}
            <div className="overflow-y-auto flex-1 p-4 space-y-2">
              {moons.map((moon, index) => (
                <motion.button
                  key={moon.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleMoonClick(moon.id)
                    setIsOpen(false)
                  }}
                  className="w-full text-left bg-gray-800/50 hover:bg-gray-800/80 rounded-lg p-3 border border-gray-700 hover:border-primary-500/50 transition-all duration-200 group cursor-pointer"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex items-start space-x-3">
                    {/* Moon Icon/Color */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110"
                      style={{
                        background: `radial-gradient(circle, ${moon.color}, ${moon.color}88)`,
                        boxShadow: `0 0 10px ${moon.color}66`,
                      }}
                    >
                      <FaMoon className="text-white text-sm" />
                    </div>

                    {/* Moon Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-semibold text-sm group-hover:text-primary-400 transition-colors">
                          {moon.name}
                        </h4>
                        <span className="text-xs text-gray-400 bg-gray-700 px-1.5 py-0.5 rounded">#{index + 1}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <FaRuler className="text-primary-400 flex-shrink-0" />
                          <span className="truncate" title={moon.diameter}>{moon.diameter}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt className="text-primary-400 flex-shrink-0" />
                          <span className="truncate" title={moon.orbitalPeriod}>{moon.orbitalPeriod}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-400 transition-colors">
                        {moon.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-700 bg-gray-800/50">
              <p className="text-xs text-gray-400 text-center">
                Click on any moon to view detailed information
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

