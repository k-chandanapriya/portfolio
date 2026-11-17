import { useCallback, useRef } from 'react'
import { timeline } from '../data'
import { gsap } from '../motion'
import useReveal from '../useReveal'
import '../styles/journey.css'

export default function Journey() {
  const root = useRef(null)
  const draw = useCallback(() => {
    gsap.fromTo('.journey-progress', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.journey-list', start: 'top 75%', end: 'bottom 60%', scrub: true },
    })
  }, [])
  useReveal(root, draw)

  return (
    <section className="section journey" id="journey" ref={root}>
      <div className="container journey-grid">
        <div className="journey-head">
          <p className="eyebrow reveal">Experience & education</p>
          <h2 className="section-title">
            <span className="line-mask"><span className="line-inner">The</span></span>
            <span className="line-mask"><span className="line-inner"><em>journey</em></span></span>
            <span className="line-mask"><span className="line-inner">so far.</span></span>
          </h2>
        </div>

        <ol className="journey-list">
          <span className="journey-rail" aria-hidden="true"><span className="journey-progress" /></span>
          {timeline.map((t) => (
            <li className="journey-item reveal" key={t.title}>
              <div className="journey-meta">
                <span className="journey-period">{t.period}</span>
                <span className={`journey-kind ${t.kind === 'Experience' ? 'is-work' : ''}`}>{t.kind}</span>
              </div>
              <h3>{t.title}</h3>
              <p className="journey-place">{t.place}</p>
              {t.points.length > 0 && (
                <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
