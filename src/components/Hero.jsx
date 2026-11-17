import { useLayoutEffect, useRef } from 'react'
import { profile } from '../data'
import { gsap, asset, prefersReducedMotion } from '../motion'
import { ArrowUpRight, Download } from './Icons'
import '../styles/hero.css'

const Letters = ({ text }) =>
  text.split('').map((c, i) => (
    <span className="hero-letter" key={i}>{c}</span>
  ))

export default function Hero({ ready }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-letter', { yPercent: 110, duration: 1.4, stagger: 0.035 })
        .from('.hero-photo', { clipPath: 'inset(100% 0 0 0)', duration: 1.6 }, 0.2)
        .from('.hero-photo img', { scale: 1.35, duration: 2 }, 0.2)
        .from('.hero-fade', { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)

      // parallax on scroll
      gsap.to('.hero-photo img', {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-name', {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
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
            {profile.role} <span className="hero-sep" aria-hidden="true" /> {profile.degree}
          </p>
          <p className="hero-intro hero-fade">{profile.intro}</p>
          <div className="hero-ctas hero-fade">
            <a className="btn btn-primary" href="#thesis">See my thesis <ArrowUpRight /></a>
            <a className="btn" href={asset(profile.cv)} download><Download /> Download CV</a>
          </div>
        </div>

        <figure className="hero-photo">
          <img src={asset(profile.photo)} alt={`Portrait of ${profile.name} ${profile.surname}`} width="720" height="960" fetchPriority="high" />
          <figcaption className="hero-badge">
            <span className="dot" /> Based in {profile.location}
          </figcaption>
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
