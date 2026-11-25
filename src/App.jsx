import { useEffect, useRef, useState } from 'react'
import {
  person,
  projects,
  experience,
  leadership,
  recognition,
  skills,
  education,
} from './data/content.js'
import { sky } from './sky.js'

const NAV = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Recognition', '#recognition'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

// Eight-point star used across the page (map stars, award plates).
function starPoints(n = 8, R = 50, r = 17) {
  const pts = []
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI / n) * i - Math.PI / 2
    const rad = i % 2 ? r : R
    pts.push(`${(50 + Math.cos(a) * rad).toFixed(1)},${(50 + Math.sin(a) * rad).toFixed(1)}`)
  }
  return pts.join(' ')
}
const STAR = starPoints()

function StarGlyph({ hollow = false }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <polygon
        points={STAR}
        fill={hollow ? 'none' : 'currentColor'}
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Moon({ mode, onToggle }) {
  const night = mode === 'night'
  return (
    <button
      className="moon"
      type="button"
      onClick={onToggle}
      aria-label={night ? 'Switch the sky to sunrise' : 'Switch the sky to night'}
    >
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <mask id="crescent">
            <rect width="64" height="64" fill="#fff" />
            <circle cx="40" cy="26" r="21" fill="#000" />
          </mask>
        </defs>
        {night ? (
          <circle cx="30" cy="34" r="24" fill="#f2c230" mask="url(#crescent)" />
        ) : (
          <>
            <circle cx="32" cy="32" r="16" fill="#fff4c2" />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="32"
                y1="6"
                x2="32"
                y2="12"
                stroke="#fff4c2"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${i * 45} 32 32)`}
              />
            ))}
          </>
        )}
      </svg>
    </button>
  )
}

function Nav() {
  const [active, setActive] = useState('')
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
  return (
    <header className="rail">
      <a className="rail-name" href="#top">
        Veerbhadra Mahant
      </a>
      <nav aria-label="Sections">
        <ul>
          {NAV.map(([label, href]) => (
            <li key={href} className="rail-link">
              <a href={href} aria-current={active === href ? 'location' : undefined}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a className="btn btn-rail" href={person.resume} download>
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function Cypress() {
  return (
    <svg className="cypress" viewBox="-30 0 120 800" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <path
        d="M42 0C52 60 24 110 44 170C14 230 60 280 32 340C-6 420 52 470 28 560C14 620 42 700 38 800H2C10 700-14 620 6 540C-12 470 14 420 -2 340C-18 280 12 230-8 170C-20 110 22 60 42 0Z"
        fill="#07120e"
      />
      <g fill="none" stroke="#1d4a3c" strokeWidth="2.5" strokeLinecap="round" opacity=".8">
        <path d="M30 120C22 160 36 190 24 240" />
        <path d="M34 280C26 330 40 360 28 420" />
        <path d="M24 470C20 520 32 560 22 620" />
        <path d="M38 200C42 230 34 260 40 300" />
      </g>
    </svg>
  )
}

function Hero({ planted }) {
  const paintOne = () => {
    sky.plant(window.innerWidth * (0.15 + Math.random() * 0.75), window.innerHeight * (0.1 + Math.random() * 0.45))
  }
  return (
    <section className="hero" id="top" data-sky>
      <Cypress />
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
          <a className="btn btn-gold" href="#work">
            See the work
          </a>
          <button className="btn btn-line" type="button" onClick={paintOne} disabled={planted >= 40}>
            Paint a star
          </button>
        </div>
        <p className="hint">
          Move your cursor to stir the sky. Click open sky to paint a star.
          <span className="count"> Stars painted: {planted}</span>
        </p>
      </div>
    </section>
  )
}

function ProjectBody({ project, headingId }) {
  return (
    <>
      <h3 id={headingId}>{project.name}</h3>
      <p className="panel-sub">{project.subtitle}</p>
      <p className="panel-result">{project.result}</p>
      <ul className="bullets">
        {project.points.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <ul className="chips" aria-label={`${project.name} stack`}>
        {project.stack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <a className="btn btn-gold" href={project.repo} target="_blank" rel="noreferrer">
        {project.name} on GitHub
      </a>
    </>
  )
}

function StarMap() {
  const [selected, setSelected] = useState(projects[0].id)
  const [path, setPath] = useState([projects[0].id])
  const done = path.length === projects.length
  const project = projects.find((p) => p.id === selected)
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]))

  const choose = (id) => {
    setSelected(id)
    setPath((p) => (p.includes(id) ? p : [...p, id]))
  }
  useEffect(() => {
    if (!done) return undefined
    sky.shoot()
    const a = setTimeout(() => sky.shoot(), 350)
    const b = setTimeout(() => sky.shoot(), 700)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [done])
  const redraw = () => {
    setPath([selected])
  }

  return (
    <div className="work-grid">
      <div className={`map${done ? ' done' : ''}`}>
        <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {path.slice(1).map((id, i) => {
            const a = byId[path[i]].star
            const b = byId[id].star
            return (
              <line
                key={`${path[i]}-${id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                pathLength="1"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`star-btn${path.includes(p.id) ? ' seen' : ''}`}
            style={{ left: `${p.star.x}%`, top: `${p.star.y}%` }}
            aria-pressed={selected === p.id}
            onClick={() => choose(p.id)}
          >
            <span className="star-icon">
              <StarGlyph />
            </span>
            <span className="star-name">
              {p.name}
              <span className="star-metric">{p.headline}</span>
            </span>
          </button>
        ))}
        <p className="map-status" role="status">
          {done ? (
            <>
              Constellation complete.{' '}
              <button type="button" className="link-btn" onClick={redraw}>
                Draw it again
              </button>
            </>
          ) : (
            `${path.length} of ${projects.length} stars found. Pick the next one.`
          )}
        </p>
      </div>

      <article className="patch panel" key={project.id} aria-labelledby="panel-name">
        <ProjectBody project={project} headingId="panel-name" />
      </article>
    </div>
  )
}

