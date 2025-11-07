'use client'

import { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls, Text, useGLTF } from '@react-three/drei'
import { MOUSE, TOUCH, Vector3 } from 'three'
import { useSpaceStore } from '@/store/useSpaceStore'
import { Planet, Moon } from '@/types'

// Load the 3D model
function PlanetModel({ scale, color }: { scale: number; color: string }) {
  const { scene } = useGLTF('/assets/3d/earth.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    // Apply color tint to the model
    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone()
        child.material.color.set(color)
        if (child.material.emissive) {
          child.material.emissive.set(color)
          child.material.emissiveIntensity = 0.2
        }
      }
    })
    return clone
  }, [scene, color])
  
  return <primitive object={clonedScene} scale={scale} />
}

function MoonModel({ scale, color }: { scale: number; color: string }) {
  const { scene } = useGLTF('/assets/3d/earth.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone()
        child.material.color.set(color)
        if (child.material.emissive) {
          child.material.emissive.set(color)
          child.material.emissiveIntensity = 0.15
        }
      }
    })
    return clone
  }, [scene, color])
  
  return <primitive object={clonedScene} scale={scale} />
}

function MoonOrbitRing({ moon, distance }: { moon: Moon; distance: number }) {
  const { hoveredMoon, setHoveredMoon, setSelectedMoon, setIsMoonModalOpen } = useSpaceStore()
  const isHovered = hoveredMoon === moon.id
  
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedMoon(moon.id)
        setIsMoonModalOpen(true)
      }}
      onPointerEnter={() => setHoveredMoon(moon.id)}
      onPointerLeave={() => setHoveredMoon(null)}
    >
      <ringGeometry args={[distance - 0.02, distance + 0.02, 128]} />
      <meshBasicMaterial
        color={moon.color}
        opacity={isHovered ? 0.4 : 0.2}
        transparent
      />
    </mesh>
  )
}

function MoonOrbiting({
  moon,
  distance,
  initialAngle,
  index,
  orbitalSpeed,
}: {
  moon: Moon
  distance: number
  initialAngle: number
  index: number
  orbitalSpeed: number
}) {
  const meshRef = useRef<any>(null)
  const groupRef = useRef<any>(null)
  const angleRef = useRef<number>(initialAngle)
  const { rotationSpeed, selectedMoon, hoveredMoon, setHoveredMoon, setSelectedMoon, setIsMoonModalOpen } = useSpaceStore()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed * (0.5 + index * 0.1)
    }
    if (groupRef.current) {
      angleRef.current += delta * rotationSpeed * orbitalSpeed
      const x = Math.cos(angleRef.current) * distance
      const z = Math.sin(angleRef.current) * distance
      groupRef.current.position.set(x, 0, z)
    }
  })

  const isSelected = selectedMoon === moon.id
  const isHovered = hoveredMoon === moon.id
  const moonRadius = Math.max(0.05, moon.radius * 0.1)
  const interactiveScale = isSelected ? 1.5 : isHovered ? 1.3 : 1

  return (
    <group ref={groupRef} position={[Math.cos(initialAngle) * distance, 0, Math.sin(initialAngle) * distance]}>
      <group
        ref={meshRef}
        scale={interactiveScale}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedMoon(moon.id)
          setIsMoonModalOpen(true)
        }}
        onPointerEnter={() => setHoveredMoon(moon.id)}
        onPointerLeave={() => setHoveredMoon(null)}
      >
        <Suspense fallback={
          <mesh>
            <sphereGeometry args={[moonRadius, 32, 32]} />
            <meshStandardMaterial
              color={moon.color}
              emissive={moon.color}
              emissiveIntensity={isSelected || isHovered ? 0.3 : 0.1}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        }>
          <MoonModel scale={moonRadius} color={moon.color} />
        </Suspense>
      </group>

      {(isHovered || isSelected) && (
        <Text
          position={[0, moonRadius + 0.5, 0]}
          fontSize={0.3}
          color={moon.color}
          anchorX="center"
          anchorY="middle"
        >
          {moon.name}
        </Text>
      )}
    </group>
  )
}

function RotatingPlanet({ planet, planetRadius }: { planet: Planet; planetRadius: number }) {
  const planetRef = useRef<any>(null)
  const { rotationSpeed } = useSpaceStore()

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * rotationSpeed * 0.5
    }
  })

  return (
    <group ref={planetRef} position={[0, 0, 0]}>
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[planetRadius, 32, 32]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.color}
            emissiveIntensity={0.3}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      }>
        <PlanetModel scale={planetRadius} color={planet.color} />
      </Suspense>
    </group>
  )
}

function CameraZoomController() {
  const { zoomLevel } = useSpaceStore()
  const { camera } = useThree()
  
  useFrame(() => {
    if (camera) {
      const currentDistance = camera.position.length()
      const targetDistance = zoomLevel
      // Smoothly interpolate to target distance
      if (Math.abs(currentDistance - targetDistance) > 0.1) {
        const direction = camera.position.clone().normalize()
        camera.position.lerp(direction.multiplyScalar(targetDistance), 0.1)
      }
    }
  })
  
  return null
}

function PlanetDetailScene({ planet }: { planet: Planet }) {
  const { setZoomLevel } = useSpaceStore()
  const allMoons = planet.moonList || []
  // Limit to first 10 major moons for better performance and visualization
  const moons = allMoons.slice(0, 10)
  const hasMoreMoons = allMoons.length > 10
  const planetRadius = Math.max(0.5, planet.radius * 0.3)

  // Camera zoom animation
  useEffect(() => {
    setZoomLevel(8)
    return () => {
      setZoomLevel(15)
    }
  }, [setZoomLevel])

  return (
    <div className="w-full h-screen bg-space-dark stars-bg">
      <Canvas
        camera={{ position: [0, 10, 15], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0, 0]} intensity={2} color={planet.color} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />

          {/* Planet */}
          <RotatingPlanet planet={planet} planetRadius={planetRadius} />

          {/* Moons */}
          {moons.map((moon, index) => {
            const distance = 3 + index * 1.5
            const initialAngle = (index / moons.length) * Math.PI * 2
            const orbitalSpeed = 0.3 / Math.max(0.5, Math.sqrt(distance))
            
            return (
              <MoonOrbiting
                key={moon.id}
                moon={moon}
                distance={distance}
                initialAngle={initialAngle}
                index={index}
                orbitalSpeed={orbitalSpeed}
              />
            )
          })}

          {/* Moon Orbits */}
          {moons.map((moon, index) => {
            const distance = 3 + index * 1.5
            return (
              <MoonOrbitRing
                key={`moon-orbit-${moon.id}`}
                moon={moon}
                distance={distance}
              />
            )
          })}

          <CameraZoomController />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={30}
            enableZoom={true}
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
      
      {/* Info about additional moons if more than 10 */}
      {hasMoreMoons && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 bg-gray-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
          <p className="text-sm text-gray-300 text-center">
            Showing {moons.length} major moons of {allMoons.length} total moons
          </p>
        </div>
      )}
    </div>
  )
}

// Preload the model
useGLTF.preload('/assets/3d/earth.glb')

export default PlanetDetailScene

