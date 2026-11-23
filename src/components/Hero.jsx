import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile, prompts, focus } from '../data'
import { gsap, asset, prefersReducedMotion } from '../motion'
import { ArrowUpRight, Download, Github, Linkedin } from './Icons'
import '../styles/hero.css'

// letters animate individually, but the word wrapper never breaks across lines
const Letters = ({ text }) => (
  <span className="hero-word">
    {text.split('').map((c, i) => (
      <span className="hero-letter" key={i}>{c}</span>
    ))}
  </span>
)

// Types each prompt, pauses, deletes it, then moves to the next one.
function useTypewriter(lines, start) {
  const [text, setText] = useState(prefersReducedMotion() ? lines[0] : '')
  useEffect(() => {
    if (!start || prefersReducedMotion()) return
    let line = 0, i = 0, deleting = false, timer
    const tick = () => {
      const full = lines[line]
      i += deleting ? -1 : 1
      setText(full.slice(0, i))
      let wait = deleting ? 22 : 48
      if (!deleting && i === full.length) { deleting = true; wait = 2200 }
      else if (deleting && i === 0) { deleting = false; line = (line + 1) % lines.length; wait = 400 }
      timer = setTimeout(tick, wait)
    }
    timer = setTimeout(tick, 900)
    return () => clearTimeout(timer)
  }, [lines, start])
  return text
}

export default function Hero({ ready }) {
  const root = useRef(null)
  const typed = useTypewriter(prompts, ready)

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-term', { y: 24, opacity: 0, duration: 1.2 }, 0.1)
        .from('.hero-device', { y: 80, opacity: 0, duration: 1.8 }, 0.15)
        .from('.hero-pedestal', { yPercent: 40, opacity: 0, duration: 1.6 }, 0.25)
        .from('.hero-screen img', { scale: 1.3, duration: 2.2 }, 0.15)
        .from('.hero-focus li', { x: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.7)
        .from('.hero-focus i', { scaleX: 0, duration: 1.2, stagger: 0.1, ease: 'expo.inOut' }, 0.8)
        .from('.hero-rail > *', { x: 20, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.9)
        .from('.hero-box', { clipPath: 'inset(0 100% 0 0)', duration: 1.3, stagger: 0.15, ease: 'expo.inOut' }, 0.5)
        .from('.hero-letter', { yPercent: 110, duration: 1.2, stagger: 0.03 }, 0.9)
        .from('.hero-fade', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.8)

      gsap.to('.hero-device', {
        y: -60, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)

    // gentle 3D tilt that follows the pointer (mouse devices only)
    const stage = root.current.querySelector('.hero-stage')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let cleanupTilt = () => {}
    if (stage && fine) {
      const rx = gsap.quickTo('.hero-screen', 'rotationX', { duration: 0.9, ease: 'power3.out' })
      const ry = gsap.quickTo('.hero-screen', 'rotationY', { duration: 0.9, ease: 'power3.out' })
      const move = (e) => {
        const r = stage.getBoundingClientRect()
        ry(((e.clientX - r.left) / r.width - 0.5) * 12)
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8)
      }
      const leave = () => { rx(0); ry(0) }
      stage.addEventListener('pointermove', move)
      stage.addEventListener('pointerleave', leave)
      cleanupTilt = () => { stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', leave) }
    }
    return () => { cleanupTilt(); ctx.revert() }
  }, [ready])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="container hero-grid">
        {/* terminal prompt, top left */}
        <div className="hero-term">
          <div className="hero-term-box ticks">
            <span className="hero-term-tag">AI</span>
            <p className="hero-term-text" aria-label={prompts[0]}>
              <span aria-hidden="true">{typed}</span><span className="hero-caret" aria-hidden="true" />
            </p>
          </div>
          <p className="hero-term-hint">Things I have built, typed live</p>
        </div>

        {/* photo on a pedestal, centre */}
        <div className="hero-stage">
          <div className="hero-device">
            <div className="hero-screen">
              <div className="hero-screen-inner">
                <img src={asset(profile.photo)} alt={`Portrait of ${profile.name} ${profile.surname}`} width="1200" height="1600" fetchPriority="high" />
              </div>
            </div>
          </div>
          <div className="hero-pedestal" aria-hidden="true" />
        </div>

        {/* focus labels with leader lines, right */}
        <ul className="hero-focus" aria-label="Focus areas">
          {focus.map((f) => (
            <li key={f}><i aria-hidden="true" />{f}</li>
          ))}
        </ul>

        {/* side rail, far right */}
        <div className="hero-rail">
          <span><span className="dot" />Open to work</span>
          <span>{profile.location}</span>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
        </div>

        {/* name, bottom left */}
        <div className="hero-copy">
          <p className="eyebrow hero-fade">{profile.degree}</p>
          <h1 className="hero-name" aria-label={`${profile.name} ${profile.surname}`}>
            <span className="hero-box ticks" aria-hidden="true"><span className="line-mask"><Letters text="Chandana" /></span></span>
            <span className="hero-box ticks is-accent" aria-hidden="true"><span className="line-mask"><Letters text="Priya" /></span></span>
          </h1>
          <p className="hero-role hero-fade">{profile.role}</p>
        </div>

        {/* intro and actions, bottom right */}
        <div className="hero-side">
          <p className="hero-intro hero-fade">{profile.intro}</p>
          <div className="hero-ctas hero-fade">
            <a className="btn btn-primary" href="#thesis">See my thesis <ArrowUpRight /></a>
            <a className="btn" href={asset(profile.cv)} download><Download /> Download CV</a>
          </div>
          <a className="hero-scroll hero-fade" href="#about">
            <span>Scroll</span>
            <span className="hero-scroll-box"><ArrowUpRight /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
