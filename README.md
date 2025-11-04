# 3D Milky Way Galaxy Space Portfolio

An immersive 3D interactive exploration of our solar system within the Milky Way galaxy (Bima Sakti). Built with Next.js, React Three Fiber, and Three.js.

## Features

- 🌌 **3D Milky Way Visualization** - Stunning 3D representation of our solar system
- 🪐 **Interactive Planets** - Click on any planet to view detailed information
- ⚙️ **Speed Controls** - Adjustable rotation speed (0-5x)
- 🔍 **Zoom Controls** - Zoom in and out to explore planets up close
- 📑 **Organized Tabs** - Filter planets by type (All, Terrestrial, Gas Giants, Ice Giants)
- 📊 **Detailed Planet Information** - Comprehensive data from JSON file
- 📝 **Notes Panel** - Expandable information panel with galaxy facts
- ✨ **Smooth Animations** - Beautiful transitions and hover effects

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Navigate to the project directory:
```bash
cd 3d-space-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
3d-space-portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with 3D scene
│   └── globals.css         # Global styles
├── components/
│   ├── SpaceScene.tsx       # 3D scene with planets
│   ├── ControlPanel.tsx    # Speed and zoom controls
│   ├── PlanetTabs.tsx      # Tab navigation
│   ├── PlanetModal.tsx     # Planet detail modal
│   ├── NotesPanel.tsx      # Information panel
│   └── Footer.tsx          # Footer component
├── data/
│   └── planets.json        # Planet data and information
├── store/
│   └── useSpaceStore.ts    # Zustand state management
└── types/
    └── index.ts            # TypeScript types
```

## Controls

- **Click Planets** - View detailed information in modal
- **Drag** - Rotate camera around the scene
- **Scroll** - Zoom in/out
- **Speed Slider** - Adjust rotation speed (0-5x)
- **Zoom Slider** - Control zoom level (5-50)
- **Tabs** - Filter planets by category
- **Reset View** - Return to default camera position

## Planet Data

All planet information is stored in `data/planets.json` including:
- Physical properties (diameter, mass, temperature)
- Orbital information (distance, day/year length)
- Composition and atmosphere
- Key features and characteristics
- Color coding for visualization

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **@react-three/drei** - Useful helpers for R3F
- **Zustand** - State management
- **Framer Motion** - Animation library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Customization

### Adding Planets

Edit `data/planets.json` to add or modify planet information:

```json
{
  "id": "planet-id",
  "name": "Planet Name",
  "type": "Terrestrial",
  "distance": "100 million km",
  "distanceAU": 0.67,
  "color": "#FF5733",
  "radius": 1.5,
  ...
}
```

### Adjusting Speed/Zoom Range

Modify the controls in `components/ControlPanel.tsx`:
- Speed range: `Math.max(0, Math.min(5, ...))`
- Zoom range: `Math.max(5, Math.min(50, ...))`

## Performance

- Optimized 3D rendering with React Three Fiber
- Efficient state management with Zustand
- Suspense boundaries for code splitting
- Responsive design for all screen sizes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (may have limited 3D support)

## License

MIT

## Credits

Created by Dendy Sapto Adi

---

**Explore the cosmos! 🌌**


