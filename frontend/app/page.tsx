'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Teams from '@/components/Teams'
import Jobs from '@/components/Jobs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticleSystem from '@/components/ParticleSystem'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen relative bg-dark-bg overflow-hidden">
      <ParticleSystem />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Teams />
      <Jobs />
      <Contact />
      <Footer />
    </main>
  )
}

