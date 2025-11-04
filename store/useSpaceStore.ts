import { create } from 'zustand'

interface SpaceStore {
  selectedPlanet: string | null
  setSelectedPlanet: (planetId: string | null) => void
  rotationSpeed: number
  setRotationSpeed: (speed: number) => void
  zoomLevel: number
  setZoomLevel: (zoom: number) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  hoveredPlanet: string | null
  setHoveredPlanet: (planetId: string | null) => void
  useRealScale: boolean
  setUseRealScale: (value: boolean) => void
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  selectedPlanet: null,
  setSelectedPlanet: (planetId) => set({ selectedPlanet: planetId }),
  rotationSpeed: 1,
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
  zoomLevel: 15,
  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
  activeTab: 'all',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isModalOpen: false,
  setIsModalOpen: (open) => set({ isModalOpen: open }),
  hoveredPlanet: null,
  setHoveredPlanet: (planetId) => set({ hoveredPlanet: planetId }),
  useRealScale: false,
  setUseRealScale: (value) => set({ useRealScale: value }),
}))


