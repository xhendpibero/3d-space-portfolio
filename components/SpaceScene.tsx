'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls, Text } from '@react-three/drei'
import { MOUSE, TOUCH, Vector3 } from 'three'
import { useSpaceStore } from '@/store/useSpaceStore'
import planetsData from '@/data/planets.json'
import { Planet as PlanetType } from '@/types'

function Planet({
  planet,
  initialAngle,
  distance,
  index,
  orbitalSpeed,
}: {
  planet: PlanetType
  initialAngle: number
  distance: number
  index: number
  orbitalSpeed: number
}) {
  const meshRef = useRef<any>(null)
  const groupRef = useRef<any>(null)
  const angleRef = useRef<number>(initialAngle)
  const { rotationSpeed, selectedPlanet, hoveredPlanet, setHoveredPlanet, setSelectedPlanet, setIsModalOpen, useRealScale } = useSpaceStore()

  useFrame((state, delta) => {
    // Rotate planet on its axis
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed * (0.5 + index * 0.1)
    }
    // Update orbital position around the sun
    if (groupRef.current) {
      angleRef.current += delta * rotationSpeed * orbitalSpeed
      const x = Math.cos(angleRef.current) * distance
      const z = Math.sin(angleRef.current) * distance
      groupRef.current.position.set(x, 0, z)
    }
  })

  const isSelected = selectedPlanet === planet.id
  const isHovered = hoveredPlanet === planet.id
  // Determine visual radius (real relative sizes vs normalized)
  const REAL_PLANET_SCALE = 0.01 // Earth=1 -> 0.01 units; Jupiter ~0.112, visible but not huge
  const interactiveScale = isSelected ? 1.3 : isHovered ? 1.15 : 1
  const displayRadius = useRealScale
    ? Math.max(0.01, planet.radius * REAL_PLANET_SCALE)
    : 0.15 + 0.15 * Math.cbrt(Math.max(planet.radius, 0.01)) // compress dynamic range

  return (
    <group ref={groupRef} position={[Math.cos(initialAngle) * distance, 0, Math.sin(initialAngle) * distance]}>
      {/* Planet */}
      <mesh
        ref={meshRef}
        scale={interactiveScale}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedPlanet(planet.id)
          setIsModalOpen(true)
        }}
        onPointerEnter={() => setHoveredPlanet(planet.id)}
        onPointerLeave={() => setHoveredPlanet(null)}
      >
        <sphereGeometry args={[displayRadius, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={isSelected || isHovered ? 0.3 : 0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Planet label */}
      {(isHovered || isSelected) && (
        <Text
          position={[0, planet.radius * 0.3 + 1, 0]}
          fontSize={0.5}
          color={planet.color}
          anchorX="center"
          anchorY="middle"
        >
          {planet.name}
        </Text>
      )}
    </group>
  )
}

function GalaxyBackground() {
  const { zoomLevel } = useSpaceStore()
  return (
    <>
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  )
}

function OrbitingPlanets() {
  const { activeTab, rotationSpeed, useRealScale } = useSpaceStore()
  const planets = planetsData.planets as PlanetType[]

  const filteredPlanets = useMemo(() => {
    if (activeTab === 'all') return planets
    if (activeTab === 'terrestrial') {
      return planets.filter((p) => p.type === 'Terrestrial')
    }
    if (activeTab === 'gas-giants') {
      return planets.filter((p) => p.type === 'Gas Giant')
    }
    if (activeTab === 'ice-giants') {
      return planets.filter((p) => p.type === 'Ice Giant')
    }
    return planets
  }, [activeTab, planets])

  // Rotate entire solar system
  const systemRef = useRef<any>(null)
  useFrame((state, delta) => {
    if (systemRef.current) {
      systemRef.current.rotation.y += delta * rotationSpeed * 0.1
    }
  })

  return (
    <group ref={systemRef}>
      {/* Sun */}
      <mesh>
        {/** Sun radius ~ 109 Earth radii. Use scaled value when real-scale enabled. */}
        <sphereGeometry args={[useRealScale ? 109 * 0.01 : 2, 32, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.8}
        />
        <pointLight intensity={3} distance={50} decay={2} />
      </mesh>

      {/* Orbits (centered at the sun) */}
      {filteredPlanets.map((planet, index) => {
        const distanceScale = useRealScale ? 6 : 3
        const distance = planet.distanceAU * distanceScale
        return (
          <mesh key={`orbit-${planet.id}`} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[distance - 0.03, distance + 0.03, 128]} />
            <meshBasicMaterial color={planet.color} opacity={0.25} transparent />
          </mesh>
        )
      })}

      {/* Planets */}
      {filteredPlanets.map((planet, index) => {
        const initialAngle = (index / planets.length) * Math.PI * 2
        const distanceScale = useRealScale ? 6 : 3
        const distance = planet.distanceAU * distanceScale // Scale for visualization
        // Simple Kepler-like speed: faster when closer to the sun
        const orbitalSpeed = 0.2 / Math.max(0.2, Math.sqrt(planet.distanceAU))
        return (
          <Planet
            key={planet.id}
            planet={planet}
            initialAngle={initialAngle}
            distance={distance}
            index={index}
            orbitalSpeed={orbitalSpeed}
          />
        )
      })}
    </group>
  )
}

function CameraController() {
  const { zoomLevel } = useSpaceStore()
  const { camera } = useThree()
  
  useFrame(() => {
    // Update camera distance along current direction without overriding controls rotation/pan
    const distance = zoomLevel
    const dir = camera.position.clone().sub(new Vector3(0, 0, 0)).normalize()
    camera.position.copy(dir.multiplyScalar(distance))
  })
  
  return null
}

export default function SpaceScene() {
  const { zoomLevel, setZoomLevel } = useSpaceStore()
  const onWheel = (e: any) => {
    e.preventDefault()
    const delta = Math.sign(e.deltaY)
    const next = Math.max(5, Math.min(100, zoomLevel + delta * 1.5))
    setZoomLevel(next)
  }

  return (
    <div className="w-full h-screen bg-space-dark stars-bg" onWheel={onWheel} onContextMenu={(e) => e.preventDefault()}>
      <Canvas
        camera={{ position: [0, 15, 15], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <GalaxyBackground />
          <OrbitingPlanets />
          <CameraController />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={150}
            enableZoom={false}
            enableRotate={true}
            enablePan={true}
            rotateSpeed={0.8}
            panSpeed={0.5}
            makeDefault
            mouseButtons={{ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }}
            touches={{ ONE: TOUCH.ROTATE, TWO: TOUCH.PAN }}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

