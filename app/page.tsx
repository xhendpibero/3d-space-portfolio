"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import SpaceScene from "@/components/SpaceScene";
import ControlPanel from "@/components/ControlPanel";
import PlanetTabs from "@/components/PlanetTabs";
import PlanetModal from "@/components/PlanetModal";
import NotesPanel from "@/components/NotesPanel";
import ProfileModal from "@/components/ProfileModal";
import Footer from "@/components/Footer";
import Script from "next/script";

function LoadingFallback() {
  return (
    <div className="w-full h-screen bg-space-dark flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Galaxy...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Script id="ld-json" type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '3D Milky Way Galaxy Space Portfolio',
            url: 'https://your-domain.com/',
            author: {
              '@type': 'Person',
              name: 'Dendy Sapto Adi',
              email: 'dendysaptoadi160@gmail.com',
              url: 'https://linkedin.com/in/dendysaptoadi',
              sameAs: [
                'https://github.com/xhendpibero',
                'https://linkedin.com/in/dendysaptoadi',
              ],
            },
            description:
              'Interactive 3D exploration of our solar system within the Milky Way galaxy (Bima Sakti).',
            inLanguage: 'en',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://your-domain.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      {/* Hero Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginLeft: "-166px" }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 drop-shadow-2xl">
          Bima Sakti
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 drop-shadow-lg">
          Milky Way Galaxy - 3D Space Portfolio
        </p>
      </motion.div>

      {/* 3D Scene */}
      <Suspense fallback={<LoadingFallback />}>
        <SpaceScene />
      </Suspense>

      {/* UI Components */}
      <PlanetTabs />
      <ControlPanel />
      <NotesPanel />
      <ProfileModal />
      <PlanetModal />

      {/* Footer */}
      <Footer />
    </main>
  );
}
