# Setup Instructions

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd 3d-space-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## What's Included

✅ **Complete Next.js project structure**  
✅ **3D Milky Way galaxy visualization**  
✅ **8 planets with detailed information**  
✅ **Interactive controls (speed & zoom)**  
✅ **Tab navigation for planet filtering**  
✅ **Planet detail modals**  
✅ **Notes panel with galaxy information**  
✅ **JSON data file with comprehensive planet data**  

## Features

### 🌌 3D Visualization
- Real-time 3D rendering with React Three Fiber
- Milky Way galaxy background with stars
- Orbital paths for each planet
- Realistic planet colors and materials

### 🎮 Interactive Controls
- **Speed Control**: Adjust rotation speed from 0-5x
- **Zoom Control**: Zoom from 5-50 units
- **Orbit Controls**: Drag to rotate, scroll to zoom
- **Reset View**: Return to default camera position

### 📑 Organization
- **Tabs**: Filter by All, Terrestrial, Gas Giants, Ice Giants
- **Planet Count**: Shows number of planets in each category

### 📊 Planet Information
Each planet includes:
- Physical properties (diameter, mass, temperature)
- Orbital data (distance, day/year length)
- Composition and atmosphere details
- Key features and characteristics
- Number of moons

### 📝 Notes Panel
- Expandable information panel
- Galaxy facts and information
- Visual and informational notes
- Milky Way statistics

## Project Structure

```
3d-space-portfolio/
├── app/                      # Next.js pages
├── components/               # React components
│   ├── SpaceScene.tsx       # 3D scene
│   ├── ControlPanel.tsx     # Controls
│   ├── PlanetTabs.tsx       # Tabs
│   ├── PlanetModal.tsx      # Planet details
│   ├── NotesPanel.tsx       # Info panel
│   └── Footer.tsx           # Footer
├── data/
│   └── planets.json         # Planet data
├── store/
│   └── useSpaceStore.ts    # State management
└── types/
    └── index.ts             # TypeScript types
```

## Customization

### Adding/Modifying Planets

Edit `data/planets.json`:

```json
{
  "id": "planet-id",
  "name": "Planet Name",
  "type": "Terrestrial",
  "distance": "100 million km",
  "distanceAU": 0.67,
  "diameter": "10,000 km",
  "mass": "5.97 × 10²⁴ kg",
  "temperature": "0°C",
  "dayLength": "24 hours",
  "yearLength": "365 days",
  "moons": 1,
  "description": "Planet description",
  "composition": "Planet composition",
  "atmosphere": "Atmosphere details",
  "features": ["Feature 1", "Feature 2"],
  "color": "#FF5733",
  "radius": 1.5,
  "position": [0, 0, 0]
}
```

### Adjusting Control Ranges

Edit `components/ControlPanel.tsx`:
- Speed: Change `Math.max(0, Math.min(5, ...))` values
- Zoom: Change `Math.max(5, Math.min(50, ...))` values

## Troubleshooting

### 3D scene not loading?
- Check browser console for errors
- Ensure WebGL is supported in your browser
- Try disabling browser extensions

### Performance issues?
- Reduce the number of stars in `SpaceScene.tsx`
- Lower the planet geometry resolution
- Close other heavy applications

### Build errors?
- Run `npm install` again
- Delete `node_modules` and `.next` folder
- Check Node.js version (requires 18+)

## Production Build

```bash
npm run build
npm start
```

Enjoy exploring the Milky Way! 🌌🪐


