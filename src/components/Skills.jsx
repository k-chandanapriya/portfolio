import { useRef } from 'react'
import { skills } from '../data'
import useReveal from '../useReveal'
import '../styles/skills.css'

export default function Skills() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section className="section skills" id="skills" ref={root}>
      <div className="container">
        <p className="eyebrow reveal">Toolkit</p>
        <h2 className="section-title">
          <span className="line-mask"><span className="line-inner">Skills & <em>stack</em></span></span>
        </h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-card reveal" key={s.group}>
              <div className="skill-head">
                <span className="skill-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.group}</h3>
              </div>
              <div className="skill-items">
                {s.items.map((it) => <span className="chip" key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
