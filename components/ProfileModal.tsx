'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaTimes, FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa'

export default function ProfileModal() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-xl border border-primary-500/40"
          aria-label="Open profile"
        >
          <FaUser />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-gray-900 text-white rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary-600/30 to-primary-800/30 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center"><FaUser /></div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Dendy Sapto Adi</h3>
                    <p className="text-gray-300 text-sm">Creator • Frontend/Full‑stack Engineer</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-white/10" aria-label="Close">
                  <FaTimes />
                </button>
              </div>

              <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2"><FaPhone className="text-primary-400" /> +62 896-0258-9896</span>
                  <span className="inline-flex items-center gap-2"><FaEnvelope className="text-primary-400" /> dendysaptoadi160@gmail.com</span>
                  <a href="https://linkedin.com/in/dendysaptoadi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary-400">
                    <FaLinkedin className="text-primary-400" /> linkedin.com/in/dendysaptoadi
                  </a>
                  <a href="https://github.com/xhendpibero" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary-400">
                    <FaGithub className="text-primary-400" /> github.com/xhendpibero
                  </a>
                </div>

                <section>
                  <h4 className="font-semibold text-primary-300 mb-2">Summary</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    With over 7 years of experience, I specialize in frameworks like NextJS, Angular, and React. I am passionate about web and mobile design and thrive on improving my skills and solving complex problems. As a strong communicator, I work effectively with clients and team members, and my fluency in English ensures clear and effective communication.
                  </p>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary-300 mb-2">Skills</h4>
                    <ul className="text-sm text-gray-200 space-y-1">
                      <li><strong>Web Frontend:</strong> Angular, React, Nuxt, NextJS, SolidJS</li>
                      <li><strong>Mobile Frontend:</strong> React Native, Ionic, Flutter</li>
                      <li><strong>Languages:</strong> Javascript, Python, PHP, Scala, VB/C#.Net</li>
                      <li><strong>UI/UX:</strong> Figma, Framer, Web Flow, Adobe XD</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-300 mb-2">Tooling</h4>
                    <ul className="text-sm text-gray-200 space-y-1">
                      <li><strong>Testing:</strong> Pytest, Docker, CircleCI, Jenkins, Karma</li>
                      <li><strong>Infrastructure:</strong> Github, Gitlab, AWS, Azure, Self-Hosting</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h4 className="font-semibold text-primary-300 mb-2">Experience</h4>
                  <div className="space-y-4 text-sm text-gray-200">
                    <div>
                      <div className="flex items-center justify-between"><span className="font-semibold">Torre.ai — Product Engineer</span><span className="text-gray-400">Jun 2025 – Present</span></div>
                      <div className="text-gray-400">Remote, California, USA • Subtorres (Nuxt4, Scala, Redis)</div>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Built UGC page under 200 ms LCP with schema + CDN optimization.</li>
                        <li>Improved Core Web Vitals via CSS/layout optimizations.</li>
                        <li>Advanced SEO, GSC management, schema markup, Cloudinary.</li>
                        <li>Designed modular apps for Emma (Vue/Nuxt/Solid, microfrontends).</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center justify-between"><span className="font-semibold">OCA Indonesia by Telkom — Senior Frontend Engineer</span><span className="text-gray-400">Mar 2022 – Mar 2025</span></div>
                      <div className="text-gray-400">Gambir, Central Jakarta • OCA AI (Angular 19)</div>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Led Chatbot AI v2 to production; security + features; 90% cost cut.</li>
                        <li>Added push notifications, PDF/XLSX, Intro.js, Rappid.js canvas editor.</li>
                        <li>~100% Karma coverage; integrated Telkom LLM.</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center justify-between"><span className="font-semibold">Indivara Group — Technical Product Specialist</span><span className="text-gray-400">Apr 2022 – Nov 2022</span></div>
                      <div className="text-gray-400">React, Java • UOB Singapore (WMS) and other dashboards</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between"><span className="font-semibold">Barito Technologies Group — Associate Software Engineer</span><span className="text-gray-400">Sep 2019 – Apr 2022</span></div>
                      <div className="text-gray-400">React, RN, Angular • Multiple client/mobile projects</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between"><span className="font-semibold">Podobeli Djital Indonesia — Junior Software Programmer</span><span className="text-gray-400">May 2019 – Oct 2019</span></div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between"><span className="font-semibold">PT. MRT Jakarta — Junior Software Engineer (Intern)</span><span className="text-gray-400">Feb 2018 – May 2018</span></div>
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary-300 mb-2">Education</h4>
                    <ul className="text-sm text-gray-200 space-y-1">
                      <li>SMKN 24 Jakarta — Diploma of Software Engineers (2016-2019)</li>
                      <li>Womanium Quantum Computing — Diploma (2023-2024)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-300 mb-2">Certifications</h4>
                    <p className="text-sm text-gray-200">BNSP, QCobalt, Classiq, Pennylane, QBronze, QMercury, QZinc, QNickel</p>
                  </div>
                </section>

                <section>
                  <h4 className="font-semibold text-primary-300 mb-2">Projects & Volunteering</h4>
                  <div className="space-y-2 text-sm text-gray-200">
                    <div>
                      <span className="font-semibold">LifeBonder — Angular Developer Specialist</span> • Jan 2025 – Present
                    </div>
                    <div>
                      <span className="font-semibold">Tako — Full-stack Developer</span> • Jul 2023 – Nov 2024
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


