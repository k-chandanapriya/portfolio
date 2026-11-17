import { marquee } from '../data'
import '../styles/marquee.css'

export default function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((word, i) => (
          <span key={i}>{word}<i>✦</i></span>
        ))}
      </div>
    </div>
  )
}
