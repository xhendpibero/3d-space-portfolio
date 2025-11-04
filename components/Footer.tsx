export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-sm border-t border-white/10 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm">
          3D Space Portfolio • Milky Way Galaxy
        </p>
        <div className="text-xs sm:text-sm text-gray-400">
          Use mouse/touch to orbit • Scroll to zoom • Reset in controls
        </div>
      </div>
    </footer>
  )
}


