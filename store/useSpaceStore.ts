import { create } from 'zustand'

interface SpaceStore {
  selectedPlanet: string | null
  setSelectedPlanet: (planetId: string | null) => void
  selectedMoon: string | null
  setSelectedMoon: (moonId: string | null) => void
  rotationSpeed: number
  setRotationSpeed: (speed: number) => void
  zoomLevel: number
  setZoomLevel: (zoom: number) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  isMoonModalOpen: boolean
  setIsMoonModalOpen: (open: boolean) => void
  hoveredPlanet: string | null
  setHoveredPlanet: (planetId: string | null) => void
  hoveredMoon: string | null
  setHoveredMoon: (moonId: string | null) => void
  useRealScale: boolean
  setUseRealScale: (value: boolean) => void
  isNavigating: boolean
  setIsNavigating: (value: boolean) => void
  previousRoute: string | null
  setPreviousRoute: (route: string | null) => void
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  selectedPlanet: null,
  setSelectedPlanet: (planetId) => set({ selectedPlanet: planetId }),
  selectedMoon: null,
  setSelectedMoon: (moonId) => set({ selectedMoon: moonId }),
  rotationSpeed: 1,
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
  zoomLevel: 15,
  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
  activeTab: 'all',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isModalOpen: false,
  setIsModalOpen: (open) => set({ isModalOpen: open }),
  isMoonModalOpen: false,
  setIsMoonModalOpen: (open) => set({ isMoonModalOpen: open }),
  hoveredPlanet: null,
  setHoveredPlanet: (planetId) => set({ hoveredPlanet: planetId }),
  hoveredMoon: null,
  setHoveredMoon: (moonId) => set({ hoveredMoon: moonId }),
  useRealScale: false,
  setUseRealScale: (value) => set({ useRealScale: value }),
  isNavigating: false,
  setIsNavigating: (value) => set({ isNavigating: value }),
  previousRoute: null,
  setPreviousRoute: (route) => set({ previousRoute: route }),
}))


