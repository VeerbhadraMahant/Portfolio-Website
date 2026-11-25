import { lazy, useEffect, useRef, useState } from 'react'
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
import SectionBg from './components/SectionBg.jsx'

const Particles = lazy(() => import('./components/backgrounds/Particles/Particles.jsx'))
const PatternWaves = lazy(() => import('./components/backgrounds/PatternWaves/PatternWaves.jsx'))
const LineWaves = lazy(() => import('./components/backgrounds/LineWaves/LineWaves.jsx'))
const GradientASCII = lazy(() => import('./components/backgrounds/GradientASCII/GradientASCII.jsx'))

// Hex because the WebGL components parse it; values match the tokens in styles.css.
const INK = { navy: '#1e2a5a', green: '#1f6b4f', teal: '#17707a', red: '#b83a28', paper: '#f3efe6', paper2: '#e9e3d6' }

const NAV = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Recognition', '#recognition'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

const BLOCKS = ['var(--navy)', 'var(--green)', 'var(--teal)', 'var(--red)']
const SHAPES = ['square', 'circle', 'quarter', 'half']

const FINE = '(hover: hover) and (pointer: fine)'
const CALM = '(prefers-reduced-motion: no-preference)'
const TICK_COLOURS = [...BLOCKS, 'var(--sun)']
const FACTS = [
  ...projects.map((p) => p.headline),
  ...recognition.filter((r) => r.place === '1st').map((r) => `First prize, ${r.title}`),
]

// Sets --mx/--my (-1..1, pointer relative to the element) for CSS to turn into a drift.
function useDrift(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia(FINE).matches || !matchMedia(CALM).matches) return undefined
    let raf = 0
    let x = 0
    let y = 0
    const set = (a, b) => {
      el.style.setProperty('--mx', a)
      el.style.setProperty('--my', b)
    }
    const clamp = (v) => Math.max(-1, Math.min(1, v))
    const frame = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      set(clamp(((x - r.left) / r.width) * 2 - 1), clamp(((y - r.top) / r.height) * 2 - 1))
    }
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      raf = 0
      set(0, 0)
    }
    el.addEventListener('pointermove', move, { passive: true })
    el.addEventListener('pointerleave', leave, { passive: true })
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

function Shape({ kind, className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {kind === 'square' && <rect width="100" height="100" />}
      {kind === 'circle' && <circle cx="50" cy="50" r="50" />}
      {kind === 'quarter' && <path d="M0 100V0A100 100 0 0 1 100 100Z" />}
      {kind === 'half' && <path d="M0 100A50 50 0 0 1 100 100Z" />}
    </svg>
  )
}

