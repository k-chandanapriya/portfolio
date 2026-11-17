import { useRef, useState } from 'react'
import { profile } from '../data'
import { asset } from '../motion'
import useReveal from '../useReveal'
import { ArrowUpRight, Download, Github, Linkedin, Mail } from './Icons'
import '../styles/contact.css'

export default function Contact() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  useReveal(root)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable — the mailto link still works */ }
  }

  return (
    <section className="section contact" id="contact" ref={root}>
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow reveal">Contact</p>
        <h2 className="contact-title">
          <span className="line-mask"><span className="line-inner">Let's build</span></span>
          <span className="line-mask"><span className="line-inner"><em>something</em> smart.</span></span>
        </h2>
        <p className="contact-lede reveal">
          I'm looking for entry-level roles in AI/ML engineering, data science or software development in Germany — and I'm open to relocation.
        </p>

        <div className="contact-email reveal">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button className="btn" onClick={copy}>{copied ? 'Copied ✓' : 'Copy email'}</button>
        </div>

        <div className="contact-links reveal">
          <a className="contact-link" href={`mailto:${profile.email}`}><Mail /> Email <ArrowUpRight /></a>
          <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a>
          <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub <ArrowUpRight /></a>
          <a className="contact-link is-accent" href={asset(profile.cv)} download><Download /> Download CV</a>
        </div>
      </div>

      <footer className="container footer">
        <span>© {new Date().getFullYear()} {profile.name} {profile.surname}</span>
        <span>{profile.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}
