'use client'

import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaPlus, FaMinus, FaUndo } from 'react-icons/fa'
import { useSpaceStore } from '@/store/useSpaceStore'

export default function ControlPanel() {
  const {
    rotationSpeed,
    setRotationSpeed,
    zoomLevel,
    setZoomLevel,
    setSelectedPlanet,
    setIsModalOpen,
    useRealScale,
    setUseRealScale,
  } = useSpaceStore()

  const handleSpeedChange = (delta: number) => {
    const newSpeed = Math.max(0, Math.min(5, rotationSpeed + delta))
    setRotationSpeed(newSpeed)
  }

  const handleZoomChange = (delta: number) => {
    const newZoom = Math.max(5, Math.min(100, zoomLevel + delta))
    setZoomLevel(newZoom)
  }

  const resetView = () => {
    setZoomLevel(15)
    setSelectedPlanet(null)
    setIsModalOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-2xl border border-gray-700 min-w-[280px]"
    >
      <h3 className="text-white font-bold mb-4 text-lg flex items-center">
        <FaPlay className="mr-2 text-primary-400" />
        Controls
      </h3>

      {/* Rotation Speed */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">
          Rotation Speed: {rotationSpeed.toFixed(1)}x
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSpeedChange(-0.5)}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded transition-colors"
            aria-label="Decrease speed"
          >
            <FaMinus className="text-sm" />
          </button>
          <div className="flex-1 bg-gray-800 rounded-full h-2 relative">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{ width: `${(rotationSpeed / 5) * 100}%` }}
            />
          </div>
          <button
            onClick={() => handleSpeedChange(0.5)}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded transition-colors"
            aria-label="Increase speed"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>
      </div>

      {/* Zoom Level */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">
          Zoom Level: {zoomLevel.toFixed(0)}
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleZoomChange(-2)}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded transition-colors"
            aria-label="Zoom out"
          >
            <FaMinus className="text-sm" />
          </button>
          <div className="flex-1 bg-gray-800 rounded-full h-2 relative">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{ width: `${((zoomLevel - 5) / 95) * 100}%` }}
            />
          </div>
          <button
            onClick={() => handleZoomChange(2)}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded transition-colors"
            aria-label="Zoom in"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>
      </div>

      {/* Real Scale Toggle */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={useRealScale}
            onChange={(e) => setUseRealScale(e.target.checked)}
            className="form-checkbox h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span>Use real relative sizes (Sun ≫ Jupiter ≫ Earth)</span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Note: Real sizes are scaled down for visibility but preserve ratios.
        </p>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetView}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2"
      >
        <FaUndo />
        <span>Reset View</span>
      </button>

      {/* Instructions */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          • Click planets to view details
          <br />
          • Drag to rotate camera
          <br />
          • Scroll to zoom
        </p>
      </div>
    </motion.div>
  )
}


