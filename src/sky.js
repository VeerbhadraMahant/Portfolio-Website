// Painterly sky: a flow field of brush strokes (accumulating canvas) plus a
// cleared glow layer for stars, brush ring and shooting stars.
// Pointer stirs the field, clicks on open sky plant stars, bursts dab colour.

const PALETTES = {
  night: {
    base: '#0b1b3d',
    // Ordered dark to light: the band field favours the middle, so the palest tone stays rare.
    strokes: ['#0c1f4a', '#12295c', '#1c3f80', '#2a5cab', '#3a6dbd', '#4f8fd6', '#9cc8e6'],
    light: ['#f2c230', '#f6e08a', '#fff4c2'],
  },
  dawn: {
    base: '#c98a14',
    strokes: ['#6fa8d8', '#e07b2c', '#e8a317', '#f2c230', '#f7d56a', '#fbe7a1', '#b9d9ec'],
    light: ['#ffffff', '#cfe6f5', '#eaf5fb'],
  },
}

// Fixed stars as fractions of the viewport (x, y) plus relative size.
const STARS = [
  [0.12, 0.2, 1.0], [0.3, 0.12, 1.2], [0.46, 0.3, 0.9], [0.58, 0.1, 1.3], [0.72, 0.32, 1.0],
  [0.82, 0.14, 0.85], [0.2, 0.5, 0.8], [0.9, 0.46, 0.9], [0.38, 0.56, 0.7], [0.66, 0.66, 0.7],
]

const MAX_PLANTED = 40

// Lighter tint of a stroke colour, drawn as the thin ridge of wet paint along one edge.
const ridges = new Map()
function ridge(hex) {
  let out = ridges.get(hex)
  if (!out) {
    const n = parseInt(hex.slice(1), 16)
    const mix = (v) => Math.round(v + (255 - v) * 0.35)
    out = `rgb(${mix(n >> 16)},${mix((n >> 8) & 255)},${mix(n & 255)})`
    ridges.set(hex, out)
  }
  return out
}

function stroke(x, y, life, sp, wd, c, a) {
  return { x, y, px: x, py: y, life, max: life, sp, wd, c, c2: ridge(c), a }
}

