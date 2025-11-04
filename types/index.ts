export interface Planet {
  id: string
  name: string
  type: string
  distance: string
  distanceAU: number
  diameter: string
  mass: string
  temperature: string
  dayLength: string
  yearLength: string
  moons: number
  description: string
  composition: string
  atmosphere: string
  features: string[]
  color: string
  radius: number
  position: [number, number, number]
  special?: boolean
}

export interface Galaxy {
  name: string
  description: string
  type: string
  diameter: string
  stars: string
  age: string
}

export interface Note {
  title: string
  content: string
  type: 'info' | 'galaxy' | 'visual'
}

export interface Category {
  description: string
  planets: string[]
}


