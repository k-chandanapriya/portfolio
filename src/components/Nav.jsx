import { useEffect, useState } from 'react'
import { profile } from '../data'
import { asset } from '../motion'
import { Download } from './Icons'
import '../styles/nav.css'

const links = [
  ['About', '#about'],
  ['Thesis', '#thesis'],
  ['Work', '#work'],
  ['Journey', '#journey'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Back to top">
          CP<span>K</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="btn btn-primary nav-cv" href={asset(profile.cv)} download>
          <Download /> CV
        </a>
        <button className="nav-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}
