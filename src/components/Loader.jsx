import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../motion'
import '../styles/loader.css'

export default function Loader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) { onDone(); return }
    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      gsap.timeline({ onComplete: onDone })
        .to(counter, {
          v: 100, duration: 1.6, ease: 'power2.inOut',
          onUpdate: () => { if (count.current) count.current.textContent = Math.round(counter.v) },
        })
        .to('.loader-word span', { yPercent: -100, stagger: 0.05, duration: 0.6, ease: 'power3.in' }, '-=0.2')
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.1')
    }, root)
    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-word">
        {'Chandana Priya'.split('').map((c, i) => <span key={i}>{c === ' ' ? ' ' : c}</span>)}
      </div>
      <div className="loader-count"><span ref={count}>0</span>%</div>
    </div>
  )
}
