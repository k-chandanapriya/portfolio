import { useCallback, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Thesis from './components/Thesis'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])

  // smooth scrolling, kept in sync with GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 1.15, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  return (
    <>
      {!ready && <Loader onDone={onLoaded} />}
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Thesis />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
