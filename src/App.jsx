import { useEffect, useState } from 'react'
import {
  person,
  projects,
  experience,
  leadership,
  recognition,
  skills,
  education,
} from './data/content.js'
import portrait from './assets/portrait.webp'

const NAV = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Recognition', '#recognition'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

const BLOCKS = ['var(--navy)', 'var(--green)', 'var(--teal)', 'var(--red)']
const SHAPES = ['square', 'circle', 'quarter', 'half']

function Shape({ kind, className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {kind === 'square' && <rect width="100" height="100" />}
      {kind === 'circle' && <circle cx="50" cy="50" r="50" />}
      {kind === 'quarter' && <path d="M0 100V0A100 100 0 0 1 100 100Z" />}
      {kind === 'half' && <path d="M0 100A50 50 0 0 1 100 100Z" />}
    </svg>
  )
}

function HeroPortrait() {
  return (
    <figure className="portrait">
      <span className="portrait-block" aria-hidden="true" />
      <img
        className="portrait-img"
        src={portrait}
        width="720"
        height="1280"
        alt="Veerbhadra Mahant smiling, with a flower arrangement balanced on his head"
      />
      <Shape kind="circle" className="portrait-shape portrait-sun" />
      <Shape kind="quarter" className="portrait-shape portrait-quarter" />
    </figure>
  )
}

function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const els = ['#top', ...NAV.map(([, href]) => href)].map((h) => document.querySelector(h)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === 'top' ? '' : `#${e.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="nav">
      <div className="nav-bar">
        <a className="nav-name" href="#top">
          Veerbhadra Mahant
        </a>
        <nav aria-label="Sections">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          <ul id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href} aria-current={active === href ? 'location' : undefined} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-solid" href={person.resume} download>
          Resume
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-body">
          <h1 className="name">
            {person.name.map((part) => (
              <span key={part} className="name-line">
                {part}
              </span>
            ))}
          </h1>
          <p className="lede">{person.summary}</p>
          <div className="actions">
            <a className="btn btn-solid" href="#work">
              See the work
            </a>
            <a className="btn btn-line" href={person.resume} download>
              Download resume
            </a>
          </div>
        </div>
        <HeroPortrait />
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <h2 id="work-h" className="title">
          Selected work
        </h2>
        <p className="intro">Four projects. Open a card to see how each one works.</p>
        <ul className="cards">
          {projects.map((p, i) => (
            <li key={p.id} className="card" style={{ '--block': BLOCKS[i % 4] }}>
              <article aria-labelledby={`proj-${p.id}`}>
                <Shape kind={SHAPES[i % 4]} className="card-mark" />
                <h3 id={`proj-${p.id}`}>{p.name}</h3>
                <p className="card-headline">{p.headline}</p>
                <p className="card-sub">{p.subtitle}</p>
                <p className="card-result">{p.result}</p>
                <details>
                  <summary>How it works</summary>
                  <ul className="bullets">
                    {p.points.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <ul className="chips" aria-label={`${p.name} stack`}>
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </details>
                <a className="btn btn-light" href={p.repo} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Experience() {
  const roles = [...experience, ...leadership]
  return (
    <section className="section" id="experience" aria-labelledby="exp-h">
      <div className="wrap">
        <h2 id="exp-h" className="title">
          Internship and leadership
        </h2>
        <ul className="rows">
          {roles.map((r, i) => (
            <li key={r.role} className="row">
              <p className="row-when">{r.when}</p>
              <div className="row-body">
                <h3>
                  <span className="marker" style={{ background: BLOCKS[i % 4] }} aria-hidden="true" />
                  {r.role}
                </h3>
                <p className="muted">{r.org}</p>
                <ul className="bullets">
                  {r.points.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Recognition() {
  return (
    <section className="section" id="recognition" aria-labelledby="rec-h">
      <div className="wrap">
        <h2 id="rec-h" className="title">
          Hackathon results
        </h2>
        <ul className="wins">
          {recognition.map((r) => {
            const first = r.place === '1st'
            return (
              <li className="win" key={r.title}>
                <svg className={`win-mark${first ? ' first' : ''}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
                  <circle cx="20" cy="20" r="17" />
                </svg>
                <p className="win-place">{first ? 'First prize' : 'Finalist'}</p>
                <h3>{r.title}</h3>
                <p className="muted">
                  {r.org}, {r.when}
                </p>
                <p>{r.note}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-h">
      <div className="wrap">
        <h2 id="skills-h" className="title">
          Tools
        </h2>
        <div className="groups">
          {skills.map((s, i) => (
            <div className="group" key={s.group}>
              <h3 className="group-name" style={{ '--block': BLOCKS[i % 4] }}>
                <Shape kind={SHAPES[i % 4]} className="group-mark" />
                {s.group}
              </h3>
              <ul className="skill-chips">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="edu">
          <h3>{education.degree}</h3>
          <p className="muted">
            {education.school}, {education.when}
          </p>
          <p>Coursework: {education.coursework}.</p>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { links } = person
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])
  const copy = () => {
    navigator.clipboard?.writeText(person.email).then(() => setCopied(true), () => {})
  }
  return (
    <footer className="contact" id="contact">
      <span className="art-sun" aria-hidden="true" />
      <span className="art-red" aria-hidden="true" />
      <div className="wrap">
        <div className="contact-body">
          <h2>Get in touch</h2>
          <a className="mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <div>
            <button type="button" className="btn btn-light" onClick={copy}>
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <span className="sr-only" role="status">
              {copied ? 'Email address copied' : ''}
            </span>
          </div>
          <ul className="contact-links">
            <li>
              <a href={links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.leetcode} target="_blank" rel="noreferrer">
                LeetCode
              </a>
            </li>
            <li>
              <a href={person.resume} download>
                Resume (PDF)
              </a>
            </li>
          </ul>
          <p className="contact-note">
            {person.location} / {person.site}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Recognition />
        <Skills />
      </main>
      <Contact />
    </>
  )
}
