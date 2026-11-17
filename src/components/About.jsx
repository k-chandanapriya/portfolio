import { useCallback, useRef } from 'react'
import { profile, stats, languages } from '../data'
import { gsap } from '../motion'
import useReveal from '../useReveal'
import '../styles/about.css'

const fmt = (v, format) =>
  format === 'int' ? Math.round(v).toLocaleString('en-US')
    : format === 'dec2' ? v.toFixed(2)
      : v.toFixed(1)

export default function About() {
  const root = useRef(null)

  const counters = useCallback(() => {
    gsap.utils.toArray('.stat-num').forEach((el) => {
      const target = Number(el.dataset.value)
      const format = el.dataset.format
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target, duration: 2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => { el.textContent = fmt(obj.v, format) },
      })
    })
  }, [])

  useReveal(root, counters)

  return (
    <section className="section about" id="about" ref={root}>
      <div className="container">
        <p className="eyebrow reveal">About me</p>
        <h2 className="section-title about-title">
          <span className="line-mask"><span className="line-inner">Turning research-grade AI</span></span>
          <span className="line-mask"><span className="line-inner">into <em>measurable</em> systems.</span></span>
        </h2>

        <div className="about-grid">
          <div className="about-text">
            {profile.about.map((p, i) => <p className="reveal" key={i}>{p}</p>)}
            <div className="about-langs reveal">
              {languages.map((l) => (
                <span className="chip" key={l.name}>{l.name} — {l.level}</span>
              ))}
            </div>
          </div>

          <ul className="stats">
            {stats.map((s) => (
              <li className="stat reveal" key={s.label}>
                <div className="stat-value">
                  <span className="stat-num" data-value={s.value} data-format={s.format}>{fmt(s.value, s.format)}</span>
                  {s.suffix && <span className="stat-suffix">{s.suffix.replace('ms', ' ms')}</span>}
                </div>
                <p>{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
