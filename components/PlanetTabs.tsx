'use client'

import { motion } from 'framer-motion'
import { FaGlobe, FaCircle, FaSnowflake, FaList } from 'react-icons/fa'
import { useSpaceStore } from '@/store/useSpaceStore'
import planetsData from '@/data/planets.json'

export default function PlanetTabs() {
  const { activeTab, setActiveTab } = useSpaceStore()
  const categories = planetsData.categories

  const tabs = [
    { id: 'all', label: 'All Planets', icon: FaList, count: planetsData.planets.length },
    { id: 'terrestrial', label: 'Terrestrial', icon: FaGlobe, count: categories.Terrestrial.planets.length },
    { id: 'gas-giants', label: 'Gas Giants', icon: FaCircle, count: categories['Gas Giant'].planets.length },
    { id: 'ice-giants', label: 'Ice Giants', icon: FaSnowflake, count: categories['Ice Giant'].planets.length },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-50 bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 shadow-2xl border border-gray-700"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2
                ${isActive
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <Icon className="text-sm" />
              <span className="text-sm font-medium">{tab.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                isActive ? 'bg-primary-700' : 'bg-gray-700'
              }`}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}


