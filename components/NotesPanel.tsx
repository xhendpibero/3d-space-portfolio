'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInfoCircle, FaChevronDown, FaChevronUp, FaGlobe, FaPalette } from 'react-icons/fa'
import planetsData from '@/data/planets.json'
import { Note } from '@/types'

const iconMap = {
  info: FaInfoCircle,
  galaxy: FaGlobe,
  visual: FaPalette,
}

export default function NotesPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const notes = planetsData.notes as Note[]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-4 left-4 z-50"
    >
      {/* Collapsed floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-xl border border-primary-500/40"
          aria-label="Open notes panel"
        >
          <FaInfoCircle />
        </button>
      )}

      {/* Expanded panel */}
      <div className={`bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 overflow-hidden ${isOpen ? 'w-[22rem]' : 'hidden'}`}>
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white flex items-center justify-between hover:from-primary-700 hover:to-primary-900 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <FaInfoCircle />
            <span className="font-bold">Notes & Information</span>
          </div>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 max-h-[400px] overflow-y-auto space-y-4">
                {notes.map((note, index) => {
                  const Icon = iconMap[note.type] || FaInfoCircle
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="text-primary-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-2">{note.title}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{note.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Galaxy Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: notes.length * 0.1 }}
                  className="bg-gradient-to-r from-primary-600/20 to-primary-800/20 rounded-lg p-4 border border-primary-500/30"
                >
                  <div className="flex items-start space-x-3">
                    <FaGlobe className="text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-2">{planetsData.galaxy.name}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {planetsData.galaxy.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white ml-2">{planetsData.galaxy.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Diameter:</span>
                          <span className="text-white ml-2">{planetsData.galaxy.diameter}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Stars:</span>
                          <span className="text-white ml-2">{planetsData.galaxy.stars}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Age:</span>
                          <span className="text-white ml-2">{planetsData.galaxy.age}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