function start(paint, glow, { reduced, onPlant }) {
  const pctx = paint.getContext('2d')
  const gctx = glow.getContext('2d')
  let w = 0, h = 0, unit = 1
  let particles = []
  let stars = []
  let vortices = []
  let planted = 0
  let mode = 'night'
  let boost = 0
  let t = 0
  let raf = 0
  let target = 900
  let slow = 0
  let paused = false
  let nextShoot = 6
  const shoots = []
  const pointer = { x: -999, y: -999, power: 0, active: false }

  const pal = () => PALETTES[mode]

  function layout() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    w = window.innerWidth
    h = window.innerHeight
    unit = Math.min(1.25, Math.max(0.6, Math.min(w, h) / 820))
    for (const c of [paint, glow]) {
      c.width = Math.round(w * dpr)
      c.height = Math.round(h * dpr)
    }
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    gctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    pctx.lineCap = 'round'
    pctx.fillStyle = pal().base
    pctx.fillRect(0, 0, w, h)

    const planter = stars.filter((s) => s.planted)
    stars = STARS.map(([fx, fy, k], i) => ({ x: fx * w, y: fy * h, r: 30 * k * unit, born: -10, i, planted: false }))
    stars.push(...planter.map((s) => ({ ...s, x: Math.min(s.x, w), y: Math.min(s.y, h) })))
    rebuildVortices()

    target = Math.round(Math.min(1400, Math.max(520, (w * h) / 900)))
    particles = Array.from({ length: target }, () => spawn(true))
  }

  function rebuildVortices() {
    vortices = [
      { x: w * 0.42, y: h * 0.3, s: 1.5, r: Math.max(w, h) * 0.2 },
      { x: w * 0.66, y: h * 0.22, s: -1.2, r: Math.max(w, h) * 0.14 },
      { x: w * 0.24, y: h * 0.62, s: 0.9, r: Math.max(w, h) * 0.12 },
    ]
    for (const s of stars) vortices.push({ x: s.x, y: s.y, s: s.i % 2 ? 1.6 : -1.6, r: s.r * 1.7 })
  }

  function field(x, y) {
    let vx = Math.cos(y * 0.006 + t * 0.2) * 0.8 + 0.35
    let vy = Math.sin(x * 0.005 + t * 0.17) * 0.5
    for (const v of vortices) {
      const dx = x - v.x
      const dy = y - v.y
      const d2 = dx * dx + dy * dy
      if (d2 > v.r * v.r * 9) continue
      const f = v.s * Math.exp(-d2 / (v.r * v.r))
      const d = Math.sqrt(d2) + 30
      vx += (-dy / d) * f * 3
      vy += (dx / d) * f * 3
    }
    if (pointer.power > 0.02) {
      const dx = x - pointer.x
      const dy = y - pointer.y
      const f = pointer.power * 1.8 * Math.exp(-(dx * dx + dy * dy) / 22000)
      const d = Math.hypot(dx, dy) + 30
      vx += (-dy / d) * f * 3
      vy += (dx / d) * f * 3
    }
    return Math.atan2(vy, vx)
  }

  function nearStar(x, y) {
    for (const s of stars) {
      const d = Math.hypot(x - s.x, y - s.y)
      if (d < s.r * 2) return s
    }
    return null
  }

  function pickColor(x, y, star = nearStar(x, y)) {
    const p = pal()
    if (star) return p.light[Math.floor(Math.random() * p.light.length)]
    const k = (Math.sin(x * 0.013 + y * 0.009) + Math.sin(y * 0.021 - x * 0.004) + 2) / 4
    return p.strokes[Math.min(p.strokes.length - 1, Math.floor(k * p.strokes.length))]
  }

  function spawn(initial = false) {
    let x = Math.random() * w
    let y = Math.random() * h
    if (!initial && stars.length && Math.random() < 0.14) {
      const s = stars[Math.floor(Math.random() * stars.length)]
      const a = Math.random() * Math.PI * 2
      const d = s.r * (0.6 + Math.random() * 1.4)
      x = s.x + Math.cos(a) * d
      y = s.y + Math.sin(a) * d
    }
    const star = nearStar(x, y)
    // Halo strokes stay short so yellow wraps the stars instead of streaking across the sky.
    const life = star ? 40 + Math.random() * 50 : 90 + Math.random() * 150
    return stroke(x, y, life, 1.2 + Math.random() * 0.9, (3 + Math.random() * 4) * unit, pickColor(x, y, star), 0.45 + Math.random() * 0.3)
  }

  function step(p) {
    const a = field(p.x, p.y)
    p.px = p.x
    p.py = p.y
    p.x += Math.cos(a) * p.sp
    p.y += Math.sin(a) * p.sp
    p.life -= 1
    // Taper: thin where the brush lands and lifts, full in the middle of the stroke.
    const wd = p.wd * (0.3 + 0.7 * Math.sqrt(Math.sin((Math.PI * Math.max(0, p.life)) / p.max)))
    pctx.strokeStyle = p.c
    pctx.globalAlpha = p.a
    pctx.lineWidth = wd
    pctx.beginPath()
    pctx.moveTo(p.px, p.py)
    pctx.lineTo(p.x, p.y)
    pctx.stroke()
    const nx = -Math.sin(a) * wd * 0.3
    const ny = Math.cos(a) * wd * 0.3
    pctx.strokeStyle = p.c2
    pctx.globalAlpha = p.a * 0.6
    pctx.lineWidth = wd * 0.28
    pctx.beginPath()
    pctx.moveTo(p.px + nx, p.py + ny)
    pctx.lineTo(p.x + nx, p.y + ny)
    pctx.stroke()
    return p.life > 0 && p.x > -20 && p.x < w + 20 && p.y > -20 && p.y < h + 20
  }

  function drawGlow() {
    gctx.clearRect(0, 0, w, h)
    const p = pal()
    for (const s of stars) {
      const grow = s.planted && !reduced && !paused ? Math.min(1, (t - s.born) / 0.7) : 1
      const e = 1 - Math.pow(1 - grow, 3)
      const pulse = reduced ? 1 : 1 + Math.sin(t * 2 + s.i * 1.7) * 0.07
      const r = s.r * e * pulse
      const g = gctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 1.5)
      g.addColorStop(0, p.light[2])
      g.addColorStop(0.22, p.light[1])
      g.addColorStop(0.55, p.light[0] + '55')
      g.addColorStop(1, p.light[0] + '00')
      gctx.fillStyle = g
      gctx.beginPath()
      gctx.arc(s.x, s.y, r * 1.5, 0, Math.PI * 2)
      gctx.fill()
      gctx.fillStyle = p.light[2]
      gctx.beginPath()
      gctx.arc(s.x, s.y, r * 0.2, 0, Math.PI * 2)
      gctx.fill()
    }
    for (const sh of shoots) {
      const a = Math.max(0, sh.life / sh.max)
      const g = gctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 14, sh.y - sh.vy * 14)
      g.addColorStop(0, p.light[2])
      g.addColorStop(1, p.light[0] + '00')
      gctx.strokeStyle = g
      gctx.globalAlpha = a
      gctx.lineWidth = 3
      gctx.lineCap = 'round'
      gctx.beginPath()
      gctx.moveTo(sh.x, sh.y)
      gctx.lineTo(sh.x - sh.vx * 14, sh.y - sh.vy * 14)
      gctx.stroke()
      gctx.globalAlpha = 1
    }
    if (pointer.active && !reduced) {
      gctx.strokeStyle = p.light[1]
      gctx.globalAlpha = 0.55
      gctx.lineWidth = 2
      gctx.beginPath()
      gctx.arc(pointer.x, pointer.y, 12 + pointer.power * 22, 0, Math.PI * 2)
      gctx.stroke()
      gctx.globalAlpha = 1
    }
  }

  function frame() {
    raf = requestAnimationFrame(frame)
    if (document.hidden || paused) return
    const t0 = performance.now()
    t += 1 / 60
    pointer.power *= 0.94
    const passes = boost > 0 ? 3 : 1
    if (boost > 0) boost -= 1
    for (let k = 0; k < passes; k++) {
      for (let i = 0; i < particles.length; i++) {
        if (!step(particles[i])) {
          if (i >= target) {
            particles[i] = particles[particles.length - 1]
            particles.pop()
            i--
          } else particles[i] = spawn()
        }
      }
    }
    pctx.globalAlpha = 1
    if (t > nextShoot) {
      shoot()
      nextShoot = t + 14 + Math.random() * 12
    }
    for (let i = shoots.length - 1; i >= 0; i--) {
      const sh = shoots[i]
      sh.x += sh.vx
      sh.y += sh.vy
      sh.life -= 1
      if (sh.life <= 0) shoots.splice(i, 1)
    }
    drawGlow()
    // Keep low-end machines smooth: shed strokes if frames run long.
    slow = performance.now() - t0 > 14 ? slow + 1 : Math.max(0, slow - 1)
    if (slow > 40 && particles.length > 260) {
      particles.length = Math.floor(particles.length * 0.8)
      slow = 0
    }
  }

  function prewarm(n) {
    for (let i = 0; i < n; i++) {
      t += 1 / 60
      for (let j = 0; j < particles.length; j++) if (!step(particles[j])) particles[j] = spawn()
    }
    pctx.globalAlpha = 1
    drawGlow()
  }

  function shoot() {
    if (reduced || paused) return
    const fromLeft = Math.random() < 0.5
    const life = 50
    shoots.push({
      x: fromLeft ? w * (0.05 + Math.random() * 0.3) : w * (0.65 + Math.random() * 0.3),
      y: h * (0.04 + Math.random() * 0.25),
      vx: (fromLeft ? 1 : -1) * (9 + Math.random() * 4),
      vy: 3 + Math.random() * 2,
      life,
      max: life,
    })
  }

  function plant(x, y) {
    if (planted >= MAX_PLANTED) return
    planted += 1
    const s = { x, y, r: (26 + Math.random() * 14) * unit, born: t, i: stars.length + 1, planted: true }
    stars.push(s)
    vortices.push({ x, y, s: s.i % 2 ? 1.6 : -1.6, r: s.r * 1.7 })
    burst(x, y, null, 40)
    onPlant?.(planted)
    if (reduced || paused) drawGlow()
  }

  function burst(x, y, color, n = 70) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const d = Math.random() * 26
      const px = x + Math.cos(a) * d
      const py = y + Math.sin(a) * d
      particles.push(stroke(px, py, 35 + Math.random() * 45, 2 + Math.random() * 1.5, (3 + Math.random() * 4) * unit, color || pal().light[Math.floor(Math.random() * 3)], 0.75))
    }
    if (reduced || paused) {
      for (let k = 0; k < 40; k++) for (let i = particles.length - n; i < particles.length; i++) step(particles[i])
      pctx.globalAlpha = 1
      particles.length -= n
    }
  }

  function setMode(m) {
    if (m === mode) return
    mode = m
    pctx.globalAlpha = 0.8
    pctx.fillStyle = pal().base
    pctx.fillRect(0, 0, w, h)
    pctx.globalAlpha = 1
    boost = 100
    for (const q of particles) {
      q.c = pickColor(q.x, q.y)
      q.c2 = ridge(q.c)
    }
    if (reduced || paused) {
      pctx.fillStyle = pal().base
      pctx.fillRect(0, 0, w, h)
      prewarm(150)
    }
  }

  function onMove(e) {
    if (reduced || paused || e.pointerType === 'touch') return
    const dx = e.clientX - pointer.x
    const dy = e.clientY - pointer.y
    const speed = Math.min(1, Math.hypot(dx, dy) / 40)
    pointer.x = e.clientX
    pointer.y = e.clientY
    pointer.active = true
    pointer.power = Math.max(pointer.power, speed)
    if (speed > 0.15 && particles.length < 1600) {
      for (let i = 0; i < 4; i++) {
        const x = pointer.x + (Math.random() - 0.5) * 10
        const y = pointer.y + (Math.random() - 0.5) * 10
        particles.push(stroke(x, y, 30 + Math.random() * 30, 2.2, (2.5 + Math.random() * 2.5) * unit, pal().light[Math.floor(Math.random() * 2)], 0.8))
      }
    }
  }
  const onLeave = () => { pointer.active = false }
  function onClick(e) {
    const el = e.target
    if (!(el instanceof Element) || !el.closest('[data-sky]')) return
    if (el.closest('a, button, .patch, input, summary')) return
    plant(e.clientX, e.clientY)
  }
  let rz = 0
  function onResize() {
    clearTimeout(rz)
    rz = setTimeout(() => {
      // Mobile URL bar show/hide only changes the height slightly: keep the painting.
      if (window.innerWidth === w && Math.abs(window.innerHeight - h) < 120) return
      layout()
      prewarm(reduced ? 150 : 110)
    }, 150)
  }

  layout()
  prewarm(reduced ? 150 : 110)
  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
  window.addEventListener('click', onClick)
  window.addEventListener('resize', onResize)
  if (!reduced) raf = requestAnimationFrame(frame)

  return {
    plant, burst, shoot, setMode,
    setPaused(v) {
      paused = v
      pointer.x = pointer.y = -999
      if (v) {
        pointer.active = false
        drawGlow()
      }
    },
    destroy() {
      cancelAnimationFrame(raf)
      clearTimeout(rz)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
    },
  }
}

// Thin facade so components can call the sky before or after it mounts.
let impl = null
export const sky = {
  init(paint, glow, opts) {
    impl = start(paint, glow, opts)
    return () => {
      impl?.destroy()
      impl = null
    }
  },
  plant: (x, y) => impl?.plant(x, y),
  burst: (x, y, color, n) => impl?.burst(x, y, color, n),
  shoot: () => impl?.shoot(),
  setMode: (m) => impl?.setMode(m),
  setPaused: (v) => impl?.setPaused(v),
}