function HeroPortrait() {
  const [frame, setFrame] = useState(0)
  return (
    <figure className="portrait" style={{ '--frame': BLOCKS[frame] }}>
      <span className="portrait-block" aria-hidden="true" />
      <button
        type="button"
        className="portrait-btn"
        aria-label="Change the frame colour of the portrait: Veerbhadra Mahant smiling, with a flower arrangement balanced on his head"
        onClick={() => setFrame((f) => (f + 1) % BLOCKS.length)}
      >
        <img
          className="portrait-img"
          src={portrait}
          width="720"
          height="1280"
          alt="Veerbhadra Mahant smiling, with a flower arrangement balanced on his head"
        />
      </button>
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
  const ref = useRef(null)
  useDrift(ref)
  let n = 0
  return (
    <section className="hero has-bg" id="top" ref={ref}>
      <SectionBg
        as={Particles}
        moveParticlesOnHover={false}
        clickBurst={false}
        hoverEffect="none"
        glow={0}
        twinkle={0}
        particleColors={[INK.navy, INK.green, INK.teal, INK.red]}
        particleCount={160}
        particleBaseSize={300}
        speed={0.05}
        opacity={1}
      />
      <div className="wrap hero-grid">
        <div className="hero-body">
          <h1 className="name" aria-label={person.name.join(' ')}>
            {person.name.map((part) => (
              <span key={part} className="name-line" aria-hidden="true">
                {[...part].map((ch) => {
                  const i = n++
                  return (
                    <span key={i} className="ch" aria-hidden="true" style={{ '--i': i, '--c': BLOCKS[i % 4] }}>
                      <span>{ch}</span>
                    </span>
                  )
                })}
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

function Ticker() {
  const items = (copy) =>
    FACTS.map((t, i) => (
      <li key={`${copy}-${i}`}>
        <span>{t}</span>
        <Shape kind={SHAPES[i % 4]} className="tick-shape" style={{ '--c': TICK_COLOURS[i % 5] }} />
      </li>
    ))
  return (
    <section className="ticker" aria-label="Highlights">
      <div className="ticker-view">
        <div className="ticker-track">
          <ul className="ticker-list">{items('a')}</ul>
          <ul className="ticker-list" aria-hidden="true">
            {items('b')}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="section has-bg" id="work" aria-labelledby="work-h">
      <SectionBg as={PatternWaves} interactive={false} backgroundColor={INK.paper} color="#3a372f" opacity={0.5} fade="none" />
      <div className="wrap">
        <h2 id="work-h" className="title">
          Selected work
        </h2>
        <p className="intro">Four projects. Open a card to see how each one works.</p>
        <ul className="cards">
          {projects.map((p, i) => (
            <li key={p.id} className="card" style={{ '--block': BLOCKS[i % 4] }}>
              <article aria-labelledby={`proj-${p.id}`}>
                <Shape kind={SHAPES[i % 4]} className={`card-mark mark-${SHAPES[i % 4]}`} />
                <h3 id={`proj-${p.id}`}>{p.name}</h3>
                <p className="card-headline">{p.headline}</p>
                <p className="card-sub">{p.subtitle}</p>
                <p className="card-result">{p.result}</p>
                <details>
                  <summary>How it works</summary>
                  <div className="details-body">
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
                  </div>
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
    <section className="section has-bg" id="experience" aria-labelledby="exp-h">
      <SectionBg
        as={LineWaves}
        enableMouseInteraction={false}
        clickRipple={false}
        lightMode
        color1={INK.navy}
        color2={INK.teal}
        color3={INK.green}
        speed={0.12}
        opacity={0.4}
      />
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
  const ref = useRef(null)
  useEffect(() => {
    const wins = ref.current?.querySelectorAll('.win')
    if (!wins?.length || !matchMedia(CALM).matches) return undefined
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('on-screen', e.isIntersecting)
    })
    wins.forEach((w) => io.observe(w))
    return () => io.disconnect()
  }, [])
  return (
    <section className="section has-bg" id="recognition" aria-labelledby="rec-h">
      <SectionBg
        as={GradientASCII}
        mouseInteraction={false}
        clickEffect="none"
        lightMode
        colors={[INK.navy, INK.teal, INK.paper2, INK.teal]}
        speed={0.4}
        gradientOpacity={0.55}
        glyphOpacity={0.9}
      />
      <div className="wrap">
        <h2 id="rec-h" className="title">
          Activities
        </h2>
        <ul className="wins" ref={ref}>
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
            <div className="group" key={s.group} style={{ '--block': BLOCKS[i % 4] }}>
              <h3 className="group-name">
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
  const [pieces, setPieces] = useState([])
  const ref = useRef(null)
  const burstTimer = useRef(0)
  useDrift(ref)
  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])
  useEffect(() => () => clearTimeout(burstTimer.current), [])
  const celebrate = () => {
    if (!matchMedia(CALM).matches) return
    const stamp = Date.now()
    const n = 11
    setPieces(
      Array.from({ length: n }, (_, i) => {
        const a = ((i + Math.random()) / n) * 2 * Math.PI
        const d = 40 + Math.random() * 50
        return {
          id: `${stamp}-${i}`,
          kind: SHAPES[i % 3],
          color: TICK_COLOURS[i % 5],
          size: 8 + Math.round(Math.random() * 6),
          dx: `${Math.round(Math.cos(a) * d)}px`,
          dy: `${Math.round(Math.sin(a) * d)}px`,
          rot: `${Math.round(Math.random() * 360 - 180)}deg`,
        }
      }),
    )
    clearTimeout(burstTimer.current)
    burstTimer.current = setTimeout(() => setPieces([]), 800)
  }
  const copy = () => {
    navigator.clipboard?.writeText(person.email).then(
      () => {
        setCopied(true)
        celebrate()
      },
      () => {},
    )
  }
  return (
    <footer className="contact" id="contact" ref={ref}>
      <span className="art-sun" aria-hidden="true" />
      <span className="art-red" aria-hidden="true" />
      <div className="wrap">
        <div className="contact-body">
          <h2>Get in touch</h2>
          <a className="mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <div className="copy-wrap">
            <button type="button" className="btn btn-light" onClick={copy}>
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <span className="burst" aria-hidden="true">
              {pieces.map((p) => (
                <span
                  key={p.id}
                  className={`piece piece-${p.kind}`}
                  style={{ '--dx': p.dx, '--dy': p.dy, '--rot': p.rot, '--s': `${p.size}px`, background: p.color }}
                />
              ))}
            </span>
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
        <Ticker />
        <Work />
        <Experience />
        <Recognition />
        <Skills />
      </main>
      <Contact />
    </>
  )
}
