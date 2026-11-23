import { useCallback, useRef } from 'react'
import { thesis } from '../data'
import { gsap } from '../motion'
import useReveal from '../useReveal'
import '../styles/thesis.css'

const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const inputs = [
  { label: 'Speech', note: 'Speech-to-Text / TTS', icon: <svg {...svg}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg> },
  { label: 'Text', note: 'Chat interface', icon: <svg {...svg}><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></svg> },
  { label: 'Image', note: 'Medication photo', icon: <svg {...svg}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="12" cy="12" r="3.2" /><path d="M8 5l1.5-2h5L16 5" /></svg> },
]

export default function Thesis() {
  const root = useRef(null)

  const pipeline = useCallback(() => {
    gsap.fromTo('.pipe-progress', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.pipe', start: 'top 70%', end: 'bottom 60%', scrub: true },
    })
    gsap.utils.toArray('.pipe-step').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el, start: 'top 65%', end: 'bottom 65%',
          toggleClass: { targets: el, className: 'is-active' },
        },
      })
    })
  }, [])

  useReveal(root, pipeline)

  return (
    <section className="section thesis" id="thesis" ref={root}>
      <div className="container">
        <p className="eyebrow reveal">{thesis.kicker}</p>
        <h2 className="section-title thesis-title">
          <span className="line-mask"><span className="line-inner">RAG Adaptive</span></span>
          <span className="line-mask"><span className="line-inner"><em>Multimodal</em> AI Chatbot</span></span>
          <span className="line-mask"><span className="line-inner">for Elderly Care</span></span>
        </h2>

        <div className="thesis-intro">
          <p className="reveal">{thesis.summary}</p>
          <div className="thesis-inputs reveal">
            {inputs.map((i) => (
              <div className="thesis-input ticks" key={i.label}>
                <span className="thesis-input-icon" aria-hidden="true">{i.icon}</span>
                <strong>{i.label}</strong>
                <small>{i.note}</small>
              </div>
            ))}
          </div>
        </div>

        <ul className="thesis-metrics">
          {thesis.metrics.map((m) => (
            <li className="reveal" key={m.label}>
              <span>{m.value}</span>
              <p>{m.label}</p>
            </li>
          ))}
        </ul>

        <div className="thesis-body">
          <div className="thesis-sticky">
            <p className="eyebrow">How it works</p>
            <h3>A hybrid retrieval pipeline over <em>73,540</em> vectors</h3>
            <p>
              Dense and sparse search find candidates together, Reciprocal Rank Fusion merges them,
              and a cross-encoder picks the passages that ground Gemini's answer.
            </p>
          </div>

          <ol className="pipe">
            <span className="pipe-rail" aria-hidden="true"><span className="pipe-progress" /></span>
            {thesis.pipeline.map((s) => (
              <li className="pipe-step" key={s.step}>
                <span className="pipe-num">{s.step}</span>
                <div>
                  <h4>{s.name}</h4>
                  <p>{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="thesis-foot">
          <ul className="thesis-highlights">
            {thesis.highlights.map((h) => <li className="reveal" key={h}>{h}</li>)}
          </ul>
          <div className="thesis-stack reveal">
            <p className="eyebrow">Tech stack</p>
            <div>{thesis.stack.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
