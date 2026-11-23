import { useCallback, useRef } from 'react'
import { projects } from '../data'
import { gsap } from '../motion'
import useReveal from '../useReveal'
import { ArrowUpRight } from './Icons'
import '../styles/projects.css'

const featured = projects.slice(0, 4)
const more = projects.slice(4)

export default function Projects() {
  const root = useRef(null)

  // stacked cards: each card shrinks and dims slightly as the next one slides over it
  const stack = useCallback(() => {
    if (window.matchMedia('(max-width: 900px)').matches) return
    const cards = gsap.utils.toArray('.work-card')
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      gsap.to(card.querySelector('.work-card-inner'), {
        scale: 0.94, opacity: 0.5, ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
      })
    })
  }, [])

  useReveal(root, stack)

  return (
    <section className="section work" id="work" ref={root}>
      <div className="container">
        <div className="work-head">
          <div>
            <p className="eyebrow reveal">Selected work</p>
            <h2 className="section-title">
              <span className="line-mask"><span className="line-inner">Projects that</span></span>
              <span className="line-mask"><span className="line-inner"><em>ship</em> results.</span></span>
            </h2>
          </div>
          <p className="work-lede reveal">
            From real-time fraud scoring to multilingual healthcare assistants, every project is measured by recall, latency and reliability.
          </p>
        </div>

        <div className="work-stack">
          {featured.map((p, i) => (
            <article className="work-card" key={p.title} style={{ top: `calc(110px + ${i * 18}px)` }}>
              <div className="work-card-inner ticks">
                <div className="work-card-top">
                  <span className="work-index">0{i + 1}</span>
                  <span className="chip">{p.tag}</span>
                </div>
                <div className="work-card-main">
                  <div>
                    <h3>{p.title}</h3>
                    <p className="work-sub">{p.subtitle}</p>
                  </div>
                  <p className="work-desc">{p.description}</p>
                </div>
                <div className="work-card-bottom">
                  <ul className="work-metrics">
                    {p.metrics.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                  <div className="work-stack-chips">
                    {p.stack.map((t) => <span className="chip" key={t}>{t}</span>)}
                  </div>
                  {p.link && (
                    <a className="btn work-link" href={p.link} target="_blank" rel="noreferrer">
                      View on GitHub <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="work-more">
          {more.map((p) => (
            <article className="work-mini reveal" key={p.title}>
              <span className="chip">{p.tag}</span>
              <h3>{p.title}</h3>
              <p className="work-sub">{p.subtitle}</p>
              <p className="work-desc">{p.description}</p>
              <div className="work-stack-chips">
                {p.stack.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
