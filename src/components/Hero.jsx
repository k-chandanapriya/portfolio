import { useLayoutEffect, useRef } from 'react'
import { profile } from '../data'
import { gsap, asset, prefersReducedMotion } from '../motion'
import { ArrowUpRight, Download } from './Icons'
import '../styles/hero.css'

// letters animate individually, but the word wrapper never breaks across lines
const Letters = ({ text }) => (
  <span className="hero-word">
    {text.split('').map((c, i) => (
      <span className="hero-letter" key={i}>{c}</span>
    ))}
  </span>
)

export default function Hero({ ready }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-letter', { yPercent: 110, duration: 1.4, stagger: 0.035 })
        .from('.hero-frame', { yPercent: 18, scale: 0.86, opacity: 0, duration: 1.6 }, 0.15)
        .from('.hero-frame img', { scale: 1.35, duration: 2.2 }, 0.15)
        .from('.hero-arch-line', { x: -10, y: -10, opacity: 0, duration: 1.6 }, 0.5)
        .from('.hero-arch-glow', { x: 10, y: 10, opacity: 0, duration: 1.6 }, 0.5)
        .from('.hero-badge', { x: -30, opacity: 0, duration: 1 }, 1)
        .from('.hero-fade', { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)

      // parallax on scroll
      gsap.to('.hero-frame-inner', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-name', {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)

    const photo = root.current.querySelector('.hero-photo')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let cleanupTilt = () => {}
    if (photo && fine) {
      const rx = gsap.quickTo('.hero-stage', 'rotationX', { duration: 0.8, ease: 'power3.out' })
      const ry = gsap.quickTo('.hero-stage', 'rotationY', { duration: 0.8, ease: 'power3.out' })
      const lx = gsap.quickTo('.hero-arch-line', 'x', { duration: 1, ease: 'power3.out' })
      const ly = gsap.quickTo('.hero-arch-line', 'y', { duration: 1, ease: 'power3.out' })
      const move = (e) => {
        const r = photo.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        ry(px * 10); rx(-py * 8); lx(22 + px * 18); ly(22 + py * 18)
      }
      const leave = () => { rx(0); ry(0); lx(22); ly(22) }
      photo.addEventListener('pointermove', move)
      photo.addEventListener('pointerleave', leave)
      cleanupTilt = () => { photo.removeEventListener('pointermove', move); photo.removeEventListener('pointerleave', leave) }
    }
    return () => { cleanupTilt(); ctx.revert() }
  }, [ready])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-fade">{profile.availability}</p>
          <h1 className="hero-name" aria-label={`${profile.name} ${profile.surname}`}>
            <span className="line-mask" aria-hidden="true"><Letters text="Chandana" /></span>
            <span className="line-mask" aria-hidden="true"><em><Letters text="Priya" /></em></span>
          </h1>
          <p className="hero-role hero-fade">
            <span className="nowrap">{profile.role}</span> <span className="hero-sep" aria-hidden="true" /> <span className="nowrap">{profile.degree}</span>
          </p>
          <p className="hero-intro hero-fade">{profile.intro}</p>
          <div className="hero-ctas hero-fade">
            <a className="btn btn-primary" href="#thesis">See my thesis <ArrowUpRight /></a>
            <a className="btn" href={asset(profile.cv)} download><Download /> Download CV</a>
          </div>
        </div>

        <figure className="hero-photo">
          <div className="hero-stage">
            <span className="hero-arch hero-arch-glow" aria-hidden="true" />
            <span className="hero-arch hero-arch-line" aria-hidden="true" />
            <div className="hero-frame">
              <div className="hero-frame-inner">
                <img src={asset(profile.photo)} alt={`Portrait of ${profile.name} ${profile.surname}`} width="1200" height="1600" fetchPriority="high" />
              </div>
            </div>

            <figcaption className="hero-badge">
              <span className="dot" /> Based in {profile.location}
            </figcaption>
          </div>
        </figure>
      </div>

      <div className="container hero-foot hero-fade">
        <span>Scroll</span>
        <span className="hero-line" />
        <span>LLMs, RAG, Multimodal AI, MLOps</span>
      </div>
    </section>
  )
}
