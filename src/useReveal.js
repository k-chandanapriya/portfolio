import { useLayoutEffect } from 'react'
import { gsap, prefersReducedMotion } from './motion'

// Animates any `.reveal` and `.line-inner` elements inside `ref` as they scroll into view.
export default function useReveal(ref, extra) {
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.line-inner').forEach((el) => {
        gsap.from(el, {
          yPercent: 110, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      extra?.()
    }, ref)
    return () => ctx.revert()
  }, [ref, extra])
}
