import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../motion'

// Thin blueprint lines behind the whole page; they draw in from the top on load.
export default function GridLines() {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('span', { scaleY: 0, duration: 1.8, ease: 'expo.inOut', stagger: 0.08, delay: 0.2 })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <div className="grid-lines" ref={root} aria-hidden="true">
      <div className="container"><span /><span /><span /><span /><span /></div>
    </div>
  )
}