function Work() {
  const [view, setView] = useState('map')
  return (
    <section className="section" id="work" aria-labelledby="work-h" data-sky>
      <div className="wrap">
        <h2 id="work-h" className="title">
          Four projects, four stars
        </h2>
        <div className="work-bar">
          <p className="section-hint">
            {view === 'map' ? 'Pick each star to read what that project shipped.' : 'All four projects, side by side.'}
          </p>
          <div className="views" role="group" aria-label="Project view">
            <button type="button" aria-pressed={view === 'map'} onClick={() => setView('map')}>
              Constellation
            </button>
            <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>
              List
            </button>
          </div>
        </div>
        {view === 'map' ? (
          <StarMap />
        ) : (
          <ul className="project-list">
            {projects.map((p) => (
              <li key={p.id} className="patch panel">
                <article aria-labelledby={`proj-${p.id}`}>
                  <ProjectBody project={p} headingId={`proj-${p.id}`} />
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function Role({ r }) {
  return (
    <li className="row">
      <p className="row-when">{r.when}</p>
      <div className="row-body">
        <h3>{r.role}</h3>
        <p className="row-org">{r.org}</p>
        <ul className="bullets">
          {r.points.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </li>
  )
}

function Ledger() {
  return (
    <section className="section" id="experience" aria-labelledby="exp-h" data-sky>
      <div className="wrap">
        <h2 id="exp-h" className="title">
          Internship and leadership
        </h2>
        <div className="patch">
          <ul className="rows">
            {experience.map((r) => (
              <Role key={r.role} r={r} />
            ))}
            {leadership.map((r) => (
              <Role key={r.role} r={r} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Recognition() {
  return (
    <section className="section" id="recognition" aria-labelledby="rec-h" data-sky>
      <div className="wrap">
        <h2 id="rec-h" className="title">
          Hackathon results
        </h2>
        <ul className="wins">
          {recognition.map((r) => {
            const first = r.place === '1st'
            return (
              <li className={`patch win${first ? ' first' : ''}`} key={r.title}>
                <span className="win-star">
                  <StarGlyph hollow={!first} />
                </span>
                <p className="win-place">{first ? 'First prize' : 'Finalist'}</p>
                <h3>{r.title}</h3>
                <p className="row-org">
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

const DAB = ['#f2c230', '#4f8fd6', '#a9d1e8', '#f6e08a']

function Skills() {
  const dab = (e, i) => {
    const r = e.currentTarget.getBoundingClientRect()
    sky.burst(r.left + r.width / 2, r.top + r.height / 2, DAB[i], 60)
  }
  return (
    <section className="section" id="skills" aria-labelledby="skills-h" data-sky>
      <div className="wrap">
        <h2 id="skills-h" className="title">
          Tools
        </h2>
        <p className="section-hint">Tap a tool to dab some paint into the sky.</p>
        <div className="palette">
          {skills.map((s, gi) => (
            <div className="group" key={s.group}>
              <h3 className="group-name patch">{s.group}</h3>
              <ul className="dabs">
                {s.items.map((item) => (
                  <li key={item}>
                    <button type="button" className={`dab dab-${gi}`} onClick={(e) => dab(e, gi)}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="patch edu">
          <h3>{education.degree}</h3>
          <p className="row-org">
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
    <footer className="gate" id="contact">
      <svg className="hills" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 120V70C140 20 260 10 420 56C560 96 640 40 800 28C980 16 1100 80 1240 62C1330 50 1390 30 1440 44V120Z" />
      </svg>
      <div className="wrap">
        <h2>Get in touch</h2>
        <div className="mail-row">
          <a className="mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <button type="button" className="btn btn-line copy" onClick={copy}>
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <span className="sr-only" role="status">
            {copied ? 'Email address copied' : ''}
          </span>
        </div>
        <ul className="gate-links">
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
        <p className="gate-note">
          {person.location} / {person.site}
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const paintRef = useRef(null)
  const glowRef = useRef(null)
  const [mode, setMode] = useState('night')
  const [planted, setPlanted] = useState(0)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [paused, setPaused] = useState(false)

  useEffect(() => sky.init(paintRef.current, glowRef.current, { reduced, onPlant: setPlanted }), [reduced])
  useEffect(() => sky.setPaused(paused), [paused])

  // Dim the sky behind the reading sections; the hero keeps it at full strength.
  useEffect(() => {
    const root = document.documentElement
    const update = () => {
      const v = (window.scrollY - window.innerHeight * 0.3) / (window.innerHeight * 0.5)
      root.style.setProperty('--veil', Math.min(1, Math.max(0, v)).toFixed(3))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.mode = mode
    sky.setMode(mode)
  }, [mode])

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
        </filter>
      </svg>
      <canvas ref={paintRef} className="sky sky-paint" aria-hidden="true" />
      <canvas ref={glowRef} className="sky sky-glow" aria-hidden="true" />
      <div className="veil" aria-hidden="true" />
      <a className="skip" href="#work">
        Skip to projects
      </a>
      <Nav />
      <Moon mode={mode} onToggle={() => setMode(mode === 'night' ? 'dawn' : 'night')} />
      {!reduced && (
        <button type="button" className="btn btn-line pause" onClick={() => setPaused((v) => !v)}>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
          </svg>
          <span className="pause-label">{paused ? 'Play sky' : 'Pause sky'}</span>
        </button>
      )}
      <main>
        <Hero planted={planted} />
        <Work />
        <Ledger />
        <Recognition />
        <Skills />
      </main>
      <Contact />
    </>
  )
}
